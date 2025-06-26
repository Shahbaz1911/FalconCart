import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/lib/products';
import { Star } from 'lucide-react';
import { Button } from './ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl h-full">
      <Link href={`/product/${product.id}`} className="block" aria-label={`View ${product.name}`}>
        <div className="overflow-hidden rounded-t-lg">
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
        </div>
      </Link>

      <CardContent className="p-4 flex flex-col flex-grow">
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-headline text-lg font-bold truncate">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </Link>
          
          <div className="flex-grow" />

          <div className="mt-4 flex items-center justify-between">
             <p className="text-xl font-semibold text-primary">
                ${product.price.toFixed(2)}
             </p>
             <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < product.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">({product.rating.toFixed(1)})</span>
            </div>
          </div>
        
          <Button asChild variant="outline" className="w-full mt-4">
             <Link href={`/product/${product.id}`}>View Details</Link>
          </Button>
      </CardContent>
    </Card>
  );
}
