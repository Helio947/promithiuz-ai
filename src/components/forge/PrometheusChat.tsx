
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { quickTips } from "@/constants/forge";
import { ChatMessage } from "./ChatMessage";
import { QuickTips } from "./QuickTips";
import { useChat } from "@/hooks/use-chat";

interface PrometheusChatProps {
  onAddBlock: (blockType: string) => void;
  onCreateWorkflow: (nodes: any[], edges: any[]) => void;
}

export const PrometheusChat = ({ onAddBlock, onCreateWorkflow }: PrometheusChatProps) => {
  const { 
    chatContainerRef, 
    question, 
    setQuestion, 
    messages, 
    handleQuestionSubmit 
  } = useChat(onCreateWorkflow);
  
  const { toast } = useToast();

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
          <ChatMessage 
            key={message.id} 
            message={message}
            onAddBlock={onAddBlock}
          />
        ))}
      </div>

      {/* Quick Tips */}
      <QuickTips 
        tips={quickTips}
        onTipClick={handleQuickTip}
      />

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
