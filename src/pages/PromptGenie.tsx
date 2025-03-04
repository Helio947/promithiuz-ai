
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import CategoryFilter from "@/components/prompt-engine/CategoryFilter";
import SearchBar from "@/components/prompt-engine/SearchBar";
import PromptCard from "@/components/prompt-engine/PromptCard";
import CreatePromptDialog from "@/components/prompt-engine/CreatePromptDialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { prompts as samplePrompts } from "@/data/prompts";
import { useNavigate } from "react-router-dom";

const categories = [
  "All",
  "Content Creation",
  "Marketing",
  "Sales",
  "Customer Support",
  "Research",
  "SEO",
  "Social Media",
  "Productivity",
];

const PromptGenie = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [prompts, setPrompts] = useState(samplePrompts);
  const [filteredPrompts, setFilteredPrompts] = useState(samplePrompts);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please sign in to access this feature");
        navigate("/auth");
        return;
      }
      
      setSession(session);
      setLoading(false);
      
      // In a real app, we would fetch user's prompts from the database
      // For this demo, we'll use the sample prompts
    };
    
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    // Filter prompts based on category and search term
    let filtered = prompts;
    
    if (category !== "All") {
      filtered = filtered.filter(prompt => prompt.category === category);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(prompt => 
        prompt.title.toLowerCase().includes(term) || 
        prompt.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredPrompts(filtered);
  }, [category, searchTerm, prompts]);

  const handleCreatePrompt = (newPrompt) => {
    // In a real app, we would save the prompt to the database
    setPrompts(prev => [
      {
        id: `prompt-${Date.now()}`,
        userId: session?.user?.id,
        ...newPrompt,
        likes: 0,
        isPublic: false,
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);
    
    // Add to user's usage metrics
    if (session?.user?.id) {
      supabase.rpc('increment_counter', { 
        row_id: session.user.id, 
        counter_name: 'ai_generations_used', 
        increment_amount: 1 
      });
    }
    
    toast.success("Prompt created successfully!");
    setIsDialogOpen(false);
  };

  const handleDeletePrompt = (promptId) => {
    // In a real app, we would delete the prompt from the database
    setPrompts(prev => prev.filter(p => p.id !== promptId));
    toast.success("Prompt deleted");
  };

  const handleLikePrompt = (promptId) => {
    // In a real app, we would update the likes in the database
    setPrompts(prev => prev.map(p => 
      p.id === promptId ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Prompt Codex</h1>
            <p className="text-muted-foreground">
              Discover, create and share powerful AI prompts to maximize productivity
            </p>
          </div>
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            className="mt-4 md:mt-0"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Prompt
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
          </div>
          <div>
            <CategoryFilter 
              categories={categories} 
              selectedCategory={category} 
              onSelectCategory={setCategory} 
            />
          </div>
        </div>
        
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium mb-2">No prompts found</h3>
            <p className="text-muted-foreground mb-6">
              Try a different search term or category, or create your own prompt
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Create Prompt
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map(prompt => (
              <PromptCard 
                key={prompt.id}
                prompt={prompt}
                isOwner={prompt.userId === session?.user?.id}
                onDelete={handleDeletePrompt}
                onLike={handleLikePrompt}
              />
            ))}
          </div>
        )}
        
        <CreatePromptDialog 
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onCreatePrompt={handleCreatePrompt}
          categories={categories.filter(c => c !== "All")}
        />
      </div>
    </Layout>
  );
};

export default PromptGenie;
