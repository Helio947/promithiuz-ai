
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

const MessageInput = ({ input, setInput, onSendMessage, isLoading }: MessageInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage(input);
    }
  };

  return (
    <div className="p-4 border-t">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSendMessage(input);
        }}
        className="flex gap-2"
      >
        <input
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
  );
};

export default MessageInput;

