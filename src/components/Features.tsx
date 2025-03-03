
import { TooltipProvider } from "@/components/ui/tooltip";
import FeatureCard from "./features/FeatureCard";
import MetricsSection from "./features/MetricsSection";
import PricingSection from "./features/PricingSection";
import { features } from "./features/FeaturesData";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();
  
  return (
    <TooltipProvider>
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="mb-4 inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
              Proven AI Solutions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Steal the Fire of AI</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              While others struggle with AI, your business can gain a significant advantage with our battle-tested tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto mb-24 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl border border-primary/10">
            <h3 className="text-2xl font-bold mb-6 text-center">Why Businesses Choose Promithiuz AI</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Time-Saving Automation</h4>
                    <p className="text-gray-600 text-sm">Automate repetitive tasks with AI to save 15+ hours weekly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Reduced Operational Costs</h4>
                    <p className="text-gray-600 text-sm">Typically cuts operational expenses by 30-40% within 90 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Enhanced Customer Experience</h4>
                    <p className="text-gray-600 text-sm">AI-powered responses in seconds, 24/7 availability</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Competitive Advantage</h4>
                    <p className="text-gray-600 text-sm">Stay ahead in your industry with cutting-edge AI capabilities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">No Technical Expertise Required</h4>
                    <p className="text-gray-600 text-sm">User-friendly tools designed for small business owners</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Personalized Implementation</h4>
                    <p className="text-gray-600 text-sm">Customized AI strategies for your specific business needs</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button 
                onClick={() => navigate("/auth")}
                className="bg-primary text-white px-6 py-6 h-auto text-lg"
              >
                Start Your AI Transformation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <MetricsSection />
          <PricingSection />
          
          <div className="max-w-4xl mx-auto mt-24 border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-center">Implementation Roadmap</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Assessment & Strategy</h4>
                  <p className="text-gray-600">We analyze your business workflows to identify AI opportunities with the highest ROI potential.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Tool Selection & Setup</h4>
                  <p className="text-gray-600">We configure the AI tools and workflows tailored to your specific business needs.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Training & Integration</h4>
                  <p className="text-gray-600">Your team learns how to leverage the AI tools effectively with our guided training.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">4</div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Optimization & Scaling</h4>
                  <p className="text-gray-600">We continuously refine your AI systems based on results and expand to other business areas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default Features;
