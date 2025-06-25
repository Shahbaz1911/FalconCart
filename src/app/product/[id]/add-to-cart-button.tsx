'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  onClick: () => void;
}

export function AddToCartButton({ onClick }: AddToCartButtonProps) {
  return (
    <Button 
      size="lg" 
      className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" 
      onClick={onClick}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
