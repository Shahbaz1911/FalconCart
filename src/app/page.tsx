import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/products';

export default function Home() {
  const products = getProducts();

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
