
export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalOrders: number;
  totalSpent: number;
  data_ai_hint?: string;
}

const allCustomers: Customer[] = [
    {
        id: 'usr-1',
        name: "Alex Johnson",
        email: "alex.j@example.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
        totalOrders: 3,
        totalSpent: 1549.97,
        data_ai_hint: "man portrait"
    },
    {
        id: 'usr-2',
        name: "Maria Garcia",
        email: "maria.g@example.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
        totalOrders: 1,
        totalSpent: 499.99,
        data_ai_hint: "woman portrait"
    }
];


export async function getCustomers(): Promise<Customer[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return allCustomers;
}

export async function getCustomerById(id: string): Promise<Customer | undefined> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return allCustomers.find(c => c.id === id);
}
