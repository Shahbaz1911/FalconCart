'use client';

import { useEffect, useRef } from 'react';
import { Truck, Package } from 'lucide-react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useCart } from '@/hooks/use-cart';

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

interface OrderSuccessAnimationProps {
  onComplete: () => void;
}

export function OrderSuccessAnimation({ onComplete }: OrderSuccessAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { items } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const container = containerRef.current;
    const truck = truckRef.current;
    if (!container || !truck) return;

    const packages = Array.from(container.querySelectorAll('.package-item'));

    // Set initial state
    gsap.set(packages, { y: -100, x: () => window.innerWidth / 2 + (Math.random() - 0.5) * 50, scale: 1.5, opacity: 0 });
    gsap.set(truck, { x: -300, opacity: 1 });
    gsap.set(textRef.current, { y: 30, opacity: 0 });

    const tl = gsap.timeline({
        delay: 0.5,
        onComplete: () => {
            document.body.style.overflow = '';
            setTimeout(onComplete, 500);
        }
    });

    // 1. Truck arrives and text appears
    tl.to(truck, {
        x: window.innerWidth / 2 - 60,
        duration: 1.2,
        ease: 'power2.inOut'
    })
    .to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
    }, "-=0.7");

    // 2. Packages "rain" down and scatter
    tl.to(packages, {
        y: () => window.innerHeight / 2 + (Math.random() - 0.5) * 150,
        x: () => window.innerWidth / 2 + (Math.random() - 0.5) * 300,
        opacity: 1,
        ease: 'bounce.out',
        duration: 1,
        stagger: 0.1
    }, "-=0.5");

    // 3. Packages fly into the truck
    tl.to(packages, {
        motionPath: {
            path: [{ x: window.innerWidth / 2 - 40, y: window.innerHeight / 2 - 30 }],
            align: truck,
            alignOrigin: [0.5, 0.5],
            autoRotate: false
        },
        opacity: 0,
        scale: 0.2,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power2.in'
    }, "+=0.5");

    // 4. Truck jiggles after loading
    tl.to(truck, {
        x: '+=5',
        yoyo: true,
        repeat: 5,
        duration: 0.1
    }, "-=0.5");

    // 5. Truck departs and text fades
    tl.to(truck, {
        x: window.innerWidth + 300,
        duration: 1.5,
        ease: 'power2.in'
    }, "+=0.5")
    .to(textRef.current, {
        opacity: 0,
        duration: 0.5
    }, "<");


    return () => {
        document.body.style.overflow = '';
    }

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-sm overflow-hidden">
      <div className="absolute">
        {items.slice(0, 5).map((item) => (
          <div key={item.product.id} className="package-item absolute">
            <Package className="w-8 h-8 text-primary" />
          </div>
        ))}
      </div>
      <div ref={truckRef} className="absolute">
        <Truck className="w-28 h-28 text-primary" />
      </div>
      <h2 ref={textRef} className="absolute text-3xl font-bold font-headline text-center text-primary mt-48">
        Your order is on its way!
      </h2>
    </div>
  );
}
