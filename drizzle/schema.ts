import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const ticketStatusEnum = pgEnum("ticket_status", ["pending", "confirmed", "cancelled"]);
export const muralRequestStatusEnum = pgEnum("mural_request_status", ["new", "reviewed", "quoted", "in-progress", "completed"]);
export const newsletterStatusEnum = pgEnum("newsletter_status", ["subscribed", "unsubscribed"]);
export const orderStatusEnum = pgEnum("order_status", ["pending", "processing", "shipped", "delivered", "cancelled"]);

export const users = pgTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

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

export const products = pgTable("products", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(),
  price: varchar("price", { length: 50 }).notNull(),
  imageUrl: text("imageUrl"),
  imageUrls: text("imageUrls"),
  isOneOfOne: varchar("isOneOfOne", { length: 10 }).default("true"),
  stock: varchar("stock", { length: 10 }).default("1"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const portfolioItems = pgTable("portfolioItems", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(),
  imageUrl: text("imageUrl"),
  imageUrls: text("imageUrls"),
  createdAt: timestamp("createdAt").defaultNow(),
});

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

export const newsletterSubscriptions = pgTable("newsletterSubscriptions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  status: newsletterStatusEnum("status").default("subscribed"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const cartItems = pgTable("cartItems", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }),
  sessionId: varchar("sessionId", { length: 64 }),
  productId: varchar("productId", { length: 64 }).notNull(),
  quantity: varchar("quantity", { length: 10 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const orders = pgTable("orders", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  totalPrice: varchar("totalPrice", { length: 50 }).notNull(),
  status: orderStatusEnum("status").default("pending"),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Types used by server/db.ts
export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;
export type Workshop = InferSelectModel<typeof workshops>;
export type InsertWorkshop = InferInsertModel<typeof workshops>;
export type Product = InferSelectModel<typeof products>;
export type InsertProduct = InferInsertModel<typeof products>;
export type PortfolioItem = InferSelectModel<typeof portfolioItems>;
export type InsertPortfolioItem = InferInsertModel<typeof portfolioItems>;
export type MuralRequest = InferSelectModel<typeof muralRequests>;
export type InsertMuralRequest = InferInsertModel<typeof muralRequests>;
export type NewsletterSubscription = InferSelectModel<typeof newsletterSubscriptions>;
export type InsertNewsletterSubscription = InferInsertModel<typeof newsletterSubscriptions>;
export type WorkshopTicket = InferSelectModel<typeof workshopTickets>;
export type InsertWorkshopTicket = InferInsertModel<typeof workshopTickets>;
