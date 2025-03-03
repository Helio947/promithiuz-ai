
import { useState } from "react";
import { UserPromptsProvider } from "@/contexts/UserPromptsContext";
import Header from "@/components/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Wand2, Sparkles } from "lucide-react";
import { promptStructureSections, sectionLabels, sectionColors } from "@/types/prompt-engine";

const PromptCodexContent = () => {
  const [userGoal, setUserGoal] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<Record<string, string> | null>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!userGoal.trim()) {
      toast({
        title: "Please describe your goal",
        description: "Tell Prompt Codex what you're trying to accomplish",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    
    // Simulate prompt generation (in a real app, this would call an AI service)
    setTimeout(() => {
      const generatedPrompt = {
        goal: `Create highly effective content for ${userGoal}`,
        returnFormat: `Deliver a comprehensive, well-structured output with clear sections, actionable insights, and professional formatting.`,
        warnings: `Avoid generic advice, industry jargon, or unsubstantiated claims. Ensure all content is accurate, ethical, and appropriate for the intended audience.`,
        contextDump: `This content will be used by professionals looking to improve their ${userGoal} capabilities and outcomes. The audience has basic familiarity with the topic but needs clear, practical guidance.`
      };
      
      setGeneratedPrompt(generatedPrompt);
      setGenerating(false);
    }, 1500);
  };

  const copyPrompt = () => {
    if (!generatedPrompt) return;
    
    const formattedPrompt = Object.entries(generatedPrompt)
      .map(([key, value]) => `${sectionLabels[key as keyof typeof sectionLabels]}:\n${value}`)
      .join('\n\n');
      
    navigator.clipboard.writeText(formattedPrompt);
    
    toast({
      title: "Copied to clipboard",
      description: "Your prompt is ready to use with any AI tool",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <Wand2 className="h-12 w-12 text-primary" />
                <Sparkles className="h-6 w-6 text-amber-400 absolute -top-1 -right-1" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Prompt Codex</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Instantly create perfect AI prompts for any goal using our proven framework
            </p>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
            <p className="text-sm mb-6">
              Prompt Codex creates universal prompts with four simple parts that help AI tools understand exactly what you need:
            </p>
            <div className="grid grid-cols-2 gap-4">
              {promptStructureSections.map((section) => (
                <div key={section} className="flex items-start space-x-3">
                  <div className={`${sectionColors[section]} w-2 h-6 rounded mt-0.5 flex-shrink-0`}></div>
                  <div>
                    <h3 className="font-medium text-sm">{sectionLabels[section]}</h3>
                    <p className="text-xs text-gray-500">
                      {section === "goal" && "What you want to achieve"}
                      {section === "returnFormat" && "How you want it presented"}
                      {section === "warnings" && "Things to avoid or be careful about"}
                      {section === "contextDump" && "Background information that helps"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="font-medium">
                What do you want to create a prompt for?
              </label>
              <Textarea
                value={userGoal}
                onChange={(e) => setUserGoal(e.target.value)}
                placeholder="e.g., 'Creating engaging social media posts for my coffee shop' or 'Analyzing customer feedback data to find patterns'"
                className="min-h-[100px]"
              />
              <Button 
                onClick={handleGenerate}
                className="w-full"
                disabled={generating}
              >
                {generating ? (
                  <>
                    <span className="mr-2">Generating...</span>
                    <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Perfect Prompt
                  </>
                )}
              </Button>
            </div>
            
            {generatedPrompt && (
              <div className="bg-gray-50 rounded-lg border p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Your Universal Prompt</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyPrompt}
                    className="h-8"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All
                  </Button>
                </div>
                
                <Tabs defaultValue="structured">
                  <TabsList className="mb-2">
                    <TabsTrigger value="structured">Structured</TabsTrigger>
                    <TabsTrigger value="complete">Complete</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="structured" className="space-y-4">
                    {promptStructureSections.map((section) => (
                      <div key={section} className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className={`${sectionColors[section]} w-2 h-5 rounded`}></div>
                          <h4 className="text-sm font-medium">{sectionLabels[section]}</h4>
                        </div>
                        <p className="text-sm pl-4 whitespace-pre-wrap">
                          {generatedPrompt[section]}
                        </p>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="complete">
                    <div className="text-sm whitespace-pre-wrap">
                      {Object.entries(generatedPrompt)
                        .map(([key, value]) => `${sectionLabels[key as keyof typeof sectionLabels]}:\n${value}`)
                        .join('\n\n')}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const PromptCodex = () => {
  return (
    <UserPromptsProvider>
      <PromptCodexContent />
    </UserPromptsProvider>
  );
};

export default PromptCodex;
