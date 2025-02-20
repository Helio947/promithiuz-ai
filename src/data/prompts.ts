import { Prompt } from "@/types/prompt-engine";

export const samplePrompts: Prompt[] = [
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
  },
  {
    id: "6",
    title: "Universal HR Policy Generator",
    description: "Create comprehensive HR policies for any organization.",
    category: "HR",
    prompt: `Generate professional HR policies using this framework:

1. Policy Foundation:
   Organization Type: [corporate/startup/nonprofit/etc.]
   Employee Count: [team size range]
   Work Model: [office/remote/hybrid]
   Jurisdiction: [location/legal framework]

2. Policy Structure:
   - Purpose and scope
   - Definitions of terms
   - Policy statement
   - Procedures and guidelines
   - Responsibilities
   - Compliance requirements

3. Key Policy Areas:
   
   Employment Basics:
   - Hiring process
   - Probation period
   - Working hours
   - Compensation
   - Benefits

   Workplace Conduct:
   - Code of conduct
   - Dress code
   - Communication guidelines
   - Conflict resolution
   - Ethics policy

   Performance Management:
   - Review process
   - Goal setting
   - Career development
   - Training programs
   - Promotion criteria

4. Implementation Plan:
   - Communication strategy
   - Training requirements
   - Documentation needs
   - Review schedule
   - Update procedures

[Customize sections based on your organization's needs]`,
    saves: 567,
    likes: 823
  },
  {
    id: "7",
    title: "Universal Sales Script Generator",
    description: "Create effective sales scripts for any product or service.",
    category: "Sales",
    prompt: `Generate professional sales scripts using this template:

1. Pre-Call Planning:
   Product/Service: [your offering]
   Target Customer: [ideal customer profile]
   Industry: [customer's sector]
   Pain Points: [key challenges]

2. Script Structure:

   Opening:
   - Introduction (15 seconds)
   - Rapport building
   - Purpose statement
   - Permission to proceed

   Discovery:
   - Qualification questions
   - Need assessment
   - Current situation
   - Pain point exploration
   - Budget discussion

   Solution Presentation:
   - Value proposition
   - Features and benefits
   - Use case examples
   - ROI demonstration
   - Competitive advantages

   Objection Handling:
   - Common objections
   - Response templates
   - Follow-up questions
   - Alternative solutions

   Closing:
   - Trial close techniques
   - Final offer
   - Next steps
   - Follow-up plan

3. Customization Points:
   - Industry terminology
   - Pain point specifics
   - Success stories
   - Pricing options

[Replace sections with your specific details]`,
    saves: 789,
    likes: 1045
  },
  {
    id: "8",
    title: "Universal Social Media Strategy Generator",
    description: "Create effective social media strategies for any business.",
    category: "Social Media",
    prompt: `Generate a comprehensive social media strategy using this framework:

1. Platform Strategy:
   [List relevant platforms]
   [Define primary/secondary platforms]
   [Platform-specific goals]
   [Audience presence analysis]

2. Content Framework:

   Content Types:
   - Educational posts
   - Behind-the-scenes
   - Customer spotlights
   - Product showcases
   - Industry news
   - Interactive content

   Content Mix:
   - 30% Educational
   - 25% Promotional
   - 25% Engagement
   - 20% Entertainment

3. Posting Schedule:
   - Optimal times
   - Frequency by platform
   - Content calendar
   - Seasonal adjustments

4. Engagement Strategy:
   - Response templates
   - Community guidelines
   - Crisis management
   - Influencer collaboration

5. Performance Tracking:
   - Key metrics
   - Analytics tools
   - Report templates
   - Optimization process

[Customize based on your business needs]`,
    saves: 678,
    likes: 934
  },
  {
    id: "9",
    title: "Universal Translation Prompt",
    description: "Create accurate translations while maintaining context and tone.",
    category: "Translation",
    prompt: `Generate accurate translations using this comprehensive framework:

1. Content Analysis:
   Source Language: [specify language]
   Target Language: [specify language]
   Content Type: [marketing/technical/legal/etc.]
   Audience: [target readers]

2. Translation Requirements:
   
   Context Preservation:
   - Industry context
   - Cultural nuances
   - Brand voice
   - Technical terminology

   Style Guidelines:
   - Tone of voice
   - Formality level
   - Local idioms
   - Cultural adaptations

3. Quality Checks:
   - Grammar accuracy
   - Cultural appropriateness
   - Technical accuracy
   - Brand consistency

4. Localization Elements:
   - Date formats
   - Number formats
   - Currency
   - Units of measurement
   - Color associations
   - Cultural references

[Add your specific content for translation]`,
    saves: 456,
    likes: 678
  },
  {
    id: "10",
    title: "Universal AI Training Data Generator",
    description: "Create high-quality training data for AI models.",
    category: "AI Training",
    prompt: `Generate AI training data using this structured framework:

1. Data Requirements:
   AI Model Type: [classification/recognition/generation]
   Data Type: [text/image/audio/video]
   Volume Needed: [dataset size]
   Quality Level: [basic/standard/premium]

2. Data Structure:
   
   Input Format:
   - Data fields
   - File formats
   - Size limits
   - Quality parameters

   Annotation Guidelines:
   - Label definitions
   - Classification rules
   - Edge cases
   - Quality criteria

3. Diversity Requirements:
   - Demographic variation
   - Use case coverage
   - Edge case inclusion
   - Bias prevention

4. Quality Control:
   - Validation process
   - Error checking
   - Consistency rules
   - Review guidelines

[Customize based on your AI project needs]`,
    saves: 345,
    likes: 567
  }
];
