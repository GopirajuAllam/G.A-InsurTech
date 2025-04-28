import { create } from 'zustand';

export interface Coverage {
  id: string;
  type: string;
  name: string;
  description: string;
  amount: number;
  deductible: number;
  price: number;
}

interface CartState {
  items: Coverage[];
  addItem: (item: Coverage) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addItem: (item) => {
    set((state) => {
      // Replace if already exists, otherwise add
      const existingIndex = state.items.findIndex(i => i.id === item.id);
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = item;
        return { items: newItems };
      } else {
        return { items: [...state.items, item] };
      }
    });
  },
  
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== id),
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.price, 0);
  },
  
  getTax: () => {
    // Calculate tax at 7%
    return get().getSubtotal() * 0.07;
  },
  
  getTotal: () => {
    return get().getSubtotal() + get().getTax();
  },
}));