'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

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
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => void;
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Width of a single block of text links to make the loop seamless.
    const singleBlockWidth = el.scrollWidth / 3;

    const ctx = gsap.context(() => {
      // Continuous marquee animation
      gsap.fromTo(
        el,
        { x: 0 },
        {
          x: -singleBlockWidth * direction,
          duration: 40, // Adjust duration for speed
          ease: 'none',
          repeat: -1,
        }
      );

      // Skew on scroll to maintain the curved illusion
      gsap.to(el, {
        skewX: 1.5 * direction,
        scrollTrigger: {
          trigger: el,
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
        'text-8xl md:text-[9rem] lg:text-[12rem] leading-none font-black font-headline whitespace-nowrap uppercase tracking-tighter flex items-center gap-x-12',
        isPrimary ? 'text-primary' : 'text-foreground'
      )}
    >
      {links.map((link, index) => (
        <React.Fragment key={`${link.name}-${index}`}>
          <Link
            href={link.href}
            className="transition-colors hover:text-accent"
            onClick={(e) => onLinkClick(e, link.href, link.name)}
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
  const { theme, setTheme } = useTheme();

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
    href: string,
    name: string
  ) => {
    e.preventDefault();
    const target = e.currentTarget;

    if (name === 'Theme') {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      // Add a subtle feedback animation for theme change
      gsap.fromTo(target, 
        { opacity: 0.5, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
      return;
    }

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
    { name: 'Clothes', href: '/collections/apparel' },
    { name: 'Footwear', href: '/collections/footwear' },
    { name: 'Accessories', href: '/collections/accessories' },
    { name: 'Profile', href: '/account/profile' },
    { name: 'Order', href: '/orders' },
    { name: 'Cart', href: '/cart' },
    { name: 'Setting', href: '/account/settings' },
    { name: 'Theme', href: '#' },
  ];

  const repeatedLinks = [...navLinks, ...navLinks, ...navLinks];

  return (
    <section
      ref={componentRef}
      className="relative h-[200vh] w-full overflow-hidden"
    >
      <div className="pin-container h-screen w-full flex flex-col items-center justify-center">
        <div className="space-y-0 -rotate-3">
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
