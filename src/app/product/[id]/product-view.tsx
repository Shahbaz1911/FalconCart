'use client';

import Image from 'next/image';
import { AddToCartButton } from './add-to-cart-button';
import { Recommendations } from './recommendations';
import type { Product } from '@/lib/products';

interface ProductViewProps {
  product: Product;
}

export function ProductView({ product }: ProductViewProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
      <div className="bg-card rounded-lg p-4 flex items-center justify-center">
        <div className="aspect-square relative w-full max-w-md mx-auto">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={product.data_ai_hint}
            priority
          />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">{product.name}</h1>
        <p className="text-muted-foreground text-sm mb-4">{product.category}</p>
        <p className="text-lg mb-6">{product.description}</p>
        <div className="flex items-center justify-between mb-6">
          <span className="text-4xl font-bold font-headline text-primary">${product.price.toFixed(2)}</span>
        </div>
        <AddToCartButton product={product} />
        <div className="mt-12">
          <Recommendations product={product} />
        </div>
      </div>
    </div>
  );
}
