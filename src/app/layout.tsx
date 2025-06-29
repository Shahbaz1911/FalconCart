import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartProvider } from '@/hooks/use-cart';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { CustomCursor } from '@/components/custom-cursor';
import { AuthProvider } from '@/components/auth-provider';
import { Chatbot } from '@/components/chatbot';
import { OrdersProvider } from '@/hooks/use-orders';

export const metadata: Metadata = {
  title: 'Falcon Cart',
  description: 'Your one-stop shop for everything great.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
<<<<<<< HEAD
          <AuthProvider>
            <OrdersProvider>
              <CartProvider>
                <CustomCursor />
                <Preloader />
                <Header />
                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:pb-8">
                  {children}
                </main>
                <Footer />
                <MobileBottomNav />
                <Chatbot />
                <Toaster />
              </CartProvider>
            </OrdersProvider>
          </AuthProvider>
=======
          <CartProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster />
          </CartProvider>
>>>>>>> refs/remotes/origin/main
        </ThemeProvider>
      </body>
    </html>
  );
}
