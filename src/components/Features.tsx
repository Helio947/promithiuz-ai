
import { Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "Prometheus Vision",
    description: "Get personalized AI-driven insights and recommendations for your business growth.",
    route: "/prometheus-vision"
  },
  {
    icon: Sparkles,
    title: "The Forge",
    description: "Create custom AI workflows with our intuitive drag-and-drop interface.",
    route: "/forge"
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
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.route}
              className="p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
