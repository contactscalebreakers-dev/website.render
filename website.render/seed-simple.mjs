import postgres from "postgres";
import * as dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const client = postgres(connectionString);

async function seed() {
  console.log("🌱 Seeding database...");
  
  try {
    // Portfolio items
    const portfolio1 = crypto.randomUUID();
    await client`
      INSERT INTO "portfolioItems" (id, title, description, category, "imageUrl")
      VALUES (
        ${portfolio1},
        'Street Art Mural - Brisbane CBD',
        'Large-scale mural featuring abstract geometric patterns and local wildlife',
        'mural',
        'https://placehold.co/600x400/3b82f6/ffffff?text=Mural+1'
      )
    `;
    console.log("✓ Added portfolio: Street Art Mural");

    const portfolio2 = crypto.randomUUID();
    await client`
      INSERT INTO "portfolioItems" (id, title, description, category, "imageUrl")
      VALUES (
        ${portfolio2},
        '3D Character Model - Cyber Punk Warrior',
        'High-poly 3D character with detailed textures and rigging',
        '3d-model',
        'https://placehold.co/600x400/3b82f6/ffffff?text=3D+Model+1'
      )
    `;
    console.log("✓ Added portfolio: 3D Character Model");

    // Products
    const product1 = crypto.randomUUID();
    await client`
      INSERT INTO products (id, name, description, category, price, stock, "isOneOfOne", "imageUrl")
      VALUES (
        ${product1},
        'Lizard Painting - Original Canvas',
        'Hand-painted lizard artwork on canvas, 60x80cm',
        'canvas',
        '450',
        '1',
        'true',
        'https://placehold.co/600x400/10b981/ffffff?text=Lizard+Painting'
      )
    `;
    console.log("✓ Added product: Lizard Painting");

    const product2 = crypto.randomUUID();
    await client`
      INSERT INTO products (id, name, description, category, price, stock, "isOneOfOne", "imageUrl")
      VALUES (
        ${product2},
        'Custom 3D Model Package',
        'Personalized 3D character or object modeling service',
        '3d-model',
        '300',
        '10',
        'false',
        'https://placehold.co/600x400/3b82f6/ffffff?text=3D+Service'
      )
    `;
    console.log("✓ Added product: Custom 3D Model Package");

    // Workshop
    const workshop1 = crypto.randomUUID();
    await client`
      INSERT INTO workshops (id, title, description, date, time, location, price, capacity, "imageUrl")
      VALUES (
        ${workshop1},
        'Street Art Basics Workshop',
        'Learn fundamental street art techniques and styles',
        '2025-01-15'::timestamp,
        '10:00 AM',
        'Brisbane Workshop Space',
        '$120',
        '12',
        'https://placehold.co/600x400/f59e0b/ffffff?text=Workshop+1'
      )
    `;
    console.log("✓ Added workshop: Street Art Basics");

    console.log("\n✨ Seeding complete!");
    await client.end();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    await client.end();
    process.exit(1);
  }
}

seed().catch(console.error);
