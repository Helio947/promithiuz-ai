
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface InteractiveExampleProps {
  title: string;
  description: string;
  defaultPrompt: string;
  exampleOutput: string;
  onTry?: (prompt: string) => void;
}

const InteractiveExample = ({ 
  title, 
  description, 
  defaultPrompt, 
  exampleOutput,
  onTry 
}: InteractiveExampleProps) => {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTry = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please enter a prompt before trying the example.",
      });
      return;
    }
    
    setIsLoading(true);
    setOutput(null);
    
    try {
      // Call the onTry callback if provided
      if (onTry) {
        await onTry(prompt);
      }
      
      // Simulate processing for now
      setTimeout(() => {
        setOutput(exampleOutput);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error processing example:", error);
      toast({
        title: "Processing Error",
        description: "Failed to process your example. Please try again.",
      });
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPrompt(defaultPrompt);
    setOutput(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Your Prompt</label>
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="min-h-[100px]"
            disabled={isLoading}
          />
        </div>

        {output ? (
          <div>
            <label className="block text-sm font-medium mb-2">Output</label>
            <div className="p-4 bg-gray-50 rounded-md text-gray-600 min-h-[100px]">
              {output}
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-2">Example Output</label>
            <div className="p-4 bg-gray-50 rounded-md text-gray-600 min-h-[100px] opacity-70">
              {exampleOutput}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={handleTry}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? "Processing..." : output ? "Try Again" : "Try it out"}
          </Button>
          
          {output && (
            <Button 
              onClick={handleReset}
              variant="outline"
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveExample;
