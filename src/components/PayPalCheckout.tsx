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
              const cleanAmount = amount.replace('$', '');
              return actions.subscription.create({
                plan_id: import.meta.env.VITE_PAYPAL_PLAN_ID || 'P-TEST',
                custom_id: session?.user?.id || 'anonymous'
              });
            },
            onApprove: async (data: any, actions: any) => {
              try {
                const subscriptionEnd = new Date();
                subscriptionEnd.setMonth(subscriptionEnd.getMonth() + (planPeriod === 'per month' ? 1 : 12));
                
                const { error } = await supabase
                  .from('profiles')
                  .update({
                    subscription_tier: planName.toLowerCase(),
                    subscription_status: 'active',
                    subscription_start_date: new Date().toISOString(),
                    subscription_end_date: subscriptionEnd.toISOString(),
                  })
                  .eq('id', session?.user?.id);
                
                if (error) throw error;
                
                toast.success(`Successfully subscribed to ${planName} plan!`);
                if (onSuccess) {
                  onSuccess({
                    subscriptionID: data.subscriptionID,
                    planName,
                    planPeriod
                  });
                }
              } catch (err) {
                console.error('Error updating subscription:', err);
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

  const handleUpdateProfileAfterPayment = async (userId: string, planDetails: {
    tier: string;
    status: string;
    startDate: string;
    endDate: string;
  }) => {
    if (!userId) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_tier: planDetails.tier,
          subscription_status: planDetails.status,
          subscription_start_date: planDetails.startDate,
          subscription_end_date: planDetails.endDate
        })
        .eq('id', userId);
      
      if (error) throw error;
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

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
