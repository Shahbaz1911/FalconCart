'use client';

import * as React from 'react';
import type { Product } from '@/lib/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = React.useState<CartItem[]>(() => {
     if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('falcon-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  React.useEffect(() => {
    localStorage.setItem('falcon-cart', JSON.stringify(items));
  }, [items]);

  const addItem = React.useCallback((product: Product, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  }, []);

  const updateItemQuantity = React.useCallback((productId: string, quantity: number) => {
    setItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.product.id !== productId);
      }
      return prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const removeItem = React.useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = React.useCallback(() => {
    setItems([]);
  }, []);

  const totalPrice = React.useMemo(() => items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  ), [items]);

  const value = React.useMemo(() => ({
    items,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    totalPrice
  }), [items, addItem, updateItemQuantity, removeItem, clearCart, totalPrice]);


  return React.createElement(CartContext.Provider, { value: value }, children);
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
