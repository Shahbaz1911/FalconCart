
import type { DocumentReference } from 'firebase/firestore';

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

// Storing product data locally as requested.
const allProducts: Product[] = [
    {
        id: '1',
        name: "Astro-Gazer 9000",
        description: "The latest in personal telescopes. Bring the wonders of the cosmos to your backyard with unparalleled clarity. Features a computerized GoTo mount for easy tracking of celestial objects.",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1841&auto=format&fit=crop",
        category: "Electronics",
        rating: 5,
        stock: 15,
        data_ai_hint: "telescope space"
    },
    {
        id: '2',
        name: "Quantum Sneakers",
        description: "Walk on air with these revolutionary sneakers. Featuring self-lacing technology and kinetic energy harvesting soles, they are the future of footwear.",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
        category: "Footwear",
        rating: 4,
        stock: 30,
        data_ai_hint: "futuristic shoes"
    },
    {
        id: '3',
        name: "Hydro-Synth Plant Pot",
        description: "A smart plant pot that plays serene, synthesized music based on your plant's moisture levels. Keeps your plant and you happy.",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1487035242944-78f234964654?q=80&w=1964&auto=format&fit=crop",
        category: "Home Goods",
        rating: 5,
        stock: 50,
        data_ai_hint: "smart planter"
    },
    {
        id: '4',
        name: "Gravity-Defy Hoodie",
        description: "A sleek, modern hoodie made from advanced smart-fabric that adapts to your body temperature. Perfect for any urban explorer.",
        price: 189.99,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop",
        category: "Apparel",
        rating: 5,
        stock: 25,
        data_ai_hint: "stylish hoodie"
    },
    {
        id: '5',
        name: "Chrono-Watch X",
        description: "A minimalist smartwatch that blends classic design with futuristic tech. Track your vitals, get notifications, and look sharp.",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1974&auto=format&fit=crop",
        category: "Accessories",
        rating: 5,
        stock: 20,
        data_ai_hint: "smart watch"
    }
];

// Type for creating a new product.
type ProductInput = Omit<Product, 'id'>;

export async function getProducts(): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return allProducts;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return allProducts.find(p => p.id === id);
}

export async function createProduct(productData: ProductInput): Promise<Product> {
  // Simulate network delay and creating an ID
  await new Promise(resolve => setTimeout(resolve, 50));
  const newProduct: Product = {
    ...productData,
    id: `prod-${Date.now()}`,
  };
  allProducts.push(newProduct);
  return newProduct;
}
