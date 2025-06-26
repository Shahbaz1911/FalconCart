
import type { Product } from './products';

const mockProducts: Record<string, Product> = {
    'ap1': { id: 'ap1', name: 'Gravity-Defy Hoodie', price: 189.99, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 25, description: 'A sleek, modern hoodie made from advanced smart-fabric.', data_ai_hint: 'stylish hoodie' },
    'fw1': { id: 'fw1', name: 'Quantum Sneakers', price: 349.99, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop', category: 'Footwear', rating: 4, stock: 30, description: 'Walk on air with these revolutionary sneakers, featuring self-lacing technology.', data_ai_hint: 'futuristic shoes' },
    'el1': { id: 'el1', name: 'Astro-Gazer 9000', price: 1299.99, image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1841&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 15, description: 'Bring the wonders of the cosmos to your backyard with unparalleled clarity.', data_ai_hint: 'telescope space' },
    'ac1': { id: 'ac1', name: 'Chrono-Watch X', price: 499.99, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 20, description: 'A minimalist smartwatch that blends classic design with futuristic tech.', data_ai_hint: 'smart watch' },
};


export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

const mockOrders: Order[] = [
    {
        id: 'ord-123-abc',
        date: 'July 20, 2024',
        total: 539.98,
        status: 'Delivered',
        shippingAddress: {
            fullName: 'Alex Johnson',
            address: '123 Cosmos Lane',
            city: 'Starlight City',
            state: 'CA',
            zip: '90210',
            country: 'USA'
        },
        items: [
            { product: mockProducts['ap1'], quantity: 1 },
            { product: mockProducts['fw1'], quantity: 1 }
        ]
    },
    {
        id: 'ord-456-def',
        date: 'July 15, 2024',
        total: 1799.98,
        status: 'Processing',
        shippingAddress: {
            fullName: 'Maria Garcia',
            address: '456 Future Ave',
            city: 'Neo-Metropolis',
            state: 'NY',
            zip: '10001',
            country: 'USA'
        },
        items: [
            { product: mockProducts['el1'], quantity: 1 },
            { product: mockProducts['ac1'], quantity: 1 }
        ]
    }
];

// Type for creating a new order.
type OrderInput = Omit<Order, 'id' | 'date'>;

// Converts a date to a readable date string
const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export async function getOrders(): Promise<Order[]> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 300));
  // Sort by date descending
  return [...mockOrders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockOrders.find(order => order.id === id);
}

// This function is now a placeholder. The checkout page will simulate success without calling this.
export async function createOrder(orderData: OrderInput): Promise<string> {
    console.log("Simulating order creation with data:", orderData);
    // In a real app, this would return a new order ID from a database.
    // For now, we'll return a random mock ID.
    const newOrderId = `ord-${Math.random().toString(36).substring(2, 9)}`;
    console.log(`Generated mock order ID: ${newOrderId}`);
    return newOrderId;
}
