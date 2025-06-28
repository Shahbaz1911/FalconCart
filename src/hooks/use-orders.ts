'use client';

import * as React from 'react';
import { useAuth } from '@/components/auth-provider';
import { 
    getOrdersByUser, 
    createOrder,
    type Order as OrderType, 
    type OrderInput as LibOrderInput,
} from '@/lib/orders';

export type Order = OrderType;
// The input for the hook's addOrder function should not include the userId, as it's derived from the auth context.
export type OrderInput = Omit<LibOrderInput, 'userId'>;

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  addOrder: (orderData: OrderInput) => Promise<Order>;
  getOrderById: (id: string) => Order | undefined;
}

const OrdersContext = React.createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (authLoading) {
        setLoading(true);
        return;
    }
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getOrdersByUser(user.uid)
      .then(userOrders => {
        setOrders(userOrders);
      })
      .catch(err => {
        console.error("Failed to fetch orders:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, authLoading]);

  const addOrder = async (orderData: OrderInput): Promise<Order> => {
    if (!user) {
      throw new Error("User must be logged in to place an order.");
    }
    
    const completeOrderData: LibOrderInput = { ...orderData, userId: user.uid };
    const newOrder = await createOrder(completeOrderData);
    
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find(o => o.id === id);
  };
  
  // No need to sort here, Firestore query does it.
  const value = { orders, loading, addOrder, getOrderById };

  return React.createElement(OrdersContext.Provider, { value }, children);
};

export const useOrders = () => {
  const context = React.useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within a OrdersProvider');
  }
  return context;
};
