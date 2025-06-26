
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/products';
import Link from 'next/link';

const electronicProducts: Product[] = [
    { id: 'el1', name: 'Astro-Gazer 9000', price: 1299.99, image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1841&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 15, description: 'The latest in personal telescopes with a computerized GoTo mount.', data_ai_hint: 'telescope space' },
    { id: 'el2', name: 'Nova-Glow Lamp', price: 129.99, image: 'https://images.unsplash.com/photo-1543508379-403b98a21e54?q=80&w=1974&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 45, description: 'A smart lamp that simulates natural daylight cycles.', data_ai_hint: 'modern lamp' },
    { id: 'el3', name: 'Sonic-Scribe Pen', price: 199.99, image: 'https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?q=80&w=1974&auto=format&fit=crop', category: 'Electronics', rating: 4, stock: 30, description: 'A pen that digitizes your notes as you write on any paper.', data_ai_hint: 'smart pen' },
    { id: 'el4', name: 'Orbit-Levitating Speaker', price: 299.99, image: 'https://images.unsplash.com/photo-1594998703823-3b1072a3e20e?q=80&w=1974&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 22, description: 'A floating speaker with 360-degree sound and ambient lighting.', data_ai_hint: 'levitating speaker' },
    { id: 'el5', name: 'Holoscreen Projector', price: 899.99, image: 'https://images.unsplash.com/photo-1609689973950-b856e18db12e?q=80&w=2070&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 12, description: 'A compact projector that creates holographic displays.', data_ai_hint: 'mini projector' },
    { id: 'el6', name: 'Chrono-Shift Clock', price: 159.99, image: 'https://images.unsplash.com/photo-1533221533923-9cf3d5a4a584?q=80&w=1974&auto=format&fit=crop', category: 'Electronics', rating: 4, stock: 38, description: 'A digital clock with a mesmerizing, ever-changing display.', data_ai_hint: 'nixie clock' },
    { id: 'el7', name: 'Code-Breaker Keyboard', price: 229.99, image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa122?q=80&w=2070&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 28, description: 'A mechanical keyboard with customizable keys and backlighting.', data_ai_hint: 'mechanical keyboard' },
    { id: 'el8', name: 'Sentinel Drone', price: 799.99, image: 'https://images.unsplash.com/photo-1507582020474-9a334a76194b?q=80&w=2070&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 18, description: 'An autonomous drone for home security and aerial photography.', data_ai_hint: 'camera drone' },
    { id: 'el9', name: 'Pure-Air Purifier', price: 279.99, image: 'https://images.unsplash.com/photo-1628868625792-3829b3503a4c?q=80&w=1974&auto=format&fit=crop', category: 'Electronics', rating: 4, stock: 40, description: 'A smart air purifier that adapts to your room\'s air quality.', data_ai_hint: 'air purifier' },
    { id: 'el10', name: 'Eon-Reader Tablet', price: 449.99, image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=1974&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 33, description: 'An e-reader with a paper-like display and infinite battery life.', data_ai_hint: 'e-reader tablet' },
    { id: 'el11', name: 'Sound-Scape Station', price: 349.99, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', category: 'Electronics', rating: 5, stock: 25, description: 'A device that creates personalized sound environments for focus or relaxation.', data_ai_hint: 'gaming setup' },
    { id: 'el12', name: 'Data-Vault Drive', price: 179.99, image: 'https://images.unsplash.com/photo-1531493731238-b34b91f19f80?q=80&w=2070&auto=format&fit=crop', category: 'Electronics', rating: 4, stock: 55, description: 'A secure, biometric-locked portable hard drive.', data_ai_hint: 'secure harddrive' },
];

export default function ElectronicsCollectionPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/" className="text-sm text-primary hover:underline">&larr; Back to Home</Link>
        <h1 className="text-3xl md:text-4xl font-headline font-bold mt-2">
            Electronics Collection
        </h1>
        <p className="mt-2 text-muted-foreground">
            Discover the future with our collection of cutting-edge gadgets and devices.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {electronicProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
