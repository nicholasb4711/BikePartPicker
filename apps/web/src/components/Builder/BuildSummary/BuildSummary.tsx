import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { BuildComponent } from "@/app/utils/partUtils";
import CompatibilityCheck from "../CompatibilityCheck/CompatibilityCheck";

interface BuildSummaryProps {
  selectedComponents: Record<string, BuildComponent>;
  getTotalPrice: () => number;
}

export default function BuildSummary({
  selectedComponents,
  getTotalPrice,
}: BuildSummaryProps) {
  const hasComponents = Object.keys(selectedComponents).length > 0;
  const hasMultipleComponents = Object.keys(selectedComponents).length > 1;

  return (
    <div className="lg:w-1/3">
      <div className="sticky top-4">
        <Card className="p-6">
          <CardHeader>
            <h3 className="text-xl font-semibold text-black">Build Summary</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hasComponents ? (
                Object.entries(selectedComponents).map(
                  ([category, component]) => (
                    <div key={category} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-black">
                          {component.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {component.brand}
                        </p>
                      </div>
                      <p className="font-semibold text-blue-600">
                        ${component.price.toLocaleString()}
                      </p>
                      <p>Test</p>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Start selecting components to see your build summary
                </p>
              )}
            </div>

            {hasComponents && (
              <>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-black">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Button variant="primary" className="w-full">
                    Save Build
                  </Button>
                  <Button variant="outline" className="w-full">
                    Share Build
                  </Button>
                  <Button variant="secondary" className="w-full">
                    Find Retailers
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {hasMultipleComponents && <CompatibilityCheck />}
      </div>
    </div>
  );
}
