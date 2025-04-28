import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Mock Supabase client for development
const createMockSupabaseClient = () => {
  console.warn('Using mock Supabase client - Authentication features will not work');
  return {
    auth: {
      signUp: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
    },
    from: (table: string) => ({
      select: () => ({
        data: [],
        error: null,
        eq: () => ({
          single: () => ({
            data: null,
            error: null
          })
        })
      }),
      insert: () => ({
        data: [],
        error: null
      }),
      update: () => ({
        data: [],
        error: null
      })
    }),
  };
};

let supabaseClient;

try {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials are not configured. Using mock client.');
    supabaseClient = createMockSupabaseClient();
  } else {
    supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  supabaseClient = createMockSupabaseClient();
}

export const supabase = supabaseClient;

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  date_of_birth?: string;
};