'use client';

import * as React from 'react';
import { useAuth } from '@/components/auth-provider';
import { 
    getOrdersByUser, 
    createOrder,
    type Order as OrderType, 
    type OrderInput as LibOrderInput,
} from '@/lib/orders';
import { createOrUpdateCustomer } from '@/lib/customers';

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

  const addOrder = React.useCallback(async (orderData: OrderInput): Promise<Order> => {
    if (!user) {
      throw new Error("User must be logged in to place an order.");
    }
    
    const completeOrderData: LibOrderInput = { ...orderData, userId: user.uid };
    const newOrder = await createOrder(completeOrderData);

    // After successfully creating the order, create or update the customer record.
    // This is a fire-and-forget operation from the user's perspective.
    createOrUpdateCustomer(user.uid, {
        name: orderData.shippingAddress.fullName || user.displayName || 'N/A',
        email: user.email || 'N/A',
        avatar: user.photoURL,
        orderTotal: orderData.total,
    }).catch(err => console.error("Failed to update customer record:", err));
    
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, [user]);

  const getOrderById = React.useCallback((id: string): Order | undefined => {
    return orders.find(o => o.id === id);
  }, [orders]);
  
  const value = React.useMemo(() => ({ orders, loading, addOrder, getOrderById }), [orders, loading, addOrder, getOrderById]);

  return React.createElement(OrdersContext.Provider, { value: value }, children);
};

export const useOrders = () => {
  const context = React.useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within a OrdersProvider');
  }
  return context;
};
