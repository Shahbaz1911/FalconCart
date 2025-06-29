'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { getProductById, getProducts, type Product } from '@/lib/products';

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
        // AI-based recommendations (if they work)
        const result = await getProductRecommendations({
          productId: product.id,
          productName: product.name,
          productDescription: product.description,
          productCategory: product.category,
        });

        let recommendedProducts: Product[] = [];

        if (result && result.recommendations && result.recommendations.length > 0) {
          const recommendedProductPromises = result.recommendations
            .map(rec => getProductById(rec.productId));
          
          const resolvedProducts = await Promise.all(recommendedProductPromises);
          
          recommendedProducts = resolvedProducts
            .filter((p): p is Product => !!p && p.id !== product.id);
        }

        // Fallback to category-based recommendations if AI fails or returns nothing
        if (recommendedProducts.length === 0) {
          console.log("AI recommendations failed or were empty, falling back to category-based.");
          const allProducts = await getProducts();
          recommendedProducts = allProducts
            .filter(p => p.category === product.category && p.id !== product.id);
        }

        setRecommendations(recommendedProducts.slice(0, 3)); // Take up to 3 products

      } catch (error) {
        console.error('Failed to fetch recommendations, falling back to category:', error);
        // Fallback in case of error
        const allProducts = await getProducts();
        const categoryProducts = allProducts
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 3);
        setRecommendations(categoryProducts);
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
      <div className="flex gap-6 overflow-x-auto pb-4">
        {recommendations.map(recommendedProduct => (
          <div key={recommendedProduct.id} className="w-72 flex-shrink-0">
            <ProductCard product={recommendedProduct} />
          </div>
        ))}
      </div>
    </div>
  );
}
