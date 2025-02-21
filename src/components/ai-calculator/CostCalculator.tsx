
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, Clock, TrendingUp, Building2 } from "lucide-react";

interface CalculatorInputs {
  totalEmployees: number;
  customerServiceReps: number;
  averageResponseTime: number;
  monthlyTickets: number;
  averageHourlyCost: number;
}

interface CalculatedSavings {
  laborCostSavings: number;
  timeSavings: number;
  efficiencyImprovement: number;
  revenueIncrease: number;
}

export function CostCalculator({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    totalEmployees: 0,
    customerServiceReps: 0,
    averageResponseTime: 0,
    monthlyTickets: 0,
    averageHourlyCost: 0,
  });
  const [savings, setSavings] = useState<CalculatedSavings | null>(null);

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: Number(value) || 0
    }));
  };

  const calculateSavings = () => {
    const {
      totalEmployees,
      customerServiceReps,
      averageResponseTime,
      monthlyTickets,
      averageHourlyCost
    } = inputs;

    // Calculate monthly savings based on industry averages and AI impact
    const workforceSize = customerServiceReps || totalEmployees;
    const laborCostSavings = workforceSize * averageHourlyCost * 160 * 0.4;
    const timeSavings = monthlyTickets ? (averageResponseTime * monthlyTickets * 0.8) / 60 : workforceSize * 40;
    const efficiencyImprovement = workforceSize * 160 * 0.3;
    const revenueIncrease = laborCostSavings * 1.5;

    setSavings({
      laborCostSavings,
      timeSavings,
      efficiencyImprovement,
      revenueIncrease
    });
    
    setStep(2);
  };

  const getCalculationExplanations = () => {
    if (!savings || !inputs) return null;

    const workforceSize = inputs.customerServiceReps || inputs.totalEmployees;
    
    return (
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
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {step === 1 ? "AI Calculator" : "Your AI Impact Results"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Total Number of Employees
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter total employees (required)"
                    value={inputs.totalEmployees || ''}
                    onChange={(e) => handleInputChange('totalEmployees', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    Number of Customer Service Representatives
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter number (if applicable)"
                    value={inputs.customerServiceReps || ''}
                    onChange={(e) => handleInputChange('customerServiceReps', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    Average Response Time (minutes)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter minutes (if applicable)"
                    value={inputs.averageResponseTime || ''}
                    onChange={(e) => handleInputChange('averageResponseTime', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    Monthly Support Tickets
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter number (if applicable)"
                    value={inputs.monthlyTickets || ''}
                    onChange={(e) => handleInputChange('monthlyTickets', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-secondary" />
                    Average Hourly Cost per Employee ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount (required)"
                    value={inputs.averageHourlyCost || ''}
                    onChange={(e) => handleInputChange('averageHourlyCost', e.target.value)}
                  />
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={calculateSavings}
                disabled={!inputs.totalEmployees || !inputs.averageHourlyCost}
              >
                Calculate Impact
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {savings && (
              <>
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

                {getCalculationExplanations()}
              </>
            )}
            
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => setStep(1)}
            >
              Calculate Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
