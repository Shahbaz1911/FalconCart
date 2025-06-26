'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBasket, User, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { useState, useEffect, useRef, useCallback } from 'react';

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Products', href: '/products', icon: ShoppingBasket },
  { name: 'Account', href: '/account', icon: User },
  { name: 'Cart', href: '/cart', icon: ShoppingCart, isCart: true },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const [isClient, setIsClient] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | {}>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const computeActiveLinkIndex = useCallback(() => {
    const sortedLinks = [...navLinks]
      .map((l, i) => ({ ...l, index: i }))
      .filter(l => l.href !== '/' && pathname.startsWith(l.href))
      .sort((a, b) => b.href.length - a.href.length);

    if (pathname === '/') return 0;

    return sortedLinks.length > 0 ? sortedLinks[0].index : -1;
  }, [pathname]);

  const activeLinkIndex = computeActiveLinkIndex();

  const updateIndicator = useCallback(() => {
    if (activeLinkIndex !== -1 && linkRefs.current[activeLinkIndex]) {
      const targetLinkEl = linkRefs.current[activeLinkIndex];
      if (targetLinkEl && navRef.current) {
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
  }, [activeLinkIndex]);

  useEffect(() => {
    const timeoutId = setTimeout(updateIndicator, 50); // Delay to allow layout to settle
    window.addEventListener('resize', updateIndicator);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [pathname, updateIndicator]);


  return (
    <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <nav
        ref={navRef}
        className="flex items-center relative p-1 rounded-full bg-black/20 backdrop-blur-sm"
      >
        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            ref={el => { if(el) linkRefs.current[index] = el; }}
            className={cn(
              'flex items-center justify-center h-12 w-12 text-sm font-medium transition-colors relative z-10 rounded-full',
              activeLinkIndex === index
                ? 'text-primary'
                : 'text-gray-200 hover:text-white'
            )}
          >
            <div className="relative">
              <link.icon className="h-6 w-6" />
              {link.isCart && isClient && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="sr-only">{link.name}</span>
          </Link>
        ))}
        <div
          className={cn(
            "absolute h-[calc(100%-8px)] top-[4px] rounded-full transition-all duration-300 ease-in-out bg-white",
            activeLinkIndex === -1 && "opacity-0"
          )}
          style={{ ...indicatorStyle, zIndex: 5 }}
        />
      </nav>
    </div>
  );
}
