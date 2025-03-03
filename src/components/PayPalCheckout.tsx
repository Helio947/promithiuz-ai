
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PayPalCheckoutProps {
  amount: string;
  planName: string;
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

const PayPalCheckout = ({ amount, planName, onSuccess, onError }: PayPalCheckoutProps) => {
  const [loaded, setLoaded] = useState(false);
  const [paypalButtonsRendered, setPaypalButtonsRendered] = useState(false);

  useEffect(() => {
    // Load the PayPal JS SDK if it's not already loaded
    if (!window.paypal) {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=test&currency=USD';
      script.async = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    } else {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Render PayPal buttons once the SDK is loaded
    if (loaded && !paypalButtonsRendered && window.paypal) {
      const paypalButtonsContainer = document.getElementById('paypal-buttons');
      
      if (paypalButtonsContainer) {
        // Clear any existing buttons
        paypalButtonsContainer.innerHTML = '';
        
        try {
          window.paypal.Buttons({
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: `${planName} Subscription`,
                    amount: {
                      currency_code: 'USD',
                      value: amount.replace('$', '')
                    }
                  }
                ]
              });
            },
            onApprove: async (data: any, actions: any) => {
              const order = await actions.order.capture();
              toast.success(`Payment completed! Transaction ID: ${order.id}`);
              if (onSuccess) {
                onSuccess(order);
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
  }, [loaded, paypalButtonsRendered, amount, planName, onSuccess, onError]);

  return (
    <div className="w-full space-y-4">
      <div className="text-sm text-gray-500 mb-2">
        Secure payment processing by PayPal
      </div>
      <div id="paypal-buttons" className="w-full min-h-[45px]"></div>
      {!loaded && (
        <Button disabled className="w-full">
          Loading PayPal...
        </Button>
      )}
    </div>
  );
};

export default PayPalCheckout;
