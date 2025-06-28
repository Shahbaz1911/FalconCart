import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, type DocumentReference } from 'firebase/firestore';

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

// Type for creating a new product.
type ProductInput = Omit<Product, 'id'>;

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
    // In Firestore, you often use the document ID directly when creating a document
    // to match a specific string ID like 'el1', 'ap1', etc.
    const productDocRef = doc(db, 'products', id);
    const productSnapshot = await getDoc(productDocRef);
    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() } as Product;
    }
    return undefined;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return undefined;
  }
}

export async function createProduct(productData: ProductInput): Promise<DocumentReference> {
  if (!db) {
    throw new Error("Firestore not configured. Cannot create product.");
  }
  try {
    const productsCol = collection(db, 'products');
    // Firestore will auto-generate an ID if you don't specify one.
    // The form for creating products doesn't ask for an ID, so this is correct.
    const docRef = await addDoc(productsCol, productData);
    return docRef;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product in Firestore.");
  }
}
