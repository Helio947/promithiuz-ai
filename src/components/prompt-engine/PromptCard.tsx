
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import { Prompt } from "@/types/prompt-engine";

interface PromptCardProps {
  prompt: Prompt;
}

const PromptCard = ({ prompt }: PromptCardProps) => {
  return (
    <div className="bg-white rounded-xl border p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold mb-2">{prompt.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{prompt.description}</p>
          <span className="inline-block px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
            {prompt.category}
          </span>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-[300px] overflow-y-auto">
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{prompt.prompt}</p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <ThumbsUp className="h-4 w-4" />
            {prompt.likes}
          </button>
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <Bookmark className="h-4 w-4" />
            {prompt.saves}
          </button>
        </div>
        <button className="hover:text-primary transition-colors">
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
