import { Button, Card, CardHeader, CardContent, Input } from "@/components/ui";

export default function Home() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            BikePartPicker 🚴‍♂️
          </h1>
          <p className="text-xl text-gray-600">
            Build your perfect road bike with compatible parts from across the internet
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card variant="elevated" className="p-6">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">
                Component Selection
              </h2>
              <p className="text-gray-600">
                Choose from thousands of bike parts
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  label="Search parts"
                  placeholder="e.g., Shimano 105 groupset"
                />
                <div className="flex gap-2">
                  <Button variant="primary">Search</Button>
                  <Button variant="outline">Browse Categories</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="p-6">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">
                Compatibility Check
              </h2>
              <p className="text-gray-600">
                Ensure all parts work together
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  ✅ Frame compatibility<br/>
                  ✅ Drivetrain matching<br/>
                  ✅ Wheel standards<br/>
                  ✅ Brake compatibility
                </div>
                <Button variant="secondary" className="w-full">
                  View Compatibility Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Ready to start building? Let&apos;s find your perfect bike setup.
          </p>
        </div>
      </div>
    </div>
  );
}