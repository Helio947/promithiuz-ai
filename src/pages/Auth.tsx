
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { toast } from "sonner";
import BenefitsSection from "@/components/auth/BenefitsSection";
import LoginForm from "@/components/auth/LoginForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get the intended redirect URL from location state, or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    // If user is already authenticated, redirect them
    if (isAuthenticated && !authLoading) {
      navigate(from, { replace: true });
    }
    
    setLoading(false);
  }, [isAuthenticated, authLoading, navigate, from]);

  const handlePasswordReset = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (error: any) {
      console.error("Password reset error:", error);
      return { 
        success: false, 
        error: error.message || "Failed to send reset instructions" 
      };
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
