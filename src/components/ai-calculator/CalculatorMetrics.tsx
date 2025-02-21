
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
        <h4 className="font-medium text-foreground">How we calculate these numbers:</h4>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span>We reduce your monthly labor costs by 40% through AI automation</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-secondary" />
            <span>Each employee saves 40 hours monthly with AI assistance</span>
          </li>
          <li className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span>AI improves team productivity by 30%</span>
          </li>
          <li className="flex items-center gap-2">
            <Users className="h-4 w-4 text-green-500" />
            <span>Revenue grows 1.5x your cost savings from better efficiency</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
