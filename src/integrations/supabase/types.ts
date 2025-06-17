export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          contact_id: string
          created_at: string
          date: string
          deal_id: string | null
          description: string | null
          id: string
          type: Database["public"]["Enums"]["activity_type"]
          user_id: string
        }
        Insert: {
          contact_id: string
          created_at?: string
          date: string
          deal_id?: string | null
          description?: string | null
          id?: string
          type: Database["public"]["Enums"]["activity_type"]
          user_id: string
        }
        Update: {
          contact_id?: string
          created_at?: string
          date?: string
          deal_id?: string | null
          description?: string | null
          id?: string
          type?: Database["public"]["Enums"]["activity_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          is_default: boolean
          name: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_default?: boolean
          name: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          is_default?: boolean
          name?: string
          type?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company: string | null
          created_at: string
          email: string | null
          id: string
          last_contacted: string | null
          name: string
          notes: string | null
          phone: string | null
          status: Database["public"]["Enums"]["contact_status"] | null
          tags: string[] | null
          user_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_contacted?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          tags?: string[] | null
          user_id: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_contacted?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          tags?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      dating_profiles: {
        Row: {
          bio: string | null
          birth_date: string
          created_at: string
          full_name: string
          id: string
          is_profile_complete: boolean | null
          looking_for: Database["public"]["Enums"]["relationship_preference"]
          occupation: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          birth_date: string
          created_at?: string
          full_name: string
          id: string
          is_profile_complete?: boolean | null
          looking_for?: Database["public"]["Enums"]["relationship_preference"]
          occupation?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          birth_date?: string
          created_at?: string
          full_name?: string
          id?: string
          is_profile_complete?: boolean | null
          looking_for?: Database["public"]["Enums"]["relationship_preference"]
          occupation?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          close_date: string | null
          contact_id: string
          created_at: string
          id: string
          notes: string | null
          pipeline_id: string
          stage: Database["public"]["Enums"]["deal_stage"]
          status: Database["public"]["Enums"]["deal_status"]
          title: string
          user_id: string
          value: number | null
        }
        Insert: {
          close_date?: string | null
          contact_id: string
          created_at?: string
          id?: string
          notes?: string | null
          pipeline_id: string
          stage?: Database["public"]["Enums"]["deal_stage"]
          status?: Database["public"]["Enums"]["deal_status"]
          title: string
          user_id: string
          value?: number | null
        }
        Update: {
          close_date?: string | null
          contact_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          pipeline_id?: string
          stage?: Database["public"]["Enums"]["deal_stage"]
          status?: Database["public"]["Enums"]["deal_status"]
          title?: string
          user_id?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "pipelines"
            referencedColumns: ["id"]
          },
        ]
      }
      pipelines: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ai_generations_used: number | null
          ai_queries_used: number | null
          company_name: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          job_title: string | null
          selected_path: string | null
          subscription_end_date: string | null
          subscription_start_date: string | null
          subscription_status: string | null
          subscription_tier: string | null
          username: string
          workflows_created: number | null
        }
        Insert: {
          ai_generations_used?: number | null
          ai_queries_used?: number | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          job_title?: string | null
          selected_path?: string | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          username: string
          workflows_created?: number | null
        }
        Update: {
          ai_generations_used?: number | null
          ai_queries_used?: number | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          selected_path?: string | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          username?: string
          workflows_created?: number | null
        }
        Relationships: []
      }
      questionnaire_responses: {
        Row: {
          created_at: string
          goals: string[]
          growth_areas: string[]
          id: string
          interests: string[]
          updated_at: string
          user_id: string | null
          values: string[]
        }
        Insert: {
          created_at?: string
          goals: string[]
          growth_areas: string[]
          id?: string
          interests: string[]
          updated_at?: string
          user_id?: string | null
          values: string[]
        }
        Update: {
          created_at?: string
          goals?: string[]
          growth_areas?: string[]
          id?: string
          interests?: string[]
          updated_at?: string
          user_id?: string | null
          values?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "questionnaire_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "dating_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          category_name: string
          created_at: string
          description: string | null
          id: string
          receipt_url: string | null
          transaction_date: string
          type: string
          user_id: string
          vendor: string
        }
        Insert: {
          amount: number
          category_name: string
          created_at?: string
          description?: string | null
          id?: string
          receipt_url?: string | null
          transaction_date: string
          type: string
          user_id: string
          vendor: string
        }
        Update: {
          amount?: number
          category_name?: string
          created_at?: string
          description?: string | null
          id?: string
          receipt_url?: string | null
          transaction_date?: string
          type?: string
          user_id?: string
          vendor?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string
          id: string
          module_title: string
          path_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          module_title: string
          path_id: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          module_title?: string
          path_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      activity_type: "call" | "email" | "meeting" | "task"
      contact_status: "lead" | "prospect" | "client"
      deal_stage:
        | "New"
        | "Qualified"
        | "Proposal"
        | "Closed Won"
        | "Closed Lost"
      deal_status: "open" | "won" | "lost"
      relationship_preference:
        | "romantic"
        | "friendship"
        | "business"
        | "mentorship"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_type: ["call", "email", "meeting", "task"],
      contact_status: ["lead", "prospect", "client"],
      deal_stage: ["New", "Qualified", "Proposal", "Closed Won", "Closed Lost"],
      deal_status: ["open", "won", "lost"],
      relationship_preference: [
        "romantic",
        "friendship",
        "business",
        "mentorship",
      ],
    },
  },
} as const
