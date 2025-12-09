-- Seed 6 Scale Breakers Workshop Events
-- Run this against your Supabase database

DELETE FROM workshops WHERE id IN (
  'workshop-001',
  'workshop-002', 
  'workshop-003',
  'workshop-004',
  'workshop-005',
  'workshop-006'
);

INSERT INTO workshops (id, title, description, date, time, location, price, capacity, "imageUrl", "qrCode", "createdAt")
VALUES
  (
    'workshop-001',
    'Designer Toy Sculpting Basics',
    'Learn the fundamentals of creating your own designer toy figures. We''ll cover sculpting techniques, material selection, and finishing touches. Perfect for beginners who want to start their journey into the world of designer toys.',
    '2024-12-21 14:00:00',
    '2:00 PM',
    'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
    '85',
    '23',
    '/workshops/designer-toy.jpg',
    NULL,
    NOW()
  ),
  (
    'workshop-002',
    'Street Art & Legal Graffiti Techniques',
    'Master the art of legal graffiti and street art techniques. Learn spray can control, stenciling, and creating bold urban-inspired designs. All skill levels welcome!',
    '2025-01-04 14:00:00',
    '2:00 PM',
    'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
    '75',
    '23',
    '/workshops/street-art.jpg',
    NULL,
    NOW()
  ),
  (
    'workshop-003',
    'Diorama Building Workshop',
    'Create stunning miniature scenes and dioramas. Learn weathering techniques, scene composition, and how to bring your creative vision to life in a small-scale environment.',
    '2025-01-18 14:00:00',
    '2:00 PM',
    'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
    '90',
    '23',
    '/workshops/diorama.jpg',
    NULL,
    NOW()
  ),
  (
    'workshop-004',
    '3D Model Painting & Detailing',
    'Take your 3D printed or toy models to the next level. Learn professional painting techniques, weathering, and detailing to make your pieces pop. Bring your own model or use ours!',
    '2025-02-01 14:00:00',
    '2:00 PM',
    'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
    '80',
    '23',
    '/workshops/3d-painting.jpg',
    NULL,
    NOW()
  ),
  (
    'workshop-005',
    'Urban Canvas Art Session',
    'Express yourself on canvas using urban art techniques. Mix traditional painting with street art aesthetics to create unique pieces you''ll be proud to hang.',
    '2025-02-15 14:00:00',
    '2:00 PM',
    'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
    '70',
    '23',
    '/workshops/canvas-art.jpg',
    NULL,
    NOW()
  ),
  (
    'workshop-006',
    'Custom Character Design Workshop',
    'Design and create your own unique character from concept to finished product. Learn character design principles, sketching, and basic sculpting to bring your vision to life.',
    '2025-03-01 14:00:00',
    '2:00 PM',
    'B.Y.O. - 2-4 Edmundstone Street, West End, Brisbane',
    '95',
    '23',
    '/workshops/character-design.jpg',
    NULL,
    NOW()
  );
