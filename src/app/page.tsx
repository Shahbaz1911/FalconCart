import { CurvedTextScroll } from '@/components/curved-text-scroll';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    // The main container will manage the background and final CTA
    <div className="bg-background text-foreground">
      <CurvedTextScroll />
      {/* A call to action after the animation to guide the user */}
      <div className="h-screen flex flex-col items-center justify-center text-center space-y-8 px-4">
        <h2 className="text-4xl font-bold font-headline">Ready to Dive In?</h2>
        <p className="text-muted-foreground max-w-lg">
          You've seen the motion, now experience the products. Explore our collections and find your next favorite item.
        </p>
        <Button asChild size="lg">
          <Link href="/products">Explore All Products</Link>
        </Button>
      </div>
    </div>
  );
}
