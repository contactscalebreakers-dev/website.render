import postgres from 'postgres';

const sql = postgres('postgresql://postgres:deex1er.!!@db.wbufsbofxkwdgpkiuiut.supabase.co:5432/postgres');

async function deleteOldWorkshop() {
  try {
    await sql`DELETE FROM workshops WHERE id = 'a399d8c5-4216-4c73-bf8c-d407d3627bf2'`;
    console.log('✅ Deleted old Street Art Basics Workshop ($120)');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

deleteOldWorkshop();
