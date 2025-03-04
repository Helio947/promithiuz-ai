
-- Create a workflows table to store user workflows
CREATE TABLE IF NOT EXISTS public.workflows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  nodes JSONB NOT NULL,
  edges JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_run_at TIMESTAMPTZ,
  is_public BOOLEAN DEFAULT FALSE
);

-- Set up row level security
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own workflows" 
  ON public.workflows 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workflows" 
  ON public.workflows 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workflows" 
  ON public.workflows 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workflows" 
  ON public.workflows 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policy for public workflows
CREATE POLICY "Anyone can view public workflows" 
  ON public.workflows 
  FOR SELECT 
  USING (is_public = TRUE);

-- Add a trigger to update the updated_at timestamp
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.workflows
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
