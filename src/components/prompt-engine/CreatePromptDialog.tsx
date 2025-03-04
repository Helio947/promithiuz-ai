
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { allCategories } from "@/data/prompts";

export interface Prompt {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  likes: number;
  userId: string;
  createdAt: string;
}

export interface CreatePromptDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCreatePrompt?: (newPrompt: Prompt) => void;
  onPromptCreated?: (newPrompt: Prompt) => void;
  categories?: string[];
}

const CreatePromptDialog = ({ 
  isOpen, 
  onClose, 
  onCreatePrompt, 
  onPromptCreated,
  categories = allCategories.filter(cat => cat !== 'All')
}: CreatePromptDialogProps) => {
  const [open, setOpen] = useState(isOpen || false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0]);

  // Update open state when isOpen prop changes
  useEffect(() => {
    if (isOpen !== undefined) {
      setOpen(isOpen);
    }
  }, [isOpen]);

  // Handle external close requests
  useEffect(() => {
    if (!open && onClose) {
      onClose();
    }
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPrompt: Prompt = {
      id: Date.now(),
      title,
      description,
      content,
      category,
      likes: 0,
      userId: "currentUser", // In a real app, this would come from authentication
      createdAt: new Date().toISOString(),
    };
    
    // Support both callback naming conventions
    if (onPromptCreated) onPromptCreated(newPrompt);
    if (onCreatePrompt) onCreatePrompt(newPrompt);
    
    setOpen(false);
    
    // Reset form
    setTitle("");
    setDescription("");
    setContent("");
    setCategory(categories[0]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Create Prompt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Prompt</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter prompt title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what this prompt does"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Prompt Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the actual prompt template..."
              rows={5}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Prompt</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePromptDialog;
