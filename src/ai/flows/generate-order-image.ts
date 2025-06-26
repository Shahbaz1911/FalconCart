'use server';
/**
 * @fileOverview Generates a confirmation image for a customer's order.
 *
 * - generateOrderImage - Creates an image summarizing the order details.
 * - GenerateOrderImageInput - Input for the image generation flow.
 * - GenerateOrderImageOutput - Output from the image generation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOrderImageInputSchema = z.object({
  productNames: z.array(z.string()).describe('A list of product names from the order.'),
  totalPrice: z.number().describe('The total price of the order.'),
  orderId: z.string().describe('The unique ID for the order.'),
});
export type GenerateOrderImageInput = z.infer<typeof GenerateOrderImageInputSchema>;

const GenerateOrderImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a Base64 data URI.'),
});
export type GenerateOrderImageOutput = z.infer<typeof GenerateOrderImageOutputSchema>;

export async function generateOrderImage(input: GenerateOrderImageInput): Promise<GenerateOrderImageOutput> {
  return generateOrderImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOrderImagePrompt',
  input: {schema: GenerateOrderImageInputSchema},
  prompt: `Generate an artistic and visually appealing image to confirm a customer's order.

The image should be a flat lay composition featuring items that represent the products ordered.
Product names: {{#each productNames}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.

The scene should be stylish, modern, and clean. Include a small, elegantly written thank you note that says "Thank You for Your Order!".
Also, subtly incorporate the text "Order ID: {{{orderId}}}" and "Total: \${{{totalPrice}}}" into the composition.
The overall mood should be celebratory and premium.`,
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
  },
});

const generateOrderImageFlow = ai.defineFlow(
  {
    name: 'generateOrderImageFlow',
    inputSchema: GenerateOrderImageInputSchema,
    outputSchema: GenerateOrderImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: (await prompt.render({input})).prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed to produce an image.');
    }
    return {imageDataUri: media.url};
  }
);
