'use client';

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Rocket } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === '/') {
    return null;
  }

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Account", href: "/account" },
    { name: "Cart", href: "/cart" },
  ];

  const aboutLinks = [
    { name: "Our Story", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: <Facebook />, href: "#" },
    { name: "Twitter", icon: <Twitter />, href: "#" },
    { name: "Instagram", icon: <Instagram />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin />, href: "#" },
  ];

  return (
    <footer className="bg-card shadow-inner mt-12 border-t relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 text-primary mb-4">
              <Rocket className="h-8 w-8" />
              <span className="text-2xl font-bold font-headline">Falcon Cart</span>
            </Link>
            <p className="text-sm text-muted-foreground">Style meets comfort. Discover premium fashion made for you.</p>
          </div>
          
          <div>
            <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              {aboutLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
                {socialLinks.map(link => (
                    <Button key={link.name} variant="ghost" size="icon" asChild>
                        <Link href={link.href} aria-label={link.name}>
                            {link.icon}
                        </Link>
                    </Button>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
           <p>&copy; {new Date().getFullYear()} Falcon Cart. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
