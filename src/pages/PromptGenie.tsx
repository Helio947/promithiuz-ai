
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from '@supabase/auth-helpers-react';
import { promptsData, allCategories } from '@/data/prompts';
import SearchBar from '@/components/prompt-engine/SearchBar';
import CategoryFilter from '@/components/prompt-engine/CategoryFilter';
import PromptCard from '@/components/prompt-engine/PromptCard';
import CreatePromptDialog from '@/components/prompt-engine/CreatePromptDialog';

export default function PromptGenie() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [prompts, setPrompts] = useState<any[]>(promptsData);
  const [filteredPrompts, setFilteredPrompts] = useState<any[]>(prompts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const session = useSession();

  useEffect(() => {
    // Filter prompts based on search term and category
    let results = [...prompts];
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      results = results.filter(
        prompt => 
          prompt.title.toLowerCase().includes(search) || 
          prompt.description.toLowerCase().includes(search) || 
          prompt.content.toLowerCase().includes(search)
      );
    }
    
    if (selectedCategory !== 'All') {
      results = results.filter(prompt => prompt.category === selectedCategory);
    }
    
    setFilteredPrompts(results);
  }, [searchTerm, selectedCategory, prompts]);

  const handleCreatePrompt = (newPrompt: any) => {
    const promptToAdd = {
      ...newPrompt,
      id: Date.now(), // temporary ID for demo
      likes: 0,
      userId: session?.user?.id || 'guest',
      createdAt: new Date().toISOString()
    };
    
    setPrompts([promptToAdd, ...prompts]);
    
    toast({
      title: "Prompt Created",
      description: "Your prompt has been created successfully!",
    });
  };

  const handleDeletePrompt = (promptId: any) => {
    setPrompts(prompts.filter(p => p.id !== promptId));
    
    toast({
      title: "Prompt Deleted",
      description: "Your prompt has been deleted.",
    });
  };

  const handleLikePrompt = (promptId: any) => {
    setPrompts(prompts.map(prompt => 
      prompt.id === promptId 
        ? { ...prompt, likes: prompt.likes + 1 }
        : prompt
    ));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Prompt Genie</h1>
          <p className="text-gray-600 mt-1">
            Discover, create, and share powerful AI prompts
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Prompt
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Search</h3>
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Categories</h3>
            <CategoryFilter 
              categories={allCategories} 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700">No prompts found</h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or filters, or create a new prompt.
              </p>
              <Button 
                className="mt-4" 
                onClick={() => setIsDialogOpen(true)}
              >
                Create New Prompt
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrompts.map(prompt => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  isOwner={session?.user?.id === prompt.userId}
                  onDelete={handleDeletePrompt}
                  onLike={handleLikePrompt}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <CreatePromptDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreatePrompt={handleCreatePrompt}
        categories={allCategories.filter(cat => cat !== 'All')}
      />
    </div>
  );
}
