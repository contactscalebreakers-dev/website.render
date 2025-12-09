import postgres from 'postgres';

const sql = postgres('postgresql://postgres:deex1er.%21%21@db.wbufsbofxkwdgpkiuiut.supabase.co:5432/postgres');

try {
  const products = await sql`SELECT COUNT(*) as count FROM products`;
  console.log('✅ Products in DB:', products[0].count);
  
  const portfolio = await sql`SELECT COUNT(*) as count FROM "portfolioItems"`;
  console.log('✅ Portfolio items:', portfolio[0].count);
  
  const workshops = await sql`SELECT COUNT(*) as count FROM workshops`;
  console.log('✅ Workshops:', workshops[0].count);
} catch (err) {
  console.error('❌ Database error:', err.message);
} finally {
  await sql.end();
}
