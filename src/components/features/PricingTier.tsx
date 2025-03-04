
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PayPalCheckout from "@/components/PayPalCheckout";
import PricingFeatureItem from "./PricingFeatureItem";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PricingFeature {
  name: string;
  description: string;
}

interface PricingTierProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  cta: string;
  popular: boolean;
}

const PricingTier = ({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  cta, 
  popular 
}: PricingTierProps) => {
  const [showPayPal, setShowPayPal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [session, setSession] = useState<any>(null);
  
  const handleButtonClick = async () => {
    setIsProcessing(true);
    
    // Check if user is logged in
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    
    if (!data.session) {
      toast.error("Please log in to subscribe to a plan");
      setIsProcessing(false);
      // Redirect to login page
      window.location.href = '/auth?redirect=pricing';
      return;
    }
    
    setIsProcessing(false);
    setShowPayPal(!showPayPal);
  };
  
  const handlePaymentSuccess = async (details: any) => {
    console.log(`Payment successful for ${name}:`, details);
    
    try {
      // Send the details to your backend to verify and record the payment
      const { error } = await supabase.functions.invoke('verify-subscription', {
        body: { 
          planName: name,
          subscriptionId: details.subscriptionID,
          userId: session?.user?.id
        }
      });
      
      if (error) throw error;
      
      toast.success(`You've successfully subscribed to the ${name} plan!`);
      setShowPayPal(false);
      
      // Refresh the page to update UI with new subscription status
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error verifying subscription:', error);
      toast.error('There was a problem activating your subscription. Please contact support.');
    }
  };

  return (
    <div 
      className={`
        relative bg-white rounded-xl border overflow-hidden transition-all duration-300
        ${popular 
          ? "border-primary shadow-lg md:-mt-4 md:mb-4" 
          : "border-gray-200 hover:border-primary/50 hover:shadow-md"
        }
      `}
    >
      {popular && (
        <div className="bg-primary text-white text-xs font-medium py-1 px-3 text-center">
          Most Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-gray-500 ml-1">{period}</span>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <PricingFeatureItem key={i} name={feature.name} description={feature.description} />
          ))}
        </ul>
        
        {!showPayPal ? (
          <Button 
            className={`w-full ${popular ? "bg-primary" : ""}`}
            variant={popular ? "default" : "outline"}
            onClick={handleButtonClick}
            disabled={isProcessing}
          >
            {isProcessing ? "Please wait..." : cta}
          </Button>
        ) : (
          <div className="space-y-3">
            <PayPalCheckout 
              amount={price} 
              planName={name}
              planPeriod={period}
              onSuccess={(details) => handlePaymentSuccess(details)}
              onError={() => setShowPayPal(false)}
            />
            <Button 
              variant="ghost" 
              className="w-full text-sm" 
              onClick={() => setShowPayPal(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingTier;
