import { getProducts } from '@/lib/products';
import { CollectionView } from './collection-view';
import { notFound } from 'next/navigation';

interface CollectionPageProps {
  params: {
    category: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const category = decodeURIComponent(params.category);
  const allProducts = await getProducts();
  
  const allCategories = [...new Set(allProducts.map(p => p.category.toLowerCase()))];
  
  if (!allCategories.includes(category.toLowerCase())) {
    notFound();
  }

  const products = allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());

  // Capitalize first letter of each word for display
  const displayCategoryName = category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return <CollectionView products={products} category={category} displayCategoryName={displayCategoryName} />;
}
