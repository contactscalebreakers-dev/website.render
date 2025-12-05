import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getWorkshops, getWorkshopById, getProducts, getProductById, getPortfolioItems, subscribeNewsletter, createMuralRequest, getDb, createProduct, updateProduct, deleteProduct, getWorkshopTickets, getWorkshopTicketById, updateWorkshopTicketStatus, deleteWorkshopTicket } from "./db";
import { TRPCError } from "@trpc/server";
import crypto from "crypto";
import { sendEmail, getContactFormEmailTemplate, getServiceEnquiryEmailTemplate, getBookingConfirmationEmailTemplate } from "./email";
import { createCheckoutSession } from "./stripe";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  workshops: router({
    list: publicProcedure.query(async () => {
      return await getWorkshops();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const workshop = await getWorkshopById(input.id);
        if (!workshop) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Workshop not found" });
        }
        return workshop;
      }),

    bookWorkshop: publicProcedure
      .input(z.object({
        workshopTitle: z.string(),
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        quantity: z.number().int().positive(),
        date: z.string(),
        totalPrice: z.number().positive(),
      }))
      .mutation(async ({ input }) => {
        return { success: true, message: "Booking confirmed! Check your email for details." };
      }),
  }),

  products: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return await getProducts(input?.category);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const product = await getProductById(input.id);
        if (!product) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
        }
        return product;
      }),

    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required"),
        category: z.enum(["workshop-ticket", "3d-model", "diorama", "canvas", "mural"]),
        price: z.number().positive("Price must be positive"),
        stock: z.number().int().nonnegative("Stock must be non-negative"),
        imageUrl: z.string().optional(),
        isOneOfOne: z.boolean().default(false),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can create products" });
        }
        const id = crypto.randomUUID();
        const result = await createProduct({
          id,
          ...input,
        });
        if (!result) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create product" });
        }
        return { success: true, id };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        category: z.enum(["workshop-ticket", "3d-model", "diorama", "canvas", "mural"]).optional(),
        price: z.number().positive().optional(),
        stock: z.number().int().nonnegative().optional(),
        imageUrl: z.string().optional(),
        isOneOfOne: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can update products" });
        }
        const { id, ...updateData } = input;
        const result = await updateProduct(id, updateData);
        if (!result) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update product" });
        }
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can delete products" });
        }
        const result = await deleteProduct(input.id);
        if (!result) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete product" });
        }
        return { success: true };
      }),
  }),

  portfolio: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return await getPortfolioItems(input?.category);
      }),
  }),

  muralRequests: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().optional(),
        location: z.string().optional(),
        wallSize: z.string().optional(),
        wallCondition: z.string().optional(),
        theme: z.string().optional(),
        inspiration: z.string().optional(),
        timeline: z.string().optional(),
        budget: z.string().optional(),
        additionalNotes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = crypto.randomUUID();
        const requestId = await createMuralRequest({ id, ...input } as any);
        if (!requestId) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to submit mural request" });
        }
        return { success: true, id: requestId };
      }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email("Invalid email"),
        name: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const success = await subscribeNewsletter(input.email, input.name);
          if (!success) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to subscribe to newsletter" });
          }
          return { success: true };
        } catch (error: any) {
          if (error.code === "ER_DUP_ENTRY") {
            throw new TRPCError({ code: "CONFLICT", message: "Email already subscribed" });
          }
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to subscribe to newsletter" });
        }
      }),
  }),

  email: router({
    sendContact: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        message: z.string().min(1, "Message is required"),
      }))
      .mutation(async ({ input }) => {
        const adminEmail = "contact.scalebreakers@gmail.com";
        const html = getContactFormEmailTemplate(input.name, input.email, input.message);
        const success = await sendEmail({
          to: adminEmail,
          subject: `New Contact Form Submission from ${input.name}`,
          html,
        });
        if (!success) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to send email" });
        }
        return { success: true, message: "Thank you! We'll get back to you soon." };
      }),

    sendServiceEnquiry: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(1, "Phone is required"),
        service: z.string().min(1, "Service is required"),
        details: z.string().min(1, "Details are required"),
      }))
      .mutation(async ({ input }) => {
        const adminEmail = "contact.scalebreakers@gmail.com";
        const html = getServiceEnquiryEmailTemplate(
          input.name,
          input.email,
          input.phone,
          input.service,
          input.details
        );
        const success = await sendEmail({
          to: adminEmail,
          subject: `New ${input.service} Enquiry from ${input.name}`,
          html,
        });
        if (!success) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to send email" });
        }
        return { success: true, message: "Thank you! We'll get back to you soon." };
      }),
  }),

  payments: router({
    createProductCheckout: publicProcedure
      .input(z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const product = await getProductById(input.productId);
          if (!product) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
          }

          const price = parseInt(product.price) * 100; // Convert to cents
          const origin = ctx.req.headers.origin || "https://scalebreakers.space";

          const session = await createCheckoutSession({
            userId: ctx.user?.id || "guest",
            userEmail: ctx.user?.email || "",
            userName: ctx.user?.name || "Guest",
            items: [
              {
                name: product.name,
                amount: price,
                quantity: input.quantity,
              },
            ],
            successUrl: `${origin}/shop?payment=success`,
            cancelUrl: `${origin}/shop?payment=cancelled`,
            metadata: {
              type: "product",
              product_id: input.productId,
              product_name: product.name,
            },
          });

          if (!session.url) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout session" });
          }

          return { url: session.url };
        } catch (error) {
          console.error("Failed to create product checkout:", error);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout session" });
        }
      }),

    createWorkshopCheckout: publicProcedure
      .input(z.object({
        workshopId: z.string(),
        quantity: z.number().int().positive(),
        totalPrice: z.number().positive(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const workshop = await getWorkshopById(input.workshopId);
          if (!workshop) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Workshop not found" });
          }

          const price = Math.round(input.totalPrice * 100); // Convert to cents
          const origin = ctx.req.headers.origin || "https://scalebreakers.space";

          const session = await createCheckoutSession({
            userId: ctx.user?.id || "guest",
            userEmail: ctx.user?.email || "",
            userName: ctx.user?.name || "Guest",
            items: [
              {
                name: `${workshop.title} - ${input.quantity} ticket(s)`,
                amount: price,
                quantity: 1,
              },
            ],
            successUrl: `${origin}/workshops?payment=success`,
            cancelUrl: `${origin}/workshops?payment=cancelled`,
            metadata: {
              type: "workshop",
              workshop_id: input.workshopId,
              workshop_title: workshop.title || "",
              quantity: input.quantity.toString(),
            },
          });

          if (!session.url) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout session" });
          }

          return { url: session.url };
        } catch (error) {
          console.error("Failed to create workshop checkout:", error);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout session" });
        }
      }),

    createServiceCheckout: publicProcedure
      .input(z.object({
        service: z.string(),
        amount: z.number().positive(),
        customerName: z.string(),
        customerEmail: z.string().email(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const price = Math.round(input.amount * 100); // Convert to cents
          const origin = ctx.req.headers.origin || "https://scalebreakers.space";

          const session = await createCheckoutSession({
            userId: ctx.user?.id || "guest",
            userEmail: input.customerEmail,
            userName: input.customerName,
            items: [
              {
                name: `${input.service} Deposit`,
                amount: price,
                quantity: 1,
              },
            ],
            successUrl: `${origin}/services?payment=success`,
            cancelUrl: `${origin}/services?payment=cancelled`,
            metadata: {
              type: "service",
              service: input.service,
              customer_name: input.customerName,
              customer_email: input.customerEmail,
            },
          });

          if (!session.url) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout session" });
          }

          return { url: session.url };
        } catch (error) {
          console.error("Failed to create service checkout:", error);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout session" });
        }
      }),
  }),

  admin: router({
    bookings: router({
      list: protectedProcedure
        .query(async ({ ctx }) => {
          if (ctx.user?.role !== "admin") {
            throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can view bookings" });
          }
          return await getWorkshopTickets();
        }),

      getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
          if (ctx.user?.role !== "admin") {
            throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can view bookings" });
          }
          const booking = await getWorkshopTicketById(input.id);
          if (!booking) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Booking not found" });
          }
          return booking;
        }),

      updateStatus: protectedProcedure
        .input(z.object({
          id: z.string(),
          status: z.enum(["pending", "confirmed", "cancelled"]),
        }))
        .mutation(async ({ ctx, input }) => {
          if (ctx.user?.role !== "admin") {
            throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can update bookings" });
          }
          const success = await updateWorkshopTicketStatus(input.id, input.status);
          if (!success) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update booking" });
          }
          return { success: true };
        }),

      delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
          if (ctx.user?.role !== "admin") {
            throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can delete bookings" });
          }
          const success = await deleteWorkshopTicket(input.id);
          if (!success) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete booking" });
          }
          return { success: true };
        }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
