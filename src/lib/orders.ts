import { db } from './firebase';
import { 
    collection, 
    getDocs, 
    doc, 
    getDoc, 
    addDoc, 
    query, 
    where, 
    serverTimestamp, 
    Timestamp,
    orderBy
} from 'firebase/firestore';
import type { Product } from './products';


export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  date: string; // User-friendly date string
  createdAt: Timestamp; // For sorting
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

export type OrderInput = Omit<Order, 'id' | 'date' | 'createdAt'>;

// Converts a Firestore Timestamp to a readable date string
const formatDate = (timestamp: Timestamp) => {
    return timestamp.toDate().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const fromFirestore = (docSnap: any): Order => {
    const data = docSnap.data();
    return {
        id: docSnap.id,
        ...data,
        date: formatDate(data.createdAt),
    } as Order;
}

export async function createOrder(orderData: OrderInput): Promise<Order> {
    if (!db) {
      throw new Error("Firestore not configured.");
    }
    
    const orderWithTimestamp = {
        ...orderData,
        createdAt: serverTimestamp(),
    };

    const orderRef = await addDoc(collection(db, 'orders'), orderWithTimestamp);
    
    // Fetch the doc again to get the server-generated timestamp for immediate UI update
    const newOrderDoc = await getDoc(orderRef);
    return fromFirestore(newOrderDoc);
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
    if (!db) return [];
    
    const ordersCol = collection(db, 'orders');
    // A composite index is required for filtering on one field (userId) and ordering by another (createdAt).
    // To avoid requiring a manual index creation step, we'll fetch the documents
    // and then sort them in the application code.
    const q = query(ordersCol, where("userId", "==", userId));
    const orderSnapshot = await getDocs(q);
    
    const orders = orderSnapshot.docs.map(fromFirestore);

    // Sort by creation date, newest first.
    orders.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());

    return orders;
}

export async function getAllOrders(): Promise<Order[]> {
    if (!db) return [];
    
    const ordersCol = collection(db, 'orders');
    const q = query(ordersCol, orderBy("createdAt", "desc"));
    const orderSnapshot = await getDocs(q);
    
    return orderSnapshot.docs.map(fromFirestore);
}

export async function getOrderById(orderId: string): Promise<Order | undefined> {
    if (!db) return undefined;
    
    try {
        const orderDoc = doc(db, 'orders', orderId);
        const orderSnapshot = await getDoc(orderDoc);
        
        if (orderSnapshot.exists()) {
            return fromFirestore(orderSnapshot);
        }
    } catch (error) {
        console.error("Error fetching order by ID:", error);
    }

    return undefined;
}
