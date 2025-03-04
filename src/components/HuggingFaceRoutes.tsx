
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HuggingFaceDemo } from '@/components/HuggingFaceDemo';
import { HuggingFaceImageDemo } from '@/components/HuggingFaceImageDemo';

export const HuggingFaceRoutes = () => {
  const [activeTab, setActiveTab] = useState('text');

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Hugging Face AI Demo</h1>
        <p className="text-muted-foreground">
          Experience different AI capabilities powered by Hugging Face models
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="text">Text Processing</TabsTrigger>
          <TabsTrigger value="image">Image Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="text">
          <HuggingFaceDemo />
        </TabsContent>
        
        <TabsContent value="image">
          <HuggingFaceImageDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HuggingFaceRoutes;
