
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

interface WorkflowStageProps {
  flowElements?: Array<{
    id: string;
    type: string;
    label: string;
  }>;
  onComplete: () => void;
}

const WorkflowStage = ({ flowElements = [], onComplete }: WorkflowStageProps) => {
  const [workflow, setWorkflow] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);
  
  // Simple workflow simulation
  const handleAddToWorkflow = (elementId: string) => {
    // Simple validation: start -> categorize -> decision -> (notify) -> draft -> send
    const newWorkflow = [...workflow, elementId];
    setWorkflow(newWorkflow);
    
    // Validate workflow
    const isValidFlow = validateWorkflow(newWorkflow);
    setIsValid(isValidFlow);
    
    if (isValidFlow && newWorkflow.length >= 5) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };
  
  const validateWorkflow = (flow: string[]) => {
    // This is a simplified validation
    if (flow.length === 0) return false;
    
    // Must start with trigger
    if (flow[0] !== "trigger") return false;
    
    // Must end with send (if long enough)
    if (flow.length >= 5 && flow[flow.length - 1] !== "send") return false;
    
    return true;
  };
  
  const resetWorkflow = () => {
    setWorkflow([]);
    setIsValid(false);
  };
  
  const getElementColor = (type: string) => {
    switch (type) {
      case "start": return "bg-green-100 border-green-300 text-green-800";
      case "process": return "bg-blue-100 border-blue-300 text-blue-800";
      case "decision": return "bg-amber-100 border-amber-300 text-amber-800";
      case "end": return "bg-purple-100 border-purple-300 text-purple-800";
      default: return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Build an Email Processing Workflow</h3>
        <p className="text-gray-600">
          Connect AI agents to create an automated workflow. Click elements in the correct order.
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {flowElements.map((element) => (
          <button
            key={element.id}
            onClick={() => handleAddToWorkflow(element.id)}
            disabled={workflow.includes(element.id)}
            className={`p-3 rounded-lg border text-center transition-all ${
              workflow.includes(element.id)
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-md"
            } ${getElementColor(element.type)}`}
          >
            {element.label}
          </button>
        ))}
      </div>
      
      {workflow.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Your Workflow:</h4>
          <div className="flex flex-wrap items-center gap-2">
            {workflow.map((elementId, index) => {
              const element = flowElements.find(e => e.id === elementId);
              if (!element) return null;
              
              return (
                <div key={index} className="flex items-center">
                  <div className={`px-3 py-1 rounded-lg text-sm ${getElementColor(element.type)}`}>
                    {element.label}
                  </div>
                  {index < workflow.length - 1 && (
                    <ArrowRightIcon className="h-4 w-4 mx-1" />
                  )}
                </div>
              );
            })}
          </div>
          
          {isValid ? (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">Valid workflow!</p>
              <p className="text-green-700 text-sm">
                {workflow.length >= 5
                  ? "Your email processing workflow is complete. Great job!"
                  : "Your workflow is valid so far. Keep adding steps."}
              </p>
            </div>
          ) : (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 font-medium">Workflow needs adjustment</p>
              <p className="text-amber-700 text-sm">Remember that workflows typically start with a trigger and end with an action.</p>
            </div>
          )}
          
          <Button onClick={resetWorkflow} variant="outline">
            Reset Workflow
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkflowStage;
