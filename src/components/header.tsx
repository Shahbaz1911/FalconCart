'use client';

import Link from 'next/link';
import { Home, LayoutGrid, ShoppingBasket, ShoppingCart, User } from 'lucide-react';
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
    { name: 'Collections', href: '/collections/apparel', icon: LayoutGrid, className: 'hidden md:flex' },
    { name: 'Account', href: '/account', icon: User },
    { name: 'Cart', href: '/cart', icon: ShoppingCart, isCart: true },
  ];

  const computeActiveLinkIndex = useCallback(() => {
     const sortedLinks = [...navLinks]
      .map((l, i) => ({ ...l, index: i }))
      .filter(l => pathname.startsWith(l.href))
      .sort((a, b) => b.href.length - a.href.length);
    
    if (pathname === '/') return navLinks.findIndex(l => l.href === '/');
    
    return sortedLinks.length > 0 ? sortedLinks[0].index : -1;
  }, [pathname, navLinks]);
  
  const activeLinkIndex = computeActiveLinkIndex();

  const updateIndicator = useCallback((index: number | null) => {
    const activeIndex = computeActiveLinkIndex();
    const targetIndex = index ?? activeIndex;

    if (targetIndex !== -1 && linkRefs.current[targetIndex]) {
      const targetLinkEl = linkRefs.current[targetIndex];
      if (targetLinkEl) {
        setIndicatorStyle({
          left: targetLinkEl.offsetLeft,
          width: targetLinkEl.offsetWidth,
        });
      }
    } else {
        setIndicatorStyle({
            width: 0,
            left: (indicatorStyle as any).left || 0,
        });
    }
  }, [computeActiveLinkIndex, indicatorStyle]);


  useEffect(() => {
    const handleResize = () => updateIndicator(null);
    const timeoutId = setTimeout(() => updateIndicator(null), 50);
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname, updateIndicator]);
  
  const handleHover = (index: number) => updateIndicator(index);
  const handleMouseLeave = () => updateIndicator(null);

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
                    "font-bold hidden sm:flex items-center h-full px-3",
                    isHomepage ? 'bg-black/50 text-white' : 'bg-primary text-primary-foreground'
                  )}>
                  CART
                </span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <nav
              ref={navRef}
              className={cn(
                "flex items-center relative p-1 rounded-full",
                isHomepage ? 'bg-black/20 backdrop-blur-sm' : 'bg-muted'
              )}
              onMouseLeave={handleMouseLeave}
            >
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={el => { if(el) linkRefs.current[index] = el; }}
                  onMouseEnter={() => handleHover(index)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors relative z-10 rounded-full',
                    'md:px-4',
                    activeLinkIndex === index
                      ? (isHomepage ? 'text-primary' : 'text-primary-foreground')
                      : (isHomepage ? 'text-gray-200 hover:text-white' : 'text-muted-foreground hover:text-foreground'),
                    link.className
                  )}
                >
                  <div id={link.isCart ? "cart-icon-container" : undefined} className="relative">
                    <link.icon className="h-5 w-5" />
                    {link.isCart && isClient && itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                        {itemCount}
                      </span>
                    )}
                  </div>
                  <span className="hidden md:inline">{link.name}</span>
                </Link>
              ))}
              <div
                className={cn(
                  "absolute h-[calc(100%-8px)] top-[4px] rounded-full transition-all duration-300 ease-in-out",
                  isHomepage ? 'bg-white' : 'bg-primary',
                   activeLinkIndex === -1 && "opacity-0"
                )}
                style={{ ...indicatorStyle, zIndex: 5 }}
              />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
