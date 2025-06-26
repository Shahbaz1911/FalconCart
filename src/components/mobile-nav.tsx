'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBasket, User, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/products', icon: ShoppingBasket, label: 'Shop' },
  { href: '/cart', icon: ShoppingCart, label: 'Cart' },
  { href: '/account', icon: User, label: 'Account' },
];

export function MobileNav() {
  const pathname = usePathname();
  const { items } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    // Make cart and account active on sub-paths as well
    if (href === '/cart' || href === '/account') {
        return pathname.startsWith(href);
    }
    // For products, only be active on the main products page, not individual products
    return pathname === href;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-50 shadow-[0_-1px_4px_rgba(0,0,0,0.05)]">
      <nav className="flex justify-around items-center h-full">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1 text-xs w-full h-full transition-colors',
              isActive(link.href)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            )}
          >
            <div className="relative">
              <link.icon className="h-6 w-6" />
              {link.href === '/cart' && isClient && itemCount > 0 && (
                <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="font-medium">{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
