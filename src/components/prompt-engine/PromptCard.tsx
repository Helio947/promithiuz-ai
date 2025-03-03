
import { Bookmark, Code2, EditIcon, MessageSquare, Share2, Zap, Copy } from "lucide-react";
import { Prompt, sectionLabels, sectionColors, PromptSection, promptStructureSections } from "@/types/prompt-engine";
import { useUserPrompts } from "@/contexts/UserPromptsContext";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt.prompt);
    toast({
      title: "Copied to clipboard",
      description: "Prompt copied to your clipboard",
    });
  };

  // Determine if this prompt uses structured format
  const hasStructure = prompt.structure && Object.values(prompt.structure).some(section => section);

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
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Bookmark 
              className="h-5 w-5" 
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {categoryIcons[prompt.category] || <MessageSquare className="w-4 h-4" />}
            {prompt.category}
          </span>
        </div>
      </div>
      
      <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground max-h-[250px] overflow-y-auto">
        {hasStructure ? (
          <div className="space-y-3">
            {promptStructureSections.map((section) => {
              const content = prompt.structure?.[section];
              if (!content) return null;
              
              return (
                <div key={section} className="space-y-1">
                  <div className="flex items-center">
                    <div className={`w-1.5 h-8 ${sectionColors[section]} rounded-sm mr-2`}></div>
                    <h4 className="text-sm font-medium">{sectionLabels[section]}</h4>
                  </div>
                  <p className="whitespace-pre-wrap font-mono text-xs pl-3.5">{content}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="whitespace-pre-wrap font-mono text-xs">{prompt.prompt}</p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t dark:border-white/10 flex justify-between">
        <button 
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          onClick={copyPrompt}
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
        <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
