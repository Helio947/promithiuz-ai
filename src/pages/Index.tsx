
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Documentation from "@/components/Documentation";
import analytics from "@/utils/analytics";
import ErrorBoundary from "@/components/ErrorBoundary";
import Onboarding from "@/components/Onboarding";
import Logo from "@/components/ui/Logo";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

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
