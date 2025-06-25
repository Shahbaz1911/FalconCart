'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const reviews = [
    {
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
      rating: 5,
      review: 'The Quantum Sneakers are a game-changer! So comfortable and stylish. I feel like I\'m walking on clouds.',
      data_ai_hint: 'man portrait',
    },
    {
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
      rating: 5,
      review: 'I love my Nova-Glow Lamp. It has completely changed the ambiance of my workspace. The quality is top-notch!',
      data_ai_hint: 'woman portrait',
    },
    {
      name: 'Sam Lee',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
      rating: 4,
      review: 'The Chronos Coffee Machine makes a perfect cup every single time. It\'s a bit pricey, but worth it for a coffee lover.',
      data_ai_hint: 'person portrait',
    }
];

export function CustomerReviews() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const section = sectionRef.current;
        const cards = cardsRef.current.filter(el => el !== null);

        if (section && cards.length) {
            const ctx = gsap.context(() => {
                // Animate from a hidden state to the final state
                gsap.from(cards, {
                    opacity: 0,
                    scale: 0.8,
                    y: 50,
                    rotation: 5,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse', // Play animation on enter, reverse on scroll back up
                    }
                });
            }, section);
            return () => ctx.revert();
        }
    }, []);

    return (
        <section ref={sectionRef}>
            <h2 className="text-3xl font-bold font-headline text-center mb-8">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
                <Card key={review.name} ref={el => { if(el) cardsRef.current[index] = el; }}>
                    <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                        <Avatar>
                            <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review.data_ai_hint} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <p className="font-semibold">{review.name}</p>
                            <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-primary fill-current' : 'text-muted'}`} />
                            ))}
                            </div>
                        </div>
                        </div>
                        <p className="text-muted-foreground italic">&ldquo;{review.review}&rdquo;</p>
                    </CardContent>
                </Card>
            ))}
            </div>
      </section>
    );
}
