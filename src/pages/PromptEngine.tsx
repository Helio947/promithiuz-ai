
import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/prompt-engine/SearchBar";
import CategoryFilter from "@/components/prompt-engine/CategoryFilter";
import PromptCard from "@/components/prompt-engine/PromptCard";
import CreatePromptDialog from "@/components/prompt-engine/CreatePromptDialog";
import { samplePrompts } from "@/data/prompts";
import { UserPromptsProvider, useUserPrompts } from "@/contexts/UserPromptsContext";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";
import { Prompt } from "@/types/prompt-engine";

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
          <h1 className="text-2xl font-semibold mb-2">
            Prompt Engine
          </h1>
          <p className="text-muted-foreground text-sm">
            Discover, create, and share AI prompts
          </p>
        </div>

        {/* Streamlined search and filters */}
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
