
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { calculateAISavings, type CalculatorInputs, type CalculatedSavings } from "@/utils/ai-calculator";
import CalculatorInput from "./calculator/CalculatorInput";
import SavingsResults from "./calculator/SavingsResults";
import CalculationMethodology from "./calculator/CalculationMethodology";

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

      {results && <SavingsResults savings={results} />}
      
      <CalculationMethodology />
    </div>
  );
};

export default ROICalculator;
