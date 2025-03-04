
// Custom profile types that match our updated database structure
export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  company_name?: string;
  job_title?: string;
  subscription_tier?: string;
  subscription_status?: string;
  subscription_start_date?: string;
  subscription_end_date?: string;
  ai_queries_used?: number;
  ai_generations_used?: number;
  workflows_created?: number;
  created_at?: string;
  updated_at?: string;
  username?: string;
  selected_path?: string;
}
