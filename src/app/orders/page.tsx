'use client';

import { useOrders } from '@/hooks/use-orders';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { PackageCheck, ChevronRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

export default function OrdersPage() {
  const { orders } = useOrders();

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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Delivered': return 'default';
      case 'Shipped': return 'secondary';
      case 'Processing': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">
        Your Orders
      </h1>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {orders.map(order => (
          <AccordionItem key={order.id} value={order.id} className="border rounded-lg bg-card">
            <AccordionTrigger className="p-4 hover:no-underline">
              <div className="grid grid-cols-2 sm:grid-cols-4 w-full text-left gap-4">
                  <div>
                      <p className="text-xs text-muted-foreground">Order Placed</p>
                      <p className="text-sm font-medium">{order.date}</p>
                  </div>
                  <div>
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="text-sm font-medium">${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <Badge variant={getStatusBadgeVariant(order.status)} className="text-xs">{order.status}</Badge>
                  </div>
                   <div className="hidden sm:block">
                      <p className="text-xs text-muted-foreground">Order ID</p>
                      <p className="text-sm font-mono text-muted-foreground truncate">{order.id}</p>
                  </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 border-t">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">Items</h4>
                  <div className="flex -space-x-2 overflow-hidden">
                    {order.items.map(({ product }) => (
                      <div key={product.id} className="inline-block h-12 w-12 rounded-full ring-2 ring-background">
                         <Image
                          src={product.image}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover rounded-full"
                          data-ai-hint={product.data_ai_hint}
                        />
                      </div>
                    ))}
                    {order.items.length > 5 && <div className="flex items-center justify-center h-12 w-12 rounded-full bg-muted text-xs font-medium ring-2 ring-background">+{order.items.length - 5}</div>}
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full sm:w-auto self-end">
                  <Link href={`/orders/${order.id}`}>
                    View Details
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
