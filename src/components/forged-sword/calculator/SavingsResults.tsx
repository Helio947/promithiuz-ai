
import { Button } from "@/components/ui/button";

export interface SavingsResultsProps {
  timeSaved: {
    weekly: number;
    yearly: number;
    value: number;
  };
  costReduction: {
    monthly: number;
    yearly: number;
    percentage: number;
  };
  revenueIncrease: {
    monthly: number;
    yearly: number;
    percentage: number;
  };
  totalBenefit: number;
  roi: number;
  paybackPeriod: number;
  onReset: () => void;
  // Add these optional properties to support both usage patterns
  savings?: any;
  results?: any;
}

export const SavingsResults = ({
  timeSaved,
  costReduction,
  revenueIncrease,
  totalBenefit,
  roi,
  paybackPeriod,
  onReset,
  savings,
  results
}: SavingsResultsProps) => {
  // If savings or results is provided, use those values instead
  const finalTimeSaved = savings?.timeSaved || results?.timeSaved || timeSaved;
  const finalCostReduction = savings?.costReduction || results?.costReduction || costReduction;
  const finalRevenueIncrease = savings?.revenueIncrease || results?.revenueIncrease || revenueIncrease;
  const finalTotalBenefit = savings?.totalBenefit || results?.totalBenefit || totalBenefit;
  const finalRoi = savings?.roi || results?.roi || roi;
  const finalPaybackPeriod = savings?.paybackPeriod || results?.paybackPeriod || paybackPeriod;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold mb-4">Your Estimated ROI Results</h3>

      <div className="space-y-6">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Time Saved</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-green-50 rounded-md">
              <p className="text-sm text-gray-500">Weekly</p>
              <p className="text-xl font-bold text-green-600">{finalTimeSaved.weekly} hrs</p>
            </div>
            <div className="p-3 bg-green-50 rounded-md">
              <p className="text-sm text-gray-500">Yearly</p>
              <p className="text-xl font-bold text-green-600">{finalTimeSaved.yearly} hrs</p>
            </div>
            <div className="p-3 bg-green-50 rounded-md">
              <p className="text-sm text-gray-500">Value</p>
              <p className="text-xl font-bold text-green-600">${finalTimeSaved.value.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Cost Reduction</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-gray-500">Monthly</p>
              <p className="text-xl font-bold text-blue-600">${finalCostReduction.monthly.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-gray-500">Yearly</p>
              <p className="text-xl font-bold text-blue-600">${finalCostReduction.yearly.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-gray-500">Reduction</p>
              <p className="text-xl font-bold text-blue-600">{finalCostReduction.percentage}%</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Revenue Increase</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-purple-50 rounded-md">
              <p className="text-sm text-gray-500">Monthly</p>
              <p className="text-xl font-bold text-purple-600">${finalRevenueIncrease.monthly.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-md">
              <p className="text-sm text-gray-500">Yearly</p>
              <p className="text-xl font-bold text-purple-600">${finalRevenueIncrease.yearly.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-md">
              <p className="text-sm text-gray-500">Growth</p>
              <p className="text-xl font-bold text-purple-600">{finalRevenueIncrease.percentage}%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-b py-4 my-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Annual Benefit</p>
            <p className="text-2xl font-bold text-green-600">${finalTotalBenefit.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">ROI</p>
            <p className="text-2xl font-bold text-green-600">{finalRoi}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Payback Period</p>
            <p className="text-2xl font-bold text-green-600">{finalPaybackPeriod} months</p>
          </div>
        </div>

        <Button 
          onClick={onReset} 
          variant="outline" 
          className="w-full"
        >
          Calculate Another Scenario
        </Button>
      </div>
    </div>
  );
};
