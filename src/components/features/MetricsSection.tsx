
import { Clock, DollarSign, TrendingUp } from "lucide-react";

const MetricsSection = () => {
  return (
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
  );
};

export default MetricsSection;
