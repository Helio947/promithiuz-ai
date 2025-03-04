
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get("OPENAI_API_KEY");
    
    if (!openAIApiKey) {
      console.error("OpenAI API key is not configured");
      return new Response(
        JSON.stringify({ error: "OpenAI API key is not configured" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const { businessData } = await req.json();

    if (!businessData) {
      return new Response(
        JSON.stringify({ error: "Business data is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Business data received:", JSON.stringify(businessData));

    // Prepare the prompt for OpenAI
    const prompt = `
      Analyze the following business data and provide strategic insights focused on how AI tools could help optimize operations, reduce costs, and grow revenue:
      
      Business Data:
      ${JSON.stringify(businessData, null, 2)}
      
      Please provide:
      1. 3-5 key opportunities for automation or AI implementation
      2. Estimated time savings per week for each opportunity
      3. Estimated cost savings per month for each opportunity
      4. Recommended AI tools or approaches for each opportunity
      5. A 3-month implementation roadmap
      
      Format the response as JSON with these sections:
      {
        "opportunities": [
          {
            "title": "Opportunity title",
            "description": "Brief description",
            "timeSavingsWeekly": "X hours",
            "costSavingsMonthly": "$Y",
            "recommendedTools": ["Tool 1", "Tool 2"]
          }
        ],
        "roadmap": [
          {
            "month": 1,
            "focus": "What to focus on",
            "actions": ["Action 1", "Action 2"]
          }
        ],
        "summary": "Brief executive summary"
      }
    `;

    console.log("Sending request to OpenAI...");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a business analytics AI specializing in identifying opportunities for small businesses to leverage AI tools." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      return new Response(
        JSON.stringify({ error: `Error calling OpenAI API: ${response.status} ${response.statusText}` }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const data = await response.json();
    console.log("OpenAI response received");

    if (data.error) {
      console.error("OpenAI API error:", data.error);
      return new Response(
        JSON.stringify({ error: "Error generating business insights" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      console.error("Unexpected OpenAI response structure:", data);
      return new Response(
        JSON.stringify({ error: "Invalid response from OpenAI" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const contentText = data.choices[0].message.content;
    console.log("Content from OpenAI:", contentText);

    // Parse the JSON response
    try {
      // Look for JSON in the response, which might be wrapped in markdown code blocks
      let jsonText = contentText;
      const jsonMatch = contentText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        jsonText = jsonMatch[1];
      }
      
      // Try to find the JSON object in the text
      const jsonStart = jsonText.indexOf('{');
      const jsonEnd = jsonText.lastIndexOf('}');
      
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        jsonText = jsonText.substring(jsonStart, jsonEnd + 1);
      }
      
      console.log("Extracted JSON text:", jsonText);

      // Try to parse the JSON
      const insights = JSON.parse(jsonText);
      
      // Validate the insights structure
      if (!insights.opportunities || !Array.isArray(insights.opportunities) || 
          !insights.roadmap || !Array.isArray(insights.roadmap) || 
          !insights.summary) {
        throw new Error("Invalid insights structure");
      }
      
      return new Response(
        JSON.stringify(insights),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } catch (error) {
      console.error("Error parsing OpenAI response:", error);
      
      // Fallback response with placeholders if parsing fails
      const fallbackResponse = {
        opportunities: [
          {
            title: "Automated Customer Support",
            description: "Implement AI chatbots to handle routine customer inquiries",
            timeSavingsWeekly: "15 hours",
            costSavingsMonthly: "$600",
            recommendedTools: ["Dialogflow", "ChatGPT API", "Intercom"]
          },
          {
            title: "Data Entry Automation",
            description: "Use AI tools to automate repetitive data entry tasks",
            timeSavingsWeekly: "10 hours",
            costSavingsMonthly: "$400",
            recommendedTools: ["UiPath", "Zapier", "Microsoft Power Automate"]
          }
        ],
        roadmap: [
          {
            month: 1,
            focus: "Customer Service Enhancement",
            actions: ["Audit current customer service workflow", "Select AI chatbot solution", "Begin integration"]
          },
          {
            month: 2,
            focus: "Data Automation Implementation",
            actions: ["Identify repetitive data tasks", "Set up automation workflows", "Test and optimize"]
          },
          {
            month: 3,
            focus: "Training and Expansion",
            actions: ["Train team on new tools", "Expand AI usage to other departments", "Measure and report on ROI"]
          }
        ],
        summary: "Based on your business profile, implementing AI solutions could significantly reduce operational costs and improve efficiency. Focus on customer service automation and data entry automation for the highest immediate impact."
      };
      
      return new Response(
        JSON.stringify(fallbackResponse),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
  } catch (error) {
    console.error("Error in business-insights function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error: " + error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
