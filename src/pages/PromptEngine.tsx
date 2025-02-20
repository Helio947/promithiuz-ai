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
  "Translation",
  "General Business",
  "Social Media"
];

const samplePrompts: Prompt[] = [
  {
    id: "1",
    title: "Universal Business Content Generator",
    description: "Create engaging content for any business type or industry.",
    category: "Content Creation",
    prompt: `Generate professional business content following this framework:

1. Business Context:
   [Replace with your business type: retail/service/B2B/etc.]
   [Replace with your target audience: consumers/professionals/businesses]
   [Replace with your industry: tech/healthcare/retail/etc.]

2. Content Type Selection:
   Choose content type:
   - Blog post
   - Social media update
   - Newsletter
   - Website copy
   - Product description
   - Case study
   
3. Key Message Framework:
   - Main value proposition: [What makes your offering unique?]
   - Target audience pain points: [List 3-5 key challenges]
   - Solutions offered: [How your product/service helps]
   - Call to action: [Desired audience response]

4. Tone and Style Guide:
   - Brand voice: [professional/friendly/expert/casual]
   - Technical level: [beginner/intermediate/expert]
   - Industry-specific terminology: [list key terms]
   - Cultural considerations: [any specific cultural context]

5. Content Structure:
   - Attention-grabbing headline
   - Engaging introduction
   - Main points (3-5)
   - Supporting evidence
   - Practical examples
   - Clear conclusion
   - Call to action

6. SEO Elements:
   - Primary keyword: [main topic]
   - Secondary keywords: [3-5 related terms]
   - Meta description
   - Header structure

[Replace placeholders with your specific details]`,
    saves: 1234,
    likes: 1567
  },
  {
    id: "2",
    title: "Universal Customer Service Response Template",
    description: "Professional response templates for any customer interaction.",
    category: "Customer Service",
    prompt: `Create customer service responses using this comprehensive template:

1. Situation Assessment:
   [Customer Issue Type: complaint/inquiry/feedback/request]
   [Urgency Level: routine/urgent/critical]
   [Communication Channel: email/chat/social/phone]

2. Response Structure:
   
   Opening:
   - Personalized greeting
   - Acknowledgment of issue
   - Empathy statement
   - Thank you for [specific action/feedback]

   Body:
   - Clear understanding confirmation
   - Specific solution/answer
   - Step-by-step instructions (if needed)
   - Alternative options (if applicable)
   - Timeline expectations
   
   Closing:
   - Next steps summary
   - Additional assistance offer
   - Contact information
   - Professional sign-off

3. Tone Guidelines:
   - Professional yet approachable
   - Clear and concise
   - Positive language focus
   - Solution-oriented
   
4. Resolution Elements:
   - Immediate solution
   - Long-term prevention
   - Follow-up plan
   - Documentation needs

5. Quality Checklist:
   - Grammar and spelling
   - Tone appropriateness
   - Complete information
   - Clear next steps
   - Brand voice alignment

[Customize each section based on your specific situation]`,
    saves: 945,
    likes: 1289
  },
  {
    id: "3",
    title: "Universal Marketing Campaign Generator",
    description: "Create comprehensive marketing campaigns for any business type.",
    category: "Marketing",
    prompt: `Design a complete marketing campaign using this adaptable framework:

1. Campaign Foundation:
   Business Type: [retail/service/B2B/etc.]
   Target Audience: [demographics/psychographics]
   Campaign Objective: [awareness/leads/sales/loyalty]
   Budget Range: [small/medium/large]
   Timeline: [duration and key dates]

2. Market Analysis:
   - Target market size
   - Competitor activities
   - Market trends
   - Seasonal factors
   - Geographic considerations

3. Campaign Elements:
   
   Digital Marketing:
   - Social media strategy
   - Email marketing plan
   - Content marketing
   - SEO optimization
   - PPC advertising

   Traditional Marketing:
   - Print materials
   - Direct mail
   - Event marketing
   - Local advertising
   - PR activities

4. Content Strategy:
   - Key messages
   - Content themes
   - Brand voice guidelines
   - Visual elements
   - Call-to-action variations

5. Channel Strategy:
   - Primary channels
   - Secondary channels
   - Timing for each
   - Cross-channel integration
   - Budget allocation

6. Success Metrics:
   - KPI definitions
   - Tracking methods
   - ROI calculations
   - Reporting schedule
   - Optimization points

[Replace placeholders with your specific campaign details]`,
    saves: 878,
    likes: 1432
  },
  {
    id: "4",
    title: "Business Analytics Report Generator",
    description: "Create comprehensive business analytics reports for any industry.",
    category: "Data Analysis",
    prompt: `Generate detailed business analytics reports using this template:

1. Report Overview:
   Business Type: [your industry]
   Time Period: [analysis timeframe]
   Report Focus: [specific metrics/KPIs]
   Audience: [stakeholders/team/board]

2. Data Collection Framework:
   
   Performance Metrics:
   - Revenue metrics
   - Cost analysis
   - Profit margins
   - Growth rates
   - Market share

   Operational Metrics:
   - Efficiency indicators
   - Resource utilization
   - Process metrics
   - Quality measures
   - Timeline analysis

   Customer Metrics:
   - Satisfaction scores
   - Retention rates
   - Lifetime value
   - Acquisition costs
   - Engagement levels

3. Analysis Structure:
   - Executive summary
   - Key findings
   - Detailed analysis
   - Trend identification
   - Comparative analysis
   - Future projections

4. Visualization Requirements:
   - Charts/graphs types
   - Data tables
   - Key metrics dashboard
   - Trend lines
   - Comparative views

5. Recommendations:
   - Action items
   - Priority levels
   - Resource needs
   - Implementation timeline
   - Expected outcomes

6. Implementation Guide:
   - Step-by-step plan
   - Resource allocation
   - Timeline
   - Success metrics
   - Review points

[Customize metrics and focus areas for your business]`,
    saves: 756,
    likes: 989
  },
  {
    id: "5",
    title: "Universal AI Image Generation Template",
    description: "Create professional visuals for any business purpose.",
    category: "Image Generation",
    prompt: `Generate professional business visuals using this comprehensive prompt structure:

1. Image Purpose:
   [Select: marketing/product/social media/website]
   [Define: primary message/emotion to convey]
   [Specify: intended platform/usage]

2. Visual Elements:

   Subject Matter:
   - Main focus: [product/person/scene/concept]
   - Supporting elements: [list key components]
   - Background: [setting/environment]
   - Composition: [layout/arrangement]

   Style Guidelines:
   - Art style: [realistic/illustrated/minimal/etc.]
   - Color scheme: [brand colors/mood colors]
   - Lighting: [natural/studio/dramatic]
   - Texture: [smooth/rough/glossy/matte]

3. Technical Specifications:
   - Resolution: [dimensions]
   - Format: [aspect ratio]
   - File type: [PNG/JPG/etc.]
   - Quality level: [standard/high/ultra]

4. Brand Integration:
   - Logo placement
   - Brand colors
   - Typography
   - Visual identity elements

5. Optimization For:
   - Platform requirements
   - Device display
   - Loading speed
   - Accessibility

Negative Prompt Elements:
- Unwanted elements
- Style exclusions
- Technical restrictions
- Brand misalignments

[Replace all bracketed sections with your specific requirements]`,
    saves: 689,
    likes: 934
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
