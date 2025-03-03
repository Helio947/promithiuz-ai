
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, BookOpen, FileText, Code, Terminal } from "lucide-react";

const Documentation = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-8 left-8 rounded-full shadow-lg z-50 bg-white"
          aria-label="Documentation"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md overflow-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Promithiuz AI Documentation
          </SheetTitle>
        </SheetHeader>
        
        <Tabs defaultValue="getting-started">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="getting-started" className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Welcome to Promithiuz AI
              </h3>
              <p className="text-gray-600">
                Promithiuz AI helps small businesses leverage artificial intelligence to save time, 
                reduce costs, and grow their business. This guide will help you get started.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Step 1: Create an Account</h4>
              <p className="text-gray-600">
                Start by creating an account to access all features and track your usage.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Step 2: Explore the Platform</h4>
              <p className="text-gray-600">
                Take a tour of our main features:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Promithiuz Vision for business insights</li>
                <li>The Forge for building AI workflows</li>
                <li>Prompt Engine for creating effective prompts</li>
                <li>Forged Sword for premium AI strategies</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Step 3: Set Up Your Profile</h4>
              <p className="text-gray-600">
                Complete your profile to get personalized recommendations and insights.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Key Features
              </h3>
              <p className="text-gray-600">
                Discover what Promithiuz AI can do for your business:
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Promithiuz Vision</h4>
              <p className="text-gray-600">
                Ask questions about your business data and get AI-powered insights. Upload reports, 
                sales data, or customer feedback for analysis.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">The Forge</h4>
              <p className="text-gray-600">
                Build custom AI workflows using our visual editor. Combine AI components to automate 
                tasks without writing code.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Prompt Engine</h4>
              <p className="text-gray-600">
                Create, share, and discover effective prompts for common business tasks. 
                Save time with pre-built prompts.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Forged Sword (Premium)</h4>
              <p className="text-gray-600">
                Access advanced AI strategies and training modules designed specifically 
                for small businesses. Calculate your ROI from using AI.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="faq" className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                Frequently Asked Questions
              </h3>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">What subscription plans do you offer?</h4>
              <p className="text-gray-600">
                We offer Basic, Business, and Enterprise plans. Each plan includes different 
                features and usage limits to fit businesses of all sizes.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Is my data secure?</h4>
              <p className="text-gray-600">
                Yes, we take data security seriously. Your data is encrypted, and we never share 
                it with third parties without your permission.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">How can I upgrade my subscription?</h4>
              <p className="text-gray-600">
                You can upgrade your subscription anytime from your dashboard. Go to Settings > 
                Subscription to view available plans.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Do you offer a free trial?</h4>
              <p className="text-gray-600">
                Yes, all new users get a 14-day free trial of our Business plan to explore 
                all features before deciding on a subscription.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default Documentation;
