'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/products';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { useRef, useState } from 'react';
import gsap from 'gsap';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isAnimating, setIsAnimating] = useState(false);
  const iconRef = useRef<SVGSVGElement>(null);

  const handleClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    addItem(product, 1);
    toast({
      title: "Added to cart!",
      description: `${product.name} is now in your shopping cart.`,
    });
    
    if (iconRef.current) {
      gsap.timeline({ onComplete: () => setIsAnimating(false) })
        .to(iconRef.current, {
          x: -5,
          duration: 0.07,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut"
        });
    }
  };

  return (
    <Button 
      size="lg" 
      className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" 
      onClick={handleClick}
      disabled={isAnimating}
    >
      <ShoppingCart ref={iconRef} className="mr-2 h-5 w-5" />
      {isAnimating ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
