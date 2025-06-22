import type { Product } from './products';

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

// NOTE: This is mock data. In a real app, this would come from a database.
const orders: Order[] = [
  {
    id: 'ord-a1b2c3d4-e5f6-7890-1234-567890abcdef',
    date: 'July 20, 2024',
    total: 1389.98,
    status: 'Delivered',
    items: [
      {
        product: {
          id: '1',
          name: 'Astro-Gazer 9000',
          description: 'The latest in personal telescopes...',
          price: 1299.99,
          image: 'https://placehold.co/600x600.png',
          category: 'Electronics',
          data_ai_hint: 'telescope space'
        },
        quantity: 1
      },
      {
        product: {
          id: '3',
          name: 'Hydro-Synth Plant Pot',
          description: 'A smart plant pot that plays serene music...',
          price: 89.99,
          image: 'https://placehold.co/600x600.png',
          category: 'Home Goods',
          data_ai_hint: 'smart planter'
        },
        quantity: 1
      }
    ],
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Cosmos Lane',
      city: 'Starlight City',
      state: 'CA',
      zip: '90210',
      country: 'USA'
    }
  },
  {
    id: 'ord-f6e5d4c3-b2a1-0987-6543-210987fedcba',
    date: 'August 05, 2024',
    total: 499.99,
    status: 'Shipped',
    items: [
      {
        product: {
          id: '4',
          name: 'Chronos Coffee Machine',
          description: 'The perfect cup of coffee, every time.',
          price: 499.99,
          image: 'https://placehold.co/600x600.png',
          category: 'Appliances',
          data_ai_hint: 'coffee machine'
        },
        quantity: 1
      }
    ],
    shippingAddress: {
      fullName: 'Jane Smith',
      address: '456 Tech Avenue',
      city: 'Silicon Valley',
      state: 'CA',
      zip: '94043',
      country: 'USA'
    }
  }
];

export function getOrders(): Order[] {
  // In a real app, you would filter orders by user ID
  return orders;
}

export function getOrderById(id: string): Order | undefined {
  return orders.find(o => o.id === id);
}
