import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/products';
import { Button } from './ui/button';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105">
      <Link href={`/product/${product.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="aspect-square relative w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={product.data_ai_hint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="font-headline text-lg leading-tight mb-2">
            {product.name}
          </CardTitle>
          <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < product.rating ? 'text-primary fill-current' : 'text-muted'}`} />
              ))}
              <span className="text-xs text-muted-foreground ml-1">({product.rating.toFixed(1)})</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-xl font-semibold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <Button variant="secondary" size="sm" asChild>
            <span className="text-sm">View Details</span>
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
