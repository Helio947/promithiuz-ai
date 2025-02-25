
import { type CalculatedSavings } from "@/utils/ai-calculator";

interface SavingsResultsProps {
  savings: CalculatedSavings;
}

const SavingsResults = ({ savings }: SavingsResultsProps) => {
  return (
    <div className="mt-8 space-y-4 p-6 bg-gray-50 rounded-lg animate-fade-in">
      <h4 className="text-xl font-semibold mb-4">Your Potential Monthly Savings</h4>
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
  );
};

export default SavingsResults;
