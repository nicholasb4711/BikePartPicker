"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardContent } from "@/components/ui";

interface BuildComponent {
  id: string;
  name: string;
  category: string;
  price: number;
  brand: string;
  compatibility: string[];
  image?: string;
}

interface BuildStep {
  id: string;
  name: string;
  description: string;
  required: boolean;
  completed: boolean;
}

export default function Build() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedComponents, setSelectedComponents] = useState<Record<string, BuildComponent>>({});

  const buildSteps: BuildStep[] = [
    { id: "frame", name: "Frame", description: "Choose your bike frame", required: true, completed: false },
    { id: "groupset", name: "Groupset", description: "Select drivetrain components", required: true, completed: false },
    { id: "wheels", name: "Wheels", description: "Pick your wheelset", required: true, completed: false },
    { id: "cockpit", name: "Cockpit", description: "Handlebars, stem, and seatpost", required: true, completed: false },
    { id: "accessories", name: "Accessories", description: "Pedals, saddle, and extras", required: false, completed: false },
  ];

  const sampleComponents: Record<string, BuildComponent[]> = {
    frame: [
      { id: "frame-1", name: "Specialized Tarmac SL8", category: "frame", price: 3200, brand: "Specialized", compatibility: ["shimano", "sram"] },
      { id: "frame-2", name: "Trek Émonda SLR", category: "frame", price: 2800, brand: "Trek", compatibility: ["shimano", "sram"] },
      { id: "frame-3", name: "Canyon Ultimate CF SLX", category: "frame", price: 2400, brand: "Canyon", compatibility: ["shimano", "sram"] },
    ],
    groupset: [
      { id: "groupset-1", name: "Shimano Dura-Ace Di2", category: "groupset", price: 2800, brand: "Shimano", compatibility: ["shimano"] },
      { id: "groupset-2", name: "SRAM Red eTap AXS", category: "groupset", price: 2600, brand: "SRAM", compatibility: ["sram"] },
      { id: "groupset-3", name: "Shimano Ultegra Di2", category: "groupset", price: 1800, brand: "Shimano", compatibility: ["shimano"] },
    ],
    wheels: [
      { id: "wheels-1", name: "Zipp 404 Firecrest", category: "wheels", price: 1600, brand: "Zipp", compatibility: ["shimano", "sram"] },
      { id: "wheels-2", name: "ENVE SES 4.5", category: "wheels", price: 2200, brand: "ENVE", compatibility: ["shimano", "sram"] },
      { id: "wheels-3", name: "DT Swiss ARC 1100", category: "wheels", price: 1400, brand: "DT Swiss", compatibility: ["shimano", "sram"] },
    ],
  };

  const handleComponentSelect = (component: BuildComponent) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component.category]: component
    }));
  };

  const getTotalPrice = () => {
    return Object.values(selectedComponents).reduce((total, component) => total + component.price, 0);
  };

  const getCompletedSteps = () => {
    return buildSteps.filter(step => selectedComponents[step.id]).length;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">Build Your Dream Bike</h1>
          <p className="text-lg text-gray-600">
            Configure your perfect road bike with professional-grade components
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
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
                  style={{ width: `${(getCompletedSteps() / buildSteps.length) * 100}%` }}
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
                    {selectedComponents[step.id] && "✓ "}{step.name}
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
                    <div
                      key={component.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedComponents[component.category]?.id === component.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleComponentSelect(component)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-black">{component.name}</h4>
                        <span className="text-lg font-bold text-blue-600">
                          ${component.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{component.brand}</p>
                      <div className="flex flex-wrap gap-1">
                        {component.compatibility.map((compat) => (
                          <span
                            key={compat}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {compat}
                          </span>
                        ))}
                      </div>
                      {selectedComponents[component.category]?.id === component.id && (
                        <div className="mt-2 flex items-center text-blue-600">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium">Selected</span>
                        </div>
                      )}
                    </div>
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
                    onClick={() => setCurrentStep(Math.min(buildSteps.length - 1, currentStep + 1))}
                    disabled={currentStep === buildSteps.length - 1}
                  >
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Build Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-4">
              <Card className="p-6">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-black">Build Summary</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(selectedComponents).map(([category, component]) => (
                      <div key={category} className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-black">{component.name}</p>
                          <p className="text-sm text-gray-600">{component.brand}</p>
                        </div>
                        <p className="font-semibold text-blue-600">
                          ${component.price.toLocaleString()}
                        </p>
                      </div>
                    ))}
                    
                    {Object.keys(selectedComponents).length === 0 && (
                      <p className="text-gray-500 text-center py-8">
                        Start selecting components to see your build summary
                      </p>
                    )}
                  </div>

                  {Object.keys(selectedComponents).length > 0 && (
                    <>
                      <div className="border-t border-gray-200 mt-4 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-black">Total</span>
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

              {/* Compatibility Check */}
              {Object.keys(selectedComponents).length > 1 && (
                <Card className="p-6 mt-4">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-black">Compatibility Check</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-green-600">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">All components compatible</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Your selected components work perfectly together
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
