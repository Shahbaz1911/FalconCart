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

export const mockInitialOrders: Order[] = [
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
        total: 539.98,
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
        total: 1089.97,
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
            address: '999 Rocket Road, Apt 5',
            city: 'Cape Canaveral',
            state: 'FL',
            zip: '32920',
            country: 'USA'
        },
        items: [
            { product: getProduct('ap9'), quantity: 2 } // Vertex Vest
        ]
    }
];

// Type for creating a new order.
export type OrderInput = Omit<Order, 'id' | 'date'>;
