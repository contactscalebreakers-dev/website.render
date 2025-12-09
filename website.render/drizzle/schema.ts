import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * PostgreSQL enums must be defined before tables
 */
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const ticketStatusEnum = pgEnum("ticket_status", ["pending", "confirmed", "cancelled"]);
export const muralRequestStatusEnum = pgEnum("mural_request_status", ["new", "reviewed", "quoted", "in-progress", "completed"]);
export const newsletterStatusEnum = pgEnum("newsletter_status", ["subscribed", "unsubscribed"]);
export const orderStatusEnum = pgEnum("order_status", ["pending", "processing", "shipped", "delivered", "cancelled"]);

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = pgTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Workshops table for fortnightly creative workshops
export const workshops = pgTable("workshops", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  time: varchar("time", { length: 10 }),
  location: varchar("location", { length: 255 }),
  price: varchar("price", { length: 50 }),
  capacity: varchar("capacity", { length: 50 }),
  imageUrl: text("imageUrl"),
  qrCode: text("qrCode"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Workshop = typeof workshops.$inferSelect;
export type InsertWorkshop = typeof workshops.$inferInsert;

// Workshop tickets/registrations
export const workshopTickets = pgTable("workshopTickets", {
  id: varchar("id", { length: 64 }).primaryKey(),
  workshopId: varchar("workshopId", { length: 64 }).notNull(),
  userId: varchar("userId", { length: 64 }),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  quantity: varchar("quantity", { length: 10 }).notNull(),
  totalPrice: varchar("totalPrice", { length: 50 }),
  status: ticketStatusEnum("status").default("pending"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type WorkshopTicket = typeof workshopTickets.$inferSelect;
export type InsertWorkshopTicket = typeof workshopTickets.$inferInsert;

// Products for the shop (artwork, 3D models, dioramas, etc.)
export const products = pgTable("products", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(), // "canvas", "3d-model", "diorama", "other"
  price: varchar("price", { length: 50 }).notNull(),
  imageUrl: text("imageUrl"),
  imageUrls: text("imageUrls"), // JSON array of image URLs
  isOneOfOne: varchar("isOneOfOne", { length: 10 }).default("true"), // "true" or "false"
  stock: varchar("stock", { length: 10 }).default("1"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// Portfolio items to showcase previous work
export const portfolioItems = pgTable("portfolioItems", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(), // "mural", "3d-model", "canvas", "diorama", "other"
  imageUrl: text("imageUrl"),
  imageUrls: text("imageUrls"), // JSON array of image URLs
  createdAt: timestamp("createdAt").defaultNow(),
});

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = typeof portfolioItems.$inferInsert;

// Mural requests for custom personalized murals
export const muralRequests = pgTable("muralRequests", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  location: text("location"),
  wallSize: varchar("wallSize", { length: 100 }),
  wallCondition: text("wallCondition"),
  theme: text("theme"),
  inspiration: text("inspiration"),
  timeline: varchar("timeline", { length: 100 }),
  budget: varchar("budget", { length: 100 }),
  additionalNotes: text("additionalNotes"),
  status: muralRequestStatusEnum("status").default("new"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type MuralRequest = typeof muralRequests.$inferSelect;
export type InsertMuralRequest = typeof muralRequests.$inferInsert;

// Newsletter subscriptions
export const newsletterSubscriptions = pgTable("newsletterSubscriptions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  status: newsletterStatusEnum("status").default("subscribed"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = typeof newsletterSubscriptions.$inferInsert;

// Cart items for shop
export const cartItems = pgTable("cartItems", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }),
  sessionId: varchar("sessionId", { length: 64 }),
  productId: varchar("productId", { length: 64 }).notNull(),
  quantity: varchar("quantity", { length: 10 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;

// Orders
export const orders = pgTable("orders", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  totalPrice: varchar("totalPrice", { length: 50 }).notNull(),
  status: orderStatusEnum("status").default("pending"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
