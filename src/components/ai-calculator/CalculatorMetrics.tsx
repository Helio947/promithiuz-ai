
import { CalculatedSavings, CalculatorInputs } from "@/utils/ai-calculator";
import { DollarSign, Users, Clock, TrendingUp } from "lucide-react";

interface CalculatorMetricsProps {
  savings: CalculatedSavings;
  inputs: CalculatorInputs;
}

export const CalculatorMetrics = ({ savings, inputs }: CalculatorMetricsProps) => {
  const workforceSize = inputs.customerServiceReps || inputs.totalEmployees;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-primary/10 p-4 rounded-lg">
          <div className="font-semibold text-primary mb-1">Monthly Labor Cost Savings</div>
          <div className="text-2xl font-bold">${savings.laborCostSavings.toLocaleString()}</div>
        </div>
        
        <div className="bg-secondary/10 p-4 rounded-lg">
          <div className="font-semibold text-secondary mb-1">Monthly Time Saved (hours)</div>
          <div className="text-2xl font-bold">{savings.timeSavings.toLocaleString()}</div>
        </div>
        
        <div className="bg-accent/10 p-4 rounded-lg">
          <div className="font-semibold text-accent mb-1">Monthly Efficiency Hours Gained</div>
          <div className="text-2xl font-bold">{savings.efficiencyImprovement.toLocaleString()}</div>
        </div>
        
        <div className="bg-green-500/10 p-4 rounded-lg">
          <div className="font-semibold text-green-500 mb-1">Potential Monthly Revenue Increase</div>
          <div className="text-2xl font-bold">${savings.revenueIncrease.toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm text-muted-foreground border-t pt-4">
        <h4 className="font-medium text-foreground">How we calculated these numbers:</h4>
        <ul className="space-y-3 list-disc pl-4">
          <li>
            <span className="text-primary font-medium">Labor Cost Savings:</span> Based on {workforceSize} employees working 
            160 hours per month at ${inputs.averageHourlyCost}/hour, with a 40% reduction in labor costs through AI automation.
          </li>
          <li>
            <span className="text-secondary font-medium">Time Saved:</span> {inputs.monthlyTickets ? 
              `Calculated from ${inputs.monthlyTickets} monthly tickets with ${inputs.averageResponseTime} minutes average response time, reduced by 80% with AI` :
              `Estimated as 40 hours saved per employee per month through AI automation`}.
          </li>
          <li>
            <span className="text-accent font-medium">Efficiency Hours:</span> Based on a 30% improvement in productivity 
            across {workforceSize} employees working 160 hours per month.
          </li>
          <li>
            <span className="text-green-500 font-medium">Revenue Increase:</span> Conservative estimate calculated as 
            1.5x your labor cost savings, based on improved efficiency and customer satisfaction.
          </li>
        </ul>
      </div>
    </div>
  );
};
