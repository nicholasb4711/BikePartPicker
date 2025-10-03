import { Card, CardContent, CardHeader } from "@/components/ui";
import Link from "next/link";
import { Guide, GuideSection } from "@/data/guides";

interface GuideTemplateProps {
  guide: Guide;
}

// Consolidated style mappings
const variantStyles = {
  warning: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800', 
  success: 'bg-green-50 border-green-200 text-green-800',
  default: 'bg-white border-gray-200 text-black'
};

const badgeColors = {
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  red: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-800'
};

function SectionRenderer({ section }: { section: GuideSection }) {
  const isAlert = ['warning', 'info', 'success'].includes(section.type);
  const sectionStyle = variantStyles[section.type as keyof typeof variantStyles] || variantStyles.default;

  // Common item renderer for lists
  const renderItems = (items: string[]) => (
    <div className="space-y-2">
      {items.map((item, index) => {
        const [title, description] = item.includes(' - ') ? item.split(' - ') : [item, ''];
        return (
          <div key={index} className="bg-white p-4 rounded border border-current border-opacity-20">
            <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
            {description && <p className="text-sm text-gray-700">{description}</p>}
          </div>
        );
      })}
    </div>
  );

  // Common grid renderer
  const renderGrid = (items: Array<{title: string; content: string; badge?: string; badgeColor?: string}>, columns = 'md:grid-cols-3') => (
    <div className={`grid grid-cols-1 ${columns} gap-6`}>
      {items.map((item, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg">{item.title}</h3>
            {item.badge && (
              <span className={`px-2 py-1 rounded text-sm font-medium ${badgeColors[item.badgeColor as keyof typeof badgeColors] || badgeColors.gray}`}>
                {item.badge}
              </span>
            )}
          </div>
          <p className="text-sm">{item.content}</p>
        </div>
      ))}
    </div>
  );

  return (
    <Card className={`mb-8 ${isAlert ? sectionStyle : ''}`}>
      <CardHeader>
        <h2 className="text-2xl font-bold">{section.title}</h2>
        {section.content && !isAlert && <p className="text-gray-600">{section.content}</p>}
      </CardHeader>
      <CardContent>
        {isAlert && section.content && <p className="mb-4">{section.content}</p>}
        
        {/* Table rendering */}
        {section.tableData && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  {section.tableData.headers.map((header, index) => (
                    <th key={index} className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.tableData.rows.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-200 px-4 py-3 text-sm">
                        <span className={
                          cellIndex === 0 ? 'font-medium' :
                          cell.includes('❌') ? 'text-red-600' : 
                          cell.includes('✅') ? 'text-green-600' : 
                          'text-gray-700'
                        }>
                          {cell}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Items rendering */}
        {section.items && (
          section.type === 'content' ? (
            <div className="space-y-3">
              {section.items.map((item, index) => (
                <div key={index} className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium">{item.split(' - ')[0]}</span>
                  {item.includes(' - ') && (
                    <span className="text-gray-600">{item.split(' - ')[1]}</span>
                  )}
                </div>
              ))}
            </div>
          ) : renderItems(section.items)
        )}

        {/* Grid rendering */}
        {section.gridItems && (
          section.type === 'grid' ? renderGrid(section.gridItems) :
          isAlert ? renderGrid(section.gridItems, 'md:grid-cols-2') :
          <div className="space-y-4">
            {section.gridItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {item.badge && (
                    <span className={`px-2 py-1 rounded text-sm font-medium ${badgeColors[item.badgeColor as keyof typeof badgeColors] || badgeColors.gray}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function GuideTemplate({ guide }: GuideTemplateProps) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/guides" className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Guides
          </Link>
          <h1 className="text-4xl font-bold text-black mb-4">{guide.title}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {guide.description}
          </p>
        </div>

        {/* Sections */}
        {guide.sections.map((section, index) => (
          <SectionRenderer key={section.id || index} section={section} />
        ))}

        {/* Next Steps */}
        {guide.nextSteps && guide.nextSteps.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4">
            {guide.nextSteps.map((step, index) => (
              <Link key={index} href={step.href} className="flex-1 p-4 border border-gray-200 rounded-lg hover:border-gray-300 bg-white transition-colors">
                <h3 className="font-semibold text-blue-600 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}