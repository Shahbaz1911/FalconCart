
'use client';

import * as React from 'react';
import { mockInitialOrders } from '@/lib/orders';
import type { Order as OrderType, OrderInput as OrderInputType } from '@/lib/orders';

export type Order = OrderType;
export type OrderInput = OrderInputType;

interface OrdersContextType {
  orders: Order[];
  addOrder: (orderData: OrderInput) => Order;
  getOrderById: (id: string) => Order | undefined;
}

const OrdersContext = React.createContext<OrdersContextType | undefined>(undefined);

// Converts a date to a readable date string
const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = React.useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const savedOrders = localStorage.getItem('falcon-orders');
      try {
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders);
          if (Array.isArray(parsedOrders)) {
            return parsedOrders;
          }
        }
      } catch (e) {
        console.error("Failed to parse orders from localStorage", e);
        return mockInitialOrders;
      }
    }
    return mockInitialOrders;
  });

  React.useEffect(() => {
    localStorage.setItem('falcon-orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData: OrderInput): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Math.random().toString(36).substring(2, 9)}`,
      date: formatDate(new Date()),
    };
    
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    return newOrder;
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  const sortedOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return React.createElement(OrdersContext.Provider, {
    value: { orders: sortedOrders, addOrder, getOrderById }
  }, children);
};

export const useOrders = () => {
  const context = React.useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within a OrdersProvider');
  }
  return context;
};
