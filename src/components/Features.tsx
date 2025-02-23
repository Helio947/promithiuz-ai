
import { Brain, Sparkles, MessageSquare, Sword } from "lucide-react";
import { Link } from "react-router-dom";

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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      </div>
    </section>
  );
};

export default Features;

