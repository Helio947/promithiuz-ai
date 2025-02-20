
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/types/prompt-engine";
import { toast } from "@/components/ui/use-toast";
import { PlusCircle } from "lucide-react";

interface CreatePromptDialogProps {
  onPromptCreated: (prompt: any) => void;
}

const CreatePromptDialog = ({ onPromptCreated }: CreatePromptDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(categories[0]);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPrompt = {
      id: Date.now().toString(),
      title,
      description,
      category,
      prompt,
      saves: 0,
      likes: 0
    };

    onPromptCreated(newPrompt);
    setIsOpen(false);
    resetForm();
    
    toast({
      title: "Success! 🎉",
      description: "Your prompt has been created and shared with the community.",
    });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory(categories[0]);
    setPrompt("");
  };

  const examplePrompts = {
    Marketing: "Write a compelling social media post about [product] that highlights its unique value proposition...",
    Sales: "Create a follow-up email template for prospects who attended our product demo...",
    "Content Creation": "Generate an engaging blog post outline about [topic] that includes key statistics and case studies..."
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-8 right-8 rounded-full shadow-lg gap-2">
          <PlusCircle className="w-5 h-5" />
          Create Prompt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Prompt</DialogTitle>
          <DialogDescription className="text-base">
            Share your expertise with the community. Create a prompt that others can use to achieve better results with AI.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Prompt Title</label>
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., 'Customer Support Email Generator' or 'Blog Post Outline Creator'"
              className="text-base"
            />
            <p className="text-xs text-muted-foreground">
              A clear, descriptive title helps others find your prompt easily
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Brief Description</label>
            <Input
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this prompt help users achieve?"
              className="text-base"
            />
            <p className="text-xs text-muted-foreground">
              Explain the purpose and benefits of your prompt in a sentence
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              Choose the most relevant category for your prompt
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Prompt Content</label>
            <Textarea
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={examplePrompts[category as keyof typeof examplePrompts] || "Enter your prompt here..."}
              className="min-h-[200px] text-base leading-relaxed"
            />
            <p className="text-xs text-muted-foreground">
              Write your prompt template. Use [brackets] for variables that users should replace.
              Make it detailed and specific for better results.
            </p>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="px-8"
            >
              Create Prompt
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePromptDialog;
