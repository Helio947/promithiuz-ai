
import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/prometheus-vision";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateAIResponse } from "@/utils/ai-service";

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}

const suggestedQueries = [
  "How is our revenue trending?",
  "Show top products",
  "Customer satisfaction",
  "Campaign performance"
];

const ChatInterface = ({ messages, setMessages, isTyping, setIsTyping }: ChatInterfaceProps) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const addMessageWithWordByWord = async (sentences: string[]) => {
    const messageId = Date.now().toString();
    let currentContent = '';
    let paragraphs: string[] = [];
    
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: currentContent,
      id: messageId,
      timestamp: new Date()
    }]);

    for (const sentence of sentences) {
      const words = sentence.split(' ');
      let paragraphContent = '';
      
      for (const word of words) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Faster word typing
        paragraphContent += (paragraphContent ? ' ' : '') + word;
        currentContent = [...paragraphs, paragraphContent].join('\n\n');
        
        setMessages(prev => prev.map(msg =>
          msg.id === messageId
            ? { ...msg, content: currentContent }
            : msg
        ));
      }
      
      paragraphs.push(paragraphContent);
      await new Promise(resolve => setTimeout(resolve, 500)); // Pause between sentences
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
      await addMessageWithWordByWord(aiResponse);
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
    <div className="bg-white rounded-lg shadow-sm h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            <div className={cn(
              "flex",
              message.role === 'user' ? "justify-end" : "justify-start"
            )}>
              <div className={cn(
                "max-w-[80%] px-4 py-2 rounded-lg text-sm",
                message.role === 'user' 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-800 whitespace-pre-wrap"
              )}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-1 px-4">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
        {messages.length === 0 && showSuggestions && (
          <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
            <p className="text-sm text-gray-500">Try asking about your business metrics</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(query)}
                  className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className={cn(
              "flex-1 text-sm rounded-lg border",
              "px-4 py-2",
              "placeholder:text-gray-400",
              "focus:outline-none focus:ring-1 focus:ring-primary",
              "transition-all duration-200",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            disabled={isLoading}
          />
          <Button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
