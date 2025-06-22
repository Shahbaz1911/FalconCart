'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/products';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  product: Product;
  onAddToCart?: () => void;
}

export function AddToCartButton({ product, onAddToCart }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { toast } = useToast()


  const handleClick = () => {
    addItem(product, 1);
    toast({
      title: "Added to cart!",
      description: `${product.name} is now in your shopping cart.`,
    });
    onAddToCart?.();
  };

  return (
    <Button size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleClick}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
