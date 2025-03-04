
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  onForgotPassword: () => void;
}

const LoginForm = ({ onForgotPassword }: LoginFormProps) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Make sure the component is fully loaded before showing the auth UI
    setLoading(false);
  }, []);
  
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Get Started Today</h2>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-sm text-gray-500">Loading authentication...</p>
        </div>
      ) : (
        <>
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(var(--color-primary))',
                    brandAccent: 'rgb(var(--color-secondary))'
                  }
                }
              },
              style: {
                button: {
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  padding: '0.625rem 1rem',
                },
                input: {
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  padding: '0.625rem 1rem',
                },
                message: {
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  padding: '0.625rem 1rem',
                  marginBottom: '1rem',
                },
                anchor: {
                  color: 'rgb(var(--color-primary))',
                },
              }
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/dashboard`}
          />
          <div className="mt-4 text-center">
            <button
              onClick={onForgotPassword}
              className="text-primary text-sm hover:underline"
            >
              Forgot your password?
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default LoginForm;
