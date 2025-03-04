
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

    // Get PayPal access token
    const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
    const clientSecret = Deno.env.get("PAYPAL_CLIENT_SECRET");
    
    if (!clientId || !clientSecret) {
      console.error("PayPal credentials not configured");
      return new Response(
        JSON.stringify({ error: "Payment provider not properly configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Get PayPal OAuth token
    const tokenResponse = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${btoa(`${clientId}:${clientSecret}`)}`
      },
      body: "grant_type=client_credentials"
    });
    
    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.text();
      console.error("PayPal OAuth error:", tokenError);
      return new Response(
        JSON.stringify({ error: "Failed to authenticate with payment provider" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    
    // Verify the subscription with PayPal
    const verificationResponse = await fetch(`https://api-m.paypal.com/v1/billing/subscriptions/${subscriptionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    });
    
    if (!verificationResponse.ok) {
      const verificationError = await verificationResponse.text();
      console.error("PayPal verification error:", verificationError);
      return new Response(
        JSON.stringify({ error: "Failed to verify subscription" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    const subscriptionData = await verificationResponse.json();
    console.log("Subscription data:", subscriptionData);
    
    if (subscriptionData.status !== "ACTIVE" && subscriptionData.status !== "APPROVED") {
      return new Response(
        JSON.stringify({ error: "Subscription is not active" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Calculate subscription dates
    const startDate = new Date();
    const endDate = new Date();
    
    // Set end date based on plan and billing cycle from PayPal
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
