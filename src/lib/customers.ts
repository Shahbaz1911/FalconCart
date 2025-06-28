
import { db } from './firebase';
import { 
    collection, 
    doc, 
    getDoc, 
    setDoc, 
    getDocs, 
    query, 
    orderBy,
    runTransaction,
    increment,
    type Timestamp,
} from 'firebase/firestore';

export interface Customer {
  id: string; // User ID from Firebase Auth
  name: string;
  email: string;
  avatar: string | null;
  totalOrders: number;
  totalSpent: number;
  firstOrderAt: Timestamp;
  lastOrderAt: Timestamp;
  data_ai_hint?: string;
}

const fromFirestore = (docSnap: any): Customer => {
    const data = docSnap.data();
    return {
        id: docSnap.id,
        ...data,
    } as Customer;
}

// Gets all customers for the admin dashboard
export async function getCustomers(): Promise<Customer[]> {
  if (!db) return [];
  
  const customersCol = collection(db, 'customers');
  const q = query(customersCol, orderBy("lastOrderAt", "desc"));
  const customerSnapshot = await getDocs(q);
  
  return customerSnapshot.docs.map(fromFirestore);
}

// Gets a single customer by their user ID
export async function getCustomerById(id: string): Promise<Customer | undefined> {
  if (!db) return undefined;
  
  try {
      const customerDoc = doc(db, 'customers', id);
      const customerSnapshot = await getDoc(customerDoc);
      
      if (customerSnapshot.exists()) {
          return fromFirestore(customerSnapshot);
      }
  } catch (error) {
      console.error("Error fetching customer by ID:", error);
  }

  return undefined;
}


// This function is called when a user places an order.
// It creates a new customer document if one doesn't exist, or updates an existing one.
export async function createOrUpdateCustomer(
  userId: string,
  details: {
    name: string;
    email: string;
    avatar: string | null;
    orderTotal: number;
  }
) {
    if (!db) {
      throw new Error("Firestore not configured.");
    }

    const customerRef = doc(db, "customers", userId);

    try {
        await runTransaction(db, async (transaction) => {
            const customerDoc = await transaction.get(customerRef);

            if (!customerDoc.exists()) {
                // First time order for this user, create new customer document
                transaction.set(customerRef, {
                    name: details.name,
                    email: details.email,
                    avatar: details.avatar,
                    totalOrders: 1,
                    totalSpent: details.orderTotal,
                    firstOrderAt: new Date(),
                    lastOrderAt: new Date(),
                    data_ai_hint: "person portrait", // Generic hint
                });
            } else {
                // Existing customer, update their stats
                transaction.update(customerRef, {
                    totalOrders: increment(1),
                    totalSpent: increment(details.orderTotal),
                    lastOrderAt: new Date(),
                    // Optionally update name/email/avatar if they might change
                    name: details.name,
                    email: details.email,
                    avatar: details.avatar,
                });
            }
        });
        console.log("Customer data updated successfully for user:", userId);
    } catch (e) {
        console.error("Customer update transaction failed: ", e);
    }
}
