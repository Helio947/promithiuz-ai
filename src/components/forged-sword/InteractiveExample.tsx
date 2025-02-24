
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface InteractiveExampleProps {
  title: string;
  description: string;
  defaultPrompt: string;
  exampleOutput: string;
}

const InteractiveExample = ({ 
  title, 
  description, 
  defaultPrompt, 
  exampleOutput 
}: InteractiveExampleProps) => {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTry = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Coming Soon",
        description: "This interactive feature will be available in the next update!",
      });
    }, 1000);
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
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Example Output</label>
          <div className="p-4 bg-gray-50 rounded-md text-gray-600 min-h-[100px]">
            {exampleOutput}
          </div>
        </div>

        <Button 
          onClick={handleTry}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Processing..." : "Try it out"}
        </Button>
      </div>
    </div>
  );
};

export default InteractiveExample;
