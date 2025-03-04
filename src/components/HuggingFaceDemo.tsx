
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
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
          response = await generateText(prompt);
          setResult(response.result.generated_text);
          break;
        case 'summarization':
          response = await summarizeText(prompt);
          setResult(response.result.summary_text);
          break;
        case 'text-classification':
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
      <Card>
        <CardHeader>
          <CardTitle>Hugging Face AI Demo</CardTitle>
          <CardDescription>
            Try out different AI tasks using Hugging Face's models
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Choose AI Task</label>
              <Select defaultValue={task} onValueChange={setTask}>
                <SelectTrigger>
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
                {task === 'text-generation' ? 'Prompt' : 
                 task === 'summarization' ? 'Text to Summarize' : 
                 'Text to Classify'}
              </label>
              <Textarea
                placeholder={
                  task === 'text-generation' ? 'Enter your prompt here...' : 
                  task === 'summarization' ? 'Enter the text to summarize...' : 
                  'Enter the text to classify...'
                }
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
              />
            </div>

            {result && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Result</label>
                <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">{result}</div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Process with Hugging Face AI'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
