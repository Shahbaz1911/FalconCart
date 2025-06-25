'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextLine = ({ children, direction = 1 }: { children: React.ReactNode, direction?: number }) => {
  const textRef = useRef<HTMLParagraphElement>(null);

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

  return <p ref={textRef} className="text-6xl md:text-8xl lg:text-9xl font-black font-headline whitespace-nowrap uppercase tracking-tighter">{children}</p>;
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

  const textContent = "Style · Performance · Innovation · ";

  return (
    <section ref={componentRef} className="relative h-[200vh] w-full overflow-hidden">
      <div className="pin-container h-screen w-full flex flex-col items-center justify-center">
        <div className="space-y-2 md:space-y-4 -rotate-3">
            <TextLine direction={1}>{textContent.repeat(3)}</TextLine>
            <TextLine direction={-1}>{textContent.repeat(3)}</TextLine>
            <TextLine direction={1}>{textContent.repeat(3)}</TextLine>
            <TextLine direction={-1}><span className="text-primary">{textContent.repeat(3)}</span></TextLine>
        </div>
      </div>
    </section>
  );
}
