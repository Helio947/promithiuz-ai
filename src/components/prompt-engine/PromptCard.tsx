
import { Bookmark, MessageSquare, Copy } from "lucide-react";
import { Prompt, sectionLabels, sectionColors, promptStructureSections } from "@/types/prompt-engine";
import { useUserPrompts } from "@/contexts/UserPromptsContext";
import { useToast } from "@/components/ui/use-toast";

interface PromptCardProps {
  prompt: Prompt;
}

const categoryIcons: Record<string, JSX.Element> = {
  "Marketing": <MessageSquare className="w-4 h-4" />,
  "Sales": <MessageSquare className="w-4 h-4" />,
  "Customer Service": <MessageSquare className="w-4 h-4" />,
  "Content Creation": <MessageSquare className="w-4 h-4" />,
  "Product Development": <MessageSquare className="w-4 h-4" />,
  "HR": <MessageSquare className="w-4 h-4" />,
  "Data Analysis": <MessageSquare className="w-4 h-4" />,
  "AI Training": <MessageSquare className="w-4 h-4" />,
  "Image Generation": <MessageSquare className="w-4 h-4" />,
  "Translation": <MessageSquare className="w-4 h-4" />,
  "General Business": <MessageSquare className="w-4 h-4" />,
  "Social Media": <MessageSquare className="w-4 h-4" />,
};

const PromptCard = ({ prompt }: PromptCardProps) => {
  const { isFavorited, toggleFavorite } = useUserPrompts();
  const isFavorite = isFavorited(prompt.id);
  const { toast } = useToast();

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt.prompt);
    toast({
      title: "Copied",
      description: "Prompt copied to clipboard",
    });
  };

  // Determine if this prompt uses structured format
  const hasStructure = prompt.structure && Object.values(prompt.structure).some(section => section);

  return (
    <div className="bg-white rounded-lg border shadow-sm hover:shadow p-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-medium mb-1">
              {prompt.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {prompt.description}
            </p>
          </div>
          <button 
            className={`text-xs transition-colors ${
              isFavorite ? "text-primary" : "text-gray-400 hover:text-primary"
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
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {categoryIcons[prompt.category] || <MessageSquare className="w-3 h-3" />}
            {prompt.category}
          </span>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm text-gray-600 max-h-[200px] overflow-y-auto">
        {hasStructure ? (
          <div className="space-y-3">
            {promptStructureSections.map((section) => {
              const content = prompt.structure?.[section];
              if (!content) return null;
              
              return (
                <div key={section} className="space-y-1">
                  <div className="flex items-center">
                    <div className={`w-1.5 h-6 ${sectionColors[section]} rounded-sm mr-2`}></div>
                    <h4 className="text-xs font-medium">{sectionLabels[section]}</h4>
                  </div>
                  <p className="whitespace-pre-wrap text-xs pl-3.5">{content}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-xs">{prompt.prompt}</p>
        )}
      </div>

      <div className="mt-3 pt-2 border-t flex justify-end">
        <button 
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
          onClick={copyPrompt}
        >
          <Copy className="w-3.5 h-3.5" />
          Copy prompt
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
