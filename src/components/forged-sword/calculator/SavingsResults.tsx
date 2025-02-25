
import { type CalculatedSavings } from "@/utils/ai-calculator";

interface SavingsResultsProps {
  savings: CalculatedSavings;
}

const SavingsResults = ({ savings }: SavingsResultsProps) => {
  return (
    <div className="mt-8 space-y-8 p-6 bg-gray-50 rounded-lg animate-fade-in">
      <div className="space-y-4">
        <h4 className="text-xl font-semibold mb-4">Your Potential Monthly Savings When You Use AI</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Labor Cost Savings</p>
            <p className="text-2xl font-semibold text-primary">${savings.laborCostSavings.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Time Savings (Hours)</p>
            <p className="text-2xl font-semibold text-primary">{savings.timeSavings.toFixed(1)}</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Efficiency Improvement (Hours)</p>
            <p className="text-2xl font-semibold text-primary">{savings.efficiencyImprovement.toFixed(1)}</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Potential Revenue Increase</p>
            <p className="text-2xl font-semibold text-primary">${savings.revenueIncrease.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <h5 className="text-lg font-semibold mb-4">Personalized AI Implementation Plan</h5>
        <div className="space-y-6">
          <div>
            <h6 className="font-medium text-primary mb-2">Immediate Actions</h6>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Implement AI chatbots to handle {Math.round(savings.timeSavings * 0.6)} hours of routine customer inquiries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Set up automated email response systems to reduce response time by up to 80%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Use AI-powered analytics to predict peak service hours and optimize staff scheduling</span>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-medium text-primary mb-2">Workflow Optimization</h6>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Integrate AI document processing to save approximately {Math.round(savings.efficiencyImprovement * 0.3)} hours monthly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Implement smart task prioritization to boost team efficiency by {Math.round(savings.efficiencyImprovement / savings.timeSavings * 10)}%</span>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-medium text-primary mb-2">Revenue Opportunities</h6>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Use AI insights to identify upsell opportunities worth up to ${Math.round(savings.revenueIncrease * 0.4)} monthly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Implement predictive analytics to improve customer retention and boost revenue by ${Math.round(savings.revenueIncrease * 0.6)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsResults;

