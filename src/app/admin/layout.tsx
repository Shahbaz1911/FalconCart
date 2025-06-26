
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from '@/components/ui/sidebar';
import { Rocket, LayoutDashboard, ShoppingCart, Package, Users2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth-provider';
import { Skeleton } from '@/components/ui/skeleton';

const adminNavLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/customers', label: 'Customers', icon: Users2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useAuth();

    React.useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
             <div className="flex">
                <div className="w-64 p-4 border-r">
                    <Skeleton className="h-10 w-32 mb-8" />
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                </div>
                <div className="flex-1 p-8">
                     <Skeleton className="h-10 w-1/4 mb-4" />
                     <Skeleton className="h-4 w-1/2 mb-8" />
                     <Skeleton className="h-96 w-full" />
                </div>
            </div>
        )
    }

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-primary h-7 w-7" asChild>
                            <Link href="/">
                                <Rocket />
                            </Link>
                        </Button>
                         <h2 className={cn(
                            "font-bold text-lg text-foreground duration-200",
                             "group-data-[collapsible=icon]:-ml-4 group-data-[collapsible=icon]:opacity-0"
                         )}>
                           Falcon Admin
                         </h2>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {adminNavLinks.map(link => (
                            <SidebarMenuItem key={link.href}>
                                <SidebarMenuButton 
                                    asChild 
                                    isActive={pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))}
                                    tooltip={{ children: link.label }}
                                >
                                    <Link href={link.href}>
                                        <link.icon />
                                        <span>{link.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>

            <SidebarInset>
                <header className="flex items-center justify-between p-4 border-b h-16">
                    <SidebarTrigger className="md:hidden" />
                    <div className="flex-1" />
                    <div className="flex items-center gap-4">
                        <Avatar className="h-8 w-8">
                             <AvatarImage src={user.photoURL ?? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"} data-ai-hint="admin portrait" />
                             <AvatarFallback>{user.displayName?.charAt(0) ?? user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                </header>
                <div className="p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
