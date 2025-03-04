
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Heart, Trash2 } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface PromptCardProps {
  prompt: {
    id: number | string;
    title: string;
    description: string;
    content: string;
    category: string;
    likes: number;
  };
  isOwner: boolean;
  onDelete: (promptId: number | string) => void;
  onLike: (promptId: number | string) => void;
}

const PromptCard = ({ prompt, isOwner, onDelete, onLike }: PromptCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{prompt.title}</CardTitle>
          <Badge variant="outline">{prompt.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-2 flex-grow">
        <p className="text-gray-600 text-sm">{prompt.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <TooltipProvider>
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-500"
                  onClick={() => onLike(prompt.id)}
                >
                  <Heart className="h-4 w-4 mr-1" />
                  <span>{prompt.likes}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Like this prompt</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        {isOwner && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500"
                  onClick={() => onDelete(prompt.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete prompt</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardFooter>
    </Card>
  );
};

export default PromptCard;
