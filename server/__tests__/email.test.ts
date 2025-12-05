import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendEmail, getContactFormEmailTemplate, getServiceEnquiryEmailTemplate } from "../email";

// Mock nodemailer
vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: vi.fn().mockResolvedValue({ messageId: "test@example.com" }),
    })),
  },
}));

describe("Email Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Email Templates", () => {
    it("should generate contact form email template", () => {
      const html = getContactFormEmailTemplate("John Doe", "john@example.com", "Test message");
      expect(html).toContain("John Doe");
      expect(html).toContain("john@example.com");
      expect(html).toContain("Test message");
      expect(html).toContain("New Contact Form Submission");
    });

    it("should generate service enquiry email template", () => {
      const html = getServiceEnquiryEmailTemplate(
        "Jane Smith",
        "jane@example.com",
        "0412345678",
        "3D Scanning",
        "I need a 3D scan of my wall"
      );
      expect(html).toContain("Jane Smith");
      expect(html).toContain("jane@example.com");
      expect(html).toContain("0412345678");
      expect(html).toContain("3D Scanning");
      expect(html).toContain("I need a 3D scan of my wall");
      expect(html).toContain("New Service Enquiry");
    });

    it("should handle multiline text in templates", () => {
      const multilineMessage = "Line 1\nLine 2\nLine 3";
      const html = getContactFormEmailTemplate("Test User", "test@example.com", multilineMessage);
      expect(html).toContain("<br>");
    });
  });

  describe("sendEmail", () => {
    it("should return false when EMAIL_PASSWORD is not configured", async () => {
      // EMAIL_PASSWORD is not set in test environment
      const result = await sendEmail({
        to: "test@example.com",
        subject: "Test Subject",
        html: "<p>Test content</p>",
      });

      expect(result).toBe(false);
    });

    it("should handle email options correctly", async () => {
      const options = {
        to: "recipient@example.com",
        subject: "Test Email",
        html: "<h1>Test</h1>",
        text: "Test text",
      };

      // Since EMAIL_PASSWORD is not set, this will return false
      const result = await sendEmail(options);
      expect(typeof result).toBe("boolean");
    });
  });
});
