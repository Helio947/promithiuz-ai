
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, Clock, TrendingUp } from "lucide-react";

interface CalculatorInputs {
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
      customerServiceReps,
      averageResponseTime,
      monthlyTickets,
      averageHourlyCost
    } = inputs;

    // Calculate monthly savings based on industry averages and AI impact
    const laborCostSavings = customerServiceReps * averageHourlyCost * 160 * 0.4; // 40% reduction in labor costs
    const timeSavings = (averageResponseTime * monthlyTickets * 0.8) / 60; // 80% reduction in response time
    const efficiencyImprovement = customerServiceReps * 160 * 0.3; // 30% efficiency improvement
    const revenueIncrease = laborCostSavings * 1.5; // Conservative estimate based on improved customer satisfaction

    setSavings({
      laborCostSavings,
      timeSavings,
      efficiencyImprovement,
      revenueIncrease
    });
    
    setStep(2);
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
                    <Users className="h-4 w-4" />
                    Number of Customer Service Representatives
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter number"
                    value={inputs.customerServiceReps || ''}
                    onChange={(e) => handleInputChange('customerServiceReps', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Average Response Time (minutes)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter minutes"
                    value={inputs.averageResponseTime || ''}
                    onChange={(e) => handleInputChange('averageResponseTime', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Monthly Support Tickets
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter number"
                    value={inputs.monthlyTickets || ''}
                    onChange={(e) => handleInputChange('monthlyTickets', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Average Hourly Cost per Rep ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={inputs.averageHourlyCost || ''}
                    onChange={(e) => handleInputChange('averageHourlyCost', e.target.value)}
                  />
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={calculateSavings}
              >
                Calculate Impact
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {savings && (
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
