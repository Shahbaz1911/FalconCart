
'use client';

import { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface OrderSuccessAnimationProps {
  orderId: string;
  orderDate: string;
  total: number;
  onComplete: () => void;
}

export function OrderSuccessAnimation({ orderId, orderDate, total, onComplete }: OrderSuccessAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
        onComplete: () => {
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    document.body.style.overflow = '';
                    onComplete();
                }
            })
        }
    });

    // 1. Fade in background and scale up card
    tl.to(containerRef.current, { opacity: 1, duration: 0.3 })
      .fromTo(cardRef.current, 
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );

    // 2. Animate the checkmark icon
    tl.fromTo(iconRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)', clearProps: 'all' },
        "-=0.3"
    );

    // 3. Fade in details and button
    tl.fromTo('.order-detail-item', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 },
        "-=0.2"
    );

    // 4. Wait for a few seconds before automatically continuing
    tl.to({}, { duration: 4 });


    return () => {
        document.body.style.overflow = '';
    };

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-sm opacity-0">
        <Card ref={cardRef} className="w-full max-w-md text-center p-4 sm:p-8">
            <CardHeader>
                <div className="mx-auto">
                    <CheckCircle2 ref={iconRef} className="w-20 h-20 text-green-500" />
                </div>
                <CardTitle className="text-3xl font-bold font-headline mt-4">Order Confirmed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-left">
                <p className="text-muted-foreground text-center">Thank you for your purchase. A confirmation email has been sent.</p>
                <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between order-detail-item">
                        <span className="text-muted-foreground">Order ID:</span>
                        <span className="font-mono text-sm">{orderId}</span>
                    </div>
                    <div className="flex justify-between order-detail-item">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{orderDate}</span>
                    </div>
                     <div className="flex justify-between order-detail-item">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-bold text-lg">${total.toFixed(2)}</span>
                    </div>
                </div>
                <Button className="w-full mt-6 order-detail-item" onClick={onComplete}>
                    View Your Orders
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
