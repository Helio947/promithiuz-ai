
import { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/types/forge";
import { quickTips } from "@/constants/forge";
import { cn } from "@/lib/utils";

interface PrometheusChatProps {
  onAddBlock: (blockType: string) => void;
}

export const PrometheusChat = ({ onAddBlock }: PrometheusChatProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-message',
      content: "Welcome to The Forge! How can I help you build your workflow today?",
      sender: 'prometheus',
      timestamp: new Date(),
    },
  ]);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Process user input and generate contextual responses
  const getResponseForQuestion = (userQuestion: string): { 
    responseText: string; 
    blocks?: Array<{ type: string; label: string }> 
  } => {
    // Convert to lowercase for easier matching
    const lcQuestion = userQuestion.toLowerCase();
    
    // Connection-related questions
    if (lcQuestion.includes('connect') && lcQuestion.includes('block')) {
      return {
        responseText: "To connect blocks, drag from the output handle of one block to the input handle of another. This creates a workflow where data flows from one block to the next."
      };
    }
    
    // Color-related questions
    if (lcQuestion.includes('color') || lcQuestion.includes('colours')) {
      return {
        responseText: "Different colors represent different block types: blue for data processing, purple for AI tasks, green for outputs, and orange for integrations."
      };
    }
    
    // Test-related questions
    if (lcQuestion.includes('test') || lcQuestion.includes('testing')) {
      return {
        responseText: "You can test your workflow by clicking the 'Test Run' button in the top menu. This will simulate your workflow without actually executing external actions."
      };
    }
    
    // Example workflow questions
    if (lcQuestion.includes('example') || lcQuestion.includes('template') || lcQuestion.includes('sample')) {
      return {
        responseText: "You can use one of our templates from the library on the right. Would you like to add a basic Chat Response block to get started?",
        blocks: [{ type: 'chat-response', label: 'Chat Response' }]
      };
    }
    
    // Questions about specific blocks
    if (lcQuestion.includes('email')) {
      return {
        responseText: "The Email block lets you send automated emails based on triggers. Would you like to add it to your workflow?",
        blocks: [{ type: 'send-email', label: 'Send Email' }]
      };
    }
    
    if (lcQuestion.includes('image') || lcQuestion.includes('picture')) {
      return {
        responseText: "The Image Generation block can create images based on text prompts. Would you like to add it to your workflow?",
        blocks: [{ type: 'generate-image', label: 'Generate Image' }]
      };
    }
    
    if (lcQuestion.includes('analyze') || lcQuestion.includes('text') || lcQuestion.includes('process')) {
      return {
        responseText: "The Text Analysis block can examine text for sentiment, entities, and key information. Would you like to add it?",
        blocks: [{ type: 'analyze-text', label: 'Analyze Text' }]
      };
    }
    
    // Handle sales related questions
    if (lcQuestion.includes('sales') || lcQuestion.includes('customer') || lcQuestion.includes('lead')) {
      return {
        responseText: "I can help you build a workflow for sales automation. You might want to start with a Lead Qualification block or Email block. What specific part of your sales process are you automating?",
        blocks: [
          { type: 'analyze-data', label: 'Lead Qualification' },
          { type: 'send-email', label: 'Send Email' }
        ]
      };
    }
    
    // Simple greetings
    if (lcQuestion.includes('hello') || lcQuestion.includes('hi') || lcQuestion.includes('hey')) {
      return {
        responseText: "Hello! I'm here to help you build your workflow. What kind of automation are you trying to create today?"
      };
    }
    
    // Fall back to a general response with suggestion
    return {
      responseText: "I can help you build a workflow for that. You might want to start with a basic block like Chat Response. What specific task are you trying to automate?",
      blocks: [{ type: 'chat-response', label: 'Chat Response' }]
    };
  };

  // Fixed typing simulation to prevent duplicates
  const simulateTyping = (response: string, mentionedBlocks: Array<{ type: string; label: string }> = []) => {
    // Generate a unique ID that won't conflict with other messages
    const tempId = `prometheus-${Date.now()}`;
    
    // First add a typing indicator
    setMessages(prev => [...prev, {
      id: tempId,
      content: '',
      sender: 'prometheus',
      timestamp: new Date(),
      isTyping: true,
    }]);

    // Then replace the typing indicator with the actual message after a delay
    setTimeout(() => {
      setMessages(prev => {
        // Find and replace the typing indicator message
        return prev.map(msg => 
          msg.id === tempId 
          ? {
              ...msg,
              content: response,
              isTyping: false,
              mentionedBlocks,
            }
          : msg
        );
      });
    }, 800); // Shorter typing delay for better UX
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Add user message with unique ID
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: question,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Get contextual response based on user question
    const { responseText, blocks } = getResponseForQuestion(question);
    
    // Clear input field first
    setQuestion('');
    
    // Then show the AI response
    simulateTyping(responseText, blocks);
  };

  const handleQuickTip = (tip: string) => {
    setQuestion(tip);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm flex flex-col h-[400px]">
      {/* Header */}
      <div className="p-3 border-b flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-primary" />
        <h3 className="font-medium text-sm">Promithiuz AI</h3>
      </div>

      {/* Chat Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-3"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "rounded-lg p-2 text-sm",
              message.sender === 'user' 
                ? "bg-primary/10 ml-4" 
                : "bg-secondary/10 mr-4"
            )}
          >
            {message.isTyping ? (
              <div className="flex space-x-1 items-center h-6">
                <span className="animate-pulse">...</span>
              </div>
            ) : (
              <>
                <p>{message.content}</p>
                {message.mentionedBlocks && message.mentionedBlocks.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.mentionedBlocks.map((block, index) => (
                      <Button
                        key={`${block.type}-${index}`}
                        size="sm"
                        variant="outline"
                        onClick={() => onAddBlock(block.type)}
                        className="mt-1 h-7 text-xs"
                      >
                        Add {block.label}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="px-3 py-2 border-t flex gap-2 overflow-x-auto no-scrollbar">
        {quickTips.slice(0, 2).map((tip, index) => (
          <button
            key={`tip-${index}`}
            onClick={() => handleQuickTip(tip)}
            className="text-xs whitespace-nowrap px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            {tip}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleQuestionSubmit} className="p-3 border-t flex gap-2">
        <Input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 text-sm"
        />
        <Button type="submit" size="icon" className="shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
