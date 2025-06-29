import { getProducts } from '@/lib/products';
import { ProductGrid } from './product-grid';

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">All Products</h1>
        <p className="text-muted-foreground mt-2">
          Browse our entire collection and find your next favorite item.
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
