
export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalOrders: number;
  totalSpent: number;
  data_ai_hint?: string;
}

const customers: Customer[] = [
  {
    id: 'usr-1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
    totalOrders: 3,
    totalSpent: 1549.97,
    data_ai_hint: 'man portrait',
  },
  {
    id: 'usr-2',
    name: 'Maria Garcia',
    email: 'maria.g@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
    totalOrders: 1,
    totalSpent: 499.99,
    data_ai_hint: 'woman portrait',
  },
  {
    id: 'usr-3',
    name: 'Sam Lee',
    email: 'sam.l@example.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
    totalOrders: 5,
    totalSpent: 2305.45,
    data_ai_hint: 'person portrait',
  },
  {
    id: 'usr-4',
    name: 'Emily Carter',
    email: 'emily.c@example.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    totalOrders: 2,
    totalSpent: 89.99,
    data_ai_hint: 'woman smiling',
  },
];

export function getCustomers(): Customer[] {
  return customers;
}

export function getCustomerById(id: string): Customer | undefined {
  return customers.find(c => c.id === id);
}
