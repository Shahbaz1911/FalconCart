'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { OrderSuccessAnimation } from '@/components/order-success-animation';
import { CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

// SVG for PayPal
const PayPalIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"><title>PayPal</title><path d="M7.076 21.337a.684.684 0 0 1-.663-.878l1.348-8.221a.684.684 0 0 0-.662-.878H2.94a.684.684 0 0 1-.67-.733L3.165 3.3a.684.684 0 0 1 .67-.733h6.6a.684.684 0 0 1 .663.878L9.75 11.666a.684.684 0 0 0 .663.878h4.05a.684.684 0 0 1 .682.752l-.65 4.83a.684.684 0 0 1-.682.752H9.32a.684.684 0 0 0-.663.878l.45 2.766a.684.684 0 0 1-.663.878H7.076zM15.424 12.544a.684.684 0 0 0 .682-.752L16.756 7a.684.684 0 0 1 .682-.752h2.226a.684.684 0 0 1 .662.878L19.09 11.666a.684.684 0 0 0 .663.878h.426a.684.684 0 0 1 .67.733l-.895 8.324a.684.684 0 0 1-.67.733h-2.19a.684.684 0 0 1-.663-.878l1.348-8.221a.684.684 0 0 0-.662-.878h-.426z"/></svg>
);

// SVG for UPI
const UpiIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"><title>UPI</title><path d="M9.82 5.393H4.44l3.128 6.643-3.128 6.55h5.38l3.127-6.55zm4.36 0H8.8l3.127 6.643-3.127 6.55h5.38l3.127-6.55zM24 5.393h-5.38l3.128 6.643-3.128 6.55H24l-3.128-6.55z" /></svg>
);


const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(5, 'Valid ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
  paymentMethod: z.enum(['card', 'paypal', 'upi'], { required_error: 'Please select a payment method.' }),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === 'card') {
    if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
      ctx.addIssue({ code: 'custom', message: 'A 16-digit card number is required.', path: ['cardNumber'] });
    }
    if (!data.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
      ctx.addIssue({ code: 'custom', message: 'Expiry date must be in MM/YY format.', path: ['expiryDate'] });
    }
    if (!data.cvc || !/^\d{3,4}$/.test(data.cvc)) {
      ctx.addIssue({ code: 'custom', message: 'A 3 or 4 digit CVC is required.', path: ['cvc'] });
    }
  }
});

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '', address: '', city: '', state: '', zip: '', country: '',
      paymentMethod: 'card',
      cardNumber: '', expiryDate: '', cvc: '',
    },
  });

  const onSubmit = (values: z.infer<typeof checkoutSchema>) => {
    console.log('Order submitted:', values);
    setIsPlacingOrder(true);
  };
  
  const handleAnimationComplete = () => {
    clearCart();
    router.push('/orders');
  };

  if (isPlacingOrder) {
      return <OrderSuccessAnimation onComplete={handleAnimationComplete} />;
  }
  
  if (items.length === 0 && !isPlacingOrder) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold font-headline">Your cart is empty.</h1>
                <p className="text-muted-foreground mt-2">Add items to your cart before checking out.</p>
                <Button asChild className="mt-4"><Link href="/">Go Shopping</Link></Button>
            </div>
        </div>
    )
  }

  const selectedPaymentMethod = form.watch('paymentMethod');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
              <Card>
                  <CardHeader><CardTitle className="font-headline text-2xl">Shipping Information</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                          <FormItem className="sm:col-span-2"><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="address" render={({ field }) => (
                          <FormItem className="sm:col-span-2"><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="city" render={({ field }) => (
                          <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="state" render={({ field }) => (
                          <FormItem><FormLabel>State / Province</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="zip" render={({ field }) => (
                          <FormItem><FormLabel>ZIP / Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="country" render={({ field }) => (
                          <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader><CardTitle className="font-headline text-2xl">Payment Details</CardTitle></CardHeader>
                  <CardContent>
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                              >
                                <FormItem>
                                  <FormControl>
                                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                  </FormControl>
                                  <Label htmlFor="card" className={cn("flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary", "cursor-pointer")}>
                                    <CreditCard className="mb-3 h-6 w-6" />
                                    Credit Card
                                  </Label>
                                </FormItem>
                                 <FormItem>
                                  <FormControl>
                                    <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                                  </FormControl>
                                  <Label htmlFor="paypal" className={cn("flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary", "cursor-pointer")}>
                                    <PayPalIcon />
                                    PayPal
                                  </Label>
                                </FormItem>
                                 <FormItem>
                                  <FormControl>
                                    <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                                  </FormControl>
                                  <Label htmlFor="upi" className={cn("flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary", "cursor-pointer")}>
                                    <UpiIcon />
                                    UPI
                                  </Label>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {selectedPaymentMethod === 'card' && (
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
                              <FormField control={form.control} name="cardNumber" render={({ field }) => (
                                  <FormItem className="sm:col-span-4"><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                              <FormField control={form.control} name="expiryDate" render={({ field }) => (
                                  <FormItem className="sm:col-span-2"><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                              <FormField control={form.control} name="cvc" render={({ field }) => (
                                  <FormItem className="sm:col-span-2"><FormLabel>CVC</FormLabel><FormControl><Input placeholder="•••" {...field} /></FormControl><FormMessage /></FormItem>
                              )} />
                          </div>
                      )}
                      {selectedPaymentMethod === 'paypal' && (
                          <div className="mt-6 text-center bg-secondary/50 p-6 rounded-md">
                              <p>You will be redirected to PayPal to complete your purchase.</p>
                          </div>
                      )}
                      {selectedPaymentMethod === 'upi' && (
                           <div className="mt-6 text-center bg-secondary/50 p-6 rounded-md">
                              <p>Scan the QR code or enter your UPI ID in your payment app.</p>
                          </div>
                      )}
                  </CardContent>
              </Card>
          </div>
          <div className="lg:col-span-1">
              <Card>
                  <CardHeader><CardTitle className="font-headline text-2xl">Order Summary</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                      {items.map(item => (
                          <div key={item.product.id} className="flex justify-between items-center text-sm">
                              <span>{item.product.name} x {item.quantity}</span>
                              <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>${totalPrice.toFixed(2)}</span>
                      </div>
                  </CardContent>
              </Card>
              <Button type="submit" size="lg" className="w-full mt-6" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Processing...' : 'Place Order'}
              </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
