'use client';

import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { PackageOpen } from 'lucide-react';
import Link from 'next/link';
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '@/lib/products';

interface CollectionViewProps {
  products: Product[];
  category: string;
  displayCategoryName: string;
}

export function CollectionView({ products, category, displayCategoryName }: CollectionViewProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (products.length > 0) {
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
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <PackageOpen className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold font-headline">No Products Found in {displayCategoryName}</h1>
        <p className="mt-2 text-muted-foreground">We couldn't find any products in this collection. Check back later!</p>
        <Button asChild className="mt-6">
          <Link href="/">Explore Other Collections</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <Link href="/" className="text-sm text-primary hover:underline">&larr; Back to Home</Link>
        <h1 className="text-3xl md:text-4xl font-headline font-bold mt-2">
          {displayCategoryName} Collection
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore our hand-picked selection of {category.toLowerCase()}.
        </p>
      </div>
      
      <div ref={componentRef} className="h-[80vh] w-full overflow-hidden">
          <div ref={trackRef} className="flex h-full items-center gap-6 w-max pr-10">
              {products.map((product) => (
                <div key={product.id} className="w-72 flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
      </div>
      {/* Spacer to ensure there's scrollable area after the pinned section */}
      <div className="h-screen"></div>
    </>
  );
}
