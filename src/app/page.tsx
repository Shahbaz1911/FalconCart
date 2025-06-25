
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { Headset, Star, Truck, Undo2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { HeroSection } from '@/components/hero-section';
import { FeaturedCollections } from '@/components/featured-collections';
import { CustomerReviews } from '@/components/customer-reviews';

export default function Home() {
  const products = getProducts();
  const trendingProducts = products.slice(0, 4);

  const features = [
    { icon: <Truck />, title: 'Free Shipping', description: 'On all orders over $50' },
    { icon: <Undo2 />, title: 'Easy Returns', description: '30-day return policy' },
    { icon: <Headset />, title: '24/7 Support', description: 'We are here to help' }
  ];
  
  // GSAP animations can be implemented in a useEffect hook for each section.

  return (
    <div className="space-y-24 md:space-y-32 overflow-x-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Collections */}
      <FeaturedCollections />

      {/* 3. Trending Products */}
      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-8">Trending Now</h2>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {trendingProducts.map((product) => (
            <div key={product.id} className="relative w-72 flex-shrink-0">
              <Badge className="absolute top-2 left-2 z-10 bg-destructive text-destructive-foreground">🔥 Selling Fast</Badge>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Shop With Us */}
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

      {/* 5. Product Video Teaser */}
      <section className="grid md:grid-cols-2 gap-8 items-center bg-card p-8 rounded-lg">
        <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" fill alt="Product video" className="object-cover" data-ai-hint="product video" />
        </div>
        <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold font-headline">Experience Our Quality</h2>
            <p className="mt-4 text-muted-foreground">See our products in action and discover the craftsmanship and passion that goes into every piece we create.</p>
            <Button size="lg" className="mt-6" variant="outline">Watch Full Demo</Button>
        </div>
      </section>


      {/* 6. Customer Reviews */}
      <CustomerReviews />

      {/* 7. Newsletter */}
      <section className="bg-primary text-primary-foreground p-12 rounded-lg text-center">
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
