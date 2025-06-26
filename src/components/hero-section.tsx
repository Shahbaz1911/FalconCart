'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

const carouselImages = [
    {
      src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
      alt: 'Fashion model posing',
      'data-ai-hint': 'fashion model',
    },
    {
      src: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop',
      alt: 'Clothing collection on display',
      'data-ai-hint': 'clothes fashion',
    },
    {
      src: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop',
      alt: 'A pair of stylish sneakers',
      'data-ai-hint': 'stylish footwear',
    },
];

// SVGs for the animation
const ShirtIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
  </svg>
);

const ShoeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17a2 2 0 0 1-2 2H3v-2c0-1.1.9-2 2-2h2Z" />
    <path d="m21 15-2-2-2-4-3-2-3 3-2 3-2 5H7c-1.1 0-2 .9-2 2" />
    <path d="m7 22-1-3" />
    <path d="m11 13 2-3" />
  </svg>
);


export function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showIcons, setShowIcons] = useState(false);

    useEffect(() => {
        const imageTimer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        }, 5000); // Change image every 5 seconds

        const animationTimer = setInterval(() => {
            setShowIcons((prev) => !prev);
        }, 3000); // Toggle animation every 3 seconds

        return () => {
            clearInterval(imageTimer);
            clearInterval(animationTimer);
        };
    }, []);

  return (
    <section className="relative h-screen w-screen -mt-8 left-1/2 -translate-x-1/2 flex items-center justify-center text-center text-white">
        {carouselImages.map((image, index) => (
            <div
                key={index}
                className={cn(
                    'absolute inset-0 z-0 h-full w-full transition-opacity duration-1000 ease-in-out',
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                )}
            >
                <Image
                    src={image.src}
                    fill
                    alt={image.alt}
                    className="object-cover"
                    data-ai-hint={image['data-ai-hint']}
                    priority={index === 0}
                />
            </div>
        ))}
      
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      <div className="z-20 p-4 relative">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold font-headline relative h-24 sm:h-28 lg:h-32">
            <div className={cn("absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-700 ease-in-out", !showIcons ? 'opacity-100' : 'opacity-0')}>
                <span>Style</span>
                <span>Meets</span>
                <span>Comfort</span>
            </div>
            <div className={cn("absolute inset-0 flex items-center justify-center gap-6 transition-opacity duration-700 ease-in-out", showIcons ? 'opacity-100' : 'opacity-0')}>
                <ShirtIcon className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" />
                <Plus className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14" />
                <ShoeIcon className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" />
            </div>
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl mt-4 max-w-3xl mx-auto">Discover premium fashion made for you</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/collections/apparel">View Collections</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
