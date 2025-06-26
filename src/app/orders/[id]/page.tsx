import { getOrderById } from '@/lib/orders';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const order = await getOrderById(params.id);

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

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Items in this order</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {order.items.map(({product, quantity}) => (
                           <div key={product.id} className="flex justify-between items-start">
                               <div className="flex items-start gap-4">
                                   <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100">
                                       <Image src={product.image} alt={product.name} fill className="object-cover" data-ai-hint={product.data_ai_hint} />
                                   </div>
                                   <div>
                                       <Link href={`/product/${product.id}`} className="font-semibold hover:underline">{product.name}</Link>
                                       <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
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
                    <CardTitle className="font-headline text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="flex justify-between"><span>Status:</span> <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>{order.status}</Badge></p>
                    <p className="flex justify-between"><span>Date:</span> <span>{order.date}</span></p>
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
