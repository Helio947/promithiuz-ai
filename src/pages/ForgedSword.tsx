
import { useEffect, useCallback } from "react";
import MainContent from "@/components/forged-sword/MainContent";
import Overview from "@/components/forged-sword/Overview";
import Header from "@/components/Header";
import ROICalculator from "@/components/forged-sword/ROICalculator";
import { textToTextContent } from "@/data/forged-sword-content";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import analytics from "@/utils/analytics";

const ForgedSword = () => {
  const { toast } = useToast();
  const { isAuthenticated, profile } = useAuth();

  useEffect(() => {
    // Track page view
    analytics.trackEvent("page_view", { page: "forged_sword" });
  }, []);

  const handleUnlock = useCallback(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to unlock premium features.",
      });
      return;
    }
    
    const isPremium = profile?.subscription_tier && profile.subscription_tier !== "free";
    
    if (!isPremium) {
      toast({
        title: "Premium Access",
        description: "This feature requires a premium subscription. Upgrade your plan to access it.",
      });
    } else {
      toast({
        title: "Premium Access",
        description: "This feature is coming soon for premium users!",
      });
    }
    
    analytics.trackEvent("premium_feature_click", { 
      feature: "unlock_advanced_content",
      subscriptionTier: profile?.subscription_tier || "none"
    });
  }, [toast, isAuthenticated, profile]);

  const handleMasteryClick = useCallback(() => {
    analytics.trackEvent("feature_click", { feature: "mastery_program" });
    
    toast({
      title: "Mastery Program",
      description: "Starting your AI mastery journey soon!",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Overview 
          title={textToTextContent.overview.title}
          description={textToTextContent.overview.description}
          onUnlock={handleUnlock}
          onMasteryClick={handleMasteryClick}
        />
        
        <div className="max-w-4xl mx-auto mb-12">
          <ROICalculator />
        </div>

        <MainContent 
          modules={textToTextContent.modules}
          aiTools={[]}
          strategies={[]}
          bestPractices={textToTextContent.bestPractices}
          systemsApproach={textToTextContent.systemsApproach}
        />
      </main>
    </div>
  );
};

export default ForgedSword;
