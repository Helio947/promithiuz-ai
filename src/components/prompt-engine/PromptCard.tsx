
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
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
        <h3 className="font-medium text-sm">{prompt.title}</h3>
        <p className="text-xs text-muted-foreground">{prompt.description}</p>
        <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
          {prompt.category}
        </span>
      </div>
      
      <div className="bg-muted/50 rounded p-3 mb-3 text-xs text-muted-foreground max-h-[150px] overflow-y-auto">
        <p className="whitespace-pre-wrap">{prompt.prompt}</p>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <ThumbsUp className="h-3 w-3" />
            {prompt.likes}
          </button>
          <button 
            className={`flex items-center gap-1 transition-colors ${
              isFavorite ? "text-primary" : "hover:text-primary"
            }`}
            onClick={() => toggleFavorite(prompt.id)}
          >
            <Bookmark className="h-3 w-3" fill={isFavorite ? "currentColor" : "none"} />
            {prompt.saves}
          </button>
        </div>
        <button className="hover:text-primary transition-colors">
          <Share2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
