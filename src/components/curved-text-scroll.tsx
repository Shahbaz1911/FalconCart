'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const TextLine = ({
  links,
  direction = 1,
  isPrimary = false,
  onLinkClick,
}: {
  links: { name: string; href: string }[];
  direction?: number;
  isPrimary?: boolean;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) => {
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
    <div
      ref={textRef}
      className={cn(
        'text-6xl md:text-8xl lg:text-9xl font-black font-headline whitespace-nowrap uppercase tracking-tighter flex items-center gap-x-12',
        isPrimary ? 'text-primary' : 'text-foreground'
      )}
    >
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <Link
            href={link.href}
            className="transition-colors hover:text-accent"
            onClick={(e) => onLinkClick(e, link.href)}
          >
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
  const router = useRouter();

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

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = e.currentTarget;

    // Animate the clicked link to "zoom in"
    gsap.to(target, {
      scale: 1.5,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        router.push(href);
        // Reset the style immediately after starting navigation.
        // This ensures it looks normal if the user navigates back.
        gsap.set(target, { scale: 1, opacity: 1 });
      },
    });
  };

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
    <section
      ref={componentRef}
      className="relative h-[200vh] w-full overflow-hidden"
    >
      <div className="pin-container h-screen w-full flex flex-col items-center justify-center">
        <div className="space-y-2 md:space-y-4 -rotate-3">
          <TextLine
            direction={1}
            links={repeatedLinks}
            onLinkClick={handleLinkClick}
          />
          <TextLine
            direction={-1}
            links={repeatedLinks}
            onLinkClick={handleLinkClick}
          />
          <TextLine
            direction={1}
            links={repeatedLinks}
            onLinkClick={handleLinkClick}
          />
          <TextLine
            direction={-1}
            links={repeatedLinks}
            isPrimary
            onLinkClick={handleLinkClick}
          />
        </div>
      </div>
    </section>
  );
}
