
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/products';
import Link from 'next/link';

const homeGoodsProducts: Product[] = [
    { id: 'hg1', name: 'Hydro-Synth Plant Pot', price: 89.99, image: 'https://images.unsplash.com/photo-1487035242944-78f234964654?q=80&w=1964&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 50, description: 'A smart plant pot that plays serene music based on moisture levels.', data_ai_hint: 'smart planter' },
    { id: 'hg2', name: 'Nutri-Pod Indoor Garden', price: 249.99, image: 'https://images.unsplash.com/photo-1596163351270-6d47e46f6f55?q=80&w=1974&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 30, description: 'An automated indoor garden for growing fresh herbs and vegetables year-round.', data_ai_hint: 'indoor garden' },
    { id: 'hg3', name: 'Aura-Glow Diffuser', price: 79.99, image: 'https://images.unsplash.com/photo-1627993355291-a508c9f3e494?q=80&w=1974&auto=format&fit=crop', category: 'Home Goods', rating: 4, stock: 60, description: 'A smart aroma diffuser that synchronizes calming scents with ambient light.', data_ai_hint: 'aroma diffuser' },
    { id: 'hg4', name: 'Zero-Gravity Bookshelf', price: 499.99, image: 'https://images.unsplash.com/photo-1558434654-0b8a69a84d8e?q=80&w=2070&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 15, description: 'A stunning magnetic bookshelf that makes your books appear to float in mid-air.', data_ai_hint: 'floating bookshelf' },
    { id: 'hg5', name: 'Auto-Brew Tea Maker', price: 149.99, image: 'https://images.unsplash.com/photo-1594901974151-c0a68058a69d?q=80&w=1974&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 40, description: 'The perfect cup of tea every time, with precise temperature and steep time controls.', data_ai_hint: 'smart tea maker' },
    { id: 'hg6', name: 'Echo-Frame', price: 399.99, image: 'https://images.unsplash.com/photo-1616091216794-8a406a6c1171?q=80&w=2070&auto=format&fit=crop', category: 'Home Goods', rating: 4, stock: 25, description: 'A digital art frame that displays an ever-changing gallery of beautiful artwork.', data_ai_hint: 'digital frame' },
    { id: 'hg7', name: 'Soni-Clean Dish Rack', price: 129.99, image: 'https://images.unsplash.com/photo-1601614217158-97931331a7a0?q=80&w=1974&auto=format&fit=crop', category: 'Home Goods', rating: 4, stock: 35, description: 'Uses ultrasonic vibrations to gently clean and sanitize your dishes as they dry.', data_ai_hint: 'modern kitchen' },
    { id: 'hg8', name: 'Thermo-Mug', price: 59.99, image: 'https://images.unsplash.com/photo-1543184627-a73a8bf34a74?q=80&w=1974&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 80, description: 'Maintains your beverage at the perfect temperature for hours on end.', data_ai_hint: 'smart mug' },
    { id: 'hg9', name: 'Precision-Cut Knife Block', price: 199.99, image: 'https://images.unsplash.com/photo-1620912308860-2968112a8b9f?q=80&w=1974&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 28, description: 'A sleek, self-sharpening knife block that keeps your blades perfectly honed.', data_ai_hint: 'knife block' },
    { id: 'hg10', name: 'Bio-Foam Mattress Topper', price: 299.99, image: 'https://images.unsplash.com/photo-1588058848136-1e0759d0429a?q=80&w=2070&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 20, description: 'Upgrade your sleep with this smart foam topper that adapts to your body.', data_ai_hint: 'bed mattress' },
    { id: 'hg11', name: 'Portal Mirror', price: 649.99, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop', category: 'Home Goods', rating: 5, stock: 18, description: 'A full-length smart mirror that doubles as an interactive workout display.', data_ai_hint: 'smart mirror' },
    { id: 'hg12', name: 'Kinetic-Weave Rug', price: 349.99, image: 'https://images.unsplash.com/photo-1575429184992-8023f044e117?q=80&w=1974&auto=format&fit=crop', category: 'Home Goods', rating: 4, stock: 22, description: 'A rug that cleans itself and changes patterns based on the time of day.', data_ai_hint: 'modern rug' },
];

export default function HomeGoodsCollectionPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/" className="text-sm text-primary hover:underline">&larr; Back to Home</Link>
        <h1 className="text-3xl md:text-4xl font-headline font-bold mt-2">
            Home Goods Collection
        </h1>
        <p className="mt-2 text-muted-foreground">
            Outfit your space with the latest in smart and stylish home technology.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {homeGoodsProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
