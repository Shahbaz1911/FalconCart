'use server';
/**
 * @fileOverview Sends a welcome email to a new user.
 *
 * - sendWelcomeEmail - Handles sending the welcome email.
 * - SendWelcomeEmailInput - Input for the sendWelcomeEmail flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {sendEmail} from '@/lib/email';

const SendWelcomeEmailInputSchema = z.object({
  email: z.string().email().describe('The new user\'s email address.'),
});
export type SendWelcomeEmailInput = z.infer<typeof SendWelcomeEmailInputSchema>;

export async function sendWelcomeEmail(input: SendWelcomeEmailInput): Promise<void> {
  await sendWelcomeEmailFlow(input);
}

const sendWelcomeEmailFlow = ai.defineFlow(
  {
    name: 'sendWelcomeEmailFlow',
    inputSchema: SendWelcomeEmailInputSchema,
    outputSchema: z.void(),
  },
  async ({email}) => {
    const emailHtml = `
      <h1>Welcome to Falcon Cart!</h1>
      <p>Thank you for signing up. We're excited to have you on board.</p>
      <p>Explore our latest collections and find something you love.</p>
      <p>Happy shopping!</p>
    `;

    await sendEmail({
      to: email,
      subject: 'Welcome to Falcon Cart!',
      html: emailHtml,
    });
  }
);
