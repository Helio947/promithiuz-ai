
import { CalculatedSavings, CalculatorInputs } from "@/utils/ai-calculator";
import { DollarSign, Users, Clock, TrendingUp, Bot, Brain } from "lucide-react";

interface CalculatorMetricsProps {
  savings: CalculatedSavings;
  inputs: CalculatorInputs;
}

export const CalculatorMetrics = ({ savings, inputs }: CalculatorMetricsProps) => {
  const workforceSize = inputs.customerServiceReps || inputs.totalEmployees;
  const monthlyHours = workforceSize * 160; // 160 hours per month per employee
  const automatedHours = monthlyHours * 0.4; // 40% automation
  const hourlySavings = automatedHours * inputs.averageHourlyCost;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-primary/10 p-4 rounded-lg">
          <div className="font-semibold text-primary mb-1 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Monthly Labor Cost Savings
          </div>
          <div className="text-2xl font-bold">${savings.laborCostSavings.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground mt-2">
            <Bot className="h-4 w-4 inline mr-2" />
            AI automates {automatedHours.toFixed(0)} hours of work (40% of {monthlyHours} total hours), 
            saving ${hourlySavings.toFixed(2)} at ${inputs.averageHourlyCost}/hour
          </div>
        </div>
        
        <div className="bg-secondary/10 p-4 rounded-lg">
          <div className="font-semibold text-secondary mb-1 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Monthly Time Saved (hours)
          </div>
          <div className="text-2xl font-bold">{savings.timeSavings.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground mt-2">
            <Bot className="h-4 w-4 inline mr-2" />
            AI reduces response time by 80%, saving {(inputs.averageResponseTime * inputs.monthlyTickets * 0.8 / 60).toFixed(1)} hours 
            across {inputs.monthlyTickets} monthly tickets
          </div>
        </div>
        
        <div className="bg-accent/10 p-4 rounded-lg">
          <div className="font-semibold text-accent mb-1 flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Monthly Efficiency Hours Gained
          </div>
          <div className="text-2xl font-bold">{savings.efficiencyImprovement.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground mt-2">
            <Bot className="h-4 w-4 inline mr-2" />
            AI boosts productivity by 30%, adding {(monthlyHours * 0.3).toFixed(0)} efficient hours 
            to your {monthlyHours} monthly hours
          </div>
        </div>
        
        <div className="bg-green-500/10 p-4 rounded-lg">
          <div className="font-semibold text-green-500 mb-1 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Potential Monthly Revenue Increase
          </div>
          <div className="text-2xl font-bold">${savings.revenueIncrease.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground mt-2">
            <Bot className="h-4 w-4 inline mr-2" />
            Based on 1.5x return on labor savings through improved customer satisfaction and efficiency
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm text-muted-foreground border-t pt-4">
        <h4 className="font-medium text-foreground">How AI Creates These Savings:</h4>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            <span>Automated responses handle 80% of routine inquiries, freeing up staff for complex tasks</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-secondary" />
            <span>AI-powered tools reduce average response times by 80% through instant replies and suggestions</span>
          </li>
          <li className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-accent" />
            <span>Smart workflows and AI assistance boost team productivity by 30% through better task management</span>
          </li>
          <li className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span>Faster response times and consistent service quality lead to increased customer satisfaction and revenue</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
