'use client';

import Link from 'next/link';
import { Home, LayoutGrid, ShoppingBasket, ShoppingCart, User, LogOut, Package, CreditCardIcon } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/auth-provider';
import { signOut } from '@/lib/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './ui/button';

export function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const [isClient, setIsClient] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

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
  
  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

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
        "hidden md:flex w-full top-0 z-40 transition-all duration-300",
        isHomepage ? 'absolute' : 'sticky bg-card shadow-md'
      )}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
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
                  'flex items-center gap-2 px-4 py-1.5 text-sm font-medium transition-colors relative z-10 rounded-full',
                  activeLinkIndex === index
                    ? (isHomepage ? 'text-primary' : 'text-primary-foreground')
                    : (isHomepage ? 'text-gray-200 hover:text-white' : 'text-muted-foreground hover:text-foreground')
                )}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
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
          <div className="flex items-center gap-2">
             <Link
                href="/cart"
                className={cn(
                  'flex items-center gap-2 px-4 py-1.5 text-sm font-medium transition-colors relative z-10 rounded-full',
                  (isHomepage ? 'text-gray-200 hover:text-white' : 'text-muted-foreground hover:text-foreground')
                )}
              >
                <div id={"cart-icon-container"} className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {isClient && itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                      {itemCount}
                    </span>
                  )}
                </div>
              </Link>
              {!loading && (
                user ? (
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                          <AvatarFallback>{user.displayName?.charAt(0) ?? user.email?.charAt(0)?.toUpperCase() ?? 'U'}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.displayName ?? 'Welcome'}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => router.push('/account')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Account</span>
                      </DropdownMenuItem>
                       <DropdownMenuItem onSelect={() => router.push('/orders')}>
                        <Package className="mr-2 h-4 w-4" />
                        <span>Orders</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button asChild variant={isHomepage ? 'outline' : 'default'} className={cn(isHomepage && 'border-white text-white hover:bg-white hover:text-primary')}>
                    <Link href="/login">Login</Link>
                  </Button>
                )
              )}
          </div>
        </div>
      </div>
    </header>
  );
}
