import { getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import { CollectionView } from './collection-view';

interface CollectionPageProps {
  params: {
    category: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { category } = params;
  const allProducts = await getProducts();
  
  const allCategories = [...new Set(allProducts.map(p => p.category.toLowerCase()))];
  if (!allCategories.includes(category.toLowerCase())) {
      notFound();
  }
  
  const products = allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const displayCategoryName = category.toLowerCase() === 'apparel' ? 'Clothes' : categoryName;

  return (
    <div>
      <CollectionView 
        products={products} 
        category={category} 
        displayCategoryName={displayCategoryName} 
      />
    </div>
  );
}

export async function generateStaticParams() {
    const products = await getProducts();
    const categories = [...new Set(products.map(p => p.category.toLowerCase()))];
    return categories.map(category => ({
        category,
    }));
}
