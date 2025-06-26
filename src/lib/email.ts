import nodemailer from 'nodemailer';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Basic check for email configuration
const isEmailConfigured =
  process.env.EMAIL_HOST &&
  process.env.EMAIL_PORT &&
  process.env.EMAIL_USER &&
  process.env.EMAIL_PASS &&
  !process.env.EMAIL_HOST.includes('your_email_host');

let transporter: nodemailer.Transporter | null = null;

if (isEmailConfigured) {
  try {
    const port = parseInt(process.env.EMAIL_PORT!, 10);
    if (isNaN(port)) {
      throw new Error(`Invalid EMAIL_PORT: "${process.env.EMAIL_PORT}". It must be a number.`);
    }

    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } catch (e) {
    console.error("Could not create email transporter. Emails will not be sent.", e);
    transporter = null;
  }
} else {
  console.warn(
    'Email service is not configured. Please set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS in your .env file.'
  );
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  if (!transporter) {
    console.error('Email transporter is not available. Email not sent.');
    // In a real app, you might want to throw an error or handle this more gracefully.
    return;
  }

  const mailOptions = {
    from: `"Falcon Cart" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email.');
  }
}
