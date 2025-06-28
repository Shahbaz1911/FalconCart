'use client';

import { useOrders } from '@/hooks/use-orders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Package, CreditCard, Activity } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function AccountDashboardPage() {
    const { orders, loading } = useOrders();
    const totalSpent = orders.reduce((acc, order) => acc + order.total, 0);
    const latestOrder = orders.length > 0 ? orders[0] : null;

  if (loading) {
    return (
        <div className="space-y-8">
           <div>
             <Skeleton className="h-10 w-1/3 mb-2" />
             <Skeleton className="h-4 w-1/2" />
           </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
            </div>
            <div>
                 <h2 className="text-2xl font-bold font-headline mb-4">Recent Order</h2>
                 <Skeleton className="h-40" />
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-8">
       <div>
         <h1 className="text-3xl font-bold font-headline">Welcome Back!</h1>
         <p className="text-muted-foreground">Here's a quick overview of your account.</p>
       </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">Across {orders.length} orders</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{orders.length}</div>
                    <p className="text-xs text-muted-foreground">View your order history</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground">Visa ending in 1234</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Logged In</div>
                    <p className="text-xs text-muted-foreground">Just now</p>
                </CardContent>
            </Card>
        </div>

        <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Recent Order</h2>
            {latestOrder ? (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                         <div>
                             <p className="text-sm text-muted-foreground font-mono">{latestOrder.id}</p>
                             <CardTitle className="text-lg">{latestOrder.date}</CardTitle>
                         </div>
                         <Button asChild variant="outline">
                            <Link href={`/orders/${latestOrder.id}`}>View Details</Link>
                         </Button>
                    </CardHeader>
                    <CardContent>
                        <p>Status: <span className="font-semibold">{latestOrder.status}</span></p>
                        <p>Total: <span className="font-semibold">${latestOrder.total.toFixed(2)}</span></p>
                    </CardContent>
                </Card>
            ): (
                <p>You have no recent orders.</p>
            )}
        </div>
    </div>
  );
}
