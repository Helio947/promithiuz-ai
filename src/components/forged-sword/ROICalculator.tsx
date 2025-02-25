
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateAISavings, type CalculatorInputs, type CalculatedSavings } from "@/utils/ai-calculator";

const ROICalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    businessType: "",
    totalEmployees: 0,
    customerServiceReps: 0,
    averageResponseTime: 0,
    monthlyTickets: 0,
    averageHourlyCost: 0,
  });

  const [results, setResults] = useState<CalculatedSavings | null>(null);

  const handleCalculate = () => {
    const savings = calculateAISavings(inputs);
    setResults(savings);
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: field === 'businessType' ? value : Number(value),
    }));
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 space-y-6">
      <h3 className="text-2xl font-semibold mb-6">Calculate Your AI ROI</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type</Label>
          <Input
            id="businessType"
            placeholder="e.g. E-commerce, Agency, SaaS"
            value={inputs.businessType}
            onChange={(e) => handleInputChange('businessType', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalEmployees">Total Employees</Label>
          <Input
            id="totalEmployees"
            type="number"
            min="0"
            value={inputs.totalEmployees || ''}
            onChange={(e) => handleInputChange('totalEmployees', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerServiceReps">Customer Service Representatives</Label>
          <Input
            id="customerServiceReps"
            type="number"
            min="0"
            value={inputs.customerServiceReps || ''}
            onChange={(e) => handleInputChange('customerServiceReps', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="averageResponseTime">Average Response Time (minutes)</Label>
          <Input
            id="averageResponseTime"
            type="number"
            min="0"
            value={inputs.averageResponseTime || ''}
            onChange={(e) => handleInputChange('averageResponseTime', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyTickets">Monthly Support Tickets</Label>
          <Input
            id="monthlyTickets"
            type="number"
            min="0"
            value={inputs.monthlyTickets || ''}
            onChange={(e) => handleInputChange('monthlyTickets', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="averageHourlyCost">Average Hourly Cost ($)</Label>
          <Input
            id="averageHourlyCost"
            type="number"
            min="0"
            value={inputs.averageHourlyCost || ''}
            onChange={(e) => handleInputChange('averageHourlyCost', e.target.value)}
          />
        </div>
      </div>

      <Button onClick={handleCalculate} className="w-full mt-6">
        Calculate Savings
      </Button>

      {results && (
        <div className="mt-8 space-y-4 p-6 bg-gray-50 rounded-lg animate-fade-in">
          <h4 className="text-xl font-semibold mb-4">Your Potential Monthly Savings</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Labor Cost Savings</p>
              <p className="text-2xl font-semibold text-primary">${results.laborCostSavings.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Time Savings (Hours)</p>
              <p className="text-2xl font-semibold text-primary">{results.timeSavings.toFixed(1)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Efficiency Improvement (Hours)</p>
              <p className="text-2xl font-semibold text-primary">{results.efficiencyImprovement.toFixed(1)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Potential Revenue Increase</p>
              <p className="text-2xl font-semibold text-primary">${results.revenueIncrease.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
        <h4 className="text-lg font-semibold mb-4">How We Calculate Your ROI</h4>
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            <span className="font-medium">Labor Cost Savings:</span> Simple formula: 
            Monthly work hours × 40% × Hourly cost = Monthly savings
            <br />
            <span className="text-xs text-gray-500">Example: 160 hours × 0.4 × $30/hour = $1,920 savings per employee</span>
          </p>
          
          <p>
            <span className="font-medium">Time Savings:</span> We look at your monthly tickets × time per ticket, then reduce it by 80%
            <br />
            <span className="text-xs text-gray-500">Example: 100 tickets × 10 minutes × 0.8 = 800 minutes (13.3 hours) saved</span>
          </p>
          
          <p>
            <span className="font-medium">Efficiency Boost:</span> Your team works 30% faster on remaining tasks
            <br />
            <span className="text-xs text-gray-500">Example: 160 hours × 0.3 = 48 extra productive hours per month</span>
          </p>
          
          <p>
            <span className="font-medium">Extra Revenue:</span> Labor savings × 1.5 = Revenue increase
            <br />
            <span className="text-xs text-gray-500">Example: $1,920 savings × 1.5 = $2,880 potential revenue boost</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
