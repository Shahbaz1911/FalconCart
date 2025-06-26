'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { Headset, Star, Truck, Undo2, PackageOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { HeroSection } from '@/components/hero-section';
import { FeaturedCollections } from '@/components/featured-collections';
import { CustomerReviews } from '@/components/customer-reviews';

export default function Home() {
  const allProducts = getProducts();
  const featuredProducts = allProducts.slice(6, 10);
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = useMemo(() => ['All', ...new Set(allProducts.map(p => p.category))], [allProducts]);
  
  const trendingProducts = useMemo(() => {
    const products = selectedCategory === 'All'
      ? allProducts.slice(0, 8) // Get top 8 trending overall
      : allProducts.filter(p => p.category === selectedCategory);
    return products.slice(0, 8); // Limit to 8 results for display
  }, [allProducts, selectedCategory]);

  const features = [
    { icon: <Truck />, title: 'Free Shipping', description: 'On all orders over $50' },
    { icon: <Undo2 />, title: 'Easy Returns', description: '30-day return policy' },
    { icon: <Headset />, title: '24/7 Support', description: 'We are here to help' }
  ];
  
  return (
    <div className="space-y-24 md:space-y-32">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Collections */}
      <FeaturedCollections />

      {/* 3. Trending Products with Filters */}
      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-4">Trending Products</h2>
        <p className="text-muted-foreground text-center mb-8">Check out what's popular right now.</p>
        
        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {trendingProducts.length > 0 ? (
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

      {/* 4. Our Featured Picks */}
      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-8">Our Featured Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* 5. Why Shop With Us */}
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

      {/* 6. Product Video Teaser */}
      <section className="grid md:grid-cols-2 gap-8 items-center bg-card p-4 sm:p-8 rounded-lg">
        <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" fill alt="Product video" className="object-cover" data-ai-hint="product video" />
        </div>
        <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold font-headline">Experience Our Quality</h2>
            <p className="mt-4 text-muted-foreground">See our products in action and discover the craftsmanship and passion that goes into every piece we create.</p>
            <Button size="lg" className="mt-6" variant="outline">Watch Full Demo</Button>
        </div>
      </section>


      {/* 7. Customer Reviews */}
      <CustomerReviews />

      {/* 8. Newsletter */}
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
