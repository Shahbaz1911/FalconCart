'use client';

import { useState, useMemo } from 'react';
import type { Product } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PackageOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const allCategories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const maxPrice = useMemo(() => Math.ceil(Math.max(...products.map(p => p.price))), [products]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [sortOrder, setSortOrder] = useState('rating-desc');

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if(searchQuery) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Filter by price
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortOrder) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategories, priceRange, sortOrder]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <aside className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="font-semibold text-base mb-2 block">Search</Label>
              <Input 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label className="font-semibold text-base mb-2 block">Category</Label>
              <div className="space-y-2">
                {allCategories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label htmlFor={category} className="font-normal cursor-pointer">{category}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="price-range" className="font-semibold text-base mb-2 block">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </Label>
              <Slider
                id="price-range"
                min={0}
                max={maxPrice}
                step={10}
                value={[priceRange[1]]}
                onValueChange={(value) => setPriceRange([0, value[0]])}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </aside>

      {/* Products Grid */}
      <main className="lg:col-span-3">
        <div className="flex justify-between items-center mb-4">
          <p className="text-muted-foreground">{filteredAndSortedProducts.length} products found</p>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating-desc">Sort by Rating</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
            <div className="text-center py-20 col-span-full">
                <PackageOpen className="mx-auto h-16 w-16 text-muted-foreground" />
                <h2 className="mt-4 text-2xl font-bold font-headline">No Products Found</h2>
                <p className="mt-2 text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
            </div>
        )}

      </main>
    </div>
  );
}
