import { config } from 'dotenv';
config();

import '@/ai/flows/product-recommendations.ts';
import '@/ai/flows/personalized-landing.ts';
import '@/ai/flows/send-welcome-email.ts';
import '@/ai/flows/generate-order-image.ts';
import '@/ai/flows/send-order-confirmation.ts';
