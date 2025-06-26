
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/products';
import Link from 'next/link';

const accessoryProducts: Product[] = [
    { id: 'ac1', name: 'Chrono-Watch X', price: 499.99, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 20, description: 'A minimalist smartwatch that blends classic design with futuristic tech.', data_ai_hint: 'smart watch' },
    { id: 'ac2', name: 'Neural-Link Earbuds', price: 249.99, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2070&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 35, description: 'Crystal-clear audio with a direct neural interface for seamless control.', data_ai_hint: 'wireless earbuds' },
    { id: 'ac3', name: 'Aura-Vision Glasses', price: 329.99, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop', category: 'Accessories', rating: 4, stock: 25, description: 'Augmented reality sunglasses that overlay information on your world.', data_ai_hint: 'futuristic sunglasses' },
    { id: 'ac4', name: 'Kine-Charge Backpack', price: 289.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb68c6a62?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 18, description: 'A stylish backpack that charges your devices as you walk.', data_ai_hint: 'tech backpack' },
    { id: 'ac5', name: 'Geo-Tracker Wallet', price: 99.99, image: 'https://images.unsplash.com/photo-162062551578A-333df7a78363?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 4, stock: 50, description: 'A smart wallet that you can never lose, with global tracking.', data_ai_hint: 'leather wallet' },
    { id: 'ac6', name: 'Pulse-Band Bracelet', price: 149.99, image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1964&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 40, description: 'Monitors your vitals and provides real-time health feedback.', data_ai_hint: 'fitness tracker' },
    { id: 'ac7', name: 'Helios Power Ring', price: 199.99, image: 'https://images.unsplash.com/photo-1627293589484-9d6f35bde067?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 4, stock: 30, description: 'A sleek ring that doubles as a portable power source.', data_ai_hint: 'smart ring' },
    { id: 'ac8', name: 'Titan-Weave Belt', price: 79.99, image: 'https://images.unsplash.com/photo-1606132801334-a7c56515b138?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 60, description: 'An indestructible belt made from advanced woven alloys.', data_ai_hint: 'leather belt' },
    { id: 'ac9', name: 'Echo-Translate Pendant', price: 179.99, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 28, description: 'A necklace that provides real-time language translation.', data_ai_hint: 'modern necklace' },
    { id: 'ac10', name: 'Data-Lace Gloves', price: 129.99, image: 'https://images.unsplash.com/photo-1590483828334-71f54a86a603?q=80&w=2070&auto=format&fit=crop', category: 'Accessories', rating: 4, stock: 22, description: 'Gloves that allow you to interface with devices through gestures.', data_ai_hint: 'leather gloves' },
    { id: 'ac11', name: 'Sphere Sound Keychain', price: 59.99, image: 'https://images.unsplash.com/photo-1587280501635-3350e932223b?q=80&w=2070&auto=format&fit=crop', category: 'Accessories', rating: 4, stock: 70, description: 'A keychain that is also a powerful personal speaker.', data_ai_hint: 'futuristic keychain' },
    { id: 'ac12', name: 'Aero-Shade Cap', price: 49.99, image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1974&auto=format&fit=crop', category: 'Accessories', rating: 5, stock: 80, description: 'A cap with self-adjusting tint for perfect shade.', data_ai_hint: 'baseball cap' },
];

export default function AccessoriesCollectionPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/" className="text-sm text-primary hover:underline">&larr; Back to Home</Link>
        <h1 className="text-3xl md:text-4xl font-headline font-bold mt-2">
            Accessories Collection
        </h1>
        <p className="mt-2 text-muted-foreground">
            Explore our curated selection of high-tech and stylish accessories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {accessoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
