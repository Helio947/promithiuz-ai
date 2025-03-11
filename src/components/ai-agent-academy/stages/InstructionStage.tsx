
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, CheckCircle } from "lucide-react";

interface InstructionStageProps {
  exercise?: {
    task: string;
    goodExample: string;
    badExample: string;
  };
  onComplete: () => void;
}

const InstructionStage = ({ exercise, onComplete }: InstructionStageProps) => {
  const [instruction, setInstruction] = useState("");
  const [feedback, setFeedback] = useState<"none" | "good" | "improve">("none");
  const [completed, setCompleted] = useState(false);
  
  if (!exercise) {
    return <div>Exercise not available</div>;
  }
  
  const handleSubmit = () => {
    if (instruction.trim().length < 15) {
      setFeedback("improve");
      return;
    }
    
    // Simple heuristic: good instructions should be specific and detailed
    if (
      instruction.length > 30 && 
      (instruction.includes("focus") || instruction.includes("specific") || instruction.includes("points"))
    ) {
      setFeedback("good");
      setCompleted(true);
    } else {
      setFeedback("improve");
    }
  };
  
  const handleContinue = () => {
    if (completed) {
      onComplete();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{exercise.task}</h3>
        <p className="text-gray-600">Writing clear instructions is key to getting good results from AI agents.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h4 className="font-medium flex items-center gap-2 text-red-700 mb-2">
            <ThumbsDown className="h-4 w-4" />
            Not Effective
          </h4>
          <p className="text-sm text-red-800 italic">"{exercise.badExample}"</p>
          <div className="mt-2 text-xs text-red-700">
            Too vague, lacks specific requirements, and doesn't provide context.
          </div>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-medium flex items-center gap-2 text-green-700 mb-2">
            <ThumbsUp className="h-4 w-4" />
            Effective
          </h4>
          <p className="text-sm text-green-800 italic">"{exercise.goodExample}"</p>
          <div className="mt-2 text-xs text-green-700">
            Clear, specific, and includes details about format and focus areas.
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <label className="block font-medium">
          Now you try! Write an instruction for an AI agent:
        </label>
        <Textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="Write your instruction here..."
          className="min-h-[100px]"
        />
        
        {feedback === "good" && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium">Great instruction!</p>
              <p className="text-green-700 text-sm">Your instruction is clear, specific, and would likely get good results from an AI agent.</p>
            </div>
          </div>
        )}
        
        {feedback === "improve" && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 font-medium">This could be improved</p>
            <p className="text-amber-700 text-sm">Try to be more specific about what you want the AI to focus on, the format you'd like, and provide context.</p>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <Button onClick={handleSubmit} disabled={instruction.trim().length === 0}>
            Submit
          </Button>
          
          {completed && (
            <Button onClick={handleContinue} variant="outline">
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructionStage;
