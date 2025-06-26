import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { Product } from '@/lib/products';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl">
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`} />
      
      {/* Product Image */}
      <div className="aspect-square relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint={product.data_ai_hint}
        />
      </div>

      {/* Hover Overlay with Details */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="font-headline text-lg font-bold">{product.name}</h3>
          <div className="mt-2 flex items-end justify-between">
            <p className="text-xl font-semibold">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < product.rating ? 'text-amber-400 fill-amber-400' : 'text-primary-foreground/50'}`}
                />
              ))}
              <span className="text-xs text-primary-foreground/80 ml-1">({product.rating.toFixed(1)})</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
