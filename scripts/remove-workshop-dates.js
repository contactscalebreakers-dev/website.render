import postgres from 'postgres';

const sql = postgres('postgresql://postgres:deex1er.!!@db.wbufsbofxkwdgpkiuiut.supabase.co:5432/postgres');

async function removeDates() {
  try {
    console.log('\nSetting workshops to "TBA" status...\n');
    
    // Set all workshop dates to far future (indicates "not scheduled yet")
    // Use 2099-01-01 as a placeholder for "TBA"
    await sql`UPDATE workshops SET date = '2099-01-01', time = 'TBA'`;
    
    console.log('✅ All workshop dates set to TBA!\n');
    
    // Verify
    const workshops = await sql`SELECT id, title, date, time, price FROM workshops ORDER BY title`;
    console.log('===== UPDATED WORKSHOPS =====');
    workshops.forEach((w, i) => {
      console.log(`${i + 1}. ${w.title}`);
      console.log(`   Date: TBA`);
      console.log(`   Time: ${w.time}`);
      console.log(`   Price: $${w.price}\n`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

removeDates();
