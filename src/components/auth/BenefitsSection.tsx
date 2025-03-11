
import { Clock, TrendingUp } from "lucide-react";

const BenefitsSection = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
          AI for Smart Business
        </h1>
        <p className="text-lg text-gray-600">
          Join thousands of businesses saving time and money with our AI tools.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">15+ Hours Saved Weekly</h3>
            <p className="text-sm text-gray-600">
              Automate repetitive tasks and focus on growing your business
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold">40% Cost Reduction</h3>
            <p className="text-sm text-gray-600">
              Our clients see significant savings in operational costs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
