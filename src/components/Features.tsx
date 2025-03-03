
import { Brain, Sparkles, MessageSquare, Sword, Clock, DollarSign, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Brain,
    title: "Promithiuz AI Vision",
    description: "Get personalized AI-driven insights and recommendations for your business growth.",
    route: "/prometheus-vision"
  },
  {
    icon: Sparkles,
    title: "The Forge",
    description: "Create custom AI workflows with our intuitive drag-and-drop interface.",
    route: "/forge"
  },
  {
    icon: MessageSquare,
    title: "Prompt Engine",
    description: "Explore our curated repository of business-ready prompts to enhance your AI interactions.",
    route: "/prompt-engine"
  },
  {
    icon: Sword,
    title: "Forged Sword",
    description: "Premium expertise in text, image, and video AI tools to supercharge your business.",
    route: "/forged-sword",
    isPremium: true
  }
];

const pricingTiers = [
  {
    name: "Basic",
    price: "$5",
    period: "per month",
    description: "Perfect for solopreneurs and freelancers",
    features: [
      "30 AI queries per day",
      "10 AI generations per day",
      "5 saved workflows",
      "Standard support",
      "ROI calculator"
    ],
    cta: "Sign Up Now",
    popular: false
  },
  {
    name: "Business",
    price: "$20",
    period: "per month",
    description: "Ideal for small businesses with up to 5 team members",
    features: [
      "100 AI queries per day",
      "30 AI generations per day",
      "Unlimited saved workflows",
      "Priority support",
      "Advanced analytics",
      "Custom templates"
    ],
    cta: "Start 14-Day Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For growing businesses with advanced needs",
    features: [
      "Unlimited AI usage",
      "Dedicated account manager",
      "Custom AI training",
      "API access",
      "Full access to Forged Sword",
      "White-label options"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const Features = () => {
  return (
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
            <Link
              key={index}
              to={feature.route}
              className={`p-6 rounded-2xl border ${
                feature.isPremium 
                  ? "bg-gradient-to-tr from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 border-primary/20" 
                  : "bg-white hover:shadow-lg border-gray-200"
              } transition-all duration-300 hover:-translate-y-1 relative`}
            >
              <div className={`w-12 h-12 rounded-lg ${
                feature.isPremium 
                  ? "bg-gradient-to-tr from-primary to-secondary text-white"
                  : "bg-primary/10 text-primary"
              } flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                {feature.title}
                {feature.isPremium && (
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Premium
                  </span>
                )}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>

        {/* ROI Stats */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Real Results for Small Businesses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our customers are saving time and money with our AI tools
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-4xl font-bold mb-2">15+</h3>
              <p className="text-gray-600">Hours saved weekly</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-4xl font-bold mb-2">40%</h3>
              <p className="text-gray-600">Cost reduction</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-4xl font-bold mb-2">30%</h3>
              <p className="text-gray-600">Revenue growth</p>
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div id="pricing" className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`
                  relative bg-white rounded-xl border overflow-hidden transition-all duration-300
                  ${tier.popular 
                    ? "border-primary shadow-lg md:-mt-4 md:mb-4" 
                    : "border-gray-200 hover:border-primary/50 hover:shadow-md"
                  }
                `}
              >
                {tier.popular && (
                  <div className="bg-primary text-white text-xs font-medium py-1 px-3 text-center">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-gray-500 ml-1">{tier.period}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{tier.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/auth">
                    <Button 
                      className={`w-full ${tier.popular ? "bg-primary" : ""}`}
                      variant={tier.popular ? "default" : "outline"}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 text-gray-500 text-sm">
            All plans include a 14-day money-back guarantee
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
