
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

interface Profile {
  id: string;
  email: string;
  full_name: string;
  company_name: string | null;
  job_title: string | null;
  subscription_tier: string;
  subscription_status: string;
  ai_queries_used: number;
  ai_generations_used: number;
  workflows_created: number;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    company_name: "",
    job_title: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }
      
      fetchProfile(session.user.id);
    };

    checkAuth();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || "",
          company_name: data.company_name || "",
          job_title: data.job_title || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) return;
    
    try {
      setUpdating(true);
      
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          company_name: formData.company_name,
          job_title: formData.job_title,
        })
        .eq("id", profile.id);

      if (error) {
        throw error;
      }

      toast.success("Profile updated successfully");
      
      // Refresh profile data
      fetchProfile(profile.id);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
        <Header />
        <div className="pt-24 container mx-auto px-4 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <Header />
      <div className="pt-24 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="usage">Usage Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal and company information.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleUpdateProfile}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        value={profile?.email || ""} 
                        disabled 
                      />
                      <p className="text-sm text-muted-foreground">
                        Email cannot be changed
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input 
                        id="full_name" 
                        name="full_name"
                        value={formData.full_name} 
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company_name">Company Name</Label>
                      <Input 
                        id="company_name" 
                        name="company_name"
                        value={formData.company_name} 
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job_title">Job Title</Label>
                      <Input 
                        id="job_title" 
                        name="job_title"
                        value={formData.job_title} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline" 
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={updating}
                    >
                      {updating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Update Profile'
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="subscription">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Details</CardTitle>
                  <CardDescription>
                    Manage your subscription plan and billing information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-lg capitalize">
                          {profile?.subscription_tier || "Free"} Plan
                        </h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          Status: {profile?.subscription_status || "Active"}
                        </p>
                      </div>
                      <Button
                        onClick={() => navigate("/forged-sword")}
                      >
                        {profile?.subscription_tier === "free" ? "Upgrade Plan" : "Manage Plan"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                  <CardDescription>
                    Monitor your platform usage and limits.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold">
                          {profile?.ai_queries_used || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">AI Queries Used</div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold">
                          {profile?.ai_generations_used || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">AI Generations Used</div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="text-2xl font-bold">
                          {profile?.workflows_created || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">Workflows Created</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
