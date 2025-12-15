import nodemailer from "nodemailer";

/**
 * Escapes HTML special characters to prevent XSS attacks
 */
function escapeHtml(text: string | number): string {
  const str = String(text);
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return str.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char]);
}

// Create transporter using Outlook SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER || "dan.kae@outlook.com",
    pass: process.env.EMAIL_PASSWORD || "",
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!process.env.EMAIL_PASSWORD) {
      console.warn("[Email] EMAIL_PASSWORD not configured. Email not sent.");
      return false;
    }

    await transporter.sendMail({
      from: `Scale Breakers <${process.env.EMAIL_USER || "dan.kae@outlook.com"}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    console.log(`[Email] Sent to ${options.to}: ${options.subject}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send:", error);
    return false;
  }
}

// Email templates
export function getContactFormEmailTemplate(
  name: string,
  email: string,
  message: string
): string {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;
}

export function getServiceEnquiryEmailTemplate(
  name: string,
  email: string,
  phone: string,
  service: string,
  details: string
): string {
  return `
    <h2>New Service Enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Service:</strong> ${escapeHtml(service)}</p>
    <p><strong>Details:</strong></p>
    <p>${escapeHtml(details).replace(/\n/g, "<br>")}</p>
  `;
}

export function getBookingConfirmationEmailTemplate(
  name: string,
  workshop: string,
  date: string,
  quantity: number,
  price: number
): string {
  return `
    <h2>Workshop Booking Confirmation</h2>
    <p>Hi ${escapeHtml(name)},</p>
    <p>Thank you for booking with Scale Breakers!</p>
    <h3>Booking Details</h3>
    <ul>
      <li><strong>Workshop:</strong> ${escapeHtml(workshop)}</li>
      <li><strong>Date:</strong> ${escapeHtml(date)}</li>
      <li><strong>Tickets:</strong> ${escapeHtml(quantity)}</li>
      <li><strong>Total Price:</strong> $${escapeHtml(price.toFixed(2))}</li>
      <li><strong>Location:</strong> B.Y.O. at 2-4 Edmundstone Street, West End</li>
    </ul>
    <h3>What to Know</h3>
    <ul>
      <li>Duration: 2 hours</li>
      <li>Max 23 participants</li>
      <li>All materials provided</li>
      <li>You'll take home your creation</li>
    </ul>
    <p>If you have any questions, please reply to this email or contact us at contact.scalebreakers@gmail.com</p>
    <p>See you soon!</p>
    <p>Scale Breakers Team</p>
  `;
}
