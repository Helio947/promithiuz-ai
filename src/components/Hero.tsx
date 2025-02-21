
import { ArrowRight, Clock, DollarSign, Brain, Sparkles, BarChart, Users, ShieldCheck, Building2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Message } from "@/types/prometheus-vision";
import { CostCalculator } from "./ai-calculator/CostCalculator";

const Hero = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showCalculator, setShowCalculator] = useState(false);
  
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
        <div className="max-w-5xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-12">
            <div className="mb-8 inline-block">
              <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full text-accent font-medium">
                Real AI Impact for Small Businesses
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent leading-tight">
              Save 15+ Hours Weekly & Cut Costs by 40%
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Small businesses using AI save 520-1,560 hours yearly and reduce costs by $10,000-$50,000 annually.
            </p>

            {/* Key Business Areas Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform hover:scale-105 transition-transform">
                <div className="flex justify-center mb-4">
                  <MessageSquare className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-green-500">80%</p>
                  <p className="text-muted-foreground">Inquiries Automated</p>
                  <p className="text-xl font-semibold text-primary">$2,000/mo saved</p>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform hover:scale-105 transition-transform">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Social Media</h3>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-green-500">416hrs</p>
                  <p className="text-muted-foreground">Saved Yearly</p>
                  <p className="text-xl font-semibold text-primary">$1,500/mo saved</p>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform hover:scale-105 transition-transform">
                <div className="flex justify-center mb-4">
                  <BarChart className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Inventory Management</h3>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-green-500">70%</p>
                  <p className="text-muted-foreground">Stockout Reduction</p>
                  <p className="text-xl font-semibold text-primary">$20K/yr extra revenue</p>
                </div>
              </div>
            </div>

            {/* Detailed Metrics Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6">Time Savings Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { area: "Content Creation", hours: 8, icon: <Users className="text-purple-500" /> },
                    { area: "Customer Support", hours: 30, icon: <MessageSquare className="text-blue-500" /> },
                    { area: "Inventory Management", hours: 5, icon: <Building2 className="text-green-500" /> },
                  ].map((item) => (
                    <div key={item.area} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.area}</span>
                      </div>
                      <span className="font-bold">{item.hours}hrs/week</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6">Cost Reduction Impact</h3>
                <div className="space-y-4">
                  {[
                    { area: "Manual Labor", savings: 2000, icon: <Clock className="text-primary" /> },
                    { area: "Automation", savings: 1500, icon: <Brain className="text-secondary" /> },
                    { area: "Loss Prevention", savings: 450, icon: <ShieldCheck className="text-green-500" /> },
                  ].map((item) => (
                    <div key={item.area} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.area}</span>
                      </div>
                      <span className="font-bold">${item.savings}/mo</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Single centered button */}
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 animate-glow shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                onClick={() => setShowCalculator(true)}
              >
                AI Calculator
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CostCalculator 
        open={showCalculator} 
        onOpenChange={setShowCalculator}
      />
    </div>
  );
};

export default Hero;
