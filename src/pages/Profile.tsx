import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { Loader2 } from "lucide-react";
import { Profile } from "@/types/profile";
import { useAuth } from "@/contexts/AuthContext";

const ProfilePage = () => {
  const { toast } = useToast();
  const { user, profile: authProfile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    job_title: '',
  });

  useEffect(() => {
    if (authProfile) {
      setProfile(authProfile);
      setFormData({
        full_name: authProfile.full_name || '',
        company_name: authProfile.company_name || '',
        job_title: authProfile.job_title || '',
      });
      setLoading(false);
    } else if (user) {
      fetchProfile();
    } else {
      window.location.href = '/auth';
    }
  }, [user, authProfile]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setProfile(data as Profile);
        setFormData({
          full_name: data.full_name || '',
          company_name: data.company_name || '',
          job_title: data.job_title || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      console.log("Updating profile with data:", formData);
      console.log("User ID:", user?.id);
      
      if (!user?.id) {
        throw new Error("User ID is missing. Please sign in again.");
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          company_name: formData.company_name,
          job_title: formData.job_title
        })
        .eq('id', user.id);
      
      if (error) {
        console.error("Supabase update error:", error);
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Your profile has been updated.',
      });
      
      await refreshProfile();
      
      setProfile(prev => prev ? { ...prev, ...formData } : null);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: `Failed to update profile: ${error.message || 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCancelSubscription = async () => {
    if (!user) return;
    
    if (confirm("Are you sure you want to cancel your subscription? This will take effect at the end of your billing period.")) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ subscription_status: 'canceled' })
          .eq('id', user.id);
        
        if (error) throw error;
        
        toast({
          title: 'Subscription Canceled',
          description: 'Your subscription has been canceled and will end on your next billing date.',
        });
        
        setProfile(prev => prev ? { ...prev, subscription_status: 'canceled' } : null);
      } catch (error) {
        console.error('Error canceling subscription:', error);
        toast({
          title: 'Error',
          description: 'Failed to cancel subscription.',
          variant: 'destructive',
        });
      }
    }
  };

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
      <div className="container max-w-4xl py-10 overflow-y-auto h-full pb-20">
        <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6 sticky top-0 z-10 bg-background">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal information and company details.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      value={user?.email || ''} 
                      disabled 
                    />
                    <p className="text-xs text-gray-500">
                      Your email cannot be changed.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input 
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input 
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="job_title">Job Title</Label>
                    <Input 
                      id="job_title"
                      name="job_title"
                      value={formData.job_title}
                      onChange={handleInputChange}
                      placeholder="Enter your job title"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
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
                  Manage your subscription and billing information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Current Plan</h3>
                    <p className="text-sm text-gray-500">
                      {profile?.subscription_tier === 'free' ? 'Free Tier' : 
                       profile?.subscription_tier === 'basic' ? 'Basic Plan' : 'Business Plan'}
                    </p>
                  </div>
                  <Badge variant={profile?.subscription_tier === 'free' ? 'outline' : 'default'} 
                    className={profile?.subscription_tier === 'business' ? 'bg-primary' : ''}>
                    {profile?.subscription_tier === 'free' ? 'Free' : 
                     profile?.subscription_tier === 'basic' ? 'Basic' : 'Business'}
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Subscription Status</h3>
                  <Badge variant={profile?.subscription_status === 'active' ? 'default' : 'destructive'}
                    className={profile?.subscription_status === 'active' ? 'bg-green-600' : ''}>
                    {profile?.subscription_status || 'Inactive'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Start Date</h3>
                    <p className="text-sm">{formatDate(profile?.subscription_start_date)}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">End Date</h3>
                    <p className="text-sm">{formatDate(profile?.subscription_end_date)}</p>
                  </div>
                </div>
                
                {profile?.subscription_status === 'active' && profile?.subscription_tier !== 'free' && (
                  <div className="pt-2">
                    <Button variant="outline" onClick={handleCancelSubscription}>
                      Cancel Subscription
                    </Button>
                  </div>
                )}
                
                {(profile?.subscription_tier === 'free' || profile?.subscription_status === 'canceled') && (
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Upgrade Your Plan</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get unlimited AI queries, advanced analytics, and priority support.
                    </p>
                    <Button onClick={() => window.location.href = '/#pricing'}>View Plans</Button>
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <h3 className="font-medium mb-2">Payment History</h3>
                  {profile?.subscription_tier !== 'free' ? (
                    <div className="text-sm">
                      <p className="mb-2">Last payment: {formatDate(profile?.subscription_start_date)}</p>
                      <p>Next billing date: {formatDate(profile?.subscription_end_date)}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No payment history available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>
                  Track your usage of Promithiuz AI services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">AI Queries</h3>
                    <p className="text-3xl font-bold mt-1">{profile?.ai_queries_used || 0}</p>
                    {profile?.subscription_tier === 'free' && (
                      <p className="text-xs text-gray-500 mt-1">Limit: 50 per month</p>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">AI Generations</h3>
                    <p className="text-3xl font-bold mt-1">{profile?.ai_generations_used || 0}</p>
                    {profile?.subscription_tier === 'free' && (
                      <p className="text-xs text-gray-500 mt-1">Limit: 20 per month</p>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Workflows Created</h3>
                    <p className="text-3xl font-bold mt-1">{profile?.workflows_created || 0}</p>
                    {profile?.subscription_tier === 'free' && (
                      <p className="text-xs text-gray-500 mt-1">Limit: 5 active workflows</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Usage History</h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-gray-500">Detailed usage history is available for premium users.</p>
                    {profile?.subscription_tier === 'free' && (
                      <Button variant="outline" className="mt-2">Upgrade to Premium</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProfilePage;
