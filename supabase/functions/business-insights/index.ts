
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Types for the business analysis structure
interface BusinessOpportunity {
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
  opportunities: BusinessOpportunity[];
  roadmap: RoadmapStep[];
  summary: string;
}

// Function to generate a simple business analysis based on input data
function generateBusinessInsights(businessData: any): BusinessAnalysis {
  console.log("Generating insights for business type:", businessData.businessType);
  
  // Default fallback response in case of errors
  const fallbackResponse: BusinessAnalysis = {
    opportunities: [
      {
        title: "Customer Service Automation",
        description: "Implement AI chatbots to handle routine customer inquiries, reducing response time and freeing up staff.",
        timeSavingsWeekly: "15-20 hours",
        costSavingsMonthly: "$1,200-$1,800",
        recommendedTools: ["ChatGPT API", "Dialogflow", "Zendesk AI"]
      },
      {
        title: "Data Entry Automation",
        description: "Use AI tools to automatically process and enter data from documents and forms.",
        timeSavingsWeekly: "10-15 hours",
        costSavingsMonthly: "$800-$1,200",
        recommendedTools: ["Document AI", "UiPath", "Automation Anywhere"]
      }
    ],
    roadmap: [
      {
        month: 1,
        focus: "Assessment & Planning",
        actions: [
          "Audit current workflows and identify automation opportunities",
          "Select appropriate AI tools and solutions",
          "Develop implementation timeline and set measurable goals"
        ]
      },
      {
        month: 2,
        focus: "Implementation & Training",
        actions: [
          "Deploy AI chatbot for customer service",
          "Implement data entry automation tools",
          "Train staff on new AI-enhanced workflows"
        ]
      },
      {
        month: 3,
        focus: "Optimization & Expansion",
        actions: [
          "Analyze results and optimize AI implementations",
          "Expand AI capabilities to additional business areas",
          "Develop long-term AI integration strategy"
        ]
      }
    ],
    summary: "Implementing AI solutions could save your business approximately 25-35 hours weekly and $2,000-$3,000 monthly by automating routine tasks and enhancing customer service capabilities."
  };
  
  try {
    // Extract relevant business data with fallbacks to prevent errors
    const businessType = businessData.businessType || "Unknown";
    const employees = businessData.employees || 10;
    const customerServiceReps = businessData.customerServiceReps || 3;
    const responseTime = businessData.responseTime || 30;
    const monthlyTickets = businessData.monthlyTickets || 500;
    const hourlyLabor = businessData.hourlyLabor || 25;
    
    // Calculate potential savings
    const customerServiceSavingsHours = Math.round(monthlyTickets * responseTime * 0.6 / 60);
    const customerServiceSavingsCost = Math.round(customerServiceSavingsHours * hourlyLabor);
    const dataProcessingSavingsHours = Math.round(employees * 5);
    const dataProcessingSavingsCost = Math.round(dataProcessingSavingsHours * hourlyLabor * 0.8);
    
    // Generate tailored business analysis
    const businessAnalysis: BusinessAnalysis = {
      opportunities: [
        {
          title: "Customer Service AI Assistant",
          description: `Implement an AI assistant to handle routine ${businessType} inquiries and support tickets automatically.`,
          timeSavingsWeekly: `${Math.round(customerServiceSavingsHours/4)} hours`,
          costSavingsMonthly: `$${customerServiceSavingsCost}`,
          recommendedTools: ["ChatGPT Integration", "Customer Service AI", "Knowledge Base Automation"]
        },
        {
          title: "Workflow Automation",
          description: `Automate repetitive tasks in your ${businessType} business with AI workflow tools.`,
          timeSavingsWeekly: `${Math.round(dataProcessingSavingsHours/4)} hours`,
          costSavingsMonthly: `$${dataProcessingSavingsCost}`,
          recommendedTools: ["Process Mining", "Workflow AI", "Document Processing"]
        },
        {
          title: "Data Analysis & Insights",
          description: `Use AI to analyze customer data and provide actionable insights for your ${businessType} business.`,
          timeSavingsWeekly: `${Math.round(employees * 2)} hours`,
          costSavingsMonthly: `$${Math.round(employees * 2 * hourlyLabor * 4)}`,
          recommendedTools: ["Business Intelligence AI", "Predictive Analytics", "Customer Insight Engine"]
        }
      ],
      roadmap: [
        {
          month: 1,
          focus: "Assessment & Initial Implementation",
          actions: [
            `Audit current ${businessType} workflows and identify top automation candidates`,
            "Deploy initial AI customer service assistant for simple inquiries",
            "Establish baseline metrics for measuring ROI"
          ]
        },
        {
          month: 2,
          focus: "Expansion & Integration",
          actions: [
            "Expand AI capabilities to handle more complex customer interactions",
            `Implement workflow automation for key ${businessType} processes`,
            "Begin staff training on working alongside AI tools"
          ]
        },
        {
          month: 3,
          focus: "Optimization & Strategic Planning",
          actions: [
            "Analyze initial results and optimize AI implementations",
            "Deploy data analysis tools to uncover new business insights",
            `Develop long-term AI strategy specific to ${businessType} industry needs`
          ]
        }
      ],
      summary: `Based on your ${businessType} business profile with ${employees} employees and ${customerServiceReps} customer service representatives, implementing AI solutions could save approximately ${Math.round((customerServiceSavingsHours + dataProcessingSavingsHours)/4)} hours weekly and $${Math.round((customerServiceSavingsCost + dataProcessingSavingsCost))} monthly through automation and enhanced efficiency.`
    };
    
    return businessAnalysis;
  } catch (error) {
    console.error("Error generating business insights:", error);
    return fallbackResponse;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    console.log("Received business data:", JSON.stringify(requestData));
    
    // Validate input
    if (!requestData || !requestData.businessData) {
      throw new Error("Missing business data in request");
    }
    
    // Generate insights
    const insights = generateBusinessInsights(requestData.businessData);
    
    // Return insights as JSON
    return new Response(JSON.stringify(insights), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error in business-insights function:", error.message);
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        error: "Failed to generate business insights", 
        message: error.message,
        // Simple fallback response for frontend resilience
        opportunities: [{
          title: "AI Automation Opportunity",
          description: "Implement AI to automate routine tasks in your business.",
          timeSavingsWeekly: "10-15 hours",
          costSavingsMonthly: "$800-$1,200",
          recommendedTools: ["AI Assistant", "Workflow Automation"]
        }],
        roadmap: [{
          month: 1,
          focus: "Getting Started",
          actions: ["Identify automation opportunities", "Select AI tools", "Begin implementation"]
        }],
        summary: "AI implementation could significantly reduce costs and improve efficiency in your business."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
