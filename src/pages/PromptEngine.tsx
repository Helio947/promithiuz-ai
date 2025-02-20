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

const categories = [
  "Marketing",
  "Sales",
  "Customer Service", 
  "Content Creation",
  "Product Development",
  "HR",
  "Data Analysis",
  "AI Training",
  "Image Generation",
  "Translation"
];

const samplePrompts: Prompt[] = [
  {
    id: "1",
    title: "Comprehensive Customer Feedback Analysis",
    description: "Deep dive analysis of customer feedback with actionable insights.",
    category: "Customer Service",
    prompt: `Analyze the following customer feedback data and provide a detailed report with:

1. Key Themes and Patterns:
   - Identify recurring topics and issues
   - Group feedback by product/service areas
   - Highlight emerging trends

2. Sentiment Analysis:
   - Overall sentiment distribution (positive/negative/neutral)
   - Sentiment by product/service category
   - Trend analysis over time

3. Priority Areas:
   - Critical issues requiring immediate attention
   - Common pain points
   - Areas of positive feedback

4. Actionable Recommendations:
   - Short-term improvements
   - Long-term strategic changes
   - Customer experience enhancements

5. Competitive Intelligence:
   - Mentions of competitors
   - Comparative analysis
   - Market positioning insights

[Insert Customer Feedback Data Here]`,
    saves: 834,
    likes: 1256
  },
  {
    id: "2",
    title: "AI-Powered Content Calendar Generator",
    description: "Create a comprehensive content strategy with AI-optimized posts.",
    category: "Marketing",
    prompt: `Generate a detailed 30-day social media content calendar for [Industry] that includes:

1. Content Strategy:
   - Primary business goals
   - Target audience segments
   - Key messaging themes
   - Brand voice guidelines

2. Daily Post Schedule:
   [For each day, include]
   - Platform-specific content
   - Optimal posting times
   - Content type (image/video/text/poll)
   - Primary and secondary hashtags
   - Engagement prompts

3. Content Themes:
   - Educational content (20%)
   - Brand storytelling (15%)
   - User-generated content (15%)
   - Product showcases (20%)
   - Industry news/trends (15%)
   - Community engagement (15%)

4. Engagement Tactics:
   - Questions to ask followers
   - Call-to-action variations
   - Interactive elements
   - Contest/giveaway ideas

5. Performance Metrics:
   - KPI targets per post
   - Engagement rate goals
   - Conversion objectives

[Customize for Industry: {Industry Name}]`,
    saves: 967,
    likes: 1489
  },
  {
    id: "3",
    title: "AI Image Generation Art Director",
    description: "Detailed prompts for generating professional marketing visuals.",
    category: "Image Generation",
    prompt: `Create professional marketing visuals using the following structured prompt:

1. Style Definition:
   - Art style: [modern/vintage/minimalist/etc.]
   - Color palette: [primary colors + hex codes]
   - Mood: [professional/playful/serious/etc.]
   - Lighting: [bright/moody/natural/etc.]

2. Subject Details:
   - Main subject: [product/person/scene]
   - Background: [setting/environment]
   - Composition: [rule of thirds/centered/etc.]
   - Perspective: [front view/aerial/etc.]

3. Technical Specifications:
   - Resolution: [dimensions]
   - Aspect ratio: [16:9/1:1/etc.]
   - Quality parameters: [photorealistic/illustrated]
   - Style references: [link to examples]

4. Brand Elements:
   - Logo placement: [position]
   - Brand colors: [hex codes]
   - Typography: [font styles]
   - Brand guidelines: [specific requirements]

negative prompt: [unwanted elements]

[Add specific details for your brand]`,
    saves: 723,
    likes: 1156
  },
  {
    id: "4",
    title: "Product Development Research Assistant",
    description: "AI-powered analysis for product innovation and market research.",
    category: "Product Development",
    prompt: `Conduct a comprehensive product development analysis for [Product Concept] including:

1. Market Analysis:
   - Target market size and segments
   - Competitor landscape
   - Market trends and opportunities
   - Price point analysis
   - Distribution channels

2. Technical Feasibility:
   - Required technologies
   - Development timeline
   - Resource requirements
   - Technical risks and mitigation
   - Scalability considerations

3. User Experience:
   - User personas
   - User journey mapping
   - Key features and benefits
   - Pain points addressed
   - Usability requirements

4. Business Viability:
   - Development costs
   - Revenue projections
   - Break-even analysis
   - Marketing strategy
   - Growth opportunities

5. Implementation Roadmap:
   - Development phases
   - Key milestones
   - Resource allocation
   - Risk management
   - Success metrics

[Insert Product Concept Details Here]`,
    saves: 645,
    likes: 892
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
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-[300px] overflow-y-auto">
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
