
export interface CalculatorInputs {
  totalEmployees: number;
  customerServiceReps: number;
  averageResponseTime: number;
  monthlyTickets: number;
  averageHourlyCost: number;
}

export interface CalculatedSavings {
  laborCostSavings: number;
  timeSavings: number;
  efficiencyImprovement: number;
  revenueIncrease: number;
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

  // Calculate time savings based on ticket volume or workforce size
  const timeSavings = monthlyTickets 
    ? (averageResponseTime * monthlyTickets * 0.8) / 60 // 80% reduction in response time
    : workforceSize * 40; // Default to 40 hours saved per employee

  // Calculate efficiency improvements
  const efficiencyImprovement = monthlyHours * 0.3; // 30% productivity boost

  // Calculate potential revenue increase based on labor savings
  const revenueIncrease = laborCostSavings * 1.5; // 1.5x return on labor savings

  return {
    laborCostSavings,
    timeSavings,
    efficiencyImprovement,
    revenueIncrease
  };
};
