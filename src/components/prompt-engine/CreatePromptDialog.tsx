
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
import { categories, promptStructureSections, sectionLabels, PromptSection } from "@/types/prompt-engine";
import { toast } from "@/components/ui/use-toast";
import { PlusCircle, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CreatePromptDialogProps {
  onPromptCreated: (prompt: any) => void;
}

const CreatePromptDialog = ({ onPromptCreated }: CreatePromptDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(categories[0]);
  const [prompt, setPrompt] = useState("");
  const [promptMode, setPromptMode] = useState<"simple" | "structured">("structured");
  const [structuredSections, setStructuredSections] = useState<Record<PromptSection, string>>({
    goal: "",
    returnFormat: "",
    warnings: "",
    contextDump: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPrompt = {
      id: Date.now().toString(),
      title,
      description,
      category,
      prompt: promptMode === "simple" ? prompt : generateStructuredPrompt(),
      structure: promptMode === "structured" ? structuredSections : undefined,
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

  const generateStructuredPrompt = () => {
    return Object.entries(structuredSections)
      .filter(([_, value]) => value.trim().length > 0)
      .map(([key, value]) => `${sectionLabels[key as PromptSection]}:\n${value}`)
      .join('\n\n');
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory(categories[0]);
    setPrompt("");
    setPromptMode("structured");
    setStructuredSections({
      goal: "",
      returnFormat: "",
      warnings: "",
      contextDump: ""
    });
  };

  const handleSectionChange = (section: PromptSection, value: string) => {
    setStructuredSections(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const sectionDescriptions: Record<PromptSection, string> = {
    goal: "What you want to achieve with this prompt. Be specific and direct.",
    returnFormat: "How you want the AI to structure its response. Define the exact format.",
    warnings: "Important caveats, instructions, or things to avoid. Help the AI avoid mistakes.",
    contextDump: "Additional background information to help the AI understand your situation better."
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
          
          <Tabs defaultValue="structured" value={promptMode} onValueChange={(v) => setPromptMode(v as "simple" | "structured")}>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Prompt Content</label>
              <TabsList>
                <TabsTrigger value="structured">Structured</TabsTrigger>
                <TabsTrigger value="simple">Simple</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="structured" className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-2">
                <p className="text-sm text-gray-700">Structured prompts are more effective because they clearly separate different aspects of your request.</p>
              </div>
              
              <TooltipProvider>
                {promptStructureSections.map((section) => (
                  <div key={section} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">{sectionLabels[section]}</label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{sectionDescriptions[section]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Textarea
                      value={structuredSections[section]}
                      onChange={(e) => handleSectionChange(section, e.target.value)}
                      placeholder={`Enter ${sectionLabels[section].toLowerCase()} here...`}
                      className={section === "contextDump" ? "min-h-[150px]" : "min-h-[100px]"}
                    />
                  </div>
                ))}
              </TooltipProvider>
            </TabsContent>

            <TabsContent value="simple">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="min-h-[300px] text-base leading-relaxed"
              />
              <p className="text-xs text-muted-foreground mt-2">
                For better results, consider using the structured format instead.
              </p>
            </TabsContent>
          </Tabs>
          
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
