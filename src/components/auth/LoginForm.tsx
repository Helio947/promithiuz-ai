
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

interface LoginFormProps {
  onForgotPassword: () => void;
}

const LoginForm = ({ onForgotPassword }: LoginFormProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Get Started Today</h2>
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
          }
        }}
        providers={[]}
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
  );
};

export default LoginForm;
