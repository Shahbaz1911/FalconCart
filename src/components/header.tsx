'use client';

import Link from 'next/link';
import { Home, LayoutGrid, ShoppingBasket, ShoppingCart, User, LogOut, Package, Rocket } from 'lucide-react';
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
  DropdownMenuSeparator as DropdownMenuSeparatorComponent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export function Header() {
  const pathname = usePathname();
  const { items } = useCart();
  const [isClient, setIsClient] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | {}>({});
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (pathname === '/') {
    return null;
  }

  return (
    <header className={cn(
        "hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 items-center h-16 p-2 rounded-full bg-background/70 backdrop-blur-sm shadow-lg border"
      )}>
        <div className="flex items-center gap-4">
            <div className="flex items-center">
                <Link href="/" className="flex items-center text-foreground transition-opacity hover:opacity-80 px-2">
                    <Rocket className="h-6 w-6 text-primary" />
                    <span className="text-lg font-headline font-bold pl-2">
                        FALCON CART
                    </span>
                </Link>
            </div>
            
            <Separator orientation="vertical" className="h-8" />
            
            <nav
                ref={navRef}
                className={cn(
                "flex items-center relative p-1 rounded-full bg-muted/50"
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
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    <link.icon className="h-5 w-5" />
                    <span>{link.name}</span>
                </Link>
                ))}
                <div
                className={cn(
                    "absolute h-[calc(100%-8px)] top-[4px] rounded-full transition-all duration-300 ease-in-out bg-primary",
                    activeLinkIndex === -1 && "opacity-0"
                )}
                style={{ ...indicatorStyle, zIndex: 5 }}
                />
            </nav>

            <Separator orientation="vertical" className="h-8" />

            <div className="flex items-center gap-2">
                <Link
                    href="/cart"
                    className={cn(
                    'flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors relative z-10 rounded-full text-muted-foreground hover:text-foreground'
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
                            <DropdownMenuSeparatorComponent />
                            <DropdownMenuItem onSelect={() => router.push('/account')}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => router.push('/orders')}>
                                <Package className="mr-2 h-4 w-4" />
                                <span>Orders</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparatorComponent />
                            <DropdownMenuItem onSelect={handleSignOut}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    ) : (
                    <Button asChild variant={'default'} size="sm">
                        <Link href="/login">Login</Link>
                    </Button>
                    )
                )}
            </div>
        </div>
    </header>
  );
}
