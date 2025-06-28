'use client';

import { useState, useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { Progress } from '@/components/ui/progress';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(intervalId);
          if (preloaderRef.current) {
            gsap.to(preloaderRef.current, {
              opacity: 0,
              duration: 0.5,
              ease: 'power1.in',
              onComplete: () => {
                setIsVisible(false);
                document.body.style.overflow = '';
              },
            });
          } else {
            setIsVisible(false);
            document.body.style.overflow = '';
          }
          return 100;
        }
        return prevProgress + 1;
      });
    }, 25); // This will take about 2.5s to complete

    return () => {
      clearInterval(intervalId);
      if (document.body) {
        document.body.style.overflow = '';
      }
    };
  }, []);

  return (
    <div
      ref={preloaderRef}
      className={cn(
        'fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-out',
        !isVisible && 'opacity-0 pointer-events-none'
      )}
    >
      <div className="w-full max-w-xs px-4 text-center">
        <div className="relative h-16 w-full mb-2">
            <div
                className="absolute bottom-0 transition-all duration-100 ease-linear"
                style={{ left: `calc(${progress}% - 24px)` }}
            >
                <ShoppingCart className="w-12 h-12 text-primary animate-running-cart" />
            </div>
        </div>
        <Progress value={progress} className="h-2 w-full" />
        <p className="mt-4 text-5xl font-bold font-mono text-primary">
          {progress}<span className="text-3xl">%</span>
        </p>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
            Getting things ready...
        </p>
      </div>
    </div>
  );
}
