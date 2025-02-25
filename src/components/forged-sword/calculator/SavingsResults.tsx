
import { type CalculatedSavings } from "@/utils/ai-calculator";

interface SavingsResultsProps {
  savings: CalculatedSavings;
}

const SavingsResults = ({ savings }: SavingsResultsProps) => {
  return (
    <div className="mt-8 space-y-8 p-6 bg-gray-50 rounded-lg animate-fade-in">
      <div className="space-y-4">
        <h4 className="text-xl font-semibold mb-4">Your Potential Monthly Savings When You Use AI</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Labor Cost Savings</p>
            <p className="text-2xl font-semibold text-primary">${savings.laborCostSavings.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Time Savings (Hours)</p>
            <p className="text-2xl font-semibold text-primary">{savings.timeSavings.toFixed(1)}</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Efficiency Improvement (Hours)</p>
            <p className="text-2xl font-semibold text-primary">{savings.efficiencyImprovement.toFixed(1)}</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Potential Revenue Increase</p>
            <p className="text-2xl font-semibold text-primary">${savings.revenueIncrease.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <h5 className="text-lg font-semibold mb-4">Personalized AI Implementation Plan</h5>
        <div className="space-y-6">
          <div>
            <h6 className="font-medium text-primary mb-2">Immediate Actions</h6>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <div>
                  <span>Implement AI chatbots to handle {Math.round(savings.timeSavings * 0.6)} hours of routine customer inquiries</span>
                  <div className="mt-1 text-gray-600 text-xs">
                    Recommended tools:
                    <ul className="ml-4 list-disc">
                      <li>Claude (Anthropic) - For deep, nuanced customer support</li>
                      <li>ChatGPT API - For quick, accurate responses</li>
                      <li>Dialogflow (Google) - For custom chatbot development</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <div>
                  <span>Set up automated email response systems to reduce response time by up to 80%</span>
                  <div className="mt-1 text-gray-600 text-xs">
                    Recommended tools:
                    <ul className="ml-4 list-disc">
                      <li>GPT-4 API - For personalized email drafting</li>
                      <li>Resend.com - For automated email infrastructure</li>
                      <li>Customer.io - For email automation workflows</li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-medium text-primary mb-2">Workflow Optimization</h6>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <div>
                  <span>Integrate AI document processing to save approximately {Math.round(savings.efficiencyImprovement * 0.3)} hours monthly</span>
                  <div className="mt-1 text-gray-600 text-xs">
                    Recommended tools:
                    <ul className="ml-4 list-disc">
                      <li>Adobe PDF Services API - For document parsing</li>
                      <li>OpenAI GPT-4 Vision - For image and document analysis</li>
                      <li>Amazon Textract - For automated data extraction</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <div>
                  <span>Implement smart task prioritization to boost team efficiency by {Math.round(savings.efficiencyImprovement / savings.timeSavings * 10)}%</span>
                  <div className="mt-1 text-gray-600 text-xs">
                    Recommended tools:
                    <ul className="ml-4 list-disc">
                      <li>Asana + GPT Integration - For AI-powered task management</li>
                      <li>Motion.app - For AI scheduling and prioritization</li>
                      <li>Notion AI - For smart project organization</li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-medium text-primary mb-2">Revenue Opportunities</h6>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <div>
                  <span>Use AI insights to identify upsell opportunities worth up to ${Math.round(savings.revenueIncrease * 0.4)} monthly</span>
                  <div className="mt-1 text-gray-600 text-xs">
                    Recommended tools:
                    <ul className="ml-4 list-disc">
                      <li>Salesforce Einstein - For AI-powered sales insights</li>
                      <li>Gong.io - For conversation intelligence</li>
                      <li>HubSpot AI Tools - For customer behavior analysis</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <div>
                  <span>Implement predictive analytics to improve customer retention and boost revenue by ${Math.round(savings.revenueIncrease * 0.6)}</span>
                  <div className="mt-1 text-gray-600 text-xs">
                    Recommended tools:
                    <ul className="ml-4 list-disc">
                      <li>BigQuery ML - For customer churn prediction</li>
                      <li>Amazon SageMaker - For custom ML models</li>
                      <li>DataRobot - For automated machine learning</li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsResults;
