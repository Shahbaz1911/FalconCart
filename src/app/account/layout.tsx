'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

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

  const getIsActive = (linkHref: string, currentPathname: string) => {
    if (linkHref === '/orders' || linkHref === '/cart') {
        return currentPathname.startsWith(linkHref);
    }
    return currentPathname === linkHref;
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
