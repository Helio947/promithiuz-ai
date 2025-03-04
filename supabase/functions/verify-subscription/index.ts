
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SubscriptionRequest {
  planName: string;
  subscriptionId: string;
  userId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const body: SubscriptionRequest = await req.json();
    const { planName, subscriptionId, userId } = body;

    if (!planName || !subscriptionId || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Verify the subscription with PayPal - in a production environment
    // you would make an API call to PayPal to verify the subscription
    // For now, we'll assume it's valid
    
    // For a real integration, you would use something like:
    // const paypalVerification = await fetch(`https://api.paypal.com/v1/billing/subscriptions/${subscriptionId}`, {
    //   headers: {
    //     'Authorization': `Bearer ${paypalToken}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    // const verificationData = await paypalVerification.json();
    
    // Calculate subscription dates
    const startDate = new Date();
    const endDate = new Date();
    
    // Set end date based on plan
    if (planName.toLowerCase() === "basic") {
      endDate.setMonth(endDate.getMonth() + 1); // 1 month
    } else if (planName.toLowerCase() === "business") {
      endDate.setMonth(endDate.getMonth() + 1); // 1 month
    }
    
    // Update user's subscription in the database
    const { data, error } = await supabaseClient
      .from("profiles")
      .update({
        subscription_tier: planName.toLowerCase(),
        subscription_status: "active",
        subscription_start_date: startDate.toISOString(),
        subscription_end_date: endDate.toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating subscription:", error);
      return new Response(
        JSON.stringify({ error: "Failed to update subscription" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Log the subscription for auditing
    console.log(`Subscription activated for user ${userId}: ${planName} - ${subscriptionId}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Subscription activated successfully",
        subscription: {
          id: subscriptionId,
          plan: planName,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
