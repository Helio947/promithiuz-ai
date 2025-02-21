
import { ArrowRight, Clock, DollarSign, Brain, Sparkles } from "lucide-react";
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
                Proven AI Impact for Your Business
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent leading-tight">
              Save 15+ Hours Weekly & Cut Costs by 40%
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our AI solutions deliver measurable results: automating tasks, reducing operational costs, and scaling your business efficiency.
            </p>

            {/* Key Metrics Grid */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <div className="flex justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">15.5hrs</h3>
                <p className="text-muted-foreground">Average Weekly Time Saved</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <div className="flex justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold mb-2">40%</h3>
                <p className="text-muted-foreground">Average Cost Reduction</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <div className="flex justify-center mb-4">
                  <Brain className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-3xl font-bold mb-2">89%</h3>
                <p className="text-muted-foreground">Task Automation Rate</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 animate-glow shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                Calculate Your AI Savings
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                View Success Stories
              </Button>
            </div>

            {/* Business Insights Form */}
            <div className="max-w-2xl mx-auto mb-12">
              <BusinessInsightsForm setMessages={setMessages} />
            </div>
            
            {/* Real Impact Examples */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 text-left">
              {[
                {
                  title: "Customer Service",
                  metric: "73% faster response time",
                  description: "AI chatbots handle 89% of common inquiries"
                },
                {
                  title: "Data Analysis",
                  metric: "95% time reduction",
                  description: "Automated reporting & insights generation"
                },
                {
                  title: "Process Automation",
                  metric: "$2,800 monthly savings",
                  description: "Streamlined operations & reduced manual work"
                }
              ].map((impact, index) => (
                <div key={index} className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">{impact.title}</h3>
                  </div>
                  <p className="text-2xl font-bold text-primary mb-2">{impact.metric}</p>
                  <p className="text-muted-foreground">{impact.description}</p>
                </div>
              ))}
            </div>

            {/* Case Study */}
            <div className="max-w-2xl mx-auto bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-4">Real Business Impact</h3>
                <div className="space-y-4">
                  <p className="text-lg">
                    "Using AI automation, we reduced our customer response time from 3 hours to 5 minutes, saved $4,200 monthly in operational costs, and increased customer satisfaction by 47%."
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <img 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                      alt="Sarah Chen"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">Sarah Chen</div>
                      <div className="text-sm text-muted-foreground">CEO, TechFlow Solutions</div>
                    </div>
                  </div>
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

