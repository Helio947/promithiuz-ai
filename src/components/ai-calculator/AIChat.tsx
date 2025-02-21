
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CalculatedSavings, CalculatorInputs } from "@/utils/ai-calculator";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  savings: CalculatedSavings;
  inputs: CalculatorInputs;
}

export const AIChat = ({ savings, inputs }: AIChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !savings) return;

    const newMessage: ChatMessage = {
      role: 'user',
      content: currentMessage
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const workforceSize = inputs.customerServiceReps || inputs.totalEmployees;
      const monthlyHours = workforceSize * 160;
      const automatedHours = monthlyHours * 0.4;
      
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { 
          prompt: `Based on these detailed AI impact calculations for a business:

1. Labor Cost Savings: $${savings.laborCostSavings.toLocaleString()}
   - ${workforceSize} employees working ${monthlyHours} total monthly hours
   - AI automates ${automatedHours} hours (40% of work)
   - Hourly cost: $${inputs.averageHourlyCost}

2. Time Savings: ${savings.timeSavings.toLocaleString()} hours
   - Processing ${inputs.monthlyTickets} monthly tickets
   - Current response time: ${inputs.averageResponseTime} minutes
   - AI reduces response time by 80%

3. Efficiency Improvement: ${savings.efficiencyImprovement.toLocaleString()} hours
   - 30% productivity boost through AI assistance
   - Smart workflows and automated task management
   
4. Revenue Impact: $${savings.revenueIncrease.toLocaleString()}
   - 1.5x return on labor cost savings
   - Driven by improved customer satisfaction
   - Faster response times and consistent service

Question: ${currentMessage}

Please provide a specific, data-driven answer based on these metrics and calculations.`
        }
      });

      if (error) throw error;

      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: data.generatedText
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <h4 className="font-medium text-foreground">Questions about your results?</h4>
      <div className="space-y-4">
        <div className="max-h-[200px] overflow-y-auto space-y-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-sm ${
                message.role === 'user' 
                  ? 'bg-primary/10 ml-4' 
                  : 'bg-secondary/10 mr-4'
              }`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="bg-secondary/10 mr-4 p-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Ask about your AI impact results..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={isLoading || !currentMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
