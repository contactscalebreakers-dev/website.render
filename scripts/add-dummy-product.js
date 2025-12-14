import postgres from 'postgres';
import crypto from 'crypto';

const sql = postgres('postgresql://postgres:deex1er.!!@db.wbufsbofxkwdgpkiuiut.supabase.co:5432/postgres');

async function addDummyProduct() {
  try {
    const product = {
      id: crypto.randomUUID(),
      name: 'Limited Edition Street Fighter Figure',
      description: 'Hand-painted designer toy inspired by urban street art culture. This unique piece features intricate details, weathered finishes, and comes with a custom display base. Each figure is individually crafted and signed.',
      category: '3d-model',
      price: '450',
      stock: '1',
      imageUrl: '/products/street-fighter-figure.webp',
      isOneOfOne: 'true',
      createdAt: new Date()
    };

    await sql`INSERT INTO products ${sql(product)}`;
    
    console.log('\n✅ Dummy product created!\n');
    console.log('Product Details:');
    console.log(`Name: ${product.name}`);
    console.log(`Price: $${product.price}`);
    console.log(`Category: ${product.category}`);
    console.log(`Stock: ${product.stock}`);
    console.log(`One of One: ${product.isOneOfOne}`);
    console.log(`\nYou can edit this in the admin panel or directly in the database.`);
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

addDummyProduct();
