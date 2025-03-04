
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { toast } from "sonner";
import BenefitsSection from "@/components/auth/BenefitsSection";
import LoginForm from "@/components/auth/LoginForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const Auth = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [isResetPassword, setIsResetPassword] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) navigate("/dashboard");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session) {
          toast.success("Signed in successfully!");
          navigate("/dashboard");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handlePasswordReset = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <Header />
      <div className="pt-24 container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <BenefitsSection />

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            {isResetPassword ? (
              <ResetPasswordForm 
                onBack={() => setIsResetPassword(false)}
                onSubmit={handlePasswordReset}
              />
            ) : (
              <LoginForm onForgotPassword={() => setIsResetPassword(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
