
'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

const collections = [
    { name: 'Apparel', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop', data_ai_hint: 'stylish clothes', href: '/#apparel-showcase' },
    { name: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ab?q=80&w=2070&auto=format&fit=crop', data_ai_hint: 'running shoes', href: '/collections/footwear' },
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop', data_ai_hint: 'tech gadgets', href: '/collections/electronics' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop', data_ai_hint: 'luxury watch', href: '/collections/accessories' },
    { name: 'Home Goods', image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=1974&auto=format&fit=crop', data_ai_hint: 'modern interior', href: '/collections/home%20goods' }
];

export function FeaturedCollections() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const section = sectionRef.current;
        const cards = cardsRef.current.filter(el => el !== null);

        if (section && cards.length) {
            const ctx = gsap.context(() => {
                // Set initial state for the animation
                gsap.set(cards, { opacity: 0, scale: 0.5, y: 100, rotation: -15 });

                // Create the scroll-triggered animation
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 70%', // Start animation when the top of the section is 70% from the top of the viewport
                    end: 'bottom 20%',
                    onEnter: () => {
                        gsap.to(cards, {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            rotation: 0,
                            duration: 0.8,
                            stagger: 0.2,
                            ease: 'power3.out',
                        });
                    },
                    onLeaveBack: () => {
                         // Reverse animation when scrolling back up past the trigger point
                        gsap.to(cards, {
                            opacity: 0,
                            scale: 0.5,
                            y: 100,
                            rotation: -15,
                            duration: 0.6,
                            stagger: 0.1,
                            ease: 'power3.in',
                        });
                    },
                });
            }, section);

            return () => ctx.revert(); // Cleanup GSAP animations
        }
    }, []);

    return (
        <section ref={sectionRef}>
            <h2 className="text-3xl font-bold font-headline text-center mb-8">Featured Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-8 group">
            {collections.map((collection, index) => (
                <Link 
                    href={collection.href} 
                    key={collection.name} 
                    ref={el => { if(el) cardsRef.current[index] = el; }}
                    className={cn(
                        "group/item relative block overflow-hidden rounded-lg transition-all duration-500 ease-in-out group-hover:scale-90 group-hover:-rotate-3 hover:!scale-105 hover:!rotate-0",
                        index < 2 ? "md:col-span-3 h-96" : "md:col-span-2 h-80"
                    )}
                >
                    <Image 
                        src={collection.image} 
                        fill 
                        alt={collection.name} 
                        className="object-cover transition-transform duration-500 group-hover/item:scale-110" 
                        data-ai-hint={collection.data_ai_hint} 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h3 className="text-white text-3xl font-bold font-headline">{collection.name}</h3>
                    </div>
                </Link>
            ))}
            </div>
      </section>
    );
}
