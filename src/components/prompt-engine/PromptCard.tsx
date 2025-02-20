
import { Bookmark } from "lucide-react";
import { Prompt } from "@/types/prompt-engine";
import { useUserPrompts } from "@/contexts/UserPromptsContext";

interface PromptCardProps {
  prompt: Prompt;
}

const PromptCard = ({ prompt }: PromptCardProps) => {
  const { isFavorited, toggleFavorite } = useUserPrompts();
  const isFavorite = isFavorited(prompt.id);

  return (
    <div className="bg-card rounded-lg border p-4 hover:shadow-sm transition-shadow">
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">{prompt.title}</h3>
          <button 
            className={`text-xs transition-colors ${
              isFavorite ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
            onClick={() => toggleFavorite(prompt.id)}
          >
            <Bookmark className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground">{prompt.description}</p>
        <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
          {prompt.category}
        </span>
      </div>
      
      <div className="bg-muted/50 rounded p-3 text-xs text-muted-foreground max-h-[150px] overflow-y-auto">
        <p className="whitespace-pre-wrap">{prompt.prompt}</p>
      </div>
    </div>
  );
};

export default PromptCard;
