'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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


export function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(timer);
    }, []);

  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
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
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-headline">Style Meets Comfort</h1>
        <p className="text-lg sm:text-xl lg:text-2xl mt-4 max-w-2xl mx-auto">Discover premium fashion made for you</p>
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
