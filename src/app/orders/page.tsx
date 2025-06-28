'use client';

import { useOrders } from '@/hooks/use-orders';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { PackageCheck, ChevronRight, Download } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuth } from '@/components/auth-provider';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrdersPage() {
  const { orders, loading } = useOrders();
  const { user } = useAuth();

  const handleDownloadHistoryPdf = () => {
    const doc = new jsPDF();
    
    const addHeader = () => {
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text("Falcon Cart", 14, 22);
      doc.setFontSize(16);
      doc.text("Order History", 196, 22, { align: 'right' });
    };

    const addFooter = () => {
        const pageCount = (doc.internal as any).getNumberOfPages();
        for(let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.setTextColor(150);
            doc.text(`A summary of all your orders.`, 14, doc.internal.pageSize.height - 10);
            doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, {align: 'right'});
        }
    };
    
    addHeader();
    doc.setLineWidth(0.1);
    doc.line(14, 30, 196, 30);

    if (user) {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text("CUSTOMER:", 14, 40);
        doc.setFont('helvetica', 'normal');
        doc.text(user.displayName || user.email || 'N/A', 14, 46);
    }
    
    const tableColumn = ["Order ID", "Date", "Status", "Total"];
    const tableRows: (string | number)[][] = [];

    orders.forEach(order => {
      const orderData = [
        order.id,
        order.date,
        order.status,
        `$${order.total.toFixed(2)}`
      ];
      tableRows.push(orderData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: user ? 55 : 40,
      theme: 'striped',
      headStyles: { fillColor: [52, 42, 42] },
      styles: { cellPadding: 2.5, fontSize: 10 },
    });

    addFooter();
    doc.save('order-history.pdf');
  };

  if (loading) {
    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-36" />
            </div>
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                ))}
            </div>
        </div>
    );
  }

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Your Orders
        </h1>
        <Button variant="outline" onClick={handleDownloadHistoryPdf}>
            <Download className="mr-2 h-4 w-4" />
            Download History
        </Button>
      </div>
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
                    {order.items.slice(0, 5).map(({ product }) => (
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
