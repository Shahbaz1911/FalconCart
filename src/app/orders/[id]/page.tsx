'use client';

import { useOrders } from '@/hooks/use-orders';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Truck, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';


interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

const OrderStatusTracker = ({ status }: { status: 'Processing' | 'Shipped' | 'Delivered' }) => {
    const statuses = ['Processing', 'Shipped', 'Delivered'];
    const currentStatusIndex = statuses.indexOf(status);

    const getStatusInfo = (s: string) => {
        switch(s) {
            case 'Processing': return { icon: Wrench, label: 'Processing' };
            case 'Shipped': return { icon: Truck, label: 'Shipped' };
            case 'Delivered': return { icon: CheckCircle2, label: 'Delivered' };
            default: return { icon: Wrench, label: 'Processing' };
        }
    }

    return (
        <div className="flex items-center justify-between w-full relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-muted" />
            <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-500" 
                style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
            />
            {statuses.map((s, index) => {
                const isActive = index <= currentStatusIndex;
                const { icon: Icon, label } = getStatusInfo(s);
                return (
                    <div key={s} className="z-10 flex flex-col items-center">
                        <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300",
                            isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <p className="text-xs mt-2 font-medium">{label}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { getOrderById } = useOrders();
  const order = getOrderById(params.id);

  if (!order) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/orders" className="text-sm text-primary hover:underline">&larr; Back to Orders</Link>
        <h1 className="text-3xl md:text-4xl font-headline font-bold mt-2">
          Order Details
        </h1>
        <p className="text-sm text-muted-foreground font-mono mt-1">ID: {order.id}</p>
      </div>
      
      <Card className="mb-8">
          <CardHeader>
              <CardTitle className="font-headline text-xl">Order Status</CardTitle>
          </CardHeader>
          <CardContent>
              <OrderStatusTracker status={order.status} />
          </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Items Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {order.items.map(({product, quantity}) => (
                           <div key={product.id} className="flex justify-between items-start">
                               <div className="flex items-start gap-4">
                                   <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                       <Image src={product.image} alt={product.name} fill className="object-cover" data-ai-hint={product.data_ai_hint} />
                                   </div>
                                   <div>
                                       <Link href={`/product/${product.id}`} className="font-semibold hover:underline">{product.name}</Link>
                                       <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                                       <p className="text-sm text-muted-foreground">${product.price.toFixed(2)} each</p>
                                   </div>
                               </div>
                               <p className="font-semibold">${(product.price * quantity).toFixed(2)}</p>
                           </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Order Total</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="flex justify-between"><span>Subtotal:</span> <span>${order.total.toFixed(2)}</span></p>
                    <p className="flex justify-between"><span>Shipping:</span> <span>$0.00</span></p>
                    <Separator/>
                    <p className="flex justify-between font-bold text-lg"><span>Total:</span> <span>${order.total.toFixed(2)}</span></p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                    <address className="not-italic text-sm space-y-1">
                        <p className="font-semibold">{order.shippingAddress.fullName}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                        <p>{order.shippingAddress.country}</p>
                    </address>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
