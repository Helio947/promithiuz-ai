
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Documentation from "@/components/Documentation";
import analytics from "@/utils/analytics";
import ErrorBoundary from "@/components/ErrorBoundary";
import Onboarding from "@/components/Onboarding";
import Logo from "@/components/ui/Logo";
import { Eye, MessageSquare, Sword, Bot } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleFeatureClick = (route: string) => {
    // Temporarily bypass authentication check
    navigate(route);
    
    // Original authentication logic - commented out
    /*
    if (!isAuthenticated) {
      toast.info("Please log in to access this feature");
      navigate("/auth");
      return;
    }
    navigate(route);
    */
  };

  useEffect(() => {
    // Initialize analytics
    analytics.init({ debug: true });
    
    // Track page view
    analytics.trackPageView('/');
    
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    
    if (!hasSeenOnboarding) {
      // Show onboarding after a short delay
      const timer = setTimeout(() => {
        setShowOnboarding(true);
        // Mark that the user has seen onboarding
        localStorage.setItem('hasSeenOnboarding', 'true');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
    
    // Pre-load PayPal SDK for faster checkout experience
    const loadPayPalScript = () => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=test&currency=USD';
      script.async = true;
      document.head.appendChild(script);
    };
    
    // Load PayPal script when user scrolls to pricing section
    const handleScroll = () => {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200) {
          loadPayPalScript();
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <div className="relative">
          <Header />
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <Logo size="lg" />
          </div>
        </div>
        
        {/* Feature Icons Bar */}
        <div className="w-full bg-white shadow-sm py-3 px-4 sticky top-16 z-10">
          <div className="container mx-auto flex justify-center items-center space-x-12">
            <button 
              onClick={() => handleFeatureClick("/prometheus-vision")}
              className="flex flex-col items-center group transition-all"
              aria-label="Promithiuz AI Vision"
            >
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Vision</span>
            </button>
            
            <button 
              onClick={() => handleFeatureClick("/prompt-codex")}
              className="flex flex-col items-center group transition-all"
              aria-label="Prompt Codex"
            >
              <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Codex</span>
            </button>
            
            <button 
              onClick={() => handleFeatureClick("/forged-sword")}
              className="flex flex-col items-center group transition-all"
              aria-label="Forged Sword"
            >
              <div className="p-3 rounded-full bg-amber-100 group-hover:bg-amber-200 transition-colors">
                <Sword className="h-6 w-6 text-amber-600" />
              </div>
              <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Sword</span>
            </button>
            
            <button 
              onClick={() => handleFeatureClick("/ai-agent-academy")}
              className="flex flex-col items-center group transition-all"
              aria-label="AI Agent Academy"
            >
              <div className="p-3 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors">
                <Bot className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Academy</span>
            </button>
          </div>
        </div>
        
        <Hero />
        <Features />
        <About />
        <Documentation />
        <Onboarding open={showOnboarding} setOpen={setShowOnboarding} />
      </div>
    </ErrorBoundary>
  );
};

export default Index;
