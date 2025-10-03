import { Card, CardHeader, CardContent, CheckIcon } from "@/components/ui";

export default function CompatibilityCheck() {
  return (
    <Card className="p-6 mt-4">
      <CardHeader>
        <h3 className="text-lg font-semibold text-black">Compatibility Check</h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-green-600">
          <CheckIcon className="w-5 h-5 mr-2" />
          <span className="font-medium">All components compatible</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Your selected components work perfectly together
        </p>
      </CardContent>
    </Card>
  );
}
