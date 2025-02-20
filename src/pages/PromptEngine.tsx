
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Prompt Engine
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover and share powerful prompts that drive business results. Our curated repository helps you leverage AI more effectively.
            </p>
          </div>

          <div className="mb-8">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <div className="flex flex-col gap-4">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <div className="flex justify-center">
                <Button
                  variant={showFavorites ? "default" : "outline"}
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="rounded-full"
                >
                  <BookmarkIcon className="w-4 h-4 mr-2" />
                  {showFavorites ? "Show All" : "Show Favorites"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>

          <CreatePromptDialog onPromptCreated={handlePromptCreated} />
        </div>
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
