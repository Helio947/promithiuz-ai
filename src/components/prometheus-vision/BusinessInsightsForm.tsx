
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { generateBusinessInsights } from "@/utils/ai-service";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/types/prometheus-vision";

interface BusinessInsightsFormProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const BusinessInsightsForm = ({ setMessages }: BusinessInsightsFormProps) => {
  const [businessDescription, setBusinessDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleBusinessAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessDescription.trim()) return;

    setIsAnalyzing(true);
    try {
      const insights = await generateBusinessInsights(businessDescription);
      setMessages([
        {
          role: 'assistant',
          content: "Welcome! I've analyzed your business and here are my AI-powered recommendations:",
          id: Date.now().toString(),
          timestamp: new Date()
        },
        {
          role: 'assistant',
          content: insights,
          id: (Date.now() + 1).toString(),
          timestamp: new Date()
        }
      ]);
      setBusinessDescription('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze business. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-16">
      <form onSubmit={handleBusinessAnalysis} className="space-y-4">
        <div>
          <label htmlFor="business-description" className="block text-sm font-medium text-gray-700 mb-2">
            Tell me about your business or idea
          </label>
          <textarea
            id="business-description"
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            placeholder="Example: I run a small coffee shop and want to modernize my business with AI..."
            className="w-full min-h-[120px] p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            disabled={isAnalyzing}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isAnalyzing || !businessDescription.trim()}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Analyzing your business...
            </>
          ) : (
            "Get AI-Powered Insights"
          )}
        </Button>
      </form>
    </div>
  );
};

export default BusinessInsightsForm;
