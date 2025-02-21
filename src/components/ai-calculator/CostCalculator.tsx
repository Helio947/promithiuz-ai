import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, Users, Clock, TrendingUp, Briefcase } from "lucide-react";
import { CalculatorMetrics } from "./CalculatorMetrics";
import { AIChat } from "./AIChat";
import { calculateAISavings, type CalculatorInputs, type CalculatedSavings } from "@/utils/ai-calculator";

interface CostCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CostCalculator({ open, onOpenChange }: CostCalculatorProps) {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    businessType: '',
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
      [field]: field === 'businessType' ? value : Number(value) || 0
    }));
  };

  const calculateSavings = () => {
    const calculatedSavings = calculateAISavings(inputs);
    setSavings(calculatedSavings);
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
                    <Briefcase className="h-4 w-4 text-primary" />
                    What do you Do
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your business type (e.g., Retail, Tech, Healthcare)"
                    value={inputs.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                  />
                </div>

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
                    <TrendingUp className="h-4 w-4 text-secondary" />
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
                <CalculatorMetrics savings={savings} inputs={inputs} />
                <AIChat savings={savings} inputs={inputs} />
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Calculate Again
                </Button>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
