'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const collections = [
    { name: 'Clothes', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop', data_ai_hint: 'clothes fashion', href: '/collections/apparel' },
    { name: 'Footwear', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop', data_ai_hint: 'stylish footwear', href: '/collections/footwear' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1588705234458-944c6c59d54e?q=80&w=1974&auto=format&fit=crop', data_ai_hint: 'fashion accessories', href: '/collections/accessories' }
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 group">
            {collections.map((collection, index) => (
                <Link 
                    href={collection.href} 
                    key={collection.name} 
                    ref={el => { if(el) cardsRef.current[index] = el; }}
                    className="group/item relative block overflow-hidden rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-95 hover:!scale-105"
                >
                    <Image src={collection.image} width={400} height={500} alt={collection.name} className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" data-ai-hint={collection.data_ai_hint} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h3 className="text-white text-3xl font-bold font-headline">{collection.name}</h3>
                    </div>
                </Link>
            ))}
            </div>
      </section>
    );
}
