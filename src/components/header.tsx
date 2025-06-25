'use client';

import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import gsap from 'gsap';

export function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const [isClient, setIsClient] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | {}>({});
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const sheetContentRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Collections', href: '/collections/apparel' },
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

  useLayoutEffect(() => {
    if (sheetContentRef.current) {
      const links = sheetContentRef.current.querySelectorAll('a');
      if (mobileMenuOpen) {
        gsap.fromTo(
          links,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.1,
            onStart: () => gsap.set(links, { visibility: 'visible' }),
          }
        );
      } else {
        gsap.set(links, { opacity: 0, y: 0, visibility: 'hidden' });
      }
    }
  }, [mobileMenuOpen]);

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
          
          <div className="flex items-center gap-4">
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
            <div className="flex items-center gap-2">
              {/* Desktop icons */}
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/account">
                    <User className="h-6 w-6" />
                    <span className="sr-only">Account</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
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
              
              {/* Mobile Menu Trigger */}
              <div className="md:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <div className={cn("relative h-5 w-5 transition-transform duration-500 ease-in-out", mobileMenuOpen && "rotate-180")}>
                        <span
                          className={cn(
                            "absolute block h-0.5 w-full bg-current transition-all duration-300",
                            mobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[25%]"
                          )}
                        />
                        <span
                          className={cn(
                            "absolute block h-0.5 w-full bg-current transition-all duration-300 top-1/2 -translate-y-1/2",
                             mobileMenuOpen ? "opacity-0" : "opacity-100"
                          )}
                        />
                        <span
                          className={cn(
                            "absolute block h-0.5 w-full bg-current transition-all duration-300",
                            mobileMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[75%] -translate-y-full"
                          )}
                        />
                      </div>
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent ref={sheetContentRef} side="right" className="w-full max-w-xs p-6">
                    <nav className="flex flex-col gap-4 text-lg font-medium mt-10">
                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.href}>
                          <Link href={link.href} onClick={() => setMobileMenuOpen(false)} className="invisible">
                            {link.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                    <div className="mt-8 border-t border-border pt-6 flex flex-col gap-4">
                      <SheetClose asChild>
                          <Link href="/account" className="flex items-center gap-2 text-lg font-medium invisible" onClick={() => setMobileMenuOpen(false)}>
                              <User className="h-6 w-6" />
                              Account
                          </Link>
                      </SheetClose>
                        <SheetClose asChild>
                          <Link href="/cart" className="flex items-center gap-2 text-lg font-medium invisible" onClick={() => setMobileMenuOpen(false)}>
                              <ShoppingCart className="h-6 w-6" />
                              Cart {isClient && itemCount > 0 && `(${itemCount})`}
                          </Link>
                        </SheetClose>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
