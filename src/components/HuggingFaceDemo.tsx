
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { generateText, summarizeText, classifyText, describeImage } from '@/utils/huggingface-service';
import { Loader2, Save, Trash, ChevronDown, Settings, History, Image } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

// Define type for saved results
interface SavedResult {
  id: string;
  task: string;
  prompt: string;
  result: string;
  timestamp: number;
  model?: string;
}

// Define available models by task
const MODELS_BY_TASK = {
  'text-generation': [
    { id: 'gpt2', name: 'GPT-2' },
    { id: 'facebook/opt-350m', name: 'OPT 350M' },
    { id: 'EleutherAI/gpt-neo-125M', name: 'GPT Neo 125M' }
  ],
  'summarization': [
    { id: 'facebook/bart-large-cnn', name: 'BART CNN' },
    { id: 't5-small', name: 'T5 Small' },
    { id: 'google/pegasus-xsum', name: 'Pegasus XSum' }
  ],
  'text-classification': [
    { id: 'distilbert-base-uncased-finetuned-sst-2-english', name: 'DistilBERT (Sentiment)' },
    { id: 'facebook/bart-large-mnli', name: 'BART MNLI (Categories)' }
  ],
  'image-to-text': [
    { id: 'Salesforce/blip-image-captioning-base', name: 'BLIP Base' },
    { id: 'nlpconnect/vit-gpt2-image-captioning', name: 'ViT-GPT2' }
  ]
};

