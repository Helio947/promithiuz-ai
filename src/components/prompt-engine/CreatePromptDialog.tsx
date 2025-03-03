
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories, promptStructureSections, sectionLabels, PromptSection } from "@/types/prompt-engine";
import { toast } from "@/components/ui/use-toast";
import { PlusCircle, HelpCircle } from "lucide-react";
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
      title: "Success!",
      description: "Your prompt has been created.",
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
    goal: "What you want the AI to do",
    returnFormat: "How you want the response to look",
    warnings: "Things the AI should avoid",
    contextDump: "Background information the AI should know"
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
          <DialogTitle className="text-xl">Create New Prompt</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name your prompt</label>
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., 'Customer Support Email Generator'"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Short description</label>
            <Input
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this prompt help with?"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
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
          </div>
          
          <Tabs defaultValue="structured" value={promptMode} onValueChange={(v) => setPromptMode(v as "simple" | "structured")}>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Prompt Content</label>
              <TabsList>
                <TabsTrigger value="structured">Structured</TabsTrigger>
                <TabsTrigger value="simple">Free Text</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="structured" className="space-y-4">              
              <TooltipProvider>
                {promptStructureSections.map((section) => (
                  <div key={section} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium flex items-center">
                        {sectionLabels[section]}
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-3 w-3 ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{sectionDescriptions[section]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </label>
                    </div>
                    <Textarea
                      value={structuredSections[section]}
                      onChange={(e) => handleSectionChange(section, e.target.value)}
                      placeholder={sectionDescriptions[section]}
                      className={section === "contextDump" ? "min-h-[100px]" : "min-h-[80px]"}
                    />
                  </div>
                ))}
              </TooltipProvider>
            </TabsContent>

            <TabsContent value="simple">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Write your prompt here..."
                className="min-h-[300px]"
              />
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
            <Button type="submit">
              Create Prompt
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePromptDialog;
