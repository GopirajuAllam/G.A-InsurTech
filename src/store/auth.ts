import { create } from 'zustand';
import { User } from '@/types/supabase';

const API_BASE_URL = 'http://localhost:3001/api';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  registeredUsers: { email: string; password: string; firstName: string; lastName: string }[];
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  initialize: () => Promise<void>;
}

const getErrorMessage = (error: any): string => {
  if (error?.message) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
};

const createMockUser = (email: string, firstName: string, lastName: string): User => ({
  id: 'mock-user-id',
  email,
  first_name: firstName,
  last_name: lastName,
  phone: '',
  address: '',
  city: '',
  state: '',
  zip_code: '',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  role: 'authenticated',
  email_confirmed_at: new Date().toISOString(),
  phone_confirmed_at: undefined,
  last_sign_in_at: new Date().toISOString(),
  confirmation_sent_at: undefined,
  recovery_sent_at: undefined,
  email_change_sent_at: undefined,
  new_email: undefined,
  new_phone: undefined,
  confirmed_at: new Date().toISOString(),
  is_sso_user: false,
  factors: undefined
});

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  registeredUsers: [],
  signUp: async (email, password, firstName, lastName) => {
    try {
      set({ loading: true, error: null });
      
      // Check if user already exists
      const state = useAuthStore.getState();
      if (state.registeredUsers.some(user => user.email === email)) {
        throw new Error('User already exists');
      }

      // Add user to registered users
      set(state => ({
        registeredUsers: [...state.registeredUsers, { email, password, firstName, lastName }]
      }));

      // Create mock user
      set({ user: createMockUser(email, firstName, lastName) });
      return;
    } catch (error) {
      console.error('Sign up error:', error);
      set({ error: getErrorMessage(error) });
    } finally {
      set({ loading: false });
    }
  },
  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      
      // Check if user exists and password matches
      const state = useAuthStore.getState();
      const registeredUser = state.registeredUsers.find(user => user.email === email);
      
      if (!registeredUser) {
        throw new Error('User not found. Please sign up first.');
      }
      
      if (registeredUser.password !== password) {
        throw new Error('Invalid password');
      }

      // Create mock user
      set({ user: createMockUser(email, registeredUser.firstName, registeredUser.lastName) });
      return;
    } catch (error) {
      console.error('Sign in error:', error);
      set({ error: getErrorMessage(error) });
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    try {
      set({ loading: true, error: null });
      set({ user: null });
    } catch (error) {
      console.error('Sign out error:', error);
      set({ error: getErrorMessage(error) });
    } finally {
      set({ loading: false });
    }
  },
  clearError: () => set({ error: null }),
  initialize: async () => {
    try {
      set({ loading: true, error: null });
      // For development, start with no user
      set({ user: null });
    } catch (error) {
      console.error('Initialize error:', error);
      set({ error: getErrorMessage(error) });
    } finally {
      set({ loading: false });
    }
  },
}));