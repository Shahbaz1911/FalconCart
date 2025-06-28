
'use client';

import { useOrders } from '@/hooks/use-orders';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Truck, Wrench, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

export default function OrderDetailPage() {
  const params = useParams();
  const { getOrderById } = useOrders();
  const orderId = Array.isArray(params.id) ? params.id[0] : params.id;
  const order = getOrderById(orderId);

  if (!order) {
    notFound();
  }

  const handleDownloadOrderPdf = () => {
    if (!order) return;
    const doc = new jsPDF();
    
    const addHeader = () => {
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text("Falcon Cart", 14, 22);

      doc.setFontSize(16);
      doc.text("Invoice", 196, 22, { align: 'right' });
    };

    const addFooter = () => {
        const pageCount = (doc.internal as any).getNumberOfPages();
        for(let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.setTextColor(150);
            doc.text('Thank you for your business!', 14, doc.internal.pageSize.height - 10);
            doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, {align: 'right'});
        }
    };

    addHeader();

    // Address and Order Info
    doc.setLineWidth(0.1);
    doc.line(14, 30, 196, 30);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text("BILL TO:", 14, 40);
    
    doc.setFont('helvetica', 'normal');
    const address = order.shippingAddress;
    doc.text(`${address.fullName}`, 14, 46);
    doc.text(`${address.address}`, 14, 52);
    doc.text(`${address.city}, ${address.state} ${address.zip}`, 14, 58);
    doc.text(`${address.country}`, 14, 64);

    doc.setFont('helvetica', 'bold');
    doc.text("Order ID:", 130, 40);
    doc.text("Order Date:", 130, 46);
    doc.text("Status:", 130, 52);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`${order.id}`, 196, 40, { align: 'right' });
    doc.text(`${order.date}`, 196, 46, { align: 'right' });
    doc.text(`${order.status}`, 196, 52, { align: 'right' });


    // Items Table
    const tableColumn = ["Product", "Quantity", "Unit Price", "Subtotal"];
    const tableRows: (string | number)[][] = [];

    order.items.forEach(item => {
        const itemData = [
            item.product.name,
            item.quantity,
            `$${item.product.price.toFixed(2)}`,
            `$${(item.product.price * item.quantity).toFixed(2)}`
        ];
        tableRows.push(itemData);
    });

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 75,
        theme: 'grid',
        headStyles: { fillColor: [52, 42, 42] }, // A darker brown from the theme
        styles: { cellPadding: 2.5, fontSize: 10 },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 20, halign: 'center' },
            2: { cellWidth: 30, halign: 'right' },
            3: { cellWidth: 30, halign: 'right' },
        }
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total:`, 130, finalY + 15);
    doc.text(`$${order.total.toFixed(2)}`, 196, finalY + 15, { align: 'right' });

    addFooter();
    doc.save(`Invoice-${order.id}.pdf`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8 gap-4">
        <div>
          <Link href="/orders" className="text-sm text-primary hover:underline">&larr; Back to Orders</Link>
          <h1 className="text-3xl md:text-4xl font-headline font-bold mt-2">
            Order Details
          </h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">ID: {order.id}</p>
        </div>
        <Button variant="outline" onClick={handleDownloadOrderPdf} className="mt-2 sm:mt-0">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
        </Button>
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
