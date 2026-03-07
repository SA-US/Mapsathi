const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedReviewCategories() {
  try {
    // POI Categories
    await prisma.reviewCategory.upsert({
      where: { id: 'poi-accessibility' },
      update: {},
      create: {
        id: 'poi-accessibility',
        name: 'Accessibility',
        entityType: 'poi',
        weight: 1.5
      }
    });

    await prisma.reviewCategory.upsert({
      where: { id: 'poi-cleanliness' },
      update: {},
      create: {
        id: 'poi-cleanliness',
        name: 'Cleanliness',
        entityType: 'poi',
        weight: 1.2
      }
    });

    await prisma.reviewCategory.upsert({
      where: { id: 'poi-value' },
      update: {},
      create: {
        id: 'poi-value',
        name: 'Value for Money',
        entityType: 'poi',
        weight: 1.3
      }
    });

    await prisma.reviewCategory.upsert({
      where: { id: 'poi-safety' },
      update: {},
      create: {
        id: 'poi-safety',
        name: 'Safety',
        entityType: 'poi',
        weight: 1.4
      }
    });

    await prisma.reviewCategory.upsert({
      where: { id: 'poi-experience' },
      update: {},
      create: {
        id: 'poi-experience',
        name: 'Overall Experience',
        entityType: 'poi',
        weight: 1.0
      }
    });

    // Restaurant Categories
    await prisma.reviewCategory.upsert({
      where: { id: 'restaurant-food' },
      update: {},
      create: {
        id: 'restaurant-food',
        name: 'Food Quality',
        entityType: 'restaurant',
        weight: 1.5
      }
    });

    await prisma.reviewCategory.upsert({
      where: { id: 'restaurant-service' },
      update: {},
      create: {
        id: 'restaurant-service',
        name: 'Service',
        entityType: 'restaurant',
        weight: 1.3
      }
    });

    await prisma.reviewCategory.upsert({
      where: { id: 'restaurant-ambiance' },
      update: {},
      create: {
        id: 'restaurant-ambiance',
        name: 'Ambiance',
        entityType: 'restaurant',
        weight: 1.1
      }
    });

    await prisma.reviewCategory.upsert({
      where: { id: 'restaurant-hygiene' },
      update: {},
      create: {
        id: 'restaurant-hygiene',
        name: 'Hygiene',
        entityType: 'restaurant',
        weight: 1.4
      }
    });

    // Hotel Categories
    await prisma.reviewCategory.upsert({
      where: { id: 'hotel-cleanliness' },
      update: {},
      create: {
        id: 'hotel-cleanliness',
        name: 'Cleanliness',
        entityType: 'hotel',
        weight: 1.5
      }
    });

    await prisma.reviewCategory.upsert({
      where: { id: 'hotel-staff' },
      update: {},
      create: {
        id: 'hotel-staff',
        name: 'Staff Service',
        entityType: 'hotel',
        weight: 1.3
      }
    });

    await prisma.reviewCategory.upsert({
      where: { id: 'hotel-comfort' },
      update: {},
      create: {
        id: 'hotel-comfort',
        name: 'Comfort',
        entityType: 'hotel',
        weight: 1.2
      }
    });

    // Emergency Service Categories
    await prisma.reviewCategory.upsert({
      where: { id: 'emergency-response' },
      update: {},
      create: {
        id: 'emergency-response',
        name: 'Response Time',
        entityType: 'emergency_service',
        weight: 1.8
      }
    });

    await prisma.reviewCategory.upsert({
      where: { id: 'emergency-professionalism' },
      update: {},
      create: {
        id: 'emergency-professionalism',
        name: 'Professionalism',
        entityType: 'emergency_service',
        weight: 1.5
      }
    });

    await prisma.reviewCategory.upsert({
      where: { id: 'emergency-effectiveness' },
      update: {},
      create: {
        id: 'emergency-effectiveness',
        name: 'Effectiveness',
        entityType: 'emergency_service',
        weight: 1.6
      }
    });

    console.log('✅ Review categories seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding review categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedReviewCategories();
