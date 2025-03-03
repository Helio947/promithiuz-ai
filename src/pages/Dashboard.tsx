
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CreditCard, Settings, Sparkles, MessageSquare, Brain, Sword, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState('basic'); // basic, business, enterprise
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }
      
      setUser(session.user);
      // In a real app, you would fetch the user's subscription from your database
      setLoading(false);
    };
    
    getUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleUpgrade = (plan) => {
    // In a real app, this would navigate to a payment page or open a payment modal
    toast({
      title: "Coming Soon",
      description: `Upgrade to ${plan} plan will be available soon!`,
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]">
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Welcome back</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Plan:</span>
                    <span className="text-sm font-bold capitalize">{subscription}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <span className="text-sm text-green-500 font-medium">Active</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            </div>

            {subscription !== "enterprise" && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Upgrade Your Plan</CardTitle>
                  <CardDescription>
                    Get more features and AI capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {subscription === "basic" && (
                    <Button 
                      onClick={() => handleUpgrade("business")} 
                      className="w-full bg-gradient-to-r from-primary to-secondary"
                    >
                      <CreditCard className="mr-2 h-4 w-4" /> Upgrade to Business
                    </Button>
                  )}
                  <Button 
                    onClick={() => handleUpgrade("enterprise")} 
                    variant="outline" 
                    className="w-full"
                  >
                    <Settings className="mr-2 h-4 w-4" /> Enterprise Plan
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <Tabs defaultValue="tools">
              <TabsList className="grid w-full md:w-[400px] grid-cols-3">
                <TabsTrigger value="tools">AI Tools</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tools" className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold">Your AI Toolkit</h2>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-gradient-to-br from-primary/5 to-purple-50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Brain className="h-5 w-5 text-primary" />
                        </div>
                        {subscription !== "basic" && (
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {subscription === "enterprise" ? "Premium" : "Pro"}
                          </span>
                        )}
                      </div>
                      <CardTitle className="mt-4">Promithiuz Vision</CardTitle>
                      <CardDescription>
                        AI-driven insights for your business
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={() => navigate("/prometheus-vision")} 
                        className="w-full"
                      >
                        Launch Tool
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-secondary/5 to-purple-50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="bg-secondary/10 p-2 rounded-lg">
                          <Sparkles className="h-5 w-5 text-secondary" />
                        </div>
                        {subscription === "basic" && (
                          <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                            Basic
                          </span>
                        )}
                      </div>
                      <CardTitle className="mt-4">The Forge</CardTitle>
                      <CardDescription>
                        Create custom AI workflows
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={() => navigate("/forge")} 
                        className="w-full"
                      >
                        Launch Tool
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-green-50 to-blue-50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <MessageSquare className="h-5 w-5 text-blue-500" />
                        </div>
                        {subscription === "basic" && (
                          <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                            Basic
                          </span>
                        )}
                      </div>
                      <CardTitle className="mt-4">Prompt Engine</CardTitle>
                      <CardDescription>
                        Business-ready AI prompts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={() => navigate("/prompt-engine")} 
                        className="w-full"
                      >
                        Launch Tool
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                          <Sword className="h-5 w-5 text-white" />
                        </div>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          Premium
                        </span>
                      </div>
                      <CardTitle className="mt-4">Forged Sword</CardTitle>
                      <CardDescription>
                        Premium AI expertise
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {subscription === "enterprise" ? (
                        <Button 
                          onClick={() => navigate("/forged-sword")} 
                          className="w-full"
                        >
                          Launch Tool
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleUpgrade("enterprise")} 
                          variant="outline" 
                          className="w-full"
                        >
                          Upgrade to Access
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="usage" className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold">Your Usage</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>AI Usage Statistics</CardTitle>
                    <CardDescription>
                      Your usage data for the current billing period
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">AI Queries</span>
                          <span className="text-sm font-medium">32 / 100</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "32%" }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">AI Generations</span>
                          <span className="text-sm font-medium">15 / 50</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-secondary rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Custom Workflows</span>
                          <span className="text-sm font-medium">2 / 5</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="results" className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold">Your Results</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Business Impact</CardTitle>
                    <CardDescription>
                      Estimated impact based on your usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="text-primary h-5 w-5" />
                          <span>Time Saved</span>
                        </div>
                        <span className="font-bold">8.5 hrs/week</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="text-green-500 h-5 w-5" />
                          <span>Cost Reduction</span>
                        </div>
                        <span className="font-bold">$1,240/month</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="text-secondary h-5 w-5" />
                          <span>Efficiency Gain</span>
                        </div>
                        <span className="font-bold">32%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
