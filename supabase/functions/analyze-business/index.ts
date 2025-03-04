
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper functions for business analysis
function calculateTimeSavings(businessData: any) {
  const {
    totalEmployees = 10,
    customerServiceReps = 3,
    averageResponseTime = 20,
    monthlyTickets = 500,
  } = businessData;
  
  // Calculate customer service time savings
  let csTimeSavings = (monthlyTickets * averageResponseTime * 0.6) / 60; // 60% reduction in time, converted to hours
  
  // Calculate admin time savings based on total employees
  let adminTimeSavings = totalEmployees * 2; // Assume 2 hours saved per employee
  
  // Calculate total monthly time savings
  let totalTimeSavings = csTimeSavings + adminTimeSavings;
  
  return {
    csTimeSavings,
    adminTimeSavings,
    totalTimeSavings
  };
}

function calculateCostSavings(businessData: any, timeSavings: any) {
  const { averageHourlyCost = 25 } = businessData;
  
  // Calculate direct cost savings
  let directCostSavings = timeSavings.totalTimeSavings * averageHourlyCost;
  
  // Calculate productivity gains (20% increase in productivity)
  let productivityGains = directCostSavings * 0.2;
  
  // Calculate error reduction savings (15% of direct savings)
  let errorReductionSavings = directCostSavings * 0.15;
  
  // Calculate total monthly cost savings
  let totalCostSavings = directCostSavings + productivityGains + errorReductionSavings;
  
  return {
    directCostSavings,
    productivityGains,
    errorReductionSavings,
    totalCostSavings
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const requestData = await req.json();
    console.log("Received business data for analysis:", JSON.stringify(requestData));
    
    const businessData = requestData.businessData || {};
    
    // Perform business analysis
    const timeSavings = calculateTimeSavings(businessData);
    const costSavings = calculateCostSavings(businessData, timeSavings);
    
    // Create the analysis response
    const analysis = {
      monthlySavings: {
        time: Math.round(timeSavings.totalTimeSavings),
        cost: Math.round(costSavings.totalCostSavings),
      },
      breakdown: {
        customerService: {
          timeReduction: `${Math.round(timeSavings.csTimeSavings)} hours/month`,
          costReduction: `$${Math.round(timeSavings.csTimeSavings * (businessData.averageHourlyCost || 25))}`,
        },
        administration: {
          timeReduction: `${Math.round(timeSavings.adminTimeSavings)} hours/month`,
          costReduction: `$${Math.round(timeSavings.adminTimeSavings * (businessData.averageHourlyCost || 25))}`,
        },
        productivity: {
          improvement: "20%",
          value: `$${Math.round(costSavings.productivityGains)}`,
        },
        errorReduction: {
          improvement: "15%",
          value: `$${Math.round(costSavings.errorReductionSavings)}`,
        },
      },
      projections: {
        firstYear: {
          timeSaved: `${Math.round(timeSavings.totalTimeSavings * 12)} hours`,
          costSaved: `$${Math.round(costSavings.totalCostSavings * 12)}`,
          roi: `${Math.round((costSavings.totalCostSavings * 12) / 10000 * 100)}%`, // Assuming $10K implementation cost
        },
        threeYear: {
          timeSaved: `${Math.round(timeSavings.totalTimeSavings * 36)} hours`,
          costSaved: `$${Math.round(costSavings.totalCostSavings * 36)}`,
          roi: `${Math.round((costSavings.totalCostSavings * 36) / 10000 * 100)}%`,
        },
      },
      recommendations: [
        {
          title: "Customer Service Automation",
          description: `Implement AI chatbots to handle the ${Math.round(monthlyTickets * 0.4)} routine queries you receive monthly.`,
          impact: "High",
          implementationTime: "1-2 months",
        },
        {
          title: "Document Processing",
          description: "Use AI to automate data extraction and processing from documents.",
          impact: "Medium",
          implementationTime: "2-3 months",
        },
        {
          title: "Workflow Automation",
          description: "Implement process automation for repetitive administrative tasks.",
          impact: "High",
          implementationTime: "1-3 months",
        },
      ],
    };
    
    console.log("Returning analysis:", JSON.stringify(analysis));
    
    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-business function:", error);
    
    return new Response(
      JSON.stringify({
        error: "Failed to analyze business data",
        message: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
