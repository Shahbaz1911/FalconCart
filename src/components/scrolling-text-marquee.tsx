'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ScrollingTextMarquee() {
  const componentRef = useRef<HTMLDivElement>(null);
  const marqueeLineRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const marqueeTexts = [
    'Futuristic Designs',
    'Unmatched Quality',
    'Seamless Experience',
    'Innovate Your Style',
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const component = componentRef.current;
    if (!component) return;

    // GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Animate each line with a different magnitude and direction
      tl.to(marqueeLineRefs[0].current, { xPercent: -20, ease: 'none' }, 0)
        .to(marqueeLineRefs[1].current, { xPercent: 20, ease: 'none' }, 0)
        .to(marqueeLineRefs[2].current, { xPercent: -15, ease: 'none' }, 0)
        .to(marqueeLineRefs[3].current, { xPercent: 25, ease: 'none' }, 0);
        
    }, component);

    return () => ctx.revert();
  }, []);

  const MarqueeLine = ({ text, lineRef, initialOffset }: { text: string; lineRef: React.RefObject<HTMLDivElement>; initialOffset: string }) => {
    // Repeat the text to create a long, seamless line
    const repeatedText = Array(8).fill(text).join(' • ');
    return (
      <div ref={lineRef} className={`flex whitespace-nowrap ${initialOffset}`}>
        <p className="text-stroke-2 text-transparent font-headline uppercase text-6xl md:text-8xl font-extrabold mx-4">
          {repeatedText}
        </p>
      </div>
    );
  };
  
  // Corrected initial offsets to ensure text is visible on screen
  const initialOffsets = ['-translate-x-[10%]', '-translate-x-[30%]', '-translate-x-[5%]', '-translate-x-[25%]'];

  return (
    <section ref={componentRef} className="py-24 overflow-x-hidden">
        <div className="space-y-4">
            {marqueeTexts.map((text, index) => (
                <MarqueeLine 
                    key={text} 
                    text={text} 
                    lineRef={marqueeLineRefs[index]}
                    initialOffset={initialOffsets[index]}
                />
            ))}
        </div>
    </section>
  );
}
