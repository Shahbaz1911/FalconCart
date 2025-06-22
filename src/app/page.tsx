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

export default function Home() {
  const products = getProducts();
  const trendingProducts = products.slice(0, 4);

  const collections = [
    { name: 'Clothes', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop', data_ai_hint: 'clothes fashion', href: '/collections/apparel' },
    { name: 'Footwear', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop', data_ai_hint: 'stylish footwear', href: '/collections/footwear' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1588705234458-944c6c59d54e?q=80&w=1974&auto=format&fit=crop', data_ai_hint: 'fashion accessories', href: '/collections/accessories' }
  ];

  const features = [
    { icon: <Truck />, title: 'Free Shipping', description: 'On all orders over $50' },
    { icon: <Undo2 />, title: 'Easy Returns', description: '30-day return policy' },
    { icon: <Headset />, title: '24/7 Support', description: 'We are here to help' }
  ];

  const reviews = [
    {
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
      rating: 5,
      review: 'The Quantum Sneakers are a game-changer! So comfortable and stylish. I feel like I\'m walking on clouds.',
      data_ai_hint: 'man portrait',
    },
    {
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
      rating: 5,
      review: 'I love my Nova-Glow Lamp. It has completely changed the ambiance of my workspace. The quality is top-notch!',
      data_ai_hint: 'woman portrait',
    },
    {
      name: 'Sam Lee',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
      rating: 4,
      review: 'The Chronos Coffee Machine makes a perfect cup every single time. It\'s a bit pricey, but worth it for a coffee lover.',
      data_ai_hint: 'person portrait',
    }
  ];
  
  // GSAP animations can be implemented in a useEffect hook for each section.

  return (
    <div className="space-y-24 md:space-y-32 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center text-white">
        {/* GSAP: Parallax scroll effect on this image */}
        <Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" fill alt="Fashion model" className="z-0 object-cover" data-ai-hint="fashion model" />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="z-20 p-4">
          {/* GSAP: Fade-in text animation */}
          <h1 className="text-5xl md:text-7xl font-bold font-headline">Style Meets Comfort</h1>
          <p className="text-xl md:text-2xl mt-4 max-w-2xl mx-auto">Discover premium fashion made for you</p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="#">Shop Now</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="#">View Collections</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Featured Collections */}
      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-8">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 group">
          {collections.map(collection => (
             // GSAP: Staggered fade-in on scroll
            <Link href={collection.href} key={collection.name} className="group/item relative block overflow-hidden rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-95 hover:!scale-105">
              <Image src={collection.image} width={400} height={500} alt={collection.name} className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" data-ai-hint={collection.data_ai_hint} />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold font-headline">{collection.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Trending Products */}
      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-8">Trending Now</h2>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {/* GSAP: Slide-in product cards */}
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
             // GSAP: Fade-in from bottom + icon bounce
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
        {/* GSAP: Video zooms in on scroll */}
        <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" fill alt="Product video" className="object-cover" data-ai-hint="product video" />
        </div>
        {/* GSAP: Text slides up on scroll */}
        <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold font-headline">Experience Our Quality</h2>
            <p className="mt-4 text-muted-foreground">See our products in action and discover the craftsmanship and passion that goes into every piece we create.</p>
            <Button size="lg" className="mt-6" variant="outline">Watch Full Demo</Button>
        </div>
      </section>


      {/* 6. Customer Reviews */}
      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map(review => (
            // GSAP: Cards rotate-in or float
            <Card key={review.name}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review.data_ai_hint} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-primary fill-current' : 'text-muted'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">&ldquo;{review.review}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. Newsletter */}
      <section className="bg-primary text-primary-foreground p-12 rounded-lg text-center">
        {/* GSAP: Floating blob shapes in background */}
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
