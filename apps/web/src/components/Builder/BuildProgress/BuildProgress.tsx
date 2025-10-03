import { Card, CardHeader, CardContent, Button } from "@/components/ui";
import { buildSteps, sampleComponents, BuildComponent } from "@/app/utils/partUtils";
import ComponentCard from "../ComponentCard/ComponentCard";

interface BuildProgressProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  selectedComponents: Record<string, BuildComponent>;
  handleComponentSelect: (component: BuildComponent) => void;
}

export default function BuildProgress({
  currentStep,
  setCurrentStep,
  selectedComponents,
  handleComponentSelect,
}: BuildProgressProps) {
  const getCompletedSteps = () => {
    return buildSteps.filter((step) => selectedComponents[step.id]).length;
  };
  return (
    <>
      {/* Left Column - Build Steps */}
      <div className="lg:w-2/3">
        {/* Progress Bar */}
        <Card className="mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-black">Build Progress</h2>
            <span className="text-sm text-gray-600">
              {getCompletedSteps()} of {buildSteps.length} steps completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(getCompletedSteps() / buildSteps.length) * 100}%`,
              }}
            ></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {buildSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentStep === index
                    ? "bg-blue-500 text-white"
                    : selectedComponents[step.id]
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {selectedComponents[step.id] && "✓ "}
                {step.name}
              </button>
            ))}
          </div>
        </Card>

        {/* Current Step Content */}
        <Card className="p-6">
          <CardHeader>
            <h3 className="text-2xl font-bold text-black">
              {buildSteps[currentStep]?.name}
            </h3>
            <p className="text-gray-600">
              {buildSteps[currentStep]?.description}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleComponents[buildSteps[currentStep]?.id]?.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  isSelected={selectedComponents[component.category]?.id === component.id}
                  onSelect={handleComponentSelect}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous Step
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  setCurrentStep(
                    Math.min(buildSteps.length - 1, currentStep + 1)
                  )
                }
                disabled={currentStep === buildSteps.length - 1}
              >
                Next Step
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
