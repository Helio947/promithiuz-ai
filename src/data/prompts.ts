
export const promptsData = [
  {
    id: 1,
    title: 'Email Marketing Sequence',
    description: 'Generate a 5-part email sequence for new product launch',
    content: 'Create a 5-part email marketing sequence for a new product launch targeted at [TARGET_AUDIENCE]. Include subject lines, body content, and CTAs for each email. The sequence should cover: 1) Introduction & Teaser, 2) Product Benefits, 3) Customer Testimonials, 4) Limited-Time Offer, 5) Last Chance Reminder.',
    category: 'Marketing',
    likes: 23,
    userId: 'user123',
    createdAt: '2023-08-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'SEO Blog Post',
    description: 'Create a comprehensive blog post optimized for SEO',
    content: 'Write a comprehensive blog post about [TOPIC] that is optimized for SEO. Include an engaging introduction, at least 3 subheadings with detailed content, incorporate the keyword [PRIMARY_KEYWORD] naturally throughout, include bullet points for skimmability, and end with a strong conclusion that includes a call to action.',
    category: 'Content',
    likes: 42,
    userId: 'user456',
    createdAt: '2023-09-22T14:15:00Z'
  },
  {
    id: 3,
    title: 'Customer Support Response',
    description: 'Generate friendly, helpful responses to common customer inquiries',
    content: 'Generate a friendly and helpful customer support response to the following inquiry: "[CUSTOMER_INQUIRY]". The response should acknowledge the customer\'s concern, provide a clear solution or next steps, express empathy, and offer additional assistance if needed.',
    category: 'Customer Service',
    likes: 18,
    userId: 'user789',
    createdAt: '2023-07-03T09:45:00Z'
  }
];

export const allCategories = ['All', 'Marketing', 'Content', 'Customer Service', 'Sales', 'Product', 'Technical'];

// Alias for promptsData to fix import issues
export const samplePrompts = promptsData;
