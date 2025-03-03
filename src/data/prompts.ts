
import { Prompt } from "@/types/prompt-engine";

export const samplePrompts: Prompt[] = [
  {
    id: "1",
    title: "Universal Business Content Generator",
    description: "Create engaging content for any business type or industry.",
    category: "Content Creation",
    prompt: `Goal: Generate professional business content.

Return Format: Provide the content with clear headings, bullet points where appropriate, and with proper formatting.

Warnings: Avoid generic statements. Make sure content is accurate and appropriate for the specified industry.

Context: This is for a business that needs professional content for various purposes. The content should reflect the business's brand voice and target audience.`,
    structure: {
      goal: "Generate professional business content following this framework for a specific business type, audience, and industry.",
      returnFormat: "Deliver the content with a compelling headline, engaging introduction, well-structured body with subheadings, and clear call-to-action. Include SEO elements where applicable.",
      warnings: "Avoid using generic business jargon. Make sure all industry-specific terminology is accurate. Don't include vague claims without supporting points.",
      contextDump: "The business operates in a competitive environment and needs to differentiate itself through professional, high-quality content that speaks directly to customer pain points and offers clear solutions."
    },
    saves: 1234,
    likes: 1567
  },
  {
    id: "2",
    title: "Universal Customer Service Response Template",
    description: "Professional response templates for any customer interaction.",
    category: "Customer Service",
    prompt: `Goal: Create professional, empathetic customer service responses.

Return Format: Provide a complete response with greeting, body, and closing. Include placeholders for customization.

Warnings: Avoid overly formal language. Ensure all promised solutions are realistic.

Context: For customer service teams handling various types of inquiries, complaints, and feedback across different channels.`,
    structure: {
      goal: "Create customer service responses that are professional, empathetic, and solution-oriented for a specific issue type and urgency level.",
      returnFormat: "Deliver a structured response with personalized greeting, acknowledgment of the issue, detailed solution, timeline expectations, and professional closing. Include placeholders for customer-specific information.",
      warnings: "Avoid generic platitudes or making promises that can't be kept. Never use dismissive language. Ensure all technical instructions are accurate and clear.",
      contextDump: "The customer service team handles various channels including email, chat, and social media. They need templates that can be quickly personalized while maintaining brand voice and ensuring compliance with company policies."
    },
    saves: 945,
    likes: 1289
  },
  {
    id: "3",
    title: "Universal Marketing Campaign Generator",
    description: "Create comprehensive marketing campaigns for any business type.",
    category: "Marketing",
    prompt: `Goal: Design a complete, integrated marketing campaign.

Return Format: Provide a comprehensive campaign plan with digital and traditional components, content strategy, channel strategy, and success metrics.

Warnings: Ensure campaign elements are aligned with the specified budget. Avoid suggesting platforms inappropriate for the target audience.

Context: For marketing teams planning campaigns with specific objectives, target audiences, and budgets.`,
    structure: {
      goal: "Design a complete, integrated marketing campaign for a specific business type, target audience, campaign objective, budget range, and timeline.",
      returnFormat: "Deliver a comprehensive campaign plan with digital and traditional marketing elements, content strategy, channel strategy, timeline, budget allocation, and success metrics.",
      warnings: "Ensure all campaign elements align with the specified budget. Avoid suggesting platforms that don't reach the target demographic. Don't neglect measurement and ROI tracking methods.",
      contextDump: "The marketing team needs to maximize impact with limited resources. They need a campaign that integrates across channels, delivers measurable results, and can be executed with existing team capabilities."
    },
    saves: 878,
    likes: 1432
  },
  {
    id: "4",
    title: "Business Analytics Report Generator",
    description: "Create comprehensive business analytics reports for any industry.",
    category: "Data Analysis",
    prompt: `Goal: Generate a detailed business analytics report.

Return Format: Provide a complete report structure with executive summary, data analysis sections, visualizations recommendations, and actionable insights.

Warnings: Ensure KPIs are appropriate for the industry and business type. Avoid suggesting metrics that require data the business likely doesn't have.

Context: For business analysts preparing reports for stakeholders across different departments.`,
    structure: {
      goal: "Generate a detailed business analytics report for a specific industry, time period, and target audience that provides actionable insights.",
      returnFormat: "Deliver a structured report with executive summary, key findings, detailed analysis by performance category, visualization specifications, and prioritized recommendations with implementation steps.",
      warnings: "Ensure KPIs are appropriate for the specified industry. Don't suggest collecting data that would be unreasonable to obtain. Avoid vanity metrics that don't connect to business outcomes.",
      contextDump: "The analytics team needs to communicate complex data in a way that different stakeholders can understand and act upon. The report should identify trends, provide context for the numbers, and connect analysis to business decisions."
    },
    saves: 756,
    likes: 989
  },
  {
    id: "5",
    title: "Universal AI Image Generation Template",
    description: "Create professional visuals for any business purpose.",
    category: "Image Generation",
    prompt: `Goal: Generate professional business visuals.

Return Format: Provide a detailed image generation prompt with all necessary parameters.

Warnings: Specify all unwanted elements to avoid in the negative prompt section. Ensure image style matches brand guidelines.

Context: For marketing and design teams creating visuals for various business purposes and platforms.`,
    structure: {
      goal: "Generate professional business visuals for a specific purpose (marketing/product/social/website) that convey a specific message or emotion.",
      returnFormat: "Provide a detailed prompt with subject matter specifications, style guidelines, technical parameters, brand integration elements, and platform optimization details.",
      warnings: "Include a 'negative prompt' section specifying unwanted elements, styles to avoid, and technical restrictions. Ensure the prompt doesn't result in generic stock-photo-like images.",
      contextDump: "The marketing team needs unique, professional visuals that align with brand identity across different platforms. The images need to be distinctive while maintaining brand consistency and technical quality."
    },
    saves: 689,
    likes: 934
  },
  {
    id: "6",
    title: "Universal HR Policy Generator",
    description: "Create comprehensive HR policies for any organization.",
    category: "HR",
    prompt: `Goal: Generate comprehensive HR policies.

Return Format: Provide structured policy documents with purpose, definitions, procedures, responsibilities, and compliance requirements.

Warnings: Ensure policies comply with relevant regulations. Don't include legally questionable provisions.

Context: For HR teams developing or updating policies for organizations of different sizes and work models.`,
    structure: {
      goal: "Generate comprehensive HR policies for a specific organization type, size, work model, and jurisdiction that are legally compliant and effective.",
      returnFormat: "Deliver structured policy documents with purpose and scope, clear definitions, detailed procedures, responsibility assignments, and compliance requirements.",
      warnings: "Ensure all policies comply with relevant regulations for the specified jurisdiction. Don't include legally questionable provisions. Avoid overly rigid policies that limit flexibility when needed.",
      contextDump: "The HR team needs policies that balance organizational needs with employee experience. Policies should be clear enough for consistent application but adaptable to different situations. They'll be used for onboarding, reference, and compliance purposes."
    },
    saves: 567,
    likes: 823
  },
  {
    id: "7",
    title: "Universal Sales Script Generator",
    description: "Create effective sales scripts for any product or service.",
    category: "Sales",
    prompt: `Goal: Generate effective sales scripts.

Return Format: Provide a structured script with sections for opening, discovery, presentation, objection handling, and closing.

Warnings: Avoid manipulative tactics. Ensure ethical sales approaches that build trust.

Context: For sales teams selling products or services across different industries and customer types.`,
    structure: {
      goal: "Generate effective sales scripts for a specific product/service, target customer, and industry that address key pain points and drive conversions.",
      returnFormat: "Provide a structured script with sections for opening, discovery questions, solution presentation, objection handling, and various closing techniques with follow-up plans.",
      warnings: "Avoid manipulative or high-pressure tactics. Don't include unrealistic claims or promises. Ensure the language builds trust rather than creating suspicion.",
      contextDump: "The sales team needs scripts that feel natural and conversational while effectively guiding prospects through the sales process. Scripts should be adaptable to different prospect responses and buying signals."
    },
    saves: 789,
    likes: 1045
  },
  {
    id: "8",
    title: "Universal Social Media Strategy Generator",
    description: "Create effective social media strategies for any business.",
    category: "Social Media",
    prompt: `Goal: Generate a comprehensive social media strategy.

Return Format: Provide a complete strategy with platform selection, content framework, posting schedule, engagement tactics, and performance tracking.

Warnings: Don't recommend unrealistic posting frequencies. Ensure strategy matches business resources and capabilities.

Context: For marketing teams developing social media approaches across different platforms and business types.`,
    structure: {
      goal: "Generate a comprehensive social media strategy for a specific business that maximizes engagement and achieves business objectives.",
      returnFormat: "Deliver a complete strategy with platform prioritization, content mix recommendations, detailed posting schedule, engagement guidelines, and performance tracking methods.",
      warnings: "Don't recommend unrealistic posting frequencies or content types that require excessive resources. Avoid one-size-fits-all approaches that ignore platform differences.",
      contextDump: "The marketing team needs a strategic approach to social media that integrates with broader marketing goals. They have limited resources and need to focus efforts where they'll have the most impact, while maintaining a consistent brand voice."
    },
    saves: 678,
    likes: 934
  },
  {
    id: "9",
    title: "Universal Translation Prompt",
    description: "Create accurate translations while maintaining context and tone.",
    category: "Translation",
    prompt: `Goal: Generate accurate, culturally appropriate translations.

Return Format: Provide translated text with notes on cultural adaptations or challenging phrases.

Warnings: Be aware of idioms, slang, and cultural references that may not translate directly. Maintain the original tone and intent.

Context: For translating various content types between different languages while preserving meaning and cultural context.`,
    structure: {
      goal: "Generate accurate, culturally appropriate translations between specific languages for a particular content type and target audience.",
      returnFormat: "Provide translated text with notes on cultural adaptations made, alternative translations for challenging phrases, and explanations for any significant departures from literal translation.",
      warnings: "Be careful with idioms, slang, and cultural references that may not translate directly. Watch for false cognates. Ensure dates, numbers, measurements, and currencies are properly localized.",
      contextDump: "The translation needs to preserve not just the words but the meaning, tone, and impact of the original. The target audience may have different cultural references and expectations that should be considered in the translation."
    },
    saves: 456,
    likes: 678
  },
  {
    id: "10",
    title: "Universal AI Training Data Generator",
    description: "Create high-quality training data for AI models.",
    category: "AI Training",
    prompt: `Goal: Generate high-quality AI training data.

Return Format: Provide formatted data matching requested volumes and formats with clear annotations.

Warnings: Ensure diversity in the data. Avoid biases and stereotypes that could be learned by the AI.

Context: For AI development teams creating training datasets for different model types and applications.`,
    structure: {
      goal: "Generate high-quality training data for a specific AI model type, data format, and volume that is diverse and balanced.",
      returnFormat: "Provide formatted data matching requested structure with clear annotations, classifications, and metadata according to the specified quality parameters.",
      warnings: "Ensure diversity across all relevant dimensions in the data. Explicitly avoid introducing biases or stereotypes that could be learned by the AI. Balance edge cases with common cases.",
      contextDump: "The AI development team needs training data that will result in a model that performs well across different contexts and user groups. The data needs to be representative of real-world usage while covering important edge cases."
    },
    saves: 345,
    likes: 567
  }
];
