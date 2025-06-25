'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | {}>({});
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Clothes', href: '/collections/apparel' },
    { name: 'Footwear', href: '/collections/footwear' },
    { name: 'Accessories', href: '/collections/accessories' },
    { name: 'Orders', href: '/orders' },
  ];

  const activeLinkIndex = navLinks.findIndex(link => pathname.startsWith(link.href) && (link.href === '/' ? pathname === '/' : true));

  const updateIndicatorToActive = useCallback(() => {
    if (activeLinkIndex !== -1 && linkRefs.current[activeLinkIndex]) {
      const activeLinkEl = linkRefs.current[activeLinkIndex];
      if (activeLinkEl && navRef.current) {
        setIndicatorStyle({
          left: activeLinkEl.offsetLeft,
          width: activeLinkEl.offsetWidth,
        });
      }
    } else {
      setIndicatorStyle({ width: 0, left: 0 });
    }
  }, [activeLinkIndex]);


  useEffect(() => {
    // A timeout helps ensure all refs are populated and layout is stable
    const timeoutId = setTimeout(updateIndicatorToActive, 50);
    
    // Also re-calculate on resize
    window.addEventListener('resize', updateIndicatorToActive);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateIndicatorTo-active);
    };
  }, [pathname, updateIndicatorToActive]);

  const handleHover = (index: number) => {
    const linkEl = linkRefs.current[index];
    if (linkEl && navRef.current) {
        setIndicatorStyle({
            left: linkEl.offsetLeft,
            width: linkEl.offsetWidth,
        });
    }
  };

  return (
    <header className="bg-card shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center h-10 rounded-md overflow-hidden transition-opacity hover:opacity-90">
              <span className="text-xl font-headline uppercase flex items-center h-full">
                <span className="font-bold bg-primary-foreground text-primary px-3 flex items-center h-full">
                  FALCON
                </span>
                <span className="font-bold bg-primary text-primary-foreground px-3 flex items-center h-full">
                  CART
                </span>
              </span>
            </Link>
          </div>
          <nav
            ref={navRef}
            className="hidden md:flex items-center space-x-1 relative bg-muted p-1 rounded-full"
            onMouseLeave={updateIndicatorToActive}
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                ref={el => { linkRefs.current[index] = el; }}
                onMouseEnter={() => handleHover(index)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-colors relative z-10',
                  activeLinkIndex === index
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div
              className="absolute h-[calc(100%-8px)] top-[4px] bg-primary rounded-full transition-all duration-300 ease-in-out"
              style={{ ...indicatorStyle, zIndex: 5 }}
            />
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
