import { db } from './firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalOrders: number;
  totalSpent: number;
  data_ai_hint?: string;
}

export async function getCustomers(): Promise<Customer[]> {
  if (!db) {
    console.warn("Firestore is not configured. Returning empty customers array.");
    return [];
  }
  try {
    const customersCol = collection(db, 'customers');
    const customerSnapshot = await getDocs(customersCol);
    const customerList = customerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Customer));
    return customerList;
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
}

export async function getCustomerById(id: string): Promise<Customer | undefined> {
  if (!db) {
    console.warn("Firestore is not configured. Cannot fetch customer by ID.");
    return undefined;
  }
  try {
    const customerDoc = doc(db, 'customers', id);
    const customerSnapshot = await getDoc(customerDoc);
    if (customerSnapshot.exists()) {
      return { id: customerSnapshot.id, ...customerSnapshot.data() } as Customer;
    }
    return undefined;
  } catch (error) {
    console.error(`Error fetching customer with ID ${id}:`, error);
    return undefined;
  }
}
