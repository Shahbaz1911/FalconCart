
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/products';
import Link from 'next/link';

const footwearProducts: Product[] = [
    { id: 'fw1', name: 'Quantum Sneakers', price: 349.99, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop', category: 'Footwear', rating: 4, stock: 30, description: 'Walk on air with self-lacing, kinetic energy-harvesting sneakers.', data_ai_hint: 'futuristic shoes' },
    { id: 'fw2', name: 'Pathfinder Boots', price: 289.99, image: 'https://images.unsplash.com/photo-1638218939023-f84f086217c4?q=80&w=1974&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 25, description: 'All-terrain boots with smart-grip technology and temperature control.', data_ai_hint: 'hiking boots' },
    { id: 'fw3', name: 'City-Glide Loafers', price: 199.99, image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1974&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 40, description: 'Classic loafers made from adaptive, self-healing leather.', data_ai_hint: 'stylish loafers' },
    { id: 'fw4', name: 'Strider-X Runners', price: 179.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ab?q=80&w=2070&auto=format&fit=crop', category: 'Footwear', rating: 4, stock: 50, description: 'Lightweight running shoes that analyze your gait for optimal performance.', data_ai_hint: 'running shoes' },
    { id: 'fw5', name: 'Atlas Work Boots', price: 229.99, image: 'https://images.unsplash.com/photo-1626249549377-3f0440f58836?q=80&w=1974&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 33, description: 'Durable work boots with composite-toe protection and anti-fatigue soles.', data_ai_hint: 'work boots' },
    { id: 'fw6', name: 'Velocity Cleats', price: 159.99, image: 'https://images.unsplash.com/photo-1608231387042-89d0ac7c7939?q=80&w=2070&auto=format&fit=crop', category: 'Footwear', rating: 4, stock: 45, description: 'Soccer cleats with aerodynamic design and enhanced ball control surfaces.', data_ai_hint: 'soccer cleats' },
    { id: 'fw7', name: 'Zenith Sandals', price: 89.99, image: 'https://images.unsplash.com/photo-1603487742131-412838683416?q=80&w=1974&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 60, description: 'Comfortable and stylish sandals with memory foam soles.', data_ai_hint: 'modern sandals' },
    { id: 'fw8', name: 'Executive Oxfords', price: 249.99, image: 'https://images.unsplash.com/photo-1549481923-1d882545fb28?q=80&w=2070&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 28, description: 'Classic dress shoes with a modern, lightweight construction.', data_ai_hint: 'dress shoes' },
    { id: 'fw9', name: 'Aura High-Tops', price: 189.99, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop', category: 'Footwear', rating: 4, stock: 38, description: 'High-top sneakers with customizable LED light strips.', data_ai_hint: 'high-top sneakers' },
    { id: 'fw10', name: 'Drift-Tech Slippers', price: 69.99, image: 'https://images.unsplash.com/photo-1603483424932-19f72a4b4044?q=80&w=1974&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 70, description: 'Smart slippers with temperature control and pressure-point massage.', data_ai_hint: 'cozy slippers' },
    { id: 'fw11', name: 'Aqua-Stride Water Shoes', price: 99.99, image: 'https://images.unsplash.com/photo-1598153348866-c0557b347238?q=80&w=1964&auto=format&fit=crop', category: 'Footwear', rating: 4, stock: 55, description: 'Quick-drying water shoes with excellent grip for wet surfaces.', data_ai_hint: 'water shoes' },
    { id: 'fw12', name: 'Nomad Chukka Boots', price: 219.99, image: 'https://images.unsplash.com/photo-1616126692994-a09b4a8c9e54?q=80&w=1974&auto=format&fit=crop', category: 'Footwear', rating: 5, stock: 32, description: 'Versatile chukka boots perfect for any occasion, from casual to formal.', data_ai_hint: 'chukka boots' },
];

export default function FootwearCollectionPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/" className="text-sm text-primary hover:underline">&larr; Back to Home</Link>
        <h1 className="text-3xl md:text-4xl font-headline font-bold mt-2">
            Footwear Collection
        </h1>
        <p className="mt-2 text-muted-foreground">
            Step into the future with our collection of innovative and stylish footwear.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {footwearProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
