
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

  const workforceSize = customerServiceReps || totalEmployees;
  const laborCostSavings = workforceSize * averageHourlyCost * 160 * 0.4;
  const timeSavings = monthlyTickets 
    ? (averageResponseTime * monthlyTickets * 0.8) / 60 
    : workforceSize * 40;
  const efficiencyImprovement = workforceSize * 160 * 0.3;
  const revenueIncrease = laborCostSavings * 1.5;

  return {
    laborCostSavings,
    timeSavings,
    efficiencyImprovement,
    revenueIncrease
  };
};
