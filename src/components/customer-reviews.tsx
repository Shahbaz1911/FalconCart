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
    },
    {
      name: 'Kenji Tanaka',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop',
      rating: 5,
      review: 'The Hydro-Synth Plant Pot is pure genius. My office plant has never been happier, and the ambient music is surprisingly calming.',
      data_ai_hint: 'asian man portrait',
    },
    {
      name: 'Fatima Al-Jamil',
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop',
      rating: 4,
      review: 'The Chrono-Watch X is elegant and functional. The battery life could be a little better, but the design and features are top-tier.',
      data_ai_hint: 'middle eastern woman',
    },
    {
      name: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1547425260-76bc4c400c2e?q=80&w=2070&auto=format&fit=crop',
      rating: 5,
      review: 'I bought the Astro-Gazer 9000 for my son, and we are blown away. The clarity is incredible. We\'ve spent hours exploring the moon.',
      data_ai_hint: 'older man portrait',
    }
];

export function CustomerReviews() {
    const componentRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const component = componentRef.current;
        const track = trackRef.current;

        if (!component || !track) return;
        
        const timeoutId = setTimeout(() => {
            const scrollAmount = track.scrollWidth - component.clientWidth;
            
            if (scrollAmount <= 0) {
                return;
            }

            let ctx = gsap.context(() => {
                gsap.to(track, {
                    x: -scrollAmount,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: component,
                        start: 'top top',
                        pin: true,
                        pinSpacing: false,
                        scrub: 1,
                        end: () => `+=${scrollAmount}`,
                        invalidateOnRefresh: true,
                    },
                });
            }, component);

            return () => {
                ctx.revert();
            };
        }, 100);

        return () => clearTimeout(timeoutId);

    }, []);

    return (
        <section>
            <div className="mb-12">
                <h2 className="text-3xl font-bold font-headline text-center">What Our Customers Say</h2>
                <p className="text-muted-foreground text-center mt-2">Honest reviews from our amazing community.</p>
            </div>
            
            <div ref={componentRef} className="h-screen w-full overflow-hidden relative">
                <div ref={trackRef} className="flex h-full items-center gap-8 w-max px-12">
                    {reviews.map((review, index) => (
                        <div key={index} className="w-[400px] flex-shrink-0">
                            <Card className="h-[250px] flex flex-col justify-center">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                    <Avatar className="h-12 w-12">
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}