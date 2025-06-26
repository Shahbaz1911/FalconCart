
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PackageOpen } from 'lucide-react';

export default function GenericCollectionPage({ params }: { params: { category: string }}) {
  const categoryName = decodeURIComponent(params.category).replace(/-/g, ' ');

  return (
    <div className="text-center py-20">
      <PackageOpen className="mx-auto h-16 w-16 text-muted-foreground" />
      <h1 className="mt-4 text-3xl font-bold font-headline">Collection Not Found</h1>
      <p className="mt-2 text-muted-foreground capitalize">
        We couldn't find any products in the "{categoryName}" collection.
      </p>
      <p className="mt-1 text-muted-foreground">
        This page is a placeholder. To see products here, you would typically set up a Firestore database and populate it with items for this category.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Explore Other Collections</Link>
      </Button>
    </div>
  );
}
