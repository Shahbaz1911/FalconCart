
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/admin/page-header';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/lib/products';

const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().min(0.01, 'Price must be a positive number'),
  category: z.string().min(2, 'Category is required'),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  image: z.string().url('Please enter a valid image URL'),
});

export default function NewProductPage() {
    const { toast } = useToast();
    const router = useRouter();
    
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            category: '',
            stock: 0,
            image: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof productSchema>) => {
        try {
            await createProduct({
                ...values,
                rating: Math.floor(Math.random() * 2) + 4, // Default rating between 4 and 5
            });
            toast({
                title: 'Product Created!',
                description: `The product "${values.name}" has been successfully added.`,
            });
            router.push('/admin/products');
        } catch (error) {
            console.error('Failed to create product:', error);
            toast({
                title: 'Creation Failed',
                description: 'There was a problem creating the product. Please try again.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div>
            <PageHeader title="New Product" description="Add a new product to your store." />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader><CardTitle>Product Details</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl><Input placeholder="e.g., Quantum Sneakers" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl><Textarea placeholder="Describe the product..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl><Input placeholder="e.g., Footwear" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl><Input type="number" step="0.01" placeholder="e.g., 349.99" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="stock"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stock</FormLabel>
                                            <FormControl><Input type="number" placeholder="e.g., 30" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Adding Product...' : 'Add Product'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
