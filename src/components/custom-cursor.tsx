'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      // Don't show custom cursor on mobile devices
      if(cursorRef.current) cursorRef.current.style.display = 'none';
      if(followerRef.current) followerRef.current.style.display = 'none';
      return;
    };

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(followerRef.current, {
        scale: 2.5,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(cursorRef.current, {
        scale: 0,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(followerRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
       gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', moveCursor);

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer'
    );
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
