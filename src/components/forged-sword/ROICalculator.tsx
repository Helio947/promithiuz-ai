
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
      tooltip: "Understanding your business type (e.g., e-commerce, agency, SaaS) helps the calculator tailor its estimations to your specific industry and typical workflows. Different industries have different support needs and operational structures, impacting the potential ROI of AI implementation.",
      value: inputs.businessType,
      type: "text"
    },
    {
      id: "totalEmployees",
      label: "Total Employees",
      tooltip: "This helps the calculator estimate the overall impact of AI on your business's efficiency. While the focus is on customer service, AI can improve productivity across various departments.",
      value: inputs.totalEmployees,
      type: "number"
    },
    {
      id: "customerServiceReps",
      label: "Customer Service Representatives",
      tooltip: "The number of customer service representatives you employ directly influences the potential labor cost savings. The calculator uses this number to estimate the total hours spent on support and the portion that could be automated by AI.",
      value: inputs.customerServiceReps,
      type: "number"
    },
    {
      id: "averageResponseTime",
      label: "Average Response Time (minutes)",
      tooltip: "Your average response time to support tickets is a key indicator of customer satisfaction and operational efficiency. The calculator uses this to estimate the potential time savings from faster AI-powered responses.",
      value: inputs.averageResponseTime,
      type: "number"
    },
    {
      id: "monthlyTickets",
      label: "Monthly Support Tickets",
      tooltip: "The number of support tickets your business handles monthly is crucial for estimating time savings. The calculator uses this to project how much time AI could save by automating responses and streamlining workflows.",
      value: inputs.monthlyTickets,
      type: "number"
    },
    {
      id: "averageHourlyCost",
      label: "Average Hourly Cost ($)",
      tooltip: "This is essential for calculating potential labor cost savings. The calculator multiplies this cost by the estimated hours saved through AI automation to determine the financial benefits.",
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
