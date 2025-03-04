
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { generateText, summarizeText, classifyText } from '@/utils/huggingface-service';
import { Loader2 } from 'lucide-react';

export const HuggingFaceDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [task, setTask] = useState('text-generation');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [maxLength, setMaxLength] = useState(250);

  const getTaskDescription = () => {
    switch (task) {
      case 'text-generation':
        return 'AI will generate text based on your prompt';
      case 'summarization':
        return 'AI will create a concise summary of your text';
      case 'text-classification':
        return 'AI will analyze the sentiment or categorize your text';
      default:
        return 'Select a task to get started';
    }
  };

  const getTaskPlaceholder = () => {
    switch (task) {
      case 'text-generation':
        return 'Enter a prompt like "Once upon a time in a digital world..."';
      case 'summarization':
        return 'Enter a longer text to summarize (min. 30 words recommended)';
      case 'text-classification':
        return 'Enter text to analyze sentiment or classify';
      default:
        return 'Enter your text here...';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to process.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult('');

    try {
      let response;
      
      switch (task) {
        case 'text-generation':
          toast({
            title: "Processing",
            description: "Generating text with AI...",
          });
          response = await generateText(prompt);
          setResult(response.result.generated_text);
          break;
        case 'summarization':
          toast({
            title: "Processing",
            description: "Creating summary...",
          });
          response = await summarizeText(prompt);
          setResult(response.result.summary_text);
          break;
        case 'text-classification':
          toast({
            title: "Processing",
            description: "Analyzing text...",
          });
          response = await classifyText(prompt);
          // Format classification results
          setResult(
            Array.isArray(response.result) 
              ? response.result.map(r => `${r.label}: ${(r.score * 100).toFixed(2)}%`).join('\n')
              : `${response.result.label}: ${(response.result.score * 100).toFixed(2)}%`
          );
          break;
        default:
          response = await generateText(prompt);
          setResult(response.result.generated_text);
      }

      toast({
        title: "Success!",
        description: "Hugging Face AI processed your request.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process with Hugging Face AI",
        variant: "destructive",
      });
      setResult("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="shadow-lg border-none">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-xl">
          <CardTitle className="text-2xl font-bold text-primary">Hugging Face AI Demo</CardTitle>
          <CardDescription className="text-gray-600">
            {getTaskDescription()}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Choose AI Task</label>
              <Select defaultValue={task} onValueChange={setTask}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text-generation">Text Generation</SelectItem>
                  <SelectItem value="summarization">Summarization</SelectItem>
                  <SelectItem value="text-classification">Text Classification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {task === 'text-generation' ? 'Your Prompt' : 
                 task === 'summarization' ? 'Text to Summarize' : 
                 'Text to Classify'}
              </label>
              <Textarea
                placeholder={getTaskPlaceholder()}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                className="resize-y min-h-[120px]"
              />
            </div>

            {result && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Result</label>
                <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap border border-gray-100 max-h-[300px] overflow-y-auto">
                  {result}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              disabled={isLoading || !prompt.trim()} 
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Process with Hugging Face AI'
              )}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Powered by Hugging Face's open-source AI models
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

