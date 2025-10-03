import { Button, Card, CardHeader, CardContent, Input } from "@/components/ui";

export default function Home() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-6 tracking-tight">
            BikePartPicker 🚴‍♂️
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional-grade part selection, pricing, and compatibility guidance for 
            performance-focused bicycle builders.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <Card variant="elevated" className="p-6 flex-1">
            <CardHeader>
              <h2 className="text-2xl font-bold text-black">
                Precision Component Selection
              </h2>
              <p className="text-gray-600">
                Curated performance parts from leading manufacturers
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Input
                  label="Search Components"
                  placeholder="e.g., Shimano Dura-Ace, SRAM Red"
                />
                <div className="flex gap-3">
                  <Button variant="primary">Search Parts</Button>
                  <Button variant="outline">Browse Categories</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="p-6 flex-1">
            <CardHeader>
              <h2 className="text-2xl font-bold text-black">
                Advanced Compatibility Engine
              </h2>
              <p className="text-gray-600">Engineering-grade compatibility validation</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3 text-sm font-medium">
                  <div className="flex items-center text-success-600">
                    <span className="mr-3 text-lg">✓</span>
                    Frame & component standards
                  </div>
                  <div className="flex items-center text-success-600">
                    <span className="mr-3 text-lg">✓</span>
                    Drivetrain compatibility matrix
                  </div>
                  <div className="flex items-center text-success-600">
                    <span className="mr-3 text-lg">✓</span>
                    Wheel & brake system validation
                  </div>
                  <div className="flex items-center text-success-600">
                    <span className="mr-3 text-lg">✓</span>
                    Performance optimization alerts
                  </div>
                </div>
                <Button variant="secondary" className="w-full">
                  Launch Compatibility Tool
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 font-medium">
            Ready to build your dream machine? Let&apos;s engineer your perfect setup.
          </p>
        </div>
      </div>
    </div>
  );
}
