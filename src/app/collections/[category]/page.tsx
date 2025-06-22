import { getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import Link from 'next/link';
import { PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CollectionPageProps {
  params: {
    category: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { category } = params;
  const allProducts = getProducts();
  
  const products = allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  // The 'Apparel' category is named 'Clothes' in the UI
  const displayCategoryName = category.toLowerCase() === 'apparel' ? 'Clothes' : categoryName;


  if (products.length === 0) {
      const allCategories = [...new Set(allProducts.map(p => p.category.toLowerCase()))];
      if (!allCategories.includes(category.toLowerCase())) {
          notFound();
      }
      
      return (
        <div className="text-center py-20">
          <PackageOpen className="mx-auto h-16 w-16 text-muted-foreground" />
          <h1 className="mt-4 text-3xl font-bold font-headline">No Products Found in {displayCategoryName}</h1>
          <p className="mt-2 text-muted-foreground">We couldn't find any products in this collection. Check back later!</p>
          <Button asChild className="mt-6">
            <Link href="/">Explore Other Collections</Link>
          </Button>
        </div>
      )
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/" className="text-sm text-primary hover:underline">&larr; Back to Home</Link>
        <h1 className="text-3xl md:text-4xl font-headline font-bold mt-2">
          {displayCategoryName} Collection
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore our hand-picked selection of {category.toLowerCase()}.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
    const products = getProducts();
    const categories = [...new Set(products.map(p => p.category.toLowerCase()))];
    return categories.map(category => ({
        category,
    }));
}
