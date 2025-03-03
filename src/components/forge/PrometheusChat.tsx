
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
      content: "Welcome to The Forge! I'm Promithiuz AI, your AI guide. How can I help you build your workflow today?",
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

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
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

    // Simulated AI response
    simulateTyping(
      "I'll help you with that! You can start by dragging blocks from the toolbox to the canvas. Each block has a specific purpose.",
      [{ type: 'chat-response', label: 'Chat Response' }]
    );

    toast({
      title: "Message sent",
      description: "Promithiuz AI is thinking about your question...",
    });
  };

  const handleQuickTip = (tip: string) => {
    setQuestion(tip);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <MessageSquare className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Promithiuz AI</h3>
          <p className="text-xs text-gray-500">Your AI Guide</p>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="px-4 py-3 flex flex-wrap gap-2 border-b">
        {quickTips.map((tip) => (
          <button
            key={tip}
            onClick={() => handleQuickTip(tip)}
            className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            {tip}
          </button>
        ))}
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
              "rounded-lg p-3 text-sm",
              message.sender === 'user' 
                ? "bg-primary/10 ml-4" 
                : "bg-secondary/10 mr-4"
            )}
          >
            {message.isTyping ? (
              <div className="flex space-x-1 items-center h-6">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            ) : (
              <>
                <p className="mb-1">{message.content}</p>
                {message.mentionedBlocks && message.mentionedBlocks.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.mentionedBlocks.map((block) => (
                      <div
                        key={block.type}
                        className="flex items-center justify-between bg-white rounded p-2 border text-xs"
                      >
                        <span>{block.label}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onAddBlock(block.type)}
                          className="h-6 px-2"
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <span className="text-[10px] text-gray-500 mt-1 inline-block">
                  {formatTimestamp(message.timestamp)}
                </span>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleQuestionSubmit} className="p-3 border-t flex gap-2">
        <Input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything about The Forge..."
          className="flex-1 text-sm"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
