'use server';

/**
 * @fileOverview Recommends related or complementary products to the current product.
 *
 * - getProductRecommendations - A function that returns product recommendations.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  productId: z.string().describe('The ID of the product to get recommendations for.'),
  productName: z.string().describe('The name of the product.'),
  productDescription: z.string().describe('The description of the product.'),
  productCategory: z.string().describe('The category of the product.'),
});
export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      productId: z.string().describe('The ID of the recommended product.'),
      productName: z.string().describe('The name of the recommended product.'),
      productDescription: z.string().describe('The description of the recommended product.'),
    })
  ).describe('An array of recommended products.'),
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are an e-commerce expert, skilled at recommending related and complementary products.

  Based on the details of the current product, suggest other products that the user might be interested in.
  Provide the product ID, name, and description for each recommended product.

  Current Product:
  Name: {{{productName}}}
  Description: {{{productDescription}}}
  Category: {{{productCategory}}}

  Recommendations:`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
