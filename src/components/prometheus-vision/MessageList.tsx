
import { Message } from "@/types/prometheus-vision";
import { cn } from "@/lib/utils";

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList = ({ messages, isTyping }: MessageListProps) => {
  return (
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
    </div>
  );
};

export default MessageList;

