
-- Create a prompts table to store user-created prompts
CREATE TABLE IF NOT EXISTS public.prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[],
  likes INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Set up row level security
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own prompts" 
  ON public.prompts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own prompts" 
  ON public.prompts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prompts" 
  ON public.prompts 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prompts" 
  ON public.prompts 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policy for public prompts
CREATE POLICY "Anyone can view public prompts" 
  ON public.prompts 
  FOR SELECT 
  USING (is_public = TRUE);

-- Add a trigger to update the updated_at timestamp
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.prompts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
