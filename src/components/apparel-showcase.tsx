
'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/products';
import { useIsMobile } from '@/hooks/use-mobile';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const apparelProducts: Product[] = [
    { id: 'ap1', name: 'Gravity-Defy Hoodie', price: 189.99, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 25, description: 'A sleek, modern hoodie made from advanced smart-fabric.', data_ai_hint: 'stylish hoodie' },
    { id: 'ap2', name: 'Cyber-Knit Beanie', price: 49.99, image: 'https://images.unsplash.com/photo-1575428652377-a3d80e281e6e?q=80&w=1964&auto=format&fit=crop', category: 'Apparel', rating: 4, stock: 40, description: 'A stylish beanie with integrated tech fibers.', data_ai_hint: 'tech beanie' },
    { id: 'ap3', name: 'Aero-Mesh T-Shirt', price: 79.99, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 60, description: 'A breathable and lightweight t-shirt for any activity.', data_ai_hint: 'black tshirt' },
    { id: 'ap4', name: 'Chrono-Trench Coat', price: 399.99, image: 'https://images.unsplash.com/photo-1515426685495-a26831553c48?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 15, description: 'A timeless trench coat with a futuristic twist.', data_ai_hint: 'trench coat' },
    { id: 'ap5', name: 'Stealth Cargo Pants', price: 149.99, image: 'https://images.unsplash.com/photo-1604176354204-926873782855?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 4, stock: 35, description: 'Durable and stylish cargo pants with smart pockets.', data_ai_hint: 'cargo pants' },
    { id: 'ap6', name: 'Kinetic-Flex Jeans', price: 169.99, image: 'https://images.unsplash.com/photo-1602293589914-9e296ba2a7c4?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 30, description: 'Jeans that move with you, made from flexible denim.', data_ai_hint: 'modern jeans' },
    { id: 'ap7', name: 'Solaris Windbreaker', price: 129.99, image: 'https://images.unsplash.com/photo-1592019442659-c6df67b45b23?q=80&w=1999&auto=format&fit=crop', category: 'Apparel', rating: 4, stock: 28, description: 'A lightweight jacket that protects from the elements.', data_ai_hint: 'windbreaker jacket' },
    { id: 'ap8', name: 'Echo-Scarf', price: 69.99, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 50, description: 'A soft and stylish scarf with a modern pattern.', data_ai_hint: 'stylish scarf' },
    { id: 'ap9', name: 'Vertex Vest', price: 119.99, image: 'https://images.unsplash.com/photo-1544022669-e489b019919b?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 4, stock: 22, description: 'A versatile vest for layering in any season.', data_ai_hint: 'utility vest' },
    { id: 'ap10', name: 'Tempest Tactical Jacket', price: 249.99, image: 'https://images.unsplash.com/photo-1591946614725-3b15a6873263?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 18, description: 'A rugged jacket with a clean, modern design.', data_ai_hint: 'tactical jacket' },
    { id: 'ap11', name: 'Nova-Thread Polo', price: 89.99, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1915&auto=format&fit=crop', category: 'Apparel', rating: 4, stock: 45, description: 'A classic polo shirt made with advanced, soft-touch fabric.', data_ai_hint: 'polo shirt' },
    { id: 'ap12', name: 'Zenith Zip-Up', price: 139.99, image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?q=80&w=1974&auto=format&fit=crop', category: 'Apparel', rating: 5, stock: 20, description: 'A comfortable and stylish zip-up for everyday wear.', data_ai_hint: 'zip-up hoodie' }
];

export function ApparelShowcase() {
  const componentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useLayoutEffect(() => {
    if (isClient && !isMobile) {
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
  }, [isClient, isMobile]);

  const header = (
     <div className="mb-8 md:mb-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:left-12 z-10 text-background p-8 bg-black/50 rounded-lg max-w-md">
        <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Apparel Showcase
        </h2>
        <p className="mt-2 text-gray-200">
            Explore our latest collection of smart fabrics and futuristic designs. Built for the modern explorer.
        </p>
    </div>
  );

  return (
    <section id="apparel-showcase">
      {isMobile ? (
        <>
            {header}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {apparelProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        </>
      ) : (
        <div ref={componentRef} className="h-screen w-full overflow-hidden relative">
            {header}
            <div ref={trackRef} className="flex h-full items-center gap-6 w-max pr-10 pl-[calc(50%-450px)]">
                {apparelProducts.map((product) => (
                  <div key={product.id} className="w-72 flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
        </div>
      )}
      
      {!isMobile && <div style={{ height: '100vh' }}></div>}
    </section>
  );
}
