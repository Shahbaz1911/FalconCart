'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { getProductById, type Product } from '@/lib/products';

interface RecommendationsProps {
  product: Product;
}

export function Recommendations({ product }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const result = await getProductRecommendations({
          productId: product.id,
          productName: product.name,
          productDescription: product.description,
          productCategory: product.category,
        });

        if (result && result.recommendations) {
          const recommendedProducts = result.recommendations
            .map(rec => getProductById(rec.productId))
            .filter((p): p is Product => p !== undefined && p.id !== product.id)
            .slice(0, 3); // Take up to 3 valid, different products

          setRecommendations(recommendedProducts);
        }
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [product]);

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
             <div key={i} className="space-y-2">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
             </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold font-headline mb-4">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map(recommendedProduct => (
          <ProductCard key={recommendedProduct.id} product={recommendedProduct} />
        ))}
      </div>
    </div>
  );
}
