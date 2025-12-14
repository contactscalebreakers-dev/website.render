import postgres from 'postgres';
import crypto from 'crypto';

const sql = postgres('postgresql://postgres:deex1er.!!@db.wbufsbofxkwdgpkiuiut.supabase.co:5432/postgres');

async function addWorkshops() {
  try {
    console.log('\nAdding 6 workshops to database...\n');
    
    const workshops = [
      {
        id: crypto.randomUUID(),
        title: 'Designer Toy Sculpting Basics',
        description: 'Learn the fundamentals of creating your own designer toy figures. We\'ll cover sculpting techniques, material selection, and finishing touches. Perfect for beginners who want to start their journey into the world of designer toys.',
        date: new Date('2024-12-21 14:00:00'),
        time: '2:00 PM',
        location: 'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
        price: '85',
        capacity: '23',
        imageUrl: '/workshops/designer-toy.webp'
      },
      {
        id: crypto.randomUUID(),
        title: 'Street Art & Legal Graffiti Techniques',
        description: 'Master the art of legal graffiti and street art techniques. Learn spray can control, stenciling, and creating bold urban-inspired designs. All skill levels welcome!',
        date: new Date('2025-01-04 14:00:00'),
        time: '2:00 PM',
        location: 'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
        price: '75',
        capacity: '23',
        imageUrl: '/workshops/street-art.webp'
      },
      {
        id: crypto.randomUUID(),
        title: 'Diorama Building Workshop',
        description: 'Create stunning miniature scenes and dioramas. Learn weathering techniques, scene composition, and how to bring your creative vision to life in a small-scale environment.',
        date: new Date('2025-01-18 14:00:00'),
        time: '2:00 PM',
        location: 'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
        price: '90',
        capacity: '23',
        imageUrl: '/workshops/diorama.webp'
      },
      {
        id: crypto.randomUUID(),
        title: '3D Model Painting & Detailing',
        description: 'Take your 3D printed or toy models to the next level. Learn professional painting techniques, weathering, and detailing to make your pieces pop. Bring your own model or use ours!',
        date: new Date('2025-02-01 14:00:00'),
        time: '2:00 PM',
        location: 'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
        price: '80',
        capacity: '23',
        imageUrl: '/workshops/3d-painting.webp'
      },
      {
        id: crypto.randomUUID(),
        title: 'Urban Canvas Art Session',
        description: 'Express yourself on canvas using urban art techniques. Mix traditional painting with street art aesthetics to create unique pieces you\'ll be proud to hang.',
        date: new Date('2025-02-15 14:00:00'),
        time: '2:00 PM',
        location: 'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
        price: '70',
        capacity: '23',
        imageUrl: '/workshops/canvas-art.webp'
      },
      {
        id: crypto.randomUUID(),
        title: 'Custom Character Design Workshop',
        description: 'Design and create your own unique character from concept to finished product. Learn character design principles, sketching, and basic sculpting to bring your vision to life.',
        date: new Date('2025-03-01 14:00:00'),
        time: '2:00 PM',
        location: 'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
        price: '95',
        capacity: '23',
        imageUrl: '/workshops/character-design.webp'
      }
    ];

    for (const workshop of workshops) {
      await sql`
        INSERT INTO workshops ${sql(workshop)}
      `;
      console.log(`✅ Added: ${workshop.title}`);
    }

    console.log('\n✨ All 6 workshops added successfully!\n');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

addWorkshops();
