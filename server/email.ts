import nodemailer from "nodemailer";

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "contact.scalebreakers@gmail.com",
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
      from: process.env.EMAIL_USER || "contact.scalebreakers@gmail.com",
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
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br>")}</p>
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
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Service:</strong> ${service}</p>
    <p><strong>Details:</strong></p>
    <p>${details.replace(/\n/g, "<br>")}</p>
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
    <p>Hi ${name},</p>
    <p>Thank you for booking with Scale Breakers!</p>
    <h3>Booking Details</h3>
    <ul>
      <li><strong>Workshop:</strong> ${workshop}</li>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Tickets:</strong> ${quantity}</li>
      <li><strong>Total Price:</strong> $${price.toFixed(2)}</li>
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
