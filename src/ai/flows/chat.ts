'use server';
/**
 * @fileOverview A conversational AI agent for the e-commerce store.
 *
 * - conductChat - A function that handles the chat conversation.
 * - Message - The type for a single message in the chat history.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { allProducts } from '@/lib/products';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

const ChatInputSchema = z.array(MessageSchema);
export type ChatInput = z.infer<typeof ChatInputSchema>;

export async function conductChat(history: ChatInput): Promise<Message> {
    return chatFlow(history);
}

const productCatalog = allProducts.map(p => 
    `- Product ID: ${p.id}\n  Name: ${p.name}\n  Category: ${p.category}\n  Price: $${p.price.toFixed(2)}\n  Description: ${p.description}`
).join('\n\n');

const chatFlow = ai.defineFlow(
    {
        name: 'chatFlow',
        inputSchema: ChatInputSchema,
        outputSchema: MessageSchema,
    },
    async (chatHistory) => {
        // The last message is the user's prompt. The rest is history.
        const lastUserMessage = chatHistory.pop();
        if (!lastUserMessage || lastUserMessage.role !== 'user') {
            return { role: 'model', content: "I'm having trouble understanding. Please try again." };
        }

        const response = await ai.generate({
            prompt: `You are FalconBot, a friendly and helpful e-commerce assistant for "Falcon Cart".
Your goal is to assist users with their questions about products.
Keep your responses concise and friendly.

You CANNOT add items to the cart or place orders for the user.
If a user expresses intent to buy a product, you MUST inform them that you cannot complete the purchase for them but you can provide a direct link to the product page.
The URL for a product is \`/product/[PRODUCT_ID]\`. Use the Product ID from the catalog. For example, for "Quantum Sneakers" with ID "fw1", the markdown link is "[Quantum Sneakers](/product/fw1)".

You MUST use the product catalog below as your only source of truth for product information.
If a user asks about a product not in the list, politely say you don't have information on it. Do not make up products or details.

*** PRODUCT CATALOG ***
${productCatalog}
*** END OF CATALOG ***

Based on the conversation history and the product catalog, answer the following user question.
User Question: "${lastUserMessage.content}"
`,
            history: chatHistory.map(m => ({role: m.role, content: [{text: m.content}]})),
            config: {
                temperature: 0.3,
            },
        });
        
        return {
            role: 'model',
            content: response.text,
        };
    }
);
