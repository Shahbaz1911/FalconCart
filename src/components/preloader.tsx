'use client';

import { useState, useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect runs only on the client
    document.body.style.overflow = 'hidden';

    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(intervalId);
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              x: '100vw', // Move it off-screen to the right
              opacity: 0,
              duration: 0.8,
              ease: 'power2.in',
              onComplete: () => {
                setIsVisible(false);
                document.body.style.overflow = '';
              },
            });
          } else {
              // Fallback if ref isn't available
              setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = '';
              }, 500);
          }
          return 100;
        }
        return prevProgress + 1;
      });
    }, 25);

    return () => {
      clearInterval(intervalId);
      if(document.body) {
        document.body.style.overflow = '';
      }
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-out',
        !isVisible && 'opacity-0 pointer-events-none'
      )}
    >
      <div ref={containerRef} className="flex flex-col items-center">
        <div className="relative w-16 h-16 text-primary">
          {/* Background Outline Icon */}
          <ShoppingCart className="absolute inset-0 w-full h-full" strokeWidth={1.5} />
          
          {/* Filled Icon for Progress */}
          <div
            className="absolute bottom-0 left-0 w-full overflow-hidden"
            style={{ height: `${progress}%` }}
          >
            <ShoppingCart className="absolute bottom-0 left-0 w-full h-16 fill-primary" strokeWidth={1.5} />
          </div>
        </div>
        <p className="mt-4 text-lg font-semibold text-center font-headline text-primary">
          Loading... {progress}%
        </p>
      </div>
    </div>
  );
}
