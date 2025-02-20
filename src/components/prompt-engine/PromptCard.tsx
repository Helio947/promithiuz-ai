
import { Bookmark, Code2, EditIcon, MessageSquare, Share2, Zap } from "lucide-react";
import { Prompt } from "@/types/prompt-engine";
import { useUserPrompts } from "@/contexts/UserPromptsContext";

interface PromptCardProps {
  prompt: Prompt;
}

const categoryIcons: Record<string, JSX.Element> = {
  "Code Generation": <Code2 className="w-4 h-4" />,
  "Content Creation": <EditIcon className="w-4 h-4" />,
  "Chat & Dialogue": <MessageSquare className="w-4 h-4" />,
  "Automation": <Zap className="w-4 h-4" />,
};

const PromptCard = ({ prompt }: PromptCardProps) => {
  const { isFavorited, toggleFavorite } = useUserPrompts();
  const isFavorite = isFavorited(prompt.id);

  return (
    <div className="group bg-card rounded-xl border dark:border-white/10 p-5 card-hover">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold tracking-tight mb-1 group-hover:text-primary transition-colors">
              {prompt.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {prompt.description}
            </p>
          </div>
          <button 
            className={`text-xs transition-colors ${
              isFavorite ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
            onClick={() => toggleFavorite(prompt.id)}
          >
            <Bookmark 
              className="h-5 w-5" 
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {categoryIcons[prompt.category]}
            {prompt.category}
          </span>
        </div>
      </div>
      
      <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground max-h-[150px] overflow-y-auto">
        <p className="whitespace-pre-wrap font-mono text-xs">{prompt.prompt}</p>
      </div>

      <div className="mt-4 pt-3 border-t dark:border-white/10">
        <button className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
          <Share2 className="w-4 h-4" />
          Share Prompt
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
