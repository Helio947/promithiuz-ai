
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, Heart, Trash, ExternalLink } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Prompt } from "./CreatePromptDialog";
import { toast } from "sonner";

export interface PromptCardProps {
  prompt: Prompt;
  isOwner?: boolean;
  onDelete?: (id: number) => void;
  onLike?: (id: number) => void;
}

const PromptCard = ({ prompt, isOwner = false, onDelete, onLike }: PromptCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    toast.success("Prompt copied to clipboard!");
  };
  
  const handleDelete = () => {
    if (onDelete) {
      onDelete(prompt.id);
    }
  };
  
  const handleLike = () => {
    if (onLike) {
      onLike(prompt.id);
    }
  };
  
  const formattedDate = new Date(prompt.createdAt).toLocaleDateString();
  
  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <Badge variant="outline" className="mb-2">
              {prompt.category}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Heart className="h-4 w-4" />
              <span>{prompt.likes}</span>
            </div>
          </div>
          <CardTitle className="line-clamp-1">{prompt.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {prompt.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {prompt.content}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <div className="text-xs text-muted-foreground">{formattedDate}</div>
          <div className="flex gap-1">
            {isOwner && (
              <Button variant="ghost" size="icon" onClick={handleDelete}>
                <Trash className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={handleLike}>
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
            <DialogTrigger asChild onClick={() => setShowDetails(true)}>
              <Button variant="ghost" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </div>
        </CardFooter>
      </Card>
      
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{prompt.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Description</h3>
              <p className="text-sm text-muted-foreground">{prompt.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Prompt Content</h3>
              <Textarea 
                value={prompt.content} 
                readOnly 
                rows={10}
                className="font-mono"
              />
              <div className="flex justify-end mt-2">
                <Button size="sm" onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy to Clipboard
                </Button>
              </div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div>Category: {prompt.category}</div>
              <div>Created: {formattedDate}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PromptCard;
