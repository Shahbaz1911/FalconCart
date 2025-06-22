import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import { ProductView } from './product-view';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductView product={product} />;
}
