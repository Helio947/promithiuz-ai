
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BusinessInsightsForm from "@/components/prometheus-vision/BusinessInsightsForm";
import { useState } from "react";
import { Message } from "@/types/prometheus-vision";

const Hero = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      
      {/* Floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-12">
            <div className="mb-8 inline-block">
              <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full text-accent font-medium">
                AI Made Simple for Every Business
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent leading-tight">
              Slash Costs & Save Time with AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your friendly AI companion that helps you understand, implement, and profit from AI - no tech expertise needed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 animate-glow shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                Start Your AI Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Watch 2-Min Demo
              </Button>
            </div>

            {/* Business Insights Form */}
            <div className="max-w-2xl mx-auto mb-12">
              <BusinessInsightsForm setMessages={setMessages} />
            </div>
            
            {/* Features grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 text-left">
              {[
                {
                  title: "Easy Setup",
                  description: "Get started in minutes with our step-by-step guide"
                },
                {
                  title: "24/7 AI Assistant",
                  description: "Friendly chat support to answer all your questions"
                },
                {
                  title: "Visual Learning",
                  description: "Understanding AI through simple animations & examples"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="max-w-2xl mx-auto bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <blockquote className="text-lg italic text-muted-foreground mb-4">
                "I never thought AI could be this easy to understand and implement. This platform helped me automate my customer service and saved me 15 hours every week."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="Maria Rodriguez"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold">Maria Rodriguez</div>
                  <div className="text-sm text-muted-foreground">Small Business Owner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
