'use server';
/**
 * @fileOverview Sends an order confirmation email with a generated image.
 *
 * - sendOrderConfirmation - Handles sending the confirmation email.
 * - SendOrderConfirmationInput - Input for the sendOrderConfirmation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {sendEmail} from '@/lib/email';

const SendOrderConfirmationInputSchema = z.object({
  email: z.string().email().describe('The recipient\'s email address.'),
  orderId: z.string().describe('The ID of the order being confirmed.'),
  imageDataUri: z.string().describe('The AI-generated order confirmation image as a data URI.'),
});
export type SendOrderConfirmationInput = z.infer<typeof SendOrderConfirmationInputSchema>;

export async function sendOrderConfirmation(input: SendOrderConfirmationInput): Promise<void> {
  await sendOrderConfirmationFlow(input);
}

const sendOrderConfirmationFlow = ai.defineFlow(
  {
    name: 'sendOrderConfirmationFlow',
    inputSchema: SendOrderConfirmationInputSchema,
    outputSchema: z.void(),
  },
  async ({email, orderId, imageDataUri}) => {
    const emailHtml = `
      <h1>Thank You for Your Order!</h1>
      <p>We've received your order and are getting it ready for you. Here is a summary of your purchase:</p>
      <img src="${imageDataUri}" alt="Your Order Summary - ${orderId}" style="max-width: 100%; height: auto;" />
      <p>You can view your full order details in your account dashboard.</p>
      <p>Thanks for shopping with Falcon Cart!</p>
    `;

    await sendEmail({
      to: email,
      subject: `Your Falcon Cart Order Confirmation (${orderId})`,
      html: emailHtml,
    });
  }
);
