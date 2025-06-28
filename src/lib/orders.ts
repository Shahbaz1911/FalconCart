import type { Product } from './products';
import { allProducts } from './products';

// Helper to find a product by its ID from the static list
const getProduct = (id: string) => allProducts.find(p => p.id === id)!;

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
        total: 1549.98,
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
            { product: getProduct('el1'), quantity: 1 }, // Astro-Gazer 9000
            { product: getProduct('ac2'), quantity: 1 }  // Cyber-Shade Sunglasses
        ]
    },
    {
        id: 'ord-456-def',
        date: 'August 02, 2024',
        total: 569.98,
        status: 'Shipped',
        shippingAddress: {
            fullName: 'Maria Garcia',
            address: '456 Future Ave',
            city: 'Neo-Metropolis',
            state: 'NY',
            zip: '10001',
            country: 'USA'
        },
        items: [
            { product: getProduct('fw1'), quantity: 1 }, // Quantum Sneakers
            { product: getProduct('ap1'), quantity: 1 }  // Gravity-Defy Hoodie
        ]
    },
    {
        id: 'ord-789-ghi',
        date: 'August 05, 2024',
        total: 1189.97,
        status: 'Processing',
        shippingAddress: {
            fullName: 'Sam Lee',
            address: '789 Tech Terrace',
            city: 'Silicon Valley',
            state: 'CA',
            zip: '94043',
            country: 'USA'
        },
        items: [
            { product: getProduct('hg2'), quantity: 1 }, // Zero-Gravity Bookshelf
            { product: getProduct('el2'), quantity: 1 }, // Nova-Glow Lamp
            { product: getProduct('ac5'), quantity: 1 }  // Stealth-Wallet
        ]
    },
     {
        id: 'ord-jkl-012',
        date: 'June 10, 2024',
        total: 239.98,
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
            { product: getProduct('ap9'), quantity: 2 } // Vertex Vest
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
