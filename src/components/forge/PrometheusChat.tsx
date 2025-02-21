
import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus } from "lucide-react";
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
      scrollToBottom();
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
    scrollToBottom();

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
    <div className="bg-white rounded-xl border p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold">Promithiuz AI</h3>
          <p className="text-sm text-gray-500">Your AI Guide</p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {quickTips.map((tip) => (
          <button
            key={tip}
            onClick={() => handleQuickTip(tip)}
            className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            {tip}
          </button>
        ))}
      </div>

      <div 
        ref={chatContainerRef}
        className="mb-4 h-[200px] overflow-y-auto space-y-3 border rounded-lg p-3"
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
                          <Plus className="h-3 w-3" />
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

      <form onSubmit={handleQuestionSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything about The Forge..."
          className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <Button type="submit" size="sm">Ask</Button>
      </form>
    </div>
  );
};
