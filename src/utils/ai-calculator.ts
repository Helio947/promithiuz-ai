
export interface CalculatorInputs {
  businessType: string;
  totalEmployees: number;
  customerServiceReps: number;
  averageResponseTime: number;
  monthlyTickets: number;
  averageHourlyCost: number;
}

export interface CalculatedSavings {
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
  // Adding these properties to support existing components
  laborCostSavings: number;
  timeSavings: number;
  efficiencyImprovement: number;
}

export const calculateAISavings = (inputs: CalculatorInputs): CalculatedSavings => {
  const {
    totalEmployees,
    customerServiceReps,
    averageResponseTime,
    monthlyTickets,
    averageHourlyCost
  } = inputs;

  // Calculate based on total workforce or customer service team size
  const workforceSize = customerServiceReps || totalEmployees;
  
  // Calculate monthly hours and automation impact
  const monthlyHours = workforceSize * 160; // 160 hours per month per employee
  const automatedHours = monthlyHours * 0.4; // 40% automation
  const laborCostSavings = automatedHours * averageHourlyCost;
  
  // Weekly and yearly hours saved
  const weeklyHoursSaved = automatedHours / 4; // Monthly to weekly
  const yearlyHoursSaved = automatedHours * 12; // Monthly to yearly

  // Calculate time savings based on ticket volume or workforce size
  const timeSavings = monthlyTickets 
    ? (averageResponseTime * monthlyTickets * 0.8) / 60 // 80% reduction in response time
    : workforceSize * 40; // Default to 40 hours saved per employee
  
  // Time saved value
  const timeSavedValue = yearlyHoursSaved * averageHourlyCost;

  // Calculate efficiency improvements
  const efficiencyImprovement = monthlyHours * 0.3; // 30% productivity boost

  // Calculate cost reduction
  const monthlyCostReduction = laborCostSavings;
  const yearlyCostReduction = monthlyCostReduction * 12;
  const costReductionPercentage = workforceSize > 0 ? (monthlyCostReduction / (workforceSize * averageHourlyCost * 160)) * 100 : 0;

  // Calculate potential revenue increase based on labor savings
  const monthlyRevenueIncrease = laborCostSavings * 1.5; // 1.5x return on labor savings
  const yearlyRevenueIncrease = monthlyRevenueIncrease * 12;
  const revenueIncreasePercentage = 30; // Example percentage

  // Calculate total benefit
  const totalBenefit = yearlyCostReduction + yearlyRevenueIncrease;
  
  // ROI calculation (assuming $5000 yearly investment)
  const yearlyInvestment = 5000;
  const roi = (totalBenefit - yearlyInvestment) / yearlyInvestment * 100;
  
  // Payback period in months
  const paybackPeriod = yearlyInvestment / (totalBenefit / 12);

  return {
    timeSaved: {
      weekly: Math.round(weeklyHoursSaved),
      yearly: Math.round(yearlyHoursSaved),
      value: Math.round(timeSavedValue)
    },
    costReduction: {
      monthly: Math.round(monthlyCostReduction),
      yearly: Math.round(yearlyCostReduction),
      percentage: Math.round(costReductionPercentage)
    },
    revenueIncrease: {
      monthly: Math.round(monthlyRevenueIncrease),
      yearly: Math.round(yearlyRevenueIncrease),
      percentage: revenueIncreasePercentage
    },
    totalBenefit: Math.round(totalBenefit),
    roi: Math.round(roi),
    paybackPeriod: Math.round(paybackPeriod),
    // Add the new properties to the return object
    laborCostSavings: Math.round(laborCostSavings),
    timeSavings: Math.round(timeSavings),
    efficiencyImprovement: Math.round(efficiencyImprovement)
  };
};
