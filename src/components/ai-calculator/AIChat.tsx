
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
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { 
          prompt: `Based on these calculations for a business:
            - Monthly Labor Cost Savings: $${savings.laborCostSavings.toLocaleString()}
            - Monthly Time Saved: ${savings.timeSavings.toLocaleString()} hours
            - Monthly Efficiency Hours Gained: ${savings.efficiencyImprovement.toLocaleString()}
            - Potential Monthly Revenue Increase: $${savings.revenueIncrease.toLocaleString()}
            
            For a business with ${inputs.totalEmployees} employees at $${inputs.averageHourlyCost}/hour.
            
            Question: ${currentMessage}
            
            Please provide a concise, specific answer based only on these metrics and calculations.`
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
