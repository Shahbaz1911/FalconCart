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

const AssistantResponseSchema = z.object({
    action: z.enum(['talk', 'addToCart']).describe("The action the assistant should take. 'talk' for just responding with text, 'addToCart' to add an item to the user's shopping cart."),
    productId: z.string().optional().describe("The ID of the product to add to the cart. Required if action is 'addToCart'."),
    quantity: z.number().optional().describe("The quantity of the product to add. Defaults to 1. Required if action is 'addToCart'."),
    content: z.string().describe("The text response to show to the user."),
});
export type AssistantResponse = z.infer<typeof AssistantResponseSchema>;


export async function conductChat(history: ChatInput): Promise<AssistantResponse> {
    return chatFlow(history);
}

const productCatalog = allProducts.map(p => 
    `- Product ID: ${p.id}\n  Name: ${p.name}\n  Category: ${p.category}\n  Price: $${p.price.toFixed(2)}\n  Description: ${p.description}`
).join('\n\n');

const chatFlow = ai.defineFlow(
    {
        name: 'chatFlow',
        inputSchema: ChatInputSchema,
        outputSchema: AssistantResponseSchema,
    },
    async (chatHistory) => {
        // The last message is the user's prompt. The rest is history.
        const lastUserMessage = chatHistory.pop();
        if (!lastUserMessage || lastUserMessage.role !== 'user') {
            return { action: 'talk', content: "I'm having trouble understanding. Please try again." };
        }

        const response = await ai.generate({
            prompt: `You are FalconBot, a friendly and helpful e-commerce assistant for "Falcon Cart".
Your goal is to assist users with their questions about products and help them build their shopping cart.
Keep your responses concise and friendly.

*** IMPORTANT CAPABILITIES ***
- You CAN add items to the user's cart. To do this, set the 'action' to 'addToCart' and provide the 'productId' and 'quantity'.
- You CANNOT place the final order. If a user wants to check out, direct them to the cart page at \`/cart\`.

If a user expresses intent to buy or add a product to their cart, you MUST use the 'addToCart' action.
For example, if they say "Add the quantum sneakers to my basket", you should set action='addToCart', productId='fw1', quantity=1, and content="I've added the Quantum Sneakers to your cart!".

If you are just answering a question, use the 'talk' action.

You MUST use the product catalog below as your only source of truth for product information.
If a user asks about a product not in the list, or if you cannot identify a product from their request, politely say you don't have information on it or cannot add it. Do not make up products or details.

*** PRODUCT CATALOG ***
${productCatalog}
*** END OF CATALOG ***

Based on the conversation history and the product catalog, respond to the following user question.
User Question: "${lastUserMessage.content}"
`,
            history: chatHistory.map(m => ({role: m.role, content: [{text: m.content}]})),
            output: {
                schema: AssistantResponseSchema,
            },
            config: {
                temperature: 0.3,
            },
        });
        
        return response.output!;
    }
);
