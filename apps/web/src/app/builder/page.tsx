"use client";

import { useState } from "react";
import { BuildComponent } from "@/app/utils/partUtils";
import BuildProgress from "@/components/Builder/BuildProgress/BuildProgress";
import BuildSummary from "@/components/Builder/BuildSummary/BuildSummary";

export default function Builder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedComponents, setSelectedComponents] = useState<Record<string, BuildComponent>>({});

  const handleComponentSelect = (component: BuildComponent) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component.category]: component
    }));
  };

  const getTotalPrice = () => {
    return Object.values(selectedComponents).reduce((total, component) => total + component.price, 0);
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
          <BuildProgress 
            currentStep={currentStep} 
            setCurrentStep={setCurrentStep} 
            selectedComponents={selectedComponents} 
            handleComponentSelect={handleComponentSelect}
          />
          <BuildSummary
            selectedComponents={selectedComponents}
            getTotalPrice={getTotalPrice}
          />    
        </div>
      </div>
    </div>
  );
}
