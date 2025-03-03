
import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/prompt-engine/SearchBar";
import CategoryFilter from "@/components/prompt-engine/CategoryFilter";
import PromptCard from "@/components/prompt-engine/PromptCard";
import CreatePromptDialog from "@/components/prompt-engine/CreatePromptDialog";
import { samplePrompts } from "@/data/prompts";
import { UserPromptsProvider, useUserPrompts } from "@/contexts/UserPromptsContext";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, Upload, Lightbulb } from "lucide-react";
import { Prompt } from "@/types/prompt-engine";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PromptEngineContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const { isFavorited } = useUserPrompts();
  const [userPrompts, setUserPrompts] = useState<Prompt[]>(() => {
    const saved = localStorage.getItem("userPrompts");
    return saved ? JSON.parse(saved) : [];
  });

  // Combine sample and user prompts
  const allPrompts = [...samplePrompts, ...userPrompts];

  const filteredPrompts = allPrompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || prompt.category === selectedCategory;
    const matchesFavorites = !showFavorites || isFavorited(prompt.id);
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const handlePromptCreated = (newPrompt: Prompt) => {
    setUserPrompts(prev => {
      const updated = [...prev, newPrompt];
      localStorage.setItem("userPrompts", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Simplified header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            Prompt Library
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Ready-to-use AI prompts that get better results
          </p>
        </div>

        <div className="bg-white border rounded-lg p-4 mb-8 max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-sm">How to use these prompts</h3>
              <p className="text-sm text-gray-600 mt-1">
                Each prompt has four simple parts that help AI understand exactly what you need:
              </p>
              <ul className="mt-2 space-y-1">
                <li className="text-xs flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-medium">Goal</span>
                  <span className="text-gray-500 ml-2">What you want</span>
                </li>
                <li className="text-xs flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  <span className="font-medium">Format</span>
                  <span className="text-gray-500 ml-2">How you want it</span>
                </li>
                <li className="text-xs flex items-center">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                  <span className="font-medium">Warnings</span>
                  <span className="text-gray-500 ml-2">Things to avoid</span>
                </li>
                <li className="text-xs flex items-center">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                  <span className="font-medium">Context</span>
                  <span className="text-gray-500 ml-2">Background info</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="max-w-2xl mx-auto space-y-4 mb-8">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <TooltipProvider>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Coming soon</p>
                  </TooltipContent>
                </Tooltip>
              
                <Button
                  variant={showFavorites ? "default" : "outline"}
                  onClick={() => setShowFavorites(!showFavorites)}
                  size="sm"
                  className="shrink-0"
                >
                  <BookmarkIcon className="w-4 h-4 mr-2" />
                  {showFavorites ? "All Prompts" : "Favorites"}
                </Button>
              </div>
            </TooltipProvider>
          </div>
        </div>

        {/* Results grid with larger cards on mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>

        <CreatePromptDialog onPromptCreated={handlePromptCreated} />
      </main>
    </div>
  );
};

const PromptEngine = () => {
  return (
    <UserPromptsProvider>
      <PromptEngineContent />
    </UserPromptsProvider>
  );
};

export default PromptEngine;
