'use client';

import Link from 'next/link';
import { ShoppingCart, Package, Home, Rocket } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';

export function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-card shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-primary">
              <Rocket className="h-8 w-8" />
              <span className="text-2xl font-bold font-headline">Falcon Cart</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/orders">
                <Package className="mr-2 h-4 w-4" />
                Orders
              </Link>
            </Button>
          </nav>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <div id="cart-icon-container" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
