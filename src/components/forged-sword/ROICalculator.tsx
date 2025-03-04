
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { calculateAISavings, type CalculatorInputs, type CalculatedSavings } from "@/utils/ai-calculator";
import CalculatorInput from "./calculator/CalculatorInput";
import { SavingsResults } from "./calculator/SavingsResults";
import CalculationMethodology from "./calculator/CalculationMethodology";
import { BusinessInsights } from "./calculator/BusinessInsights";

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
  const [showBusinessInsights, setShowBusinessInsights] = useState(false);

  const handleCalculate = () => {
    const savings = calculateAISavings(inputs);
    setResults(savings);
    setShowBusinessInsights(true);
  };

  const handleReset = () => {
    setResults(null);
    setShowBusinessInsights(false);
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: field === 'businessType' ? value : Number(value),
    }));
  };

  const calculatorInputs = [
    {
      id: "businessType",
      label: "Business Type",
      tooltip: "Understanding your business type helps us provide more accurate ROI calculations tailored to your industry's specific needs and automation opportunities.",
      value: inputs.businessType,
      type: "text"
    },
    {
      id: "totalEmployees",
      label: "Total Employees",
      tooltip: "Your total employee count helps us understand your organization's scale and potential for AI implementation across different departments.",
      value: inputs.totalEmployees,
      type: "number"
    },
    {
      id: "customerServiceReps",
      label: "Customer Service Representatives",
      tooltip: "The number of support staff directly affects potential cost savings through AI automation of routine queries and tasks.",
      value: inputs.customerServiceReps,
      type: "number"
    },
    {
      id: "averageResponseTime",
      label: "Average Response Time (minutes)",
      tooltip: "Current response times help calculate potential time savings through AI's instant response capabilities and automated workflows.",
      value: inputs.averageResponseTime,
      type: "number"
    },
    {
      id: "monthlyTickets",
      label: "Monthly Support Tickets",
      tooltip: "Your ticket volume helps determine the scale of potential automation and the impact AI could have on handling routine inquiries.",
      value: inputs.monthlyTickets,
      type: "number"
    },
    {
      id: "averageHourlyCost",
      label: "Average Hourly Cost ($)",
      tooltip: "Your staff's hourly cost helps calculate direct financial savings from reducing manual support hours through AI automation.",
      value: inputs.averageHourlyCost,
      type: "number"
    }
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 space-y-6">
      <h3 className="text-2xl font-semibold mb-6">Calculate Your AI ROI</h3>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
        <h4 className="text-lg font-medium text-blue-700 mb-2">What is this calculator for?</h4>
        <p className="text-blue-600 mb-3">
          This calculator helps you estimate the potential financial benefits of implementing AI in your business operations.
        </p>
        <div className="space-y-2 text-sm text-blue-600">
          <p><span className="font-medium">How to use it:</span></p>
          <ol className="list-decimal list-inside space-y-1 pl-2">
            <li>Fill in the fields with your business information</li>
            <li>Include details about your current operations (employees, response times, etc.)</li>
            <li>Click "Calculate Savings" to see your potential AI ROI</li>
            <li>Review the detailed breakdown of potential savings below the results</li>
          </ol>
          <p className="mt-3">
            <span className="font-medium">Note:</span> You are not required to fill in every input field, but providing complete information will result in more accurate calculations.
          </p>
          <p className="mt-2 italic">
            Hover over each field's <span className="inline-flex items-center">ℹ️</span> icon for more information about what each input means.
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {calculatorInputs.map((input) => (
          <CalculatorInput
            key={input.id}
            id={input.id}
            label={input.label}
            tooltip={input.tooltip}
            value={input.value}
            type={input.type as "text" | "number"}
            onChange={(value) => handleInputChange(input.id as keyof CalculatorInputs, value)}
          />
        ))}
      </div>

      <Button onClick={handleCalculate} className="w-full mt-6">
        Calculate Savings
      </Button>

      {results && <SavingsResults savings={results} onReset={handleReset} />}
      
      {showBusinessInsights && inputs.businessType && <BusinessInsights inputs={inputs} />}
      
      <CalculationMethodology />
    </div>
  );
};

export default ROICalculator;
