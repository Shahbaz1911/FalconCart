'use server';
/**
 * @fileOverview A conversational AI agent for the e-commerce store.
 *
 * - conductChat - A function that handles the chat conversation.
 * - Message - The type for a single message in the chat history.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

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

const chatFlow = ai.defineFlow(
    {
        name: 'chatFlow',
        inputSchema: ChatInputSchema,
        outputSchema: MessageSchema,
    },
    async (history) => {
        const { text } = await ai.generate({
            prompt: `You are FalconBot, a friendly and helpful e-commerce assistant for "Falcon Cart", a store that sells futuristic and high-tech products like personal telescopes, self-lacing sneakers, smart plant pots, and more.
            Your goal is to assist users with their questions about products, orders, and shipping.
            Keep your responses concise and friendly. Do not make up products. If you don't know something, say you don't have that information.`,
            history: history.map(m => ({role: m.role, content: [{text: m.content}]})),
            config: {
                temperature: 0.3,
            },
        });
        
        return {
            role: 'model',
            content: text,
        };
    }
);
