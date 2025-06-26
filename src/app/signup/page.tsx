'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { signInWithGoogle, signUpWithEmail } from '@/lib/auth';

const GoogleIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.73 1.9-3.87 0-7-3.13-7-7s3.13-7 7-7c2.18 0 3.66.86 4.69 1.86l2.7-2.7C18.43 2.12 15.82 1 12.48 1 7.02 1 3 5.02 3 10.5S7.02 20 12.48 20c2.92 0 5.17-1 6.84-2.63 1.73-1.68 2.36-4.07 2.36-6.19 0-.47-.05-.93-.13-1.38h-9.08z"/></svg>
);

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '' },
  });

  const onEmailSubmit = async (values: z.infer<typeof signupSchema>) => {
    const { error } = await signUpWithEmail(values.email, values.password);
    if (error) {
      toast({
        title: 'Sign Up Failed',
        description: 'Could not create an account. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Sign Up Successful!', description: 'Welcome! Your account has been created.' });
      router.push('/account');
    }
  };
  
  const onGoogleSubmit = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
        toast({
            title: 'Google Sign-In Failed',
            description: 'Could not sign in with Google. Please try again.',
            variant: 'destructive',
        });
    } else {
        toast({ title: 'Sign Up Successful!', description: 'Welcome!' });
        router.push('/account');
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold font-headline">Create an Account</CardTitle>
                <CardDescription>Join our community and start shopping</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onEmailSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        </Button>
                    </form>
                </Form>
                <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">OR</span>
                </div>
                <Button variant="outline" className="w-full" onClick={onGoogleSubmit}>
                    <GoogleIcon />
                    Sign Up with Google
                </Button>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account? <Link href="/login" className="text-primary hover:underline">Sign In</Link>
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
