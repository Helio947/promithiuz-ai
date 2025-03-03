
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Documentation from "@/components/Documentation";
import analytics from "@/utils/analytics";
import ErrorBoundary from "@/components/ErrorBoundary";
import Onboarding from "@/components/Onboarding";

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
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Header />
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
