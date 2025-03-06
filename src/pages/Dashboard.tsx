import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Clock, DollarSign, TrendingUp, Eye } from "lucide-react";
import { toast } from "sonner";
import { incrementProfileMetric } from "@/utils/profile-utils";
import { Profile } from "@/types/profile";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
          
        if (error) throw error;
        
        setProfile(data as Profile);
        
        // Increment ai_queries_used for demo purposes
        await incrementProfileMetric(session.user.id, 'ai_queries_used', 1);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Couldn't load your profile data");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Welcome, {profile?.full_name || "User"}</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">AI Queries Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-purple-500" />
                  <span className="text-2xl font-bold">{profile?.ai_queries_used || 0}</span>
                </div>
                <Button size="sm" onClick={() => navigate("/prometheus-vision")}>Use AI</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Workflows Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="text-2xl font-bold">{profile?.workflows_created || 0}</span>
                </div>
                <Button size="sm" onClick={() => navigate("/forge")}>Create Workflow</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Subscription Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                  <span className="text-md font-bold capitalize">{profile?.subscription_tier || "Free"}</span>
                </div>
                <Button size="sm" onClick={() => navigate("/profile")}>Manage</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button variant="outline" onClick={() => navigate("/prometheus-vision")} className="justify-start">
                <Eye className="h-4 w-4 mr-2" /> Prometheus Vision
              </Button>
              <Button variant="outline" onClick={() => navigate("/forge")} className="justify-start">
                <Clock className="h-4 w-4 mr-2" /> The Forge
              </Button>
              <Button variant="outline" onClick={() => navigate("/prompt-codex")} className="justify-start">
                <TrendingUp className="h-4 w-4 mr-2" /> Prompt Codex
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Usage Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Your current plan: <span className="font-bold capitalize">{profile?.subscription_tier || "Free"}</span>
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>AI Queries Used</span>
                  <span className="font-medium">{profile?.ai_queries_used || 0} / {profile?.subscription_tier === 'free' ? '50' : 'Unlimited'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>AI Generations</span>
                  <span className="font-medium">{profile?.ai_generations_used || 0} / {profile?.subscription_tier === 'free' ? '20' : 'Unlimited'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Workflows</span>
                  <span className="font-medium">{profile?.workflows_created || 0} / {profile?.subscription_tier === 'free' ? '5' : 'Unlimited'}</span>
                </div>
              </div>
              
              {profile?.subscription_tier === 'free' && (
                <Button className="w-full mt-6" onClick={() => navigate("/#pricing")}>
                  Upgrade to Premium
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
