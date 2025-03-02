
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Header from "@/components/Header";
import { Brain, TrendingUp, Clock } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) navigate("/dashboard");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) navigate("/dashboard");
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
