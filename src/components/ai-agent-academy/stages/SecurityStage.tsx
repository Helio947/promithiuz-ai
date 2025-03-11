
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldAlert, Check, X } from "lucide-react";

interface SecurityStageProps {
  scenarios: Array<{
    situation: string;
    options: Array<{
      text: string;
      isCorrect: boolean;
    }>;
  }>;
  onComplete: () => void;
}

const SecurityStage = ({ scenarios, onComplete }: SecurityStageProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  
  const handleOptionSelect = (scenarioIndex: number, optionIndex: number) => {
    setSelectedOptions({
      ...selectedOptions,
      [scenarioIndex]: optionIndex
    });
    
    // Check if all scenarios have been answered correctly
    const updatedSelections = {
      ...selectedOptions,
      [scenarioIndex]: optionIndex
    };
    
    const allAnswered = scenarios.every((_, index) => typeof updatedSelections[index] !== "undefined");
    const allCorrect = scenarios.every((scenario, index) => {
      const selectedOption = updatedSelections[index];
      return typeof selectedOption !== "undefined" && scenario.options[selectedOption].isCorrect;
    });
    
    if (allAnswered && allCorrect) {
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };
  
  const isOptionSelected = (scenarioIndex: number, optionIndex: number) => {
    return selectedOptions[scenarioIndex] === optionIndex;
  };
  
  const isScenarioAnsweredCorrectly = (scenarioIndex: number) => {
    const selectedOption = selectedOptions[scenarioIndex];
    if (typeof selectedOption === "undefined") return false;
    return scenarios[scenarioIndex].options[selectedOption].isCorrect;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <ShieldCheck className="h-6 w-6 text-blue-600" />
        <div>
          <h3 className="font-medium text-blue-800">AI Security Matters</h3>
          <p className="text-sm text-blue-700">Protecting your data while using AI agents is essential for privacy and security.</p>
        </div>
      </div>
      
      {scenarios.map((scenario, scenarioIndex) => (
        <div key={scenarioIndex} className="space-y-3">
          <h4 className="font-medium">{scenario.situation}</h4>
          
          <div className="space-y-2">
            {scenario.options.map((option, optionIndex) => {
              const isSelected = isOptionSelected(scenarioIndex, optionIndex);
              
              return (
                <button
                  key={optionIndex}
                  onClick={() => handleOptionSelect(scenarioIndex, optionIndex)}
                  disabled={typeof selectedOptions[scenarioIndex] !== "undefined"}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    isSelected
                      ? option.isCorrect
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.text}</span>
                    {isSelected && (
                      option.isCorrect ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          
          {typeof selectedOptions[scenarioIndex] !== "undefined" && !isScenarioAnsweredCorrectly(scenarioIndex) && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <ShieldAlert className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Security Risk</p>
                <p className="text-red-700 text-sm">
                  This approach could expose your data unnecessarily. Always limit AI access to only what's needed.
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {Object.keys(selectedOptions).length === scenarios.length && 
       scenarios.every((_, index) => isScenarioAnsweredCorrectly(index)) && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800">Great job securing your AI agents!</h4>
          <p className="text-green-700">
            You've learned how to protect your data while using AI agents. Always be mindful of what data you share.
          </p>
        </div>
      )}
    </div>
  );
};

export default SecurityStage;
