import postgres from 'postgres';

const sql = postgres('postgresql://postgres:deex1er.!!@db.wbufsbofxkwdgpkiuiut.supabase.co:5432/postgres');

async function checkWorkshops() {
  try {
    const rows = await sql`SELECT * FROM workshops ORDER BY date`;
    console.log('\n===== WORKSHOPS IN DATABASE =====');
    console.log(`Found ${rows.length} workshops:\n`);
    rows.forEach((row, i) => {
      console.log(`${i + 1}. ${row.title}`);
      console.log(`   ID: ${row.id}`);
      console.log(`   Date: ${row.date}`);
      console.log(`   Price: $${row.price}`);
      console.log('');
    });
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkWorkshops();
