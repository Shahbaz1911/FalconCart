'use client';

import Link from 'next/link';
import { Home, LayoutGrid, ShoppingBasket, ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';
import { usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | {}>({});
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: ShoppingBasket },
    { name: 'Collections', href: '/collections/apparel', icon: LayoutGrid },
  ];

  const computeActiveLinkIndex = useCallback(() => {
    if (pathname === '/') return 0;
    if (pathname.startsWith('/products')) return 1;
    if (pathname.startsWith('/collections')) return 2;
    return -1;
  }, [pathname]);
  
  const activeLinkIndex = computeActiveLinkIndex();

  const updateIndicatorToActive = useCallback(() => {
    const newActiveIndex = computeActiveLinkIndex();
    if (newActiveIndex !== -1 && linkRefs.current[newActiveIndex]) {
      const activeLinkEl = linkRefs.current[newActiveIndex];
      if (activeLinkEl && navRef.current) {
        setIndicatorStyle({
          left: activeLinkEl.offsetLeft,
          width: activeLinkEl.offsetWidth,
        });
      }
    } else {
      setIndicatorStyle({ width: 0, left: 0 });
    }
  }, [computeActiveLinkIndex]);

  useEffect(() => {
    const timeoutId = setTimeout(updateIndicatorToActive, 50);
    window.addEventListener('resize', updateIndicatorToActive);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateIndicatorToActive);
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
    <header className={cn(
        "w-full top-0 z-40 transition-all duration-300",
        isHomepage ? 'absolute' : 'sticky bg-card shadow-md'
      )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center h-10 rounded-md overflow-hidden transition-opacity hover:opacity-90">
              <span className="text-xl font-headline uppercase flex items-center h-full">
                 <span className={cn(
                    "font-bold flex items-center h-full px-3", 
                    isHomepage ? 'bg-white/90 text-primary' : 'bg-primary-foreground text-primary'
                  )}>
                  FALCON
                </span>
                <span className={cn(
                    "font-bold flex items-center h-full px-3",
                    isHomepage ? 'bg-black/50 text-white' : 'bg-primary text-primary-foreground'
                  )}>
                  CART
                </span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <nav
              ref={navRef}
              className={cn(
                "hidden md:flex items-center space-x-1 relative p-1 rounded-full",
                isHomepage ? 'bg-black/20 backdrop-blur-sm' : 'bg-muted'
              )}
              onMouseLeave={updateIndicatorToActive}
            >
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={el => { if(el) linkRefs.current[index] = el; }}
                  onMouseEnter={() => handleHover(index)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-1.5 text-sm font-medium transition-colors relative z-10',
                    activeLinkIndex === index
                      ? (isHomepage ? 'text-primary' : 'text-primary-foreground')
                      : (isHomepage ? 'text-gray-200 hover:text-white' : 'text-muted-foreground hover:text-foreground')
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              ))}
              <div
                className={cn(
                  "absolute h-[calc(100%-8px)] top-[4px] rounded-full transition-all duration-300 ease-in-out",
                  isHomepage ? 'bg-white' : 'bg-primary'
                )}
                style={{ ...indicatorStyle, zIndex: 5 }}
              />
            </nav>
            <div className="flex items-center gap-2">
              {/* Desktop icons */}
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild className={cn(isHomepage && 'text-white hover:bg-black/20 hover:text-white')}>
                  <Link href="/account">
                    <User className="h-6 w-6" />
                    <span className="sr-only">Account</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className={cn(isHomepage && 'text-white hover:bg-black/20 hover:text-white')}>
                  <Link href="/cart">
                    <div id="cart-icon-container" className="relative">
                      <ShoppingCart className="h-6 w-6" />
                      {isClient && itemCount > 0 && (
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
        </div>
      </div>
    </header>
  );
}
