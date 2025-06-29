import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import { ProductView } from './product-view';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductView product={product} />
    </div>
  );
}
