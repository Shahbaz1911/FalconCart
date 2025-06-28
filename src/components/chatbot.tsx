'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bot, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { conductChat, type Message, type AssistantResponse } from '@/ai/flows/chat';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/hooks/use-cart';
import { getProductById } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';

// Helper function to parse markdown links and render them as interactive components.
const renderMessageContent = (content: string) => {
  const linkRegex = /(\[.*?\]\(.*?\))/g;
  const parts = content.split(linkRegex);

  return parts.map((part, index) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      const text = match[1];
      const href = match[2];
      return (
        <Link
          key={index}
          href={href}
          className="text-primary font-medium underline hover:text-primary/80"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </Link>
      );
    }
    return part;
  });
};


export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content:
        "Hello! I'm FalconBot. How can I help you find the perfect high-tech gear today? I can even add items to your cart for you.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { addItem } = useCart();
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTop =
        scrollViewportRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen) {
        setTimeout(() => scrollToBottom(), 100);
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response: AssistantResponse = await conductChat([...messages, userMessage]);

      // Handle the action returned by the AI
      if (response.action === 'addToCart' && response.productId) {
        const product = await getProductById(response.productId);
        if (product) {
          addItem(product, response.quantity || 1);
          toast({
              title: "Added to cart!",
              description: `${product.name} is now in your shopping cart.`,
          });
        }
      }

      // Add the text response to the chat history
      const assistantMessage: Message = { role: 'model', content: response.content };
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        role: 'model',
        content:
          "Sorry, I'm having a little trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 animate-float-subtle"
          aria-label="Open Chatbot"
        >
          <Bot className="h-7 w-7" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side={isMobile ? 'top' : 'left'}
        align="end"
        className="w-[calc(100vw-2rem)] sm:w-96 rounded-lg shadow-xl p-0 border-none mr-2 mb-2"
        sideOffset={16}
      >
        <div className="flex flex-col h-[70vh] sm:h-[60vh]">
          <header className="p-4 bg-primary text-primary-foreground rounded-t-lg flex items-center gap-3">
            <Bot className="h-6 w-6" />
            <h3 className="font-bold text-lg">Chat with FalconBot</h3>
          </header>

          <ScrollArea className="flex-1 bg-background" type="auto">
             <div ref={scrollViewportRef} className="h-[calc(70vh-140px)] sm:h-[calc(60vh-140px)] overflow-y-auto">
                <div className="p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                    key={index}
                    className={cn(
                        'flex items-end gap-2',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                    >
                    {message.role === 'model' && (
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                            <Bot className="h-5 w-5" />
                        </div>
                    )}
                    <div
                        className={cn(
                        'max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm whitespace-pre-wrap',
                        message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card'
                        )}
                    >
                        {renderMessageContent(message.content)}
                    </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex items-end gap-2 justify-start">
                         <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                            <Bot className="h-5 w-5" />
                        </div>
                        <div className="bg-card rounded-lg px-3 py-2 flex items-center gap-1.5 shadow-sm">
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0s'}} />
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                        </div>
                    </div>
                )}
                </div>
             </div>
          </ScrollArea>

          <form
            onSubmit={handleSubmit}
            className="p-4 border-t bg-background rounded-b-lg"
          >
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add items to cart..."
                className="pr-12"
                disabled={loading}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
