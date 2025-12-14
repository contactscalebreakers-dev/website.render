#!/usr/bin/env node
/**
 * Seed script for production database
 * Usage: DATABASE_URL="your-production-url" node seed-production.mjs
 */

import postgres from 'postgres';
import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file (try .env first, then .env.txt)
dotenv.config({ path: path.resolve(__dirname, '.env') });
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: path.resolve(__dirname, '.env.txt') });
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL environment variable is required');
  console.log('\nUsage:');
  console.log('  DATABASE_URL="postgresql://..." node seed-production.mjs');
  console.log('\nOr set it in your environment:');
  console.log('  export DATABASE_URL="postgresql://..."');
  console.log('  node seed-production.mjs');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });

async function seed() {
  console.log('🌱 Seeding production database...\n');

  try {
    // Check existing data
    const existingWorkshops = await client`SELECT COUNT(*) as count FROM workshops`;
    const existingProducts = await client`SELECT COUNT(*) as count FROM products`;
    
    console.log(`📊 Current database state:`);
    console.log(`   Workshops: ${existingWorkshops[0].count}`);
    console.log(`   Products: ${existingProducts[0].count}\n`);

    // Seed Workshops
    console.log('📚 Adding workshops...');
    const workshopData = [
      {
        id: crypto.randomUUID(),
        title: 'Designer Toy Sculpting Basics',
        description: 'Learn the fundamentals of creating your own designer toy figures. We\'ll cover sculpting techniques, material selection, and finishing touches. Perfect for beginners who want to start their journey into the world of designer toys.',
        date: new Date('2024-12-21T14:00:00Z'),
        time: '2:00 PM',
        location: 'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
        price: '15',
        capacity: '23',
        imageUrl: '/workshops/designer-toy.webp'
      },
      {
        id: crypto.randomUUID(),
        title: 'Street Art & Legal Graffiti Techniques',
        description: 'Master the art of legal graffiti and street art techniques. Learn spray can control, stenciling, and creating bold urban-inspired designs. All skill levels welcome!',
        date: new Date('2025-01-04T14:00:00Z'),
        time: '2:00 PM',
        location: 'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
        price: '15',
        capacity: '23',
        imageUrl: '/workshops/street-art.webp'
      },
      {
        id: crypto.randomUUID(),
        title: 'Diorama Building Workshop',
        description: 'Create stunning miniature scenes and dioramas. Learn weathering techniques, scene composition, and how to bring your creative vision to life in a small-scale environment.',
        date: new Date('2025-01-18T14:00:00Z'),
        time: '2:00 PM',
        location: 'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
        price: '15',
        capacity: '23',
        imageUrl: '/workshops/diorama.webp'
      },
    ];

    for (const workshop of workshopData) {
      try {
        await client`
          INSERT INTO workshops (id, title, description, date, time, location, price, capacity, "imageUrl")
          VALUES (${workshop.id}, ${workshop.title}, ${workshop.description}, ${workshop.date}, ${workshop.time}, ${workshop.location}, ${workshop.price}, ${workshop.capacity}, ${workshop.imageUrl})
          ON CONFLICT (id) DO NOTHING
        `;
        console.log(`  ✓ ${workshop.title}`);
      } catch (error) {
        console.log(`  ⚠ Skipped: ${workshop.title} (${error.message})`);
      }
    }

    // Seed Products
    console.log('\n🎨 Adding products...');
    const productData = [
      {
        id: crypto.randomUUID(),
        name: 'Custom 3D Character Model',
        description: 'Personalized 3D character design and modeling. Perfect for gaming, animation, or 3D printing. Includes base mesh, textures, and source files.',
        category: '3d-model',
        price: '350',
        stock: '5',
        imageUrl: '/portfolio-character.webp',
        isOneOfOne: 'false',
      },
      {
        id: crypto.randomUUID(),
        name: 'Original Canvas Painting - Urban Vibes',
        description: 'Hand-painted original artwork on canvas. 60x80cm. One of a kind piece featuring Brisbane street art inspired design.',
        category: 'canvas',
        price: '450',
        stock: '1',
        imageUrl: '/portfolio-canvas.webp',
        isOneOfOne: 'true',
      },
      {
        id: crypto.randomUUID(),
        name: 'Mini Diorama - Street Scene',
        description: 'Detailed miniature street scene diorama. Hand-crafted with mixed media. Approximately 20x15cm base.',
        category: 'diorama',
        price: '280',
        stock: '3',
        imageUrl: '/portfolio-street-art.webp',
        isOneOfOne: 'false',
      },
    ];

    for (const product of productData) {
      try {
        await client`
          INSERT INTO products (id, name, description, category, price, stock, "isOneOfOne", "imageUrl")
          VALUES (${product.id}, ${product.name}, ${product.description}, ${product.category}, ${product.price}, ${product.stock}, ${product.isOneOfOne}, ${product.imageUrl})
          ON CONFLICT (id) DO NOTHING
        `;
        console.log(`  ✓ ${product.name}`);
      } catch (error) {
        console.log(`  ⚠ Skipped: ${product.name} (${error.message})`);
      }
    }

    // Seed Portfolio Items
    console.log('\n🖼️  Adding portfolio items...');
    const portfolioData = [
      {
        id: crypto.randomUUID(),
        title: 'Urban Street Art - Hi There',
        description: 'Creative street art mural featuring flowing calligraphy and artistic elements. A vibrant piece that brings life to urban spaces.',
        category: 'mural',
        imageUrl: '/portfolio-hithere.webp',
      },
      {
        id: crypto.randomUUID(),
        title: 'Character Design - Spray Paint Bottle',
        description: 'Original character design featuring a personified spray paint bottle with expressive features. Mixed media artwork combining digital and traditional techniques.',
        category: '3d-model',
        imageUrl: '/portfolio-character.png',
      },
      {
        id: crypto.randomUUID(),
        title: 'Abstract Canvas - Neon Energy',
        description: 'Vibrant abstract canvas with bold geometric shapes and neon colors. A dynamic piece exploring the intersection of street art and fine art.',
        category: 'canvas',
        imageUrl: '/portfolio-canvas.webp',
      },
    ];

    for (const item of portfolioData) {
      try {
        await client`
          INSERT INTO "portfolioItems" (id, title, description, category, "imageUrl")
          VALUES (${item.id}, ${item.title}, ${item.description}, ${item.category}, ${item.imageUrl})
          ON CONFLICT (id) DO NOTHING
        `;
        console.log(`  ✓ ${item.title}`);
      } catch (error) {
        console.log(`  ⚠ Skipped: ${item.title} (${error.message})`);
      }
    }

    console.log('\n✨ Seeding complete!');
    console.log('\n📊 Final database state:');
    const finalWorkshops = await client`SELECT COUNT(*) as count FROM workshops`;
    const finalProducts = await client`SELECT COUNT(*) as count FROM products`;
    const finalPortfolio = await client`SELECT COUNT(*) as count FROM "portfolioItems"`;
    console.log(`   Workshops: ${finalWorkshops[0].count}`);
    console.log(`   Products: ${finalProducts[0].count}`);
    console.log(`   Portfolio Items: ${finalPortfolio[0].count}\n`);

    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    await client.end();
    process.exit(1);
  }
}

seed();
