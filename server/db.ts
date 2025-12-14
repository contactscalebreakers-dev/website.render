import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, users, workshops, products, portfolioItems, newsletterSubscriptions, muralRequests, InsertMuralRequest, workshopTickets } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      console.log("[Database] Connecting to database...");
      const client = postgres(process.env.DATABASE_URL);
      _db = drizzle(client);
      console.log("[Database] Connection successful");
    } catch (error) {
      console.error("[Database] Failed to connect:", error);
      _db = null;
    }
  } else if (!process.env.DATABASE_URL) {
    console.warn("[Database] DATABASE_URL not set");
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = 'admin';
        values.role = 'admin';
        updateSet.role = 'admin';
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.id,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Workshops queries
export async function getWorkshops() {
  const db = await getDb();
  if (!db) {
    console.warn("[getWorkshops] Database not available");
    return [];
  }
  try {
    const result = await db.select().from(workshops).orderBy(desc(workshops.date));
    console.log("[getWorkshops] Found", result.length, "workshops");
    return result;
  } catch (error) {
    console.error("[getWorkshops] Query failed:", error);
    return [];
  }
}

export async function getWorkshopById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(workshops).where(eq(workshops.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createWorkshop(data: any) {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(workshops).values({
      id: data.id,
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      time: data.time,
      location: data.location,
      price: data.price.toString(),
      capacity: data.capacity.toString(),
      imageUrl: data.imageUrl || null,
    });
    return true;
  } catch (error) {
    console.error("Failed to create workshop:", error);
    return null;
  }
}

export async function updateWorkshop(id: string, data: any) {
  const db = await getDb();
  if (!db) return null;
  try {
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.date !== undefined) updateData.date = new Date(data.date);
    if (data.time !== undefined) updateData.time = data.time;
    if (data.location !== undefined) updateData.location = data.location;
    if (data.price !== undefined) updateData.price = data.price.toString();
    if (data.capacity !== undefined) updateData.capacity = data.capacity.toString();
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    
    await db.update(workshops).set(updateData).where(eq(workshops.id, id));
    return true;
  } catch (error) {
    console.error("Failed to update workshop:", error);
    return null;
  }
}

export async function deleteWorkshop(id: string) {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.delete(workshops).where(eq(workshops.id, id));
    return true;
  } catch (error) {
    console.error("Failed to delete workshop:", error);
    return null;
  }
}

// Products queries
export async function getProducts(category?: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[getProducts] Database not available");
    return [];
  }
  try {
    let result;
    if (category) {
      result = await db.select().from(products).where(eq(products.category, category));
    } else {
      result = await db.select().from(products);
    }
    console.log("[getProducts] Found", result.length, "products" + (category ? ` in category ${category}` : ""));
    return result;
  } catch (error) {
    console.error("[getProducts] Query failed:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Portfolio queries
export async function getPortfolioItems(category?: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[getPortfolioItems] Database not available");
    return [];
  }
  try {
    let result;
    if (category) {
      result = await db.select().from(portfolioItems).where(eq(portfolioItems.category, category));
    } else {
      result = await db.select().from(portfolioItems);
    }
    console.log("[getPortfolioItems] Found", result.length, "items" + (category ? ` in category ${category}` : ""));
    return result;
  } catch (error) {
    console.error("[getPortfolioItems] Query failed:", error);
    return [];
  }
}

export async function createPortfolioItem(data: any) {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(portfolioItems).values({
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category,
      imageUrl: data.imageUrl || null,
    });
    return true;
  } catch (error) {
    console.error("Failed to create portfolio item:", error);
    return null;
  }
}

export async function updatePortfolioItem(id: string, data: any) {
  const db = await getDb();
  if (!db) return null;
  try {
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    
    await db.update(portfolioItems).set(updateData).where(eq(portfolioItems.id, id));
    return true;
  } catch (error) {
    console.error("Failed to update portfolio item:", error);
    return null;
  }
}

export async function deletePortfolioItem(id: string) {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
    return true;
  } catch (error) {
    console.error("Failed to delete portfolio item:", error);
    return null;
  }
}

// Newsletter queries
export async function subscribeNewsletter(email: string, name?: string) {
  const db = await getDb();
  if (!db) return false;
  try {
    const id = crypto.randomUUID();
    await db.insert(newsletterSubscriptions).values({
      id,
      email,
      name: name || undefined,
      status: "subscribed",
    });
    return true;
  } catch (error) {
    console.error("Failed to subscribe to newsletter:", error);
    return false;
  }
}

// Product mutations
export async function createProduct(data: any) {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(products).values({
      id: data.id,
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price.toString(),
      stock: data.stock.toString(),
      imageUrl: data.imageUrl || null,
      isOneOfOne: data.isOneOfOne ? "true" : "false",
    });
    return true;
  } catch (error) {
    console.error("Failed to create product:", error);
    return null;
  }
}

export async function updateProduct(id: string, data: any) {
  const db = await getDb();
  if (!db) return null;
  try {
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.price !== undefined) updateData.price = data.price.toString();
    if (data.stock !== undefined) updateData.stock = data.stock.toString();
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.isOneOfOne !== undefined) updateData.isOneOfOne = data.isOneOfOne ? "true" : "false";
    
    await db.update(products).set(updateData).where(eq(products.id, id));
    return true;
  } catch (error) {
    console.error("Failed to update product:", error);
    return null;
  }
}

export async function deleteProduct(id: string) {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.delete(products).where(eq(products.id, id));
    return true;
  } catch (error) {
    console.error("Failed to delete product:", error);
    return null;
  }
}

// Workshop ticket queries
export async function getWorkshopTickets() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(workshopTickets).orderBy(desc(workshopTickets.createdAt));
}

export async function getWorkshopTicketsByWorkshopId(workshopId: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(workshopTickets).where(eq(workshopTickets.workshopId, workshopId));
}

export async function getWorkshopTicketById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(workshopTickets).where(eq(workshopTickets.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateWorkshopTicketStatus(id: string, status: "pending" | "confirmed" | "cancelled") {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.update(workshopTickets).set({ status }).where(eq(workshopTickets.id, id));
    return true;
  } catch (error) {
    console.error("Failed to update workshop ticket status:", error);
    return false;
  }
}

export async function deleteWorkshopTicket(id: string) {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.delete(workshopTickets).where(eq(workshopTickets.id, id));
    return true;
  } catch (error) {
    console.error("Failed to delete workshop ticket:", error);
    return false;
  }
}

// Mural request queries
export async function createMuralRequest(data: InsertMuralRequest) {
  const db = await getDb();
  if (!db) return null;
  try {
    const id = crypto.randomUUID();
    await db.insert(muralRequests).values({
      ...data,
      id,
    });
    return id;
  } catch (error) {
    console.error("Failed to create mural request:", error);
    return null;
  }
}
