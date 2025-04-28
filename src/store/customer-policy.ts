import { create } from 'zustand';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Policy {
  id: number;
  customerId: number;
  policyNumber: string;
  policyType: string;
  startDate: string;
  endDate: string;
  premium: number;
  status: string;
}

interface CustomerPolicyState {
  customers: Customer[];
  policies: Policy[];
  loading: boolean;
  error: string | null;
  fetchCustomers: () => Promise<void>;
  fetchPolicies: () => Promise<void>;
  addCustomer: (customer: Omit<Customer, 'id'>) => Promise<void>;
  addPolicy: (policy: Omit<Policy, 'id'>) => Promise<void>;
  updateCustomer: (id: number, customer: Partial<Customer>) => Promise<void>;
  updatePolicy: (id: number, policy: Partial<Policy>) => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;
  deletePolicy: (id: number) => Promise<void>;
}

const API_BASE_URL = 'http://localhost:3001/api';

export const useCustomerPolicyStore = create<CustomerPolicyState>((set) => ({
  customers: [],
  policies: [],
  loading: false,
  error: null,

  fetchCustomers: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${API_BASE_URL}/customers`);
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      set({ customers: data });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch customers' });
    } finally {
      set({ loading: false });
    }
  },

  fetchPolicies: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${API_BASE_URL}/policies`);
      if (!response.ok) throw new Error('Failed to fetch policies');
      const data = await response.json();
      set({ policies: data });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch policies' });
    } finally {
      set({ loading: false });
    }
  },

  addCustomer: async (customer) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      if (!response.ok) throw new Error('Failed to add customer');
      await useCustomerPolicyStore.getState().fetchCustomers();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add customer' });
    } finally {
      set({ loading: false });
    }
  },

  addPolicy: async (policy) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${API_BASE_URL}/policies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(policy),
      });
      if (!response.ok) throw new Error('Failed to add policy');
      await useCustomerPolicyStore.getState().fetchPolicies();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add policy' });
    } finally {
      set({ loading: false });
    }
  },

  updateCustomer: async (id, customer) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      if (!response.ok) throw new Error('Failed to update customer');
      await useCustomerPolicyStore.getState().fetchCustomers();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update customer' });
    } finally {
      set({ loading: false });
    }
  },

  updatePolicy: async (id, policy) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${API_BASE_URL}/policies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(policy),
      });
      if (!response.ok) throw new Error('Failed to update policy');
      await useCustomerPolicyStore.getState().fetchPolicies();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update policy' });
    } finally {
      set({ loading: false });
    }
  },

  deleteCustomer: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete customer');
      await useCustomerPolicyStore.getState().fetchCustomers();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete customer' });
    } finally {
      set({ loading: false });
    }
  },

  deletePolicy: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${API_BASE_URL}/policies/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete policy');
      await useCustomerPolicyStore.getState().fetchPolicies();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete policy' });
    } finally {
      set({ loading: false });
    }
  },
})); 