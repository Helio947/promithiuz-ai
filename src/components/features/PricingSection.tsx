
import PricingTier from "./PricingTier";

// Define the pricing tiers data
const pricingTiers = [
  {
    name: "Basic",
    price: "$5",
    period: "per month",
    description: "Perfect for solopreneurs and freelancers",
    features: [
      {
        name: "30 AI queries per day",
        description: "Ask questions to our business-focused AI and receive personalized insights, market analysis, and strategic recommendations. Each query can include multiple follow-up questions in the same conversation."
      },
      {
        name: "10 AI generations per day",
        description: "Create original content like marketing copy, product descriptions, social media posts, and business documents tailored specifically to your business needs and industry."
      },
      {
        name: "5 saved workflows",
        description: "Design and save up to 5 custom AI workflows in The Forge that can automate repetitive tasks like customer outreach, content creation, and data analysis."
      },
      {
        name: "Standard support",
        description: "Access to our comprehensive knowledge base, community forums, and automated troubleshooting system. All support is AI-driven for immediate assistance 24/7."
      },
      {
        name: "ROI calculator",
        description: "Measure the financial impact of our AI tools on your business with our interactive ROI calculator that tracks time saved, cost reduction, and productivity gains."
      }
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
      {
        name: "100 AI queries per day",
        description: "3x more daily AI interactions for deeper business insights, competitive analysis, and strategic planning across your entire team."
      },
      {
        name: "30 AI generations per day",
        description: "Triple the content creation capacity for marketing materials, business documents, product descriptions, and more - shareable across your team."
      },
      {
        name: "Unlimited saved workflows",
        description: "Create and save as many custom AI workflows as you need, with the ability to share and collaborate on workflows with team members."
      },
      {
        name: "Priority support",
        description: "Enhanced AI support system with prioritized issue resolution and advanced troubleshooting capabilities. Includes monthly system optimization recommendations."
      },
      {
        name: "Advanced analytics",
        description: "Comprehensive dashboard that tracks AI usage, performance metrics, team productivity, and quantifiable business impact across all tools."
      },
      {
        name: "Custom templates",
        description: "Create and save business-specific templates for consistent branding, messaging, and outputs across all AI generations and workflows."
      }
    ],
    cta: "Start 14-Day Trial",
    popular: true
  }
];

const PricingSection = () => {
  return (
    <div id="pricing" className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the plan that works best for your business needs
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mx-auto max-w-3xl">
        {pricingTiers.map((tier, index) => (
          <PricingTier key={index} {...tier} />
        ))}
      </div>
      
      <div className="text-center mt-8 text-gray-500 text-sm">
        All plans include a 30-day money-back guarantee
      </div>
    </div>
  );
};

export default PricingSection;
