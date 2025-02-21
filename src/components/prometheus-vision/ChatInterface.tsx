
import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/prometheus-vision";
import { useToast } from "@/components/ui/use-toast";
import { generateAIResponse } from "@/utils/ai-service";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import SuggestedQueries from "./SuggestedQueries";

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
  const { toast } = useToast();

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
        await new Promise(resolve => setTimeout(resolve, 100));
        paragraphContent += (paragraphContent ? ' ' : '') + word;
        currentContent = [...paragraphs, paragraphContent].join('\n\n');
        
        setMessages(prev => prev.map(msg =>
          msg.id === messageId
            ? { ...msg, content: currentContent }
            : msg
        ));
      }
      
      paragraphs.push(paragraphContent);
      await new Promise(resolve => setTimeout(resolve, 500));
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

  return (
    <div className="bg-white rounded-lg shadow-sm h-[600px] flex flex-col">
      {messages.length === 0 && showSuggestions ? (
        <SuggestedQueries 
          queries={suggestedQueries} 
          onSelectQuery={handleSendMessage}
        />
      ) : (
        <MessageList 
          messages={messages} 
          isTyping={isTyping} 
        />
      )}
      <div ref={messagesEndRef} />
      <MessageInput 
        input={input}
        setInput={setInput}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatInterface;

