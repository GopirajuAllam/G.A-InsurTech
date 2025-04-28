import { User as SupabaseUser } from '@supabase/supabase-js';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          phone: string
          address: string
          city: string
          state: string
          zip_code: string
          date_of_birth: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          phone: string
          address: string
          city: string
          state: string
          zip_code: string
          date_of_birth?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          phone?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          date_of_birth?: string | null
          created_at?: string
        }
      }
      policies: {
        Row: {
          id: string
          user_id: string
          policy_number: string
          policy_type: string
          effective_date: string
          expiry_date: string
          status: string
          premium_amount: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          policy_number?: string
          policy_type: string
          effective_date: string
          expiry_date: string
          status?: string
          premium_amount: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          policy_number?: string
          policy_type?: string
          effective_date?: string
          expiry_date?: string
          status?: string
          premium_amount?: number
          created_at?: string
        }
      }
      coverages: {
        Row: {
          id: string
          policy_id: string
          coverage_type: string
          coverage_amount: number
          deductible: number
          created_at: string
        }
        Insert: {
          id?: string
          policy_id: string
          coverage_type: string
          coverage_amount: number
          deductible: number
          created_at?: string
        }
        Update: {
          id?: string
          policy_id?: string
          coverage_type?: string
          coverage_amount?: number
          deductible?: number
          created_at?: string
        }
      }
      claims: {
        Row: {
          id: string
          policy_id: string
          claim_number: string
          incident_date: string
          claim_date: string
          status: string
          claim_amount: number
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          policy_id: string
          claim_number?: string
          incident_date: string
          claim_date: string
          status?: string
          claim_amount: number
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          policy_id?: string
          claim_number?: string
          incident_date?: string
          claim_date?: string
          status?: string
          claim_amount?: number
          description?: string
          created_at?: string
        }
      }
    }
  }
}

// Create a mock user type that includes all required Supabase user properties
export interface MockUser extends Omit<SupabaseUser, 'phone_change_sent_at'> {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  date_of_birth?: string | null;
}

// Use MockUser for development, User for production
export type User = MockUser;