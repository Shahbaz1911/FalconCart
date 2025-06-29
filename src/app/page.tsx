
'use client';

import { useState, useMemo, useEffect, useRef, useLayoutEffect } from 'react';
import { ProductCard } from '@/components/product-card';
import { getProducts, type Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { Headset, PackageOpen, Truck, Undo2 } from 'lucide-react';
import { HeroSection } from '@/components/hero-section';
import { FeaturedCollections } from '@/components/featured-collections';
import { CustomerReviews } from '@/components/customer-reviews';
import { Skeleton } from '@/components/ui/skeleton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products = await getProducts();
      setAllProducts(products);
      setLoading(false);
    };
    fetchProducts();
  }, []);
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = useMemo(() => {
      if (allProducts.length === 0) return [];
      return ['All', ...new Set(allProducts.map(p => p.category))];
  }, [allProducts]);
  
  const trendingProducts = useMemo(() => {
    if (allProducts.length === 0) return [];
    
    let products = selectedCategory === 'All'
      ? allProducts
      : allProducts.filter(p => p.category === selectedCategory);
      
    // Sort by rating and then maybe stock or a random factor to ensure variety
    return [...products].sort((a,b) => b.rating - a.rating).slice(0, 8);
  }, [allProducts, selectedCategory]);

  const features = [
    { icon: <Truck />, title: 'Free Shipping', description: 'On all orders over $50' },
    { icon: <Undo2 />, title: 'Easy Returns', description: '30-day return policy' },
    { icon: <Headset />, title: '24/7 Support', description: 'We are here to help' }
  ];

  const qualitySectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = qualitySectionRef.current;
    const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];

    if (section && texts.length) {
      const ctx = gsap.context(() => {
        texts.forEach((text, i) => {
          const direction = i % 2 === 0 ? 1 : -1;
          
          // Set initial horizontal position
          gsap.set(text, { xPercent: direction * -50 });

          // Animate horizontal position on scroll
          gsap.to(text, {
            xPercent: direction * 50,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1 + i * 0.5, // different speeds
            },
          });
        });
      }, section);
      return () => ctx.revert();
    }
  }, []);
  
  return (
    <div className="space-y-24 md:space-y-32">
      <HeroSection />

      <FeaturedCollections />

      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-4">Trending Products</h2>
        <p className="text-muted-foreground text-center mb-8">Check out what's popular right now.</p>
        
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {loading ? (
             <div className="flex gap-2">
                 <Skeleton className="h-10 w-20" />
                 <Skeleton className="h-10 w-24" />
                 <Skeleton className="h-10 w-28" />
             </div>
          ) : (
            categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'secondary'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
            ))
          )}
        </div>

        {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-[420px] w-full" />)}
            </div>
        ) : trendingProducts.length > 0 ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-secondary/50 rounded-lg">
              <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No Trending Products Found</h3>
              <p className="mt-2 text-muted-foreground">Try selecting another category to see what's popular.</p>
          </div>
        )}
      </section>

      <section className="bg-secondary/50 rounded-lg p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map(feature => (
            <div key={feature.title} className="flex flex-col items-center">
              <div className="text-primary bg-background rounded-full p-4 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={qualitySectionRef} className="relative overflow-hidden h-[60vh]">
        <div className="absolute inset-0 z-0 pointer-events-none">
            {['CRAFTSMANSHIP', 'INNOVATION', 'PRECISION', 'PERFORMANCE'].map((text, i) => (
                <div
                    key={text}
                    ref={el => textRefs.current[i] = el}
                    className="absolute whitespace-nowrap text-8xl lg:text-9xl font-extrabold font-headline uppercase text-foreground"
                    style={{
                        top: `${(i * 22) + 6}%`, // Adjusted vertical spacing
                    }}
                >
                    {text}
                </div>
            ))}
        </div>
      </section>


      <CustomerReviews />

      <section className="bg-primary text-primary-foreground p-8 sm:p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold font-headline">Join Our Community</h2>
        <p className="mt-2 max-w-xl mx-auto">Get 10% off your first order and be the first to know about new collections and exclusive offers.</p>
        <form className="mt-6 flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <Input type="email" placeholder="Enter your email" className="bg-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70 border-0 flex-grow" />
            <Button type="submit" variant="secondary">Subscribe</Button>
        </form>
      </section>
    </div>
  );
}
