
const CalculationMethodology = () => {
  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
      <h4 className="text-lg font-semibold mb-4">How We Calculate Your ROI</h4>
      <div className="space-y-4 text-sm text-gray-600">
        <p>
          <span className="font-medium">Labor Cost Savings:</span> We estimate that AI automation can handle approximately 40% of your team's workload. We multiply the automated hours by your average hourly cost to calculate potential savings.
          <br />
          <span className="text-xs text-gray-500">Simple formula: Monthly work hours × 40% × Hourly cost = Monthly savings</span>
          <br />
          <span className="text-xs text-gray-500">Example: 160 hours × 0.4 × $30/hour = $1,920 savings per employee</span>
        </p>
        
        <p>
          <span className="font-medium">Time Savings:</span> Based on your support ticket volume, we calculate an 80% reduction in response time. If ticket volume isn't provided, we estimate 40 hours saved per employee monthly.
          <br />
          <span className="text-xs text-gray-500">Simple formula: Monthly tickets × Time per ticket × 80% reduction = Time saved</span>
          <br />
          <span className="text-xs text-gray-500">Example: 100 tickets × 10 minutes × 0.8 = 800 minutes (13.3 hours) saved</span>
        </p>
        
        <p>
          <span className="font-medium">Efficiency Improvement:</span> We factor in a 30% productivity boost across your workforce's monthly hours, as AI tools help streamline workflows and reduce repetitive tasks.
          <br />
          <span className="text-xs text-gray-500">Simple formula: Monthly hours × 30% = Extra productive hours</span>
          <br />
          <span className="text-xs text-gray-500">Example: 160 hours × 0.3 = 48 extra productive hours per month</span>
        </p>
        
        <p>
          <span className="font-medium">Revenue Increase:</span> We project a conservative 1.5x return on your labor cost savings, as improved efficiency and faster response times typically lead to better customer satisfaction and increased sales.
          <br />
          <span className="text-xs text-gray-500">Simple formula: Labor savings × 1.5 = Revenue increase</span>
          <br />
          <span className="text-xs text-gray-500">Example: $1,920 savings × 1.5 = $2,880 potential revenue boost</span>
        </p>
      </div>
    </div>
  );
};

export default CalculationMethodology;
