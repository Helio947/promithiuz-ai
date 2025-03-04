
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { describeImage } from '@/utils/huggingface-service';
import { Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const HuggingFaceImageDemo = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      toast({
        title: "Image URL required",
        description: "Please enter an image URL to analyze.",
        variant: "destructive",
      });
      return;
    }

    processImage(imageUrl);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setUploadedImage(base64);
      processImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (imageSource: string) => {
    setIsLoading(true);
    setResult('');

    try {
      const response = await describeImage(imageSource);
      setResult(response.result.text || response.result.generated_text || "No description generated");
      
      toast({
        title: "Success!",
        description: "Image analyzed successfully.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze image",
        variant: "destructive",
      });
      setResult("An error occurred while analyzing your image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Image Analysis with Hugging Face</CardTitle>
          <CardDescription>
            Get AI-generated descriptions of images using Hugging Face's image-to-text models
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="url" className="w-full">
            <TabsList>
              <TabsTrigger value="url">Image URL</TabsTrigger>
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
            </TabsList>
            
            <TabsContent value="url" className="space-y-4">
              <form onSubmit={handleImageUrlSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    placeholder="Enter the URL of an image to analyze..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Analyze Image
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="upload" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Image</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <Input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                  />
                </label>
              </div>
            </TabsContent>
          </Tabs>
          
          {uploadedImage && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Uploaded Image</label>
              <div className="flex justify-center">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="max-h-64 rounded-lg object-contain" 
                />
              </div>
            </div>
          )}

          {imageUrl && !uploadedImage && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Image Preview</label>
              <div className="flex justify-center">
                <img 
                  src={imageUrl} 
                  alt="URL Preview" 
                  className="max-h-64 rounded-lg object-contain" 
                  onError={() => {
                    toast({
                      title: "Image Error",
                      description: "Could not load image from URL. Please check the URL and try again.",
                      variant: "destructive",
                    });
                  }}
                />
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Result</label>
              <div className="bg-gray-50 p-4 rounded-md">{result}</div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-xs text-gray-500">
            Powered by Hugging Face's image-to-text models through our Supabase Edge Function
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
