import { db } from './firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  data_ai_hint?: string;
}

export async function getProducts(): Promise<Product[]> {
  if (!db) {
    console.warn("Firestore is not configured. Returning empty products array.");
    return [];
  }
  try {
    const productsCol = collection(db, 'products');
    const productSnapshot = await getDocs(productsCol);
    const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    return productList;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  if (!db) {
    console.warn("Firestore is not configured. Cannot fetch product by ID.");
    return undefined;
  }
  try {
    const productDoc = doc(db, 'products', id);
    const productSnapshot = await getDoc(productDoc);
    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() } as Product;
    }
    return undefined;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return undefined;
  }
}