export const HuggingFaceDemo = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [task, setTask] = useState('text-generation');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [maxLength, setMaxLength] = useState(250);
  const [temperature, setTemperature] = useState(0.7);
  const [selectedModel, setSelectedModel] = useState('');
  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [activeTab, setActiveTab] = useState('playground');

  // Load saved results from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('huggingface-results');
    if (saved) {
      try {
        setSavedResults(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved results', e);
      }
    }
  }, []);

  // Set default model when task changes
  useEffect(() => {
    if (MODELS_BY_TASK[task as keyof typeof MODELS_BY_TASK]) {
      setSelectedModel(MODELS_BY_TASK[task as keyof typeof MODELS_BY_TASK][0].id);
    }
  }, [task]);

  const getTaskDescription = () => {
    switch (task) {
      case 'text-generation':
        return 'AI will generate text based on your prompt';
      case 'summarization':
        return 'AI will create a concise summary of your text';
      case 'text-classification':
        return 'AI will analyze the sentiment or categorize your text';
      case 'image-to-text':
        return 'AI will describe what\'s in the image';
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
      case 'image-to-text':
        return 'Enter an image URL to describe';
      default:
        return 'Enter your text here...';
    }
  };

  const saveResult = () => {
    if (!result) return;
    
    const newResult: SavedResult = {
      id: Date.now().toString(),
      task,
      prompt,
      result,
      timestamp: Date.now(),
      model: selectedModel
    };
    
    const updatedResults = [newResult, ...savedResults];
    setSavedResults(updatedResults);
    localStorage.setItem('huggingface-results', JSON.stringify(updatedResults));
    
    toast({
      title: "Result saved",
      description: "You can access it in the History tab",
    });
  };

  const deleteResult = (id: string) => {
    const updatedResults = savedResults.filter(item => item.id !== id);
    setSavedResults(updatedResults);
    localStorage.setItem('huggingface-results', JSON.stringify(updatedResults));
    
    toast({
      title: "Result deleted",
      description: "The saved result has been removed",
    });
  };

  const loadResult = (item: SavedResult) => {
    setTask(item.task);
    setPrompt(item.prompt);
    setResult(item.result);
    if (item.model) {
      setSelectedModel(item.model);
    }
    setActiveTab('playground');
  };

  const clearHistory = () => {
    setSavedResults([]);
    localStorage.removeItem('huggingface-results');
    toast({
      title: "History cleared",
      description: "All saved results have been removed",
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text or an image URL to process.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult('');

    // Prepare options based on the task
    const options: Record<string, any> = {};
    
    if (task === 'text-generation') {
      options.max_new_tokens = maxLength;
      options.temperature = temperature;
    } else if (task === 'summarization') {
      options.max_length = maxLength;
      options.min_length = Math.min(30, maxLength / 2);
    }

    try {
      let response;
      
      switch (task) {
        case 'text-generation':
          toast({
            title: "Processing",
            description: "Generating text with AI...",
          });
          response = await generateText(prompt, selectedModel, options);
          setResult(response.result.generated_text);
          break;
        case 'summarization':
          toast({
            title: "Processing",
            description: "Creating summary...",
          });
          response = await summarizeText(prompt, selectedModel, options);
          setResult(response.result.summary_text);
          break;
        case 'text-classification':
          toast({
            title: "Processing",
            description: "Analyzing text...",
          });
          response = await classifyText(prompt, selectedModel, options);
          // Format classification results
          setResult(
            Array.isArray(response.result) 
              ? response.result.map(r => `${r.label}: ${(r.score * 100).toFixed(2)}%`).join('\n')
              : `${response.result.label}: ${(response.result.score * 100).toFixed(2)}%`
          );
          break;
        case 'image-to-text':
          toast({
            title: "Processing",
            description: "Analyzing image...",
          });
          response = await describeImage(prompt, selectedModel, options);
          setResult(response.result.text || "Could not analyze the image.");
          break;
        default:
          response = await generateText(prompt, selectedModel, options);
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
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-lg border-none">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-xl">
          <CardTitle className="text-2xl font-bold text-primary">Hugging Face AI Demo</CardTitle>
          <CardDescription className="text-gray-600">
            Explore state-of-the-art open-source AI models
          </CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="playground" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Playground
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History {savedResults.length > 0 && `(${savedResults.length})`}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="playground">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 pt-6">
                <div className="flex flex-wrap gap-4 md:flex-nowrap">
                  <div className="w-full md:w-2/3">
                    <label className="text-sm font-medium">Choose AI Task</label>
                    <Select defaultValue={task} onValueChange={setTask}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a task" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text-generation">Text Generation</SelectItem>
                        <SelectItem value="summarization">Summarization</SelectItem>
                        <SelectItem value="text-classification">Text Classification</SelectItem>
                        <SelectItem value="image-to-text">Image Description</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full md:w-1/3">
                    <label className="text-sm font-medium">Model</label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        {MODELS_BY_TASK[task as keyof typeof MODELS_BY_TASK]?.map(model => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  {getTaskDescription()}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {task === 'text-generation' ? 'Your Prompt' : 
                     task === 'summarization' ? 'Text to Summarize' : 
                     task === 'text-classification' ? 'Text to Classify' :
                     'Image URL'}
                  </label>
                  {task === 'image-to-text' ? (
                    <div className="space-y-4">
                      <Input 
                        type="url"
                        placeholder="Enter a direct URL to an image"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full"
                      />
                      
                      {prompt && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                          <div className="relative border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                            <img 
                              src={prompt} 
                              alt="Preview" 
                              className="max-h-[240px] object-contain"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder.svg';
                                e.currentTarget.classList.add('border-red-500');
                              }} 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Textarea
                      placeholder={getTaskPlaceholder()}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={5}
                      className="resize-y min-h-[120px]"
                    />
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="advanced-mode"
                    checked={advancedMode}
                    onCheckedChange={setAdvancedMode}
                  />
                  <Label htmlFor="advanced-mode">Advanced options</Label>
                </div>

                {advancedMode && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="parameters">
                      <AccordionTrigger className="text-sm font-medium">
                        Model Parameters
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 py-2">
                          {(task === 'text-generation' || task === 'summarization') && (
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Label htmlFor="max-length">
                                  {task === 'summarization' ? 'Max Summary Length' : 'Max Output Length'}
                                </Label>
                                <span className="text-sm text-gray-500">{maxLength}</span>
                              </div>
                              <Slider
                                id="max-length"
                                min={10}
                                max={500}
                                step={10}
                                value={[maxLength]}
                                onValueChange={(value) => setMaxLength(value[0])}
                              />
                            </div>
                          )}

                          {task === 'text-generation' && (
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Label htmlFor="temperature">Temperature</Label>
                                <span className="text-sm text-gray-500">{temperature.toFixed(1)}</span>
                              </div>
                              <Slider
                                id="temperature"
                                min={0.1}
                                max={1.0}
                                step={0.1}
                                value={[temperature]}
                                onValueChange={(value) => setTemperature(value[0])}
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Lower values produce more focused outputs, higher values more creative ones.
                              </p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                {result && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Result</label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={saveResult}
                        className="flex items-center gap-1"
                      >
                        <Save className="h-4 w-4" />
                        Save Result
                      </Button>
                    </div>
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
          </TabsContent>

          <TabsContent value="history">
            <CardContent className="pt-6">
              {savedResults.length === 0 ? (
                <div className="text-center py-8">
                  <History className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No saved results</h3>
                  <p className="text-gray-500 mt-1">
                    Process some inputs and save the results to see them here
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearHistory}
                      className="flex items-center gap-1 text-red-500 hover:text-red-600"
                    >
                      <Trash className="h-4 w-4" />
                      Clear History
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {savedResults.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardHeader className="p-4 bg-gray-50 flex flex-row items-start justify-between space-y-0">
                          <div>
                            <CardTitle className="text-base font-medium flex items-center gap-2">
                              {item.task === 'text-generation' && 'Text Generation'}
                              {item.task === 'summarization' && 'Summarization'}
                              {item.task === 'text-classification' && 'Text Classification'}
                              {item.task === 'image-to-text' && (
                                <span className="flex items-center gap-1">
                                  <Image className="h-4 w-4" />
                                  Image Description
                                </span>
                              )}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {formatDate(item.timestamp)}
                              {item.model && ` • Model: ${item.model.split('/').pop()}`}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => loadResult(item)}
                              className="h-8 w-8 p-0"
                              title="Load this result"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => deleteResult(item.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                              title="Delete this result"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Prompt</h4>
                            <p className="text-sm text-gray-700 truncate">
                              {item.task === 'image-to-text' ? (
                                <a href={item.prompt} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                  {item.prompt}
                                </a>
                              ) : (
                                item.prompt
                              )}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Result</h4>
                            <p className="text-sm text-gray-700 line-clamp-3 whitespace-pre-wrap">
                              {item.result}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
