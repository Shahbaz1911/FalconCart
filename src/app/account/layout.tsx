'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/auth-provider';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


const accountNavLinks = [
    { href: '/account', label: 'Dashboard' },
    { href: '/account/profile', label: 'Profile' },
    { href: '/orders', label: 'Orders' },
    { href: '/cart', label: 'Cart' },
    { href: '/account/settings', label: 'Settings' },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);


  const getIsActive = (linkHref: string, currentPathname: string) => {
    if (linkHref === '/orders' || linkHref === '/cart') {
        return currentPathname.startsWith(linkHref);
    }
    return currentPathname === linkHref;
  }

  if (loading || !user) {
    return (
      <div className="space-y-8">
        <div className="mb-8 border-b">
          <div className="flex space-x-6">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 border-b">
            <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Account navigation">
                {accountNavLinks.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium",
                            getIsActive(link.href, pathname)
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:border-border hover:text-primary'
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
        <div>{children}</div>
    </div>
  );
}
