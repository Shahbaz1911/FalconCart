'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // This effect runs only on the client
    document.body.style.overflow = 'hidden';

    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(intervalId);
          setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = '';
          }, 500);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 25);

    return () => {
      clearInterval(intervalId);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-out',
        !isVisible && 'opacity-0 pointer-events-none'
      )}
    >
      <div className="w-full max-w-xs flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <Progress value={progress} className="w-full h-2" />
        <p className="mt-4 text-lg font-semibold text-center font-headline text-primary">
          Loading... {progress}%
        </p>
      </div>
    </div>
  );
}
