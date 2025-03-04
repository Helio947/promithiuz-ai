
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalculatorInput from "./CalculatorInput";
import { SavingsResults } from "./SavingsResults";
import CalculationMethodology from "./CalculationMethodology";
import { Calculator } from "lucide-react";

interface BusinessMetrics {
  hourlyRate: string;
  weeklyHours: string;
  monthlyExpenses: string;
  monthlyRevenue: string;
  employeeCount: string;
}

const ROICalculator = () => {
  const [metrics, setMetrics] = useState<BusinessMetrics>({
    hourlyRate: "50",
    weeklyHours: "40",
    monthlyExpenses: "5000",
    monthlyRevenue: "20000",
    employeeCount: "5",
  });

  const [showResults, setShowResults] = useState(false);
  
  // ROI calculations
  const calculateROI = () => {
    // Yearly savings through automation
    const hourlyRate = parseFloat(metrics.hourlyRate) || 0;
    const weeklyHours = parseFloat(metrics.weeklyHours) || 0;
    const monthlyExpenses = parseFloat(metrics.monthlyExpenses) || 0;
    const monthlyRevenue = parseFloat(metrics.monthlyRevenue) || 0;
    
    // Conservative estimates:
    // 15 hours saved per week
    const weeklySavings = 15 * hourlyRate;
    const monthlySavings = weeklySavings * 4;
    const yearlySavings = monthlySavings * 12;
    
    // 40% reduction in specific operational costs (assuming 30% of total expenses)
    const targetExpenses = monthlyExpenses * 0.3;
    const monthlyCostReduction = targetExpenses * 0.4;
    const yearlyCostReduction = monthlyCostReduction * 12;
    
    // 30% increase in revenue for specific areas (assuming 20% of revenue is affected)
    const targetRevenue = monthlyRevenue * 0.2;
    const monthlyRevenueIncrease = targetRevenue * 0.3;
    const yearlyRevenueIncrease = monthlyRevenueIncrease * 12;
    
    // Total yearly benefit
    const totalYearlyBenefit = yearlySavings + yearlyCostReduction + yearlyRevenueIncrease;
    
    // ROI calculation (assuming $5000 yearly investment)
    const yearlyInvestment = 5000;
    const roi = (totalYearlyBenefit - yearlyInvestment) / yearlyInvestment * 100;
    
    return {
      timeSaved: {
        weekly: 15,
        yearly: 15 * 52,
        value: yearlySavings
      },
      costReduction: {
        monthly: monthlyCostReduction,
        yearly: yearlyCostReduction,
        percentage: 40
      },
      revenueIncrease: {
        monthly: monthlyRevenueIncrease,
        yearly: yearlyRevenueIncrease,
        percentage: 30
      },
      totalBenefit: totalYearlyBenefit,
      roi: roi,
      paybackPeriod: yearlyInvestment / (totalYearlyBenefit / 12) // in months
    };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleInputChange = (field: keyof BusinessMetrics, value: string) => {
    setMetrics(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Reset results when inputs change
    if (showResults) {
      setShowResults(false);
    }
  };

  const roiResults = calculateROI();

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            AI ROI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="calculator">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="methodology">Methodology</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="space-y-6">
              {!showResults ? (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <CalculatorInput
                      id="hourlyRate"
                      label="Hourly Rate ($)"
                      tooltip="Your average hourly cost or what you value your time at"
                      value={metrics.hourlyRate}
                      type="number"
                      onChange={(value) => handleInputChange("hourlyRate", value)}
                    />
                    
                    <CalculatorInput
                      id="weeklyHours" 
                      label="Weekly Working Hours"
                      tooltip="Average number of hours worked per week"
                      value={metrics.weeklyHours}
                      type="number"
                      onChange={(value) => handleInputChange("weeklyHours", value)}
                    />
                    
                    <CalculatorInput
                      id="monthlyExpenses"
                      label="Monthly Expenses ($)"
                      tooltip="Your total monthly business expenses"
                      value={metrics.monthlyExpenses}
                      type="number"
                      onChange={(value) => handleInputChange("monthlyExpenses", value)}
                    />
                    
                    <CalculatorInput
                      id="monthlyRevenue"
                      label="Monthly Revenue ($)"
                      tooltip="Your total monthly business revenue"
                      value={metrics.monthlyRevenue}
                      type="number"
                      onChange={(value) => handleInputChange("monthlyRevenue", value)}
                    />
                    
                    <CalculatorInput
                      id="employeeCount"
                      label="Number of Employees"
                      tooltip="Including yourself and any part-time staff"
                      value={metrics.employeeCount}
                      type="number"
                      onChange={(value) => handleInputChange("employeeCount", value)}
                    />
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleCalculate}
                  >
                    Calculate Your ROI
                  </Button>
                </>
              ) : (
                <SavingsResults 
                  results={roiResults} 
                  onReset={() => setShowResults(false)} 
                />
              )}
            </TabsContent>
            
            <TabsContent value="methodology">
              <CalculationMethodology />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROICalculator;
