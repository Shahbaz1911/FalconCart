'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shirt, Watch, Gem, Footprints, Sparkles, ShoppingBag } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate headline, paragraph, and floating particles
      tl.to([headlineRef.current, paragraphRef.current, particlesRef.current], {
        y: -100,
        opacity: 0,
        stagger: 0.1,
      }, 0);

      // Animate buttons fading out, slightly delayed
      tl.to(buttonsRef.current, {
        y: -50,
        opacity: 0,
      }, 0.2);

      // Animate the background image scaling down
      tl.to(imageWrapperRef.current, {
        scale: 0.95,
      }, '<');

      // Animate the overlay darkening
      tl.to(overlayRef.current, {
        backgroundColor: 'rgba(0,0,0,0.7)',
      }, '<');

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
      <div ref={imageWrapperRef} className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
          fill
          alt="Fashion model"
          className="object-cover"
          data-ai-hint="fashion model"
          priority
        />
      </div>
      <div ref={overlayRef} className="absolute inset-0 bg-black/50 z-10" />
      <div className="z-20 p-4 relative">
        <div ref={particlesRef} className="absolute inset-0">
          <div className="absolute top-[15%] left-[10%] animate-float-subtle" style={{ animationDelay: '0s' }}>
            <Shirt className="h-10 w-10 text-white/20 transition-all duration-300 hover:text-white/80 hover:scale-110 hover:-rotate-12" />
          </div>
          <div className="absolute top-[20%] right-[12%] animate-float-subtle hidden md:block" style={{ animationDelay: '1s' }}>
            <Watch className="h-8 w-8 text-white/20 transition-all duration-300 hover:text-white/80 hover:scale-110 hover:rotate-12" />
          </div>
          <div className="absolute bottom-[25%] left-[20%] animate-float-subtle hidden md:block" style={{ animationDelay: '2.5s', animationDuration: '8s' }}>
            <Gem className="h-7 w-7 text-white/20 transition-all duration-300 hover:text-white/80 hover:scale-110 hover:rotate-6" />
          </div>
          <div className="absolute bottom-[15%] right-[25%] animate-float-subtle" style={{ animationDelay: '4s', animationDuration: '7s' }}>
            <Footprints className="h-9 w-9 text-white/20 transition-all duration-300 hover:text-white/80 hover:scale-110 hover:rotate-12" />
          </div>
          <div className="absolute top-[50%] left-[30%] animate-float-subtle hidden md:block" style={{ animationDelay: '1.5s', animationDuration: '9s' }}>
            <Sparkles className="h-6 w-6 text-white/20 transition-all duration-300 hover:text-white/80 hover:scale-110" />
          </div>
          <div className="absolute top-[60%] right-[35%] animate-float-subtle" style={{ animationDelay: '3s', animationDuration: '5s' }}>
            <ShoppingBag className="h-8 w-8 text-white/20 transition-all duration-300 hover:text-white/80 hover:scale-110" />
          </div>
        </div>

        <div className="relative">
          <h1 ref={headlineRef} className="text-4xl sm:text-5xl lg:text-7xl font-bold font-headline">Style Meets Comfort</h1>
          <p ref={paragraphRef} className="text-lg sm:text-xl lg:text-2xl mt-4 max-w-2xl mx-auto">Discover premium fashion made for you</p>
          <div ref={buttonsRef} className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/collections/apparel">View Collections</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
