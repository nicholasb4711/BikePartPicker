import { Card, CardContent, CardHeader } from "@/components/ui";
import Link from "next/link";
import { getAllGuides } from "@/data/guides";

export default function Guides() {
  const guides = getAllGuides();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-6 tracking-tight">
            Build Guides
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Learn the essential compatibility rules for building your perfect bike. 
            Start with these core guides to avoid costly mistakes.
          </p>
        </div>

        {/* Quick Reference */}
        <Card className="mb-12 bg-blue-50 border-blue-200">
          <CardHeader>
            <h2 className="text-2xl font-bold text-black mb-2">🚨 Key Compatibility Rules</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Drivetrain</h3>
                <p className="text-sm text-gray-600">Don&apos;t mix Shimano and SRAM shifters/derailleurs</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Wheels</h3>
                <p className="text-sm text-gray-600">Frame dropouts must match wheel axle standard</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Frame</h3>
                <p className="text-sm text-gray-600">Bottom bracket must match crankset standard</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {guides.map((guide) => (
            <Link key={guide.id} href={`/guides/${guide.id}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                <CardHeader>
                  <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full mb-3 w-fit">
                    {guide.category}
                  </span>
                  <h3 className="text-xl font-semibold text-black">
                    {guide.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {guide.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium text-sm">
                    Read guide 
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-4">Ready to Start Building?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Use our builder tool to select compatible components and get real-time compatibility feedback.
          </p>
          <Link 
            href="/builder"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Launch Builder
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}