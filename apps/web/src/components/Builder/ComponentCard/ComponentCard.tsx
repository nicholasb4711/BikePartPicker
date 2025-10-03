import { BuildComponent } from "@/app/utils/partUtils";
import { CheckIcon } from "@/components/ui";

interface ComponentCardProps {
  component: BuildComponent;
  isSelected: boolean;
  onSelect: (component: BuildComponent) => void;
}

export default function ComponentCard({ component, isSelected, onSelect }: ComponentCardProps) {
  return (
    <div
      className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={() => onSelect(component)}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-black">{component.name}</h4>
        <span className="text-lg font-bold text-blue-600">
          ${component.price.toLocaleString()}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-2">{component.brand}</p>
      
      <div className="flex flex-wrap gap-1 mb-2">
        {component.compatibility.map((compat) => (
          <span
            key={compat}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
          >
            {compat}
          </span>
        ))}
      </div>
      
      {isSelected && (
        <div className="mt-2 flex items-center text-blue-600">
          <CheckIcon className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">Selected</span>
        </div>
      )}
    </div>
  );
}
