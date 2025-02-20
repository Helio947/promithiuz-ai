
import { useState } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bookmark, Share2, ThumbsUp } from "lucide-react";

interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt: string;
  saves: number;
  likes: number;
}

const categories = ["Marketing", "Sales", "Customer Service", "Content Creation", "Product Development", "HR"];

const samplePrompts: Prompt[] = [
  {
    id: "1",
    title: "Customer Feedback Analysis",
    description: "Analyze customer feedback and extract key insights.",
    category: "Customer Service",
    prompt: "Analyze the following customer feedback and provide: 1) Key themes 2) Sentiment analysis 3) Actionable recommendations: [Customer Feedback Here]",
    saves: 234,
    likes: 456
  },
  {
    id: "2",
    title: "Social Media Content Calendar",
    description: "Generate a month's worth of engaging social media content ideas.",
    category: "Marketing",
    prompt: "Create a 30-day social media content calendar for [Industry] focusing on: 1) Trending topics 2) Engagement strategies 3) Call-to-actions",
    saves: 567,
    likes: 789
  }
];

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
            <div className="relative max-w-xl mx-auto mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search prompts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => (
              <div key={prompt.id} className="bg-white rounded-xl border p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold mb-2">{prompt.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{prompt.description}</p>
                    <span className="inline-block px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {prompt.category}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{prompt.prompt}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      {prompt.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Bookmark className="h-4 w-4" />
                      {prompt.saves}
                    </button>
                  </div>
                  <button className="hover:text-primary transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PromptEngine;
