
'use client';

import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { PackageOpen } from 'lucide-react';
import Link from 'next/link';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '@/lib/products';
import { Skeleton } from '@/components/ui/skeleton';

interface CollectionViewProps {
  products: Product[];
  category: string;
  displayCategoryName: string;
}

export function CollectionView({ products, category, displayCategoryName }: CollectionViewProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useLayoutEffect(() => {
    if (products.length > 0 && isClient) {
      gsap.registerPlugin(ScrollTrigger);

      const component = componentRef.current;
      const track = trackRef.current;

      if (!component || !track) return;
      
      const scrollAmount = track.scrollWidth - component.clientWidth;
      
      if (scrollAmount <= 0) return;

      let ctx = gsap.context(() => {
        gsap.to(track, {
          x: -scrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: component,
            start: 'top top',
            pin: true,
            scrub: 1,
            end: () => `+=${scrollAmount}`,
            invalidateOnRefresh: true,
          },
        });
      }, component);

      return () => ctx.revert();
    }
  }, [products, isClient]);

  const header = (
    <div className="mb-8">
      <Link href="/" className="text-sm text-primary hover:underline">&larr; Back to Home</Link>
      <h1 className="text-3xl md:text-4xl font-headline font-bold mt-2">
        {displayCategoryName} Collection
      </h1>
      <p className="mt-2 text-muted-foreground">
        Explore our hand-picked selection of {category.toLowerCase()}.
      </p>
    </div>
  );

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        {header}
        <PackageOpen className="mx-auto h-16 w-16 text-muted-foreground mt-10" />
        <h2 className="mt-4 text-xl font-bold font-headline">No Products Found in {displayCategoryName}</h2>
        <p className="mt-2 text-muted-foreground">We couldn't find any products in this collection. Check back later!</p>
        <Button asChild className="mt-6">
          <Link href="/">Explore Other Collections</Link>
        </Button>
      </div>
    );
  }

  if (!isClient) {
    return (
        <>
            {header}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.slice(0, 6).map((p) => (
                    <Skeleton key={p.id} className="h-72 w-full" />
                ))}
            </div>
        </>
    )
  }

  return (
    <>
      {header}
      
      <div ref={componentRef} className="h-[80vh] w-full overflow-hidden">
          <div ref={trackRef} className="flex h-full items-center gap-6 w-max pr-10">
              {products.map((product) => (
                <div key={product.id} className="w-72 flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
      </div>
      
      {products.length > 0 && <div className="h-screen"></div>}
    </>
  );
}
