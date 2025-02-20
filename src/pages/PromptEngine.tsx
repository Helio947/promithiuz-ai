
import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/prompt-engine/SearchBar";
import CategoryFilter from "@/components/prompt-engine/CategoryFilter";
import PromptCard from "@/components/prompt-engine/PromptCard";
import { samplePrompts } from "@/data/prompts";

const PromptEngine = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPrompts = samplePrompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PromptEngine;
