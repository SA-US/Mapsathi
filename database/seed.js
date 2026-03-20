// Database seeding script for MapSathi
// This script will populate the database with realistic travel data

const { PrismaClient } = require('@prisma/client');
const { destinations, sampleItineraries } = require('./seed-itinerary-data');

const prisma = new PrismaClient();

async function main() {
  console.log('🌍 Starting MapSathi database seeding...');
  
  try {
    // Clear existing data (optional - remove if you want to keep existing data)
    console.log('🧹 Cleaning existing data...');
    await prisma.activity.deleteMany();
    await prisma.destination.deleteMany();
    await prisma.itinerary.deleteMany();
    
    // Seed destinations
    console.log('📍 Seeding destinations...');
    for (const destination of destinations) {
      const createdDestination = await prisma.destination.create({
        data: {
          id: destination.id,
          name: destination.name,
          state: destination.state,
          country: destination.country,
          description: destination.description,
          bestTimeToVisit: destination.bestTimeToVisit,
          averageDuration: destination.averageDuration,
          coordinates: destination.coordinates,
          popularFor: destination.popularFor,
          budget: destination.budget,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      
      console.log(`✅ Created destination: ${createdDestination.name}`);
      
      // Seed activities for this destination
      console.log(`🎯 Seeding activities for ${createdDestination.name}...`);
      
      for (const [category, activities] of Object.entries(destination.activities)) {
        for (const activity of activities) {
          await prisma.activity.create({
            data: {
              id: activity.id,
              destinationId: createdDestination.id,
              name: activity.name,
              category: category,
              description: activity.description,
              duration: activity.duration,
              cost: activity.cost,
              timeSlots: activity.timeSlots,
              highlights: activity.highlights,
              coordinates: activity.coordinates,
              rating: activity.rating,
              tips: activity.tips,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          });
        }
      }
      
      console.log(`✅ Created activities for ${createdDestination.name}`);
    }
    
    // Seed sample itineraries
    console.log('📅 Seeding sample itineraries...');
    for (const itinerary of sampleItineraries) {
      const createdItinerary = await prisma.itinerary.create({
        data: {
          id: itinerary.id,
          destinationId: itinerary.destination,
          duration: itinerary.duration,
          travelers: itinerary.travelers,
          budget: itinerary.budget,
          interests: itinerary.interests,
          title: itinerary.title,
          description: itinerary.description,
          days: itinerary.days,
          accommodation: itinerary.accommodation,
          transport: itinerary.transport,
          totalCost: itinerary.totalCost,
          isSample: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      
      console.log(`✅ Created itinerary: ${createdItinerary.title}`);
    }
    
    // Create sample users for testing
    console.log('👥 Creating sample users...');
    const sampleUsers = [
      {
        email: 'test.user@example.com',
        name: 'Test User',
        preferences: {
          budget: 'moderate',
          interests: ['sightseeing', 'culture'],
          pace: 'moderate'
        }
      },
      {
        email: 'adventure.lover@example.com',
        name: 'Adventure Seeker',
        preferences: {
          budget: 'premium',
          interests: ['adventure', 'nature'],
          pace: 'packed'
        }
      },
      {
        email: 'family.vacation@example.com',
        name: 'Family Planner',
        preferences: {
          budget: 'moderate',
          interests: ['sightseeing', 'dining', 'nature'],
          pace: 'relaxed'
        }
      }
    ];
    
    for (const user of sampleUsers) {
      await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          preferences: user.preferences,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }
    
    console.log('✅ Created sample users');
    
    // Get statistics
    const destinationCount = await prisma.destination.count();
    const activityCount = await prisma.activity.count();
    const itineraryCount = await prisma.itinerary.count();
    const userCount = await prisma.user.count();
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Seeding Summary:');
    console.log(`- Destinations: ${destinationCount}`);
    console.log(`- Activities: ${activityCount}`);
    console.log(`- Sample Itineraries: ${itineraryCount}`);
    console.log(`- Sample Users: ${userCount}`);
    
    // Show sample data for verification
    console.log('\n🔍 Sample Data Verification:');
    const sampleDestination = await prisma.destination.findFirst({
      include: {
        activities: {
          take: 3
        }
      }
    });
    
    if (sampleDestination) {
      console.log(`\n📍 Sample Destination: ${sampleDestination.name}`);
      console.log(`   Activities: ${sampleDestination.activities.length}`);
      sampleDestination.activities.forEach(activity => {
        console.log(`   - ${activity.name} (${activity.category}) - ₹${activity.cost}`);
      });
    }
    
    const sampleItinerary = await prisma.itinerary.findFirst();
    if (sampleItinerary) {
      console.log(`\n📅 Sample Itinerary: ${sampleItinerary.title}`);
      console.log(`   Destination: ${sampleItinerary.destinationId}`);
      console.log(`   Duration: ${sampleItinerary.duration}`);
      console.log(`   Budget: ${sampleItinerary.budget}`);
      console.log(`   Total Cost: ₹${sampleItinerary.totalCost}`);
    }
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
