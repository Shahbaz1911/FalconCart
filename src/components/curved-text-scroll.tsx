'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const TextLine = ({ links, direction = 1, isPrimary = false }: { links: { name: string; href: string }[], direction?: number, isPrimary?: boolean }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.to(textRef.current, {
            xPercent: 10 * direction,
            skewX: 1.5 * direction,
            scrollTrigger: {
              trigger: textRef.current,
              scrub: 0.5,
            },
          });
    });
    return () => ctx.revert();
  }, [direction]);

  return (
    <div ref={textRef} className={cn(
        "text-6xl md:text-8xl lg:text-9xl font-black font-headline whitespace-nowrap uppercase tracking-tighter flex items-center gap-x-12",
        isPrimary ? "text-primary" : "text-foreground"
    )}>
      {links.map((link, index) => (
        <React.Fragment key={index}>
            <Link href={link.href} className="transition-colors hover:text-accent">
                {link.name}
            </Link>
            {index < links.length - 1 && <span className="select-none">·</span>}
        </React.Fragment>
      ))}
    </div>
    );
};


export function CurvedTextScroll() {
  const componentRef = useRef<HTMLElement>(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: componentRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.pin-container', // Pin the inner container
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Collection', href: '/collections/apparel' },
    { name: 'Profile', href: '/account/profile' },
    { name: 'Order', href: '/orders' },
    { name: 'Cart', href: '/cart' },
    { name: 'Setting', href: '/account/settings' },
  ];

  const repeatedLinks = [...navLinks, ...navLinks, ...navLinks];

  return (
    <section ref={componentRef} className="relative h-[200vh] w-full overflow-hidden">
      <div className="pin-container h-screen w-full flex flex-col items-center justify-center">
        <div className="space-y-2 md:space-y-4 -rotate-3">
            <TextLine direction={1} links={repeatedLinks} />
            <TextLine direction={-1} links={repeatedLinks} />
            <TextLine direction={1} links={repeatedLinks} />
            <TextLine direction={-1} links={repeatedLinks} isPrimary />
        </div>
      </div>
    </section>
  );
}
