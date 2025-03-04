
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import SearchBar from "@/components/prompt-engine/SearchBar";
import CategoryFilter from "@/components/prompt-engine/CategoryFilter";
import PromptCard from "@/components/prompt-engine/PromptCard";
import CreatePromptDialog, { Prompt } from "@/components/prompt-engine/CreatePromptDialog";
import { samplePrompts, allCategories } from "@/data/prompts";
import { toast } from "sonner";

const PromptEngine = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("all");
  const [prompts, setPrompts] = useState<Prompt[]>(samplePrompts);
  const [userPrompts, setUserPrompts] = useState<Prompt[]>([]);
  
  // Simulate logged-in user
  const currentUserId = "user123";
  
  // Filter prompts based on search term and category
  const filterPrompts = (promptList: Prompt[]) => {
    return promptList.filter((prompt) => {
      const matchesSearch = 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "All" || prompt.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  };
  
  const filteredAllPrompts = filterPrompts(prompts);
  const filteredUserPrompts = filterPrompts(userPrompts);
  
  // Handle creating a new prompt
  const handlePromptCreated = (newPrompt: Prompt) => {
    // In a real app, this would make an API call to save the prompt
    setPrompts([newPrompt, ...prompts]);
    setUserPrompts([newPrompt, ...userPrompts]);
    toast.success("Prompt created successfully!");
  };
  
  // Handle deleting a prompt
  const handleDeletePrompt = (id: number) => {
    // In a real app, this would make an API call to delete the prompt
    setPrompts(prompts.filter(p => p.id !== id));
    setUserPrompts(userPrompts.filter(p => p.id !== id));
    toast.success("Prompt deleted successfully!");
  };
  
  // Handle liking a prompt
  const handleLikePrompt = (id: number) => {
    // In a real app, this would make an API call to like the prompt
    setPrompts(prompts.map(p => 
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ));
    toast.success("Prompt liked!");
  };
  
  useEffect(() => {
    // In a real app, this would fetch prompts from an API
    // and set user-specific prompts
    setUserPrompts(prompts.filter(p => p.userId === currentUserId));
  }, []);
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Prompt Engine</h1>
          <p className="text-muted-foreground">
            Discover, create, and share AI prompts for various use cases
          </p>
        </div>
        <CreatePromptDialog onPromptCreated={handlePromptCreated} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Search</h2>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Categories</h2>
            <CategoryFilter 
              categories={allCategories} 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
          </div>
        </div>
        
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Prompts</TabsTrigger>
              <TabsTrigger value="my">My Prompts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {filteredAllPrompts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No prompts found. Try adjusting your search or filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAllPrompts.map((prompt) => (
                    <PromptCard 
                      key={prompt.id} 
                      prompt={prompt}
                      isOwner={prompt.userId === currentUserId}
                      onDelete={handleDeletePrompt}
                      onLike={handleLikePrompt}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="my" className="space-y-6">
              {filteredUserPrompts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">You haven't created any prompts yet.</p>
                  <Button className="mt-4" onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="Create Prompt"]')?.click()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Prompt
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUserPrompts.map((prompt) => (
                    <PromptCard 
                      key={prompt.id} 
                      prompt={prompt}
                      isOwner={true}
                      onDelete={handleDeletePrompt}
                      onLike={handleLikePrompt}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PromptEngine;
