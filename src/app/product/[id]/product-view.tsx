'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { AddToCartButton } from './add-to-cart-button';
import { Recommendations } from './recommendations';
import type { Product } from '@/lib/products';

interface ProductViewProps {
  product: Product;
}

export function ProductView({ product }: ProductViewProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  const handleAnimatedAddToCart = () => {
    const cartIcon = document.getElementById('cart-icon-container');
    const imageContainer = imageRef.current;
    const imgTag = imageContainer?.querySelector('img');

    if (!cartIcon || !imageContainer || !imgTag) return;

    const imageRect = imageContainer.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const imageClone = document.createElement('img');
    imageClone.src = imgTag.src;
    imageClone.style.position = 'fixed';
    imageClone.style.left = `${imageRect.left}px`;
    imageClone.style.top = `${imageRect.top}px`;
    imageClone.style.width = `${imageRect.width}px`;
    imageClone.style.height = `${imageRect.height}px`;
    imageClone.style.objectFit = 'cover';
    imageClone.style.borderRadius = '0.375rem'; // rounded-md
    imageClone.style.zIndex = '9999';
    document.body.appendChild(imageClone);

    const tl = gsap.timeline({
      onComplete: () => {
        imageClone.remove();
      },
    });

    tl.to(imageClone, {
      left: cartRect.left + cartRect.width / 2 - 20,
      top: cartRect.top + cartRect.height / 2 - 20,
      width: 40,
      height: 40,
      opacity: 0.5,
      duration: 0.7,
      ease: 'power1.inOut',
    });

    gsap.fromTo(
      cartIcon,
      { scale: 1 },
      { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.inOut', delay: 0.6 }
    );

    const plusOne = document.createElement('div');
    plusOne.innerText = '+1';
    plusOne.style.position = 'fixed';
    plusOne.style.left = `${cartRect.right - 10}px`;
    plusOne.style.top = `${cartRect.top}px`;
    plusOne.style.color = 'hsl(var(--accent))';
    plusOne.style.fontWeight = 'bold';
    plusOne.style.fontSize = '1.2rem';
    plusOne.style.zIndex = '10000';
    plusOne.style.pointerEvents = 'none';
    document.body.appendChild(plusOne);

    gsap.to(plusOne, {
      y: -40,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        plusOne.remove();
      },
      delay: 0.7,
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
      <div className="bg-card rounded-lg p-4 flex items-center justify-center">
        <div ref={imageRef} className="aspect-square relative w-full max-w-md mx-auto">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={product.data_ai_hint}
            priority
          />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">{product.name}</h1>
        <p className="text-muted-foreground text-sm mb-4">{product.category}</p>
        <p className="text-lg mb-6">{product.description}</p>
        <div className="flex items-center justify-between mb-6">
          <span className="text-4xl font-bold font-headline text-primary">${product.price.toFixed(2)}</span>
        </div>
        <AddToCartButton product={product} onAddToCart={handleAnimatedAddToCart} />
        <div className="mt-12">
          <Recommendations product={product} />
        </div>
      </div>
    </div>
  );
}
