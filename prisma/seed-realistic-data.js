const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const realisticPOIs = [
  {
    id: 'india-gate-delhi',
    name: 'India Gate',
    type: 'poi',
    city: 'delhi',
    lat: 28.6139,
    lon: 77.2090,
    description: 'War memorial and iconic landmark'
  },
  {
    id: 'red-fort-delhi',
    name: 'Red Fort',
    type: 'poi',
    city: 'delhi',
    lat: 28.6562,
    lon: 77.2410,
    description: 'Historic Mughal fortress'
  },
  {
    id: 'taj-mahal-agra',
    name: 'Taj Mahal',
    type: 'poi',
    city: 'agra',
    lat: 27.1751,
    lon: 78.0421,
    description: 'Iconic marble mausoleum'
  }
];

const realisticUsers = [
  {
    id: 'user-1',
    email: 'rahul.sharma@email.com',
    name: 'Rahul Sharma',
    verified: true
  },
  {
    id: 'user-2',
    email: 'priya.patel@email.com',
    name: 'Priya Patel',
    verified: true
  }
];

const realisticReviews = [
  {
    userId: 'user-1',
    entityType: 'poi',
    entityId: 'india-gate-delhi',
    rating: 4.5,
    title: 'Amazing Historical Monument',
    content: 'India Gate is truly magnificent. The architecture is stunning and evening lighting makes it even more beautiful. The surrounding gardens are well-maintained and perfect for evening walks.',
    photos: ['/uploads/reviews/india-gate-1.jpg', '/uploads/reviews/india-gate-2.jpg']
  },
  {
    userId: 'user-2',
    entityType: 'poi',
    entityId: 'india-gate-delhi',
    rating: 3.5,
    title: 'Good but crowded',
    content: 'India Gate is worth visiting for its historical significance. However, it gets extremely crowded during weekends. Best to visit early morning or late evening.',
    photos: ['/uploads/reviews/india-gate-3.jpg']
  }
];

async function seedRealisticData() {
  try {
    console.log('🌱 Seeding realistic data...');

    // Seed users
    for (const user of realisticUsers) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: user,
        create: user
      });
    }

    // Seed reviews
    for (const review of realisticReviews) {
      await prisma.review.create({
        data: {
          ...review,
          photos: JSON.stringify(review.photos)
        }
      });
    }

    console.log('✅ Realistic data seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRealisticData();
