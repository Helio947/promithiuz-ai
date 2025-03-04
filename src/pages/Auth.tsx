
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Header from "@/components/Header";
import { Brain, TrendingUp, Clock, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      setSuccess("Check your email for a password reset link!");
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <Header />
      <div className="pt-24 container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                AI for Smart Business
              </h1>
              <p className="text-lg text-gray-600">
                Join thousands of businesses saving time and money with our AI tools.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">15+ Hours Saved Weekly</h3>
                  <p className="text-sm text-gray-600">
                    Automate repetitive tasks and focus on growing your business
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">40% Cost Reduction</h3>
                  <p className="text-sm text-gray-600">
                    Our clients see significant savings in operational costs
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Start in Minutes</h3>
                  <p className="text-sm text-gray-600">
                    No complicated setup - just sign up and get started immediately
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            {isResetPassword ? (
              <div className="space-y-6">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setIsResetPassword(false);
                      setError("");
                      setSuccess("");
                    }}
                    className="mr-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-2xl font-bold">Reset Password</h2>
                </div>
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="bg-green-50 text-green-600 p-4 rounded-md text-sm">
                    {success}
                  </div>
                )}
                
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={loading}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Reset Instructions"}
                  </Button>
                </form>
              </div>
            ) : (
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
                    onClick={() => setIsResetPassword(true)}
                    className="text-primary text-sm hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
