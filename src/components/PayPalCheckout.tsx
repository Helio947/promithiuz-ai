
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/profile";

interface PayPalCheckoutProps {
  amount: string;
  planName: string;
  planPeriod: string;
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

const PayPalCheckout = ({ amount, planName, planPeriod, onSuccess, onError }: PayPalCheckoutProps) => {
  const [loaded, setLoaded] = useState(false);
  const [paypalButtonsRendered, setPaypalButtonsRendered] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [clientId, setClientId] = useState<string>('');

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    
    getSession();
  }, []);

  useEffect(() => {
    const getPayPalClientId = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-paypal-client-id');
        if (error) throw error;
        
        if (data && data.clientId) {
          setClientId(data.clientId);
        } else {
          console.error('No PayPal client ID returned');
          toast.error('Could not load payment provider. Please try again later.');
        }
      } catch (error) {
        console.error('Error getting PayPal client ID:', error);
        toast.error('Payment provider configuration error. Please try again later.');
      }
    };
    
    getPayPalClientId();
  }, []);

  useEffect(() => {
    if (!window.paypal && clientId) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=subscription`;
      script.async = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    } else if (window.paypal) {
      setLoaded(true);
    }
  }, [clientId]);

  useEffect(() => {
    if (loaded && !paypalButtonsRendered && window.paypal && session) {
      const paypalButtonsContainer = document.getElementById('paypal-buttons');
      
      if (paypalButtonsContainer) {
        paypalButtonsContainer.innerHTML = '';
        
        try {
          window.paypal.Buttons({
            style: {
              layout: 'vertical',
              color: 'blue',
              shape: 'rect',
              label: 'subscribe'
            },
            createSubscription: (data: any, actions: any) => {
              // Use environment variables or dynamic plan IDs in a production app
              const planId = planName.toLowerCase() === 'basic' ? 'P-BASIC123' : 'P-BUSINESS456';
              
              return actions.subscription.create({
                plan_id: planId,
                custom_id: session?.user?.id || 'anonymous'
              });
            },
            onApprove: async (data: any, actions: any) => {
              try {
                const subscriptionId = data.subscriptionID;
                
                // Verify subscription on the server
                const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-subscription', {
                  body: {
                    planName: planName.toLowerCase(),
                    subscriptionId,
                    userId: session?.user?.id
                  }
                });
                
                if (verifyError) throw verifyError;
                
                toast.success(`Successfully subscribed to ${planName} plan!`);
                
                if (onSuccess) {
                  onSuccess({
                    subscriptionID: data.subscriptionID,
                    planName,
                    planPeriod
                  });
                }
              } catch (err) {
                console.error('Error finalizing subscription:', err);
                toast.error('Payment completed but we had trouble updating your account. Please contact support.');
              }
            },
            onError: (err: any) => {
              toast.error('PayPal payment failed. Please try again.');
              console.error('PayPal Error:', err);
              if (onError) {
                onError(err);
              }
            }
          }).render(paypalButtonsContainer);
          
          setPaypalButtonsRendered(true);
        } catch (error) {
          console.error('Failed to render PayPal buttons:', error);
        }
      }
    }
  }, [loaded, paypalButtonsRendered, amount, planName, planPeriod, onSuccess, onError, session]);

  return (
    <div className="w-full space-y-4">
      <div className="text-sm text-gray-500 mb-2">
        Secure payment processing by PayPal
      </div>
      <div id="paypal-buttons" className="w-full min-h-[45px]"></div>
      {(!loaded || !clientId) && (
        <Button disabled className="w-full">
          Loading PayPal...
        </Button>
      )}
    </div>
  );
};

export default PayPalCheckout;
