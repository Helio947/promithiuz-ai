
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
      id: '1',
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

  const simulateTyping = (response: string, mentionedBlocks: Array<{ type: string; label: string }> = []) => {
    const tempId = Date.now().toString();
    
    setMessages(prev => [...prev, {
      id: tempId,
      content: '',
      sender: 'prometheus',
      timestamp: new Date(),
      isTyping: true,
    }]);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === tempId 
          ? {
              ...msg,
              content: response,
              isTyping: false,
              mentionedBlocks,
            }
          : msg
      ));
    }, 1500);
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: question,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setQuestion('');

    simulateTyping(
      "I'll help you with that! You can start by adding blocks to your workflow.",
      [{ type: 'chat-response', label: 'Chat Response' }]
    );
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
                  <div className="mt-2">
                    {message.mentionedBlocks.map((block) => (
                      <Button
                        key={block.type}
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
        {quickTips.slice(0, 3).map((tip) => (
          <button
            key={tip}
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
