import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const client = postgres(connectionString);

async function pushSchema() {
  console.log("Creating tables in Supabase...");
  
  try {
    // Create enums
    await client`
      DO $$ BEGIN
        CREATE TYPE user_role AS ENUM ('user', 'admin');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;
    
    await client`
      DO $$ BEGIN
        CREATE TYPE ticket_status AS ENUM ('pending', 'confirmed', 'cancelled');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;
    
    await client`
      DO $$ BEGIN
        CREATE TYPE mural_request_status AS ENUM ('new', 'reviewed', 'quoted', 'in-progress', 'completed');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;
    
    await client`
      DO $$ BEGIN
        CREATE TYPE newsletter_status AS ENUM ('subscribed', 'unsubscribed');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;
    
    await client`
      DO $$ BEGIN
        CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;
    console.log("✅ Enums created");
    
    await client`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        name TEXT,
        email VARCHAR(320),
        "loginMethod" VARCHAR(64),
        role user_role NOT NULL DEFAULT 'user',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "lastSignedIn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✅ users table created");
    
    await client`
      CREATE TABLE IF NOT EXISTS workshops (
        id VARCHAR(64) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date TIMESTAMP NOT NULL,
        time VARCHAR(10),
        location VARCHAR(255),
        price VARCHAR(50),
        capacity VARCHAR(50),
        "imageUrl" TEXT,
        "qrCode" TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✅ workshops table created");
    
    await client`
      CREATE TABLE IF NOT EXISTS "workshopTickets" (
        id VARCHAR(64) PRIMARY KEY,
        "workshopId" VARCHAR(64) NOT NULL,
        "userId" VARCHAR(64),
        email VARCHAR(320) NOT NULL,
        name VARCHAR(255) NOT NULL,
        quantity VARCHAR(10) NOT NULL,
        "totalPrice" VARCHAR(50),
        status ticket_status DEFAULT 'pending',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✅ workshopTickets table created");
    
    await client`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        price VARCHAR(50) NOT NULL,
        "imageUrl" TEXT,
        "imageUrls" TEXT,
        "isOneOfOne" VARCHAR(10) DEFAULT 'true',
        stock VARCHAR(10) DEFAULT '1',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✅ products table created");
    
    await client`
      CREATE TABLE IF NOT EXISTS "portfolioItems" (
        id VARCHAR(64) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        "imageUrl" TEXT,
        "imageUrls" TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✅ portfolioItems table created");
    await client`
      CREATE TABLE IF NOT EXISTS "muralRequests" (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(320) NOT NULL,
        phone VARCHAR(20),
        location TEXT,
        "wallSize" VARCHAR(100),
        "wallCondition" TEXT,
        theme TEXT,
        inspiration TEXT,
        timeline VARCHAR(100),
        budget VARCHAR(100),
        "additionalNotes" TEXT,
        status mural_request_status DEFAULT 'new',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✅ muralRequests table created");
    
    await client`
      CREATE TABLE IF NOT EXISTS "newsletterSubscriptions" (
        id VARCHAR(64) PRIMARY KEY,
        email VARCHAR(320) NOT NULL UNIQUE,
        name VARCHAR(255),
        status newsletter_status DEFAULT 'subscribed',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✅ newsletterSubscriptions table created");
    
    await client`
      CREATE TABLE IF NOT EXISTS "cartItems" (
        id VARCHAR(64) PRIMARY KEY,
        "userId" VARCHAR(64),
        "sessionId" VARCHAR(64),
        "productId" VARCHAR(64) NOT NULL,
        quantity VARCHAR(10) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✅ cartItems table created");
    
    await client`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(64) PRIMARY KEY,
        "userId" VARCHAR(64),
        email VARCHAR(320) NOT NULL,
        name VARCHAR(255) NOT NULL,
        "totalPrice" VARCHAR(50) NOT NULL,
        status order_status DEFAULT 'pending',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✅ orders table created");
    
    console.log("\n🎉 All tables created successfully!");
    await client.end();
  } catch (error) {
    console.error("❌ Error:", error);
    await client.end();
    process.exit(1);
  }
}

pushSchema().catch(console.error);
