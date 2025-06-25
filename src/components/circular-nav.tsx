'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Collections', href: '#collections' },
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
];

export function CircularNav() {
  const component = useRef<HTMLDivElement>(null);
  const rotator = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mainContent = document.getElementById('main-content-container');
    if (!mainContent) return;

    let ctx = gsap.context(() => {
      // The animation will be based on the height of the main content area
      const scrollDistance = mainContent.offsetHeight;
      
      // Pin the circular nav section
      ScrollTrigger.create({
        trigger: component.current,
        pin: true,
        start: "top top",
        end: `+=${scrollDistance}`,
      });

      // Rotate the navigation items as the user scrolls
      gsap.to(rotator.current, {
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: mainContent,
          start: 'top bottom',
          end: `bottom bottom`,
          scrub: 1,
        }
      });
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={component} id="home" className="h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full border-2 border-dashed border-primary/50 animate-spin-slow"></div>
      <div ref={rotator} className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full relative">
        {navItems.map((item, index) => {
          const angle = (index / navItems.length) * 360;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="absolute w-24 h-24 flex items-center justify-center top-1/2 left-1/2 -m-12"
              style={{
                transform: `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`,
              }}
            >
              <span className="text-xl md:text-2xl font-headline font-bold text-primary hover:text-accent transition-colors duration-300">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
      <p className="absolute bottom-10 text-muted-foreground animate-bounce">Scroll Down</p>
    </section>
  );
}
