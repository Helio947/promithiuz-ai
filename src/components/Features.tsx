
import { TooltipProvider } from "@/components/ui/tooltip";
import FeatureCard from "./features/FeatureCard";
import MetricsSection from "./features/MetricsSection";
import PricingSection from "./features/PricingSection";
import { features } from "./features/FeaturesData";

const Features = () => {
  return (
    <TooltipProvider>
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Steal the Fire of AI</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover tools and insights that will transform how you run your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          <MetricsSection />
          <PricingSection />
        </div>
      </section>
    </TooltipProvider>
  );
};

export default Features;
