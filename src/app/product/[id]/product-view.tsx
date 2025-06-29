'use client';

import Image from 'next/image';
import { AddToCartButton } from './add-to-cart-button';
import { Recommendations } from './recommendations';
import type { Product } from '@/lib/products';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import gsap from 'gsap';

interface ProductViewProps {
  product: Product;
}

export function ProductView({ product }: ProductViewProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    // 1. Add item to cart and show toast
    addItem(product, 1);
    toast({
      title: "Added to cart!",
      description: `${product.name} is now in your shopping cart.`,
    });

    // 2. Trigger GSAP animation
    const productImageEl = document.getElementById('product-image');
    const cartIconEl = document.getElementById('cart-icon-container');

    if (productImageEl && cartIconEl) {
      const productImageRect = productImageEl.getBoundingClientRect();
      const cartIconRect = cartIconEl.getBoundingClientRect();

      const imageClone = productImageEl.cloneNode(true) as HTMLElement;
      
      imageClone.style.position = 'fixed';
      imageClone.style.top = `${productImageRect.top}px`;
      imageClone.style.left = `${productImageRect.left}px`;
      imageClone.style.width = `${productImageRect.width}px`;
      imageClone.style.height = `${productImageRect.height}px`;
      imageClone.style.zIndex = '1000';
      imageClone.style.pointerEvents = 'none';
      
      document.body.appendChild(imageClone);

      // Animate the clone to the cart icon's position
      gsap.to(imageClone, {
        x: cartIconRect.left - productImageRect.left + (cartIconRect.width / 2) - (productImageRect.width / 2),
        y: cartIconRect.top - productImageRect.top + (cartIconRect.height / 2) - (productImageRect.height / 2),
        width: cartIconRect.width,
        height: cartIconRect.height,
        opacity: 0,
        duration: 0.8,
        ease: 'power1.in',
        onComplete: () => {
          document.body.removeChild(imageClone);
          // Bounce the cart icon in header for feedback
          gsap.timeline()
            .to(cartIconEl, { scale: 1.3, duration: 0.15, ease: 'power1.inOut' })
            .to(cartIconEl, { scale: 1, duration: 0.15, ease: 'power1.inOut' });
        }
      });
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 md:gap-12">
        <div className="md:bg-card md:rounded-lg md:p-4 flex items-center justify-center">
          <div id="product-image" className="aspect-square relative w-full max-w-md mx-auto">
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
          <h1 className="text-3xl sm:text-4xl font-bold font-headline mb-2">{product.name}</h1>
          <p className="text-muted-foreground text-sm mb-4">{product.category}</p>
          
          <div className="hidden md:flex items-center justify-between">
              <span className="text-3xl md:text-4xl font-bold font-headline text-primary">${product.price.toFixed(2)}</span>
          </div>

          <p className="text-base text-muted-foreground my-6">{product.description}</p>
          
          {/* Desktop price + add to cart button */}
          <div className="hidden md:flex flex-col gap-6">
            <AddToCartButton onClick={handleAddToCart} />
          </div>

          <div className="mt-8 md:mt-12">
            <Recommendations product={product} />
          </div>
        </div>
      </div>
      
      {/* Spacer for mobile to push content above the sticky bar */}
      <div className="h-24 md:hidden" />

      {/* Mobile-only sticky add to cart bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t p-4 flex items-center justify-between gap-4 z-40">
        <span className="text-xl font-bold font-headline text-primary">${product.price.toFixed(2)}</span>
        <div className="flex-grow max-w-xs">
             <AddToCartButton onClick={handleAddToCart} />
        </div>
      </div>
    </>
  );
}