import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          theme: 'light' | 'dark';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          theme?: 'light' | 'dark';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          theme?: 'light' | 'dark';
          created_at?: string;
          updated_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone: string | null;
          address: string | null;
          avatar_url: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email: string;
          phone?: string | null;
          address?: string | null;
          avatar_url?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          address?: string | null;
          avatar_url?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          client_id: string;
          name: string;
          description: string | null;
          status: 'draft' | 'in_progress' | 'pending_review' | 'completed' | 'overdue';
          priority: 'low' | 'medium' | 'high';
          start_date: string;
          due_date: string;
          total_amount: number;
          paid_amount: number;
          hours_worked: number;
          total_hours: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          client_id: string;
          name: string;
          description?: string | null;
          status?: 'draft' | 'in_progress' | 'pending_review' | 'completed' | 'overdue';
          priority?: 'low' | 'medium' | 'high';
          start_date: string;
          due_date: string;
          total_amount: number;
          paid_amount?: number;
          hours_worked?: number;
          total_hours: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          client_id?: string;
          name?: string;
          description?: string | null;
          status?: 'draft' | 'in_progress' | 'pending_review' | 'completed' | 'overdue';
          priority?: 'low' | 'medium' | 'high';
          start_date?: string;
          due_date?: string;
          total_amount?: number;
          paid_amount?: number;
          hours_worked?: number;
          total_hours?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      invoices: {
        Row: {
          id: string;
          user_id: string;
          client_id: string;
          project_id: string | null;
          invoice_number: string;
          status: 'draft' | 'sent' | 'paid' | 'overdue';
          issue_date: string;
          due_date: string;
          subtotal: number;
          tax_rate: number;
          tax_amount: number;
          total_amount: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          client_id: string;
          project_id?: string | null;
          invoice_number: string;
          status?: 'draft' | 'sent' | 'paid' | 'overdue';
          issue_date: string;
          due_date: string;
          subtotal: number;
          tax_rate?: number;
          tax_amount?: number;
          total_amount: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          client_id?: string;
          project_id?: string | null;
          invoice_number?: string;
          status?: 'draft' | 'sent' | 'paid' | 'overdue';
          issue_date?: string;
          due_date?: string;
          subtotal?: number;
          tax_rate?: number;
          tax_amount?: number;
          total_amount?: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      invoice_items: {
        Row: {
          id: string;
          invoice_id: string;
          description: string;
          quantity: number;
          rate: number;
          amount: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          description: string;
          quantity: number;
          rate: number;
          amount: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          invoice_id?: string;
          description?: string;
          quantity?: number;
          rate?: number;
          amount?: number;
          created_at?: string;
        };
      };
    };
  };
};