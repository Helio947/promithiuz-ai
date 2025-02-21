
import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/prometheus-vision";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Send, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateAIResponse } from "@/utils/ai-service";

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const suggestedQueries = [
  "How is our revenue trending?",
  "Show top products",
  "Customer satisfaction",
  "Campaign performance"
];

const ChatInterface = ({ messages, setMessages }: ChatInterfaceProps) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addMessageWithDelay = async (sentences: string[]) => {
    const messageId = Date.now().toString();
    let currentContent = '';

    setMessages(prev => [...prev, {
      role: 'assistant',
      content: currentContent,
      id: messageId,
      timestamp: new Date()
    }]);

    for (const sentence of sentences) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      currentContent += (currentContent ? ' ' : '') + sentence;
      
      setMessages(prev => prev.map(msg =>
        msg.id === messageId
          ? { ...msg, content: currentContent }
          : msg
      ));
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage = content.trim();
    setInput('');
    setShowSuggestions(false);
    
    const newMessage = {
      role: 'user' as const,
      content: userMessage,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(userMessage);
      await addMessageWithDelay(aiResponse);
    } catch (error) {
      toast({
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  return (
    <div className="bg-white/80 rounded-xl shadow-sm p-4 h-[600px] flex flex-col backdrop-blur-sm border border-gray-100">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-100">
        <MessageSquare className="h-5 w-5 text-gray-400" />
        <h2 className="text-base font-medium text-gray-700">Ask Promithiuz AI</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 scroll-smooth">
        {messages.map((message) => (
          <div key={message.id}>
            <div className={cn(
              "group flex flex-col space-y-1",
              message.role === 'user' ? "items-end" : "items-start"
            )}>
              <div className={cn(
                "px-3 py-2 rounded-lg max-w-[85%] text-sm",
                message.role === 'user' 
                  ? "bg-gray-100 text-gray-800" 
                  : "bg-white border border-gray-100 text-gray-700",
                "animate-in fade-in-0 duration-200"
              )}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-1 px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <MessageSquare className="h-6 w-6 text-gray-300" />
            <p className="text-sm text-gray-500">Ask me anything about your business</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {showSuggestions && (
        <div className="border-t border-gray-100 py-3 -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {suggestedQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(query)}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors whitespace-nowrap"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="flex gap-2 pt-3 border-t border-gray-100"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask a question..."
          className={cn(
            "flex-1 text-sm rounded-lg border border-gray-200",
            "px-3 py-2",
            "placeholder:text-gray-400",
            "focus:outline-none focus:border-gray-300",
            "transition-all duration-200",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
          disabled={isLoading}
        />
        <Button 
          type="submit"
          disabled={isLoading || !input.trim()}
          className={cn(
            "bg-gray-900 hover:bg-gray-800",
            "rounded-lg px-3 py-2",
            "transition-all duration-200",
            "disabled:opacity-50"
          )}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;

