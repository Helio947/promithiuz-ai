
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CalculatorInputs } from "@/utils/ai-calculator";

interface BusinessInsightsProps {
  inputs: CalculatorInputs;
}

interface Opportunity {
  title: string;
  description: string;
  timeSavingsWeekly: string;
  costSavingsMonthly: string;
  recommendedTools: string[];
}

interface RoadmapStep {
  month: number;
  focus: string;
  actions: string[];
}

interface BusinessAnalysis {
  opportunities: Opportunity[];
  roadmap: RoadmapStep[];
  summary: string;
}

export const BusinessInsights = ({ inputs }: BusinessInsightsProps) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<BusinessAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateInsights = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Only proceed if we have at least some basic business information
      if (!inputs.businessType || inputs.businessType.trim() === "") {
        throw new Error("Please provide your business type before generating insights");
      }
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/business-insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          businessData: {
            businessType: inputs.businessType,
            employees: inputs.totalEmployees,
            customerServiceReps: inputs.customerServiceReps,
            responseTime: inputs.averageResponseTime,
            monthlyTickets: inputs.monthlyTickets,
            hourlyLabor: inputs.averageHourlyCost
          }
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Error ${response.status}: Failed to generate business insights`);
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Validate the response structure
      if (!data.opportunities || !Array.isArray(data.opportunities) || 
          !data.roadmap || !Array.isArray(data.roadmap) || 
          !data.summary) {
        console.error("Invalid response structure:", data);
        throw new Error("Invalid insights data structure received");
      }

      setInsights(data);
      toast.success("Business insights generated successfully!");
    } catch (err) {
      console.error("Error generating business insights:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      toast.error("Failed to generate business insights");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4 mt-6">
        <h3 className="text-xl font-semibold">Analyzing Your Business</h3>
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-gray-600">Generating business insights...</p>
          <p className="text-gray-500 text-sm mt-2">This may take up to 30 seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4 mt-6">
        <h3 className="text-xl font-semibold">Business Insights Analysis</h3>
        <div className="bg-red-50 p-4 rounded-md border border-red-100">
          <p className="text-red-600">{error}</p>
        </div>
        <Button onClick={generateInsights} className="w-full">
          Try Again
        </Button>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4 mt-6">
        <h3 className="text-xl font-semibold">Business Insights Analysis</h3>
        <p className="text-gray-600">
          Get a personalized AI-powered analysis of your business based on the information you provided. 
          Discover opportunities for efficiency, cost savings, and growth with AI implementation.
        </p>
        <Button onClick={generateInsights} className="w-full">
          Generate Business Insights
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6 mt-6">
      <h3 className="text-xl font-semibold">AI-Powered Business Insights</h3>
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
        <h4 className="font-medium text-blue-800 mb-2">Executive Summary</h4>
        <p className="text-blue-700">{insights.summary}</p>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Key Opportunities</h4>
        {insights.opportunities.map((opportunity, index) => (
          <div key={index} className="bg-green-50 p-4 rounded-md border border-green-100">
            <h5 className="font-medium text-green-800">{opportunity.title}</h5>
            <p className="text-gray-700 mt-1">{opportunity.description}</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div>
                <p className="text-xs text-gray-500">Weekly Time Savings</p>
                <p className="font-medium text-green-700">{opportunity.timeSavingsWeekly}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Monthly Cost Savings</p>
                <p className="font-medium text-green-700">{opportunity.costSavingsMonthly}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-500">Recommended Tools</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {opportunity.recommendedTools.map((tool, toolIndex) => (
                  <span key={toolIndex} className="bg-white px-2 py-1 rounded text-xs border border-green-200">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Implementation Roadmap</h4>
        <div className="space-y-3">
          {insights.roadmap.map((step, index) => (
            <div key={index} className="bg-purple-50 p-4 rounded-md border border-purple-100">
              <h5 className="font-medium text-purple-800">Month {step.month}: {step.focus}</h5>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {step.actions.map((action, actionIndex) => (
                  <li key={actionIndex} className="text-gray-700 text-sm">{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <Button onClick={generateInsights} variant="outline" className="w-full">
        Generate New Insights
      </Button>
    </div>
  );
};
