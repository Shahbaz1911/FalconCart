'use client';

import { useEffect, useRef } from 'react';
import { Truck } from 'lucide-react';
import gsap from 'gsap';

interface OrderSuccessAnimationProps {
  onComplete: () => void;
}

export function OrderSuccessAnimation({ onComplete }: OrderSuccessAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const truck = truckRef.current;
    if (!truck) return;

    // Set initial state
    gsap.set(truck, { x: -300, opacity: 1 });
    gsap.set(textRef.current, { y: 30, opacity: 0 });

    const tl = gsap.timeline({
        delay: 0.5,
        onComplete: () => {
            document.body.style.overflow = '';
            setTimeout(onComplete, 500); // Give a bit of time for fade out
        }
    });

    // 1. Truck arrives and text appears
    tl.to(truck, {
        x: '50vw',
        translateX: '-50%',
        duration: 1.5,
        ease: 'power2.inOut'
    })
    .to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, "-=1.0");

    // 2. Truck jiggles and pauses
    tl.to(truck, {
        x: '+=10',
        yoyo: true,
        repeat: 3,
        duration: 0.1,
        ease: 'power1.inOut'
    }, "+=0.5");


    // 3. Truck departs and text fades
    tl.to(truck, {
        x: window.innerWidth + 300,
        duration: 1.5,
        ease: 'power2.in'
    }, "+=1")
    .to(textRef.current, {
        opacity: 0,
        duration: 0.5
    }, "<");


    return () => {
        document.body.style.overflow = '';
    };

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-sm overflow-hidden">
      <div ref={truckRef} className="absolute">
        <Truck className="w-28 h-28 text-primary" />
      </div>
      <h2 ref={textRef} className="absolute text-3xl font-bold font-headline text-center text-primary mt-48">
        Your order is on its way!
      </h2>
    </div>
  );
}
