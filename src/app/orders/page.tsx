import { getOrders } from '@/lib/orders';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { PackageCheck } from 'lucide-react';

export default async function OrdersPage() {
  const orders = await getOrders();

  if (orders.length === 0) {
    return (
        <div className="text-center py-20">
            <PackageCheck className="mx-auto h-16 w-16 text-muted-foreground" />
            <h1 className="mt-4 text-3xl font-bold font-headline">No Orders Yet</h1>
            <p className="mt-2 text-muted-foreground">You haven't placed any orders with us.</p>
            <Button asChild className="mt-6">
                <Link href="/">Browse Products</Link>
            </Button>
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">
        Your Orders
      </h1>
      <div className="space-y-6">
        {orders.map(order => (
          <Card key={order.id}>
            <CardHeader className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <CardDescription>Order Placed</CardDescription>
                <CardTitle className="text-base font-medium">{order.date}</CardTitle>
              </div>
              <div>
                <CardDescription>Total</CardDescription>
                <CardTitle className="text-base font-medium">${order.total.toFixed(2)}</CardTitle>
              </div>
              <div className="md:col-span-2">
                <CardDescription>Order ID</CardDescription>
                <CardTitle className="text-sm font-mono text-muted-foreground">{order.id}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 sm:mb-0">Status: <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge></h3>
                    <p className="text-sm text-muted-foreground">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''} in this order.
                    </p>
                  </div>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link href={`/orders/${order.id}`}>View Order Details</Link>
                  </Button>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
