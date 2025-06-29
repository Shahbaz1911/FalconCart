import { CollectionView } from './collection-view';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/products';

// This mapping helps us show a nice name in the header, like "Home Goods" instead of "home%20goods"
const categoryDisplayNames: Record<string, string> = {
  'apparel': 'Apparel',
  'footwear': 'Footwear',
  'electronics': 'Electronics',
  'accessories': 'Accessories',
  'home goods': 'Home Goods',
};

interface CollectionPageProps {
  params: {
    category: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  // Decode the category from the URL (e.g., "home%20goods" becomes "home goods")
  const categoryKey = decodeURIComponent(params.category).toLowerCase();
  
  // Get the nice display name, or fall back to the key
  const displayCategoryName = categoryDisplayNames[categoryKey] || categoryKey;

  // Fetch all products from our static data source
  const allProducts = await getProducts();
  
  // Filter to get only the products for the current category
  const products = allProducts.filter(p => p.category.toLowerCase() === categoryKey);

  // If we found a display name but no products, it's still a valid category, just empty.
  // If we didn't even find a display name, it's a true 404.
  if (!categoryDisplayNames[categoryKey]) {
    notFound();
  }

  return <CollectionView products={products} category={categoryKey} displayCategoryName={displayCategoryName} />;
}

export async function generateStaticParams() {
    const products = await getProducts();
    const categories = [...new Set(products.map(p => p.category.toLowerCase()))];
    return categories.map(category => ({
        category,
    }));
}
