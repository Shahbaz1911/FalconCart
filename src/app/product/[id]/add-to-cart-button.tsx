'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/products';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [animated, setAnimated] = useState(false);

  const handleClick = () => {
    // Prevent re-triggering while animation is running
    if (animated) return;

    setAnimated(true);
    addItem(product, 1);
    toast({
      title: "Added to cart!",
      description: `${product.name} is now in your shopping cart.`,
    });
    
    // Reset animation after it completes
    setTimeout(() => {
        setAnimated(false);
    }, 820); // Match animation duration in tailwind.config.ts
  };

  return (
    <Button 
      size="lg" 
      className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" 
      onClick={handleClick}
    >
      <ShoppingCart className={cn("mr-2 h-5 w-5", { "animate-shake": animated })} />
      Add to Cart
    </Button>
  );
}
