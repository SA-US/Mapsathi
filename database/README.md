# MapSathi Database Seeding

This directory contains comprehensive dummy data for the MapSathi travel planning application. The data includes realistic destinations, activities, accommodations, and sample itineraries across multiple Indian locations.

## 📁 Files Overview

- **`seed-itinerary-data.js`** - Contains all dummy data (destinations, activities, itineraries)
- **`seed.js`** - Database seeding script using Prisma
- **`README.md`** - This file with instructions

## 🌍 Destinations Included

### Major Indian Destinations

1. **Jaipur, Rajasthan** - The Pink City
   - 20+ activities across 6 categories
   - Heritage forts, palaces, cultural experiences
   - Traditional Rajasthani cuisine and shopping

2. **Udaipur, Rajasthan** - City of Lakes
   - Lakes, palaces, romantic experiences
   - Boat rides, cultural shows
   - Luxury heritage hotels

3. **Goa** - Beach Paradise
   - Beaches, nightlife, Portuguese heritage
   - Water sports, casinos, beach shacks
   - Adventure activities and relaxation

4. **Kerala** - God's Own Country
   - Backwaters, beaches, hill stations
   - Houseboats, tea plantations, wildlife
   - Ayurveda and cultural experiences

5. **Manali, Himachal Pradesh** - Hill Station
   - Snow activities, mountain views
   - Adventure sports, temples
   - Romantic getaways

6. **Rishikesh, Uttarakhand** - Yoga Capital
   - Spiritual experiences, adventure sports
   - Ganga ghats, temples, rafting
   - Yoga and meditation centers

## 🎯 Activity Categories

Each destination includes activities in these categories:

- **Sightseeing** - Historical monuments, forts, palaces
- **Dining** - Restaurants, local cuisine, food experiences
- **Shopping** - Markets, handicrafts, souvenirs
- **Culture** - Cultural shows, performances, museums
- **Adventure** - Sports, trekking, thrilling activities
- **Nature** - Gardens, parks, natural attractions
- **Beaches** - Beach activities, water sports
- **Backwaters** - Boat rides, water experiences
- **Hill Stations** - Mountain experiences, scenic views

## 📊 Data Statistics

- **6 Destinations** across India
- **100+ Activities** with detailed information
- **30+ Accommodations** from budget to luxury
- **20+ Transport options** for local travel
- **3 Sample Itineraries** for different preferences
- **Realistic Pricing** in Indian Rupees
- **Time Slots** for activity scheduling
- **Ratings & Reviews** for authenticity
- **Tips & Highlights** for better user experience

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate
```

### 3. Seed the Database

```bash
# Seed all dummy data
npm run db:seed
```

### 4. View the Data

```bash
# Open Prisma Studio to view data
npm run db:studio
```

## 📱 Testing the Data

### Test Page

Visit `/Pages/test-dummy-data` to explore all the seeded data:

1. **Browse Destinations** - View all destinations with search and filtering
2. **Explore Activities** - See activities by category for each destination
3. **Check Accommodations** - View accommodation options with pricing
4. **Transport Options** - See local transport choices
5. **Sample Itineraries** - Explore pre-built trip plans

### Manual Testing Flow

1. **Trip Planner** - Test destination selection and activity planning
2. **Customization** - Test budget and preference-based customization
3. **Itinerary Generation** - Verify realistic itinerary creation
4. **Map Integration** - Check location markers and routing
5. **Cost Calculation** - Verify accurate cost calculations

## 🏗️ Data Structure

### Destination Schema

```javascript
{
  id: "unique-id",
  name: "Destination Name",
  state: "State Name",
  country: "India",
  description: "Detailed description",
  bestTimeToVisit: "October to March",
  averageDuration: "2-3 days",
  coordinates: [latitude, longitude],
  popularFor: ["heritage", "culture", "food"],
  budget: {
    budget: { min: 5000, max: 10000 },
    moderate: { min: 10000, max: 20000 },
    premium: { min: 20000, max: 35000 },
    luxury: { min: 35000, max: 50000 }
  },
  activities: {
    sightseeing: [...],
    dining: [...],
    shopping: [...],
    culture: [...],
    adventure: [...],
    nature: [...]
  },
  accommodation: [...],
  transport: [...]
}
```

### Activity Schema

```javascript
{
  id: "unique-activity-id",
  name: "Activity Name",
  description: "Detailed description",
  duration: "2 hours",
  cost: 500,
  timeSlots: ["9:00 AM", "10:00 AM", "2:00 PM"],
  highlights: ["Highlight 1", "Highlight 2"],
  coordinates: [latitude, longitude],
  rating: 4.5,
  tips: "Helpful tips for visitors"
}
```

### Itinerary Schema

```javascript
{
  id: "unique-itinerary-id",
  destination: "destination-id",
  duration: "3 days",
  travelers: "Couple",
  budget: "moderate",
  interests: ["sightseeing", "culture"],
  title: "Trip Title",
  description: "Trip description",
  days: [
    {
      day: 1,
      title: "Day 1 Title",
      theme: "Day Theme",
      activities: [...]
    }
  ],
  accommodation: {...},
  transport: {...},
  totalCost: 15000
}
```

## 🔧 Customization

### Adding New Destinations

1. Add destination data to `seed-itinerary-data.js`
2. Include activities, accommodation, and transport
3. Update the seeding script if needed
4. Run `npm run db:seed` to update database

### Modifying Activities

1. Edit activity details in the destination data
2. Update pricing, timing, or descriptions
3. Re-seed the database

### Budget Adjustments

1. Update budget ranges in destination data
2. Modify accommodation and transport pricing
3. Test cost calculations

## 🎨 Realistic Features

### Authentic Indian Experiences

- **Cultural Activities** - Traditional dance, music, festivals
- **Local Cuisine** - Regional specialties, dining experiences
- **Historical Sites** - Forts, palaces, monuments with rich history
- **Shopping** - Local markets, handicrafts, traditional items
- **Transportation** - Auto-rickshaws, local trains, rental options

### Realistic Pricing

- **Budget Options** - Hostels, street food, public transport
- **Moderate Options** - Mid-range hotels, restaurants, private cars
- **Premium Options** - Luxury hotels, fine dining, premium transport
- **Luxury Options** - Heritage hotels, gourmet dining, luxury vehicles

### Practical Details

- **Time Slots** - Realistic opening hours and availability
- **Duration** - Actual time required for activities
- **Tips** - Helpful advice for visitors
- **Ratings** - Authentic review scores
- **Highlights** - Key features of each activity

## 🧪 Testing Scenarios

### User Personas

1. **Budget Traveler** - Looking for affordable options
2. **Luxury Seeker** - Preferring premium experiences
3. **Adventure Enthusiast** - Seeking thrilling activities
4. **Cultural Explorer** - Interested in heritage and traditions
5. **Family Vacationer** - Kid-friendly activities and accommodations

### Test Cases

1. **Destination Search** - Find destinations by interests
2. **Budget Filtering** - Filter by budget range
3. **Activity Selection** - Choose activities by category
4. **Customization** - Modify preferences and see updates
5. **Cost Calculation** - Verify accurate total costs
6. **Map Integration** - Check location accuracy

## 📈 Performance Considerations

- **Indexed Queries** - Database properly indexed for search
- **Caching** - Frequently accessed data cached
- **Pagination** - Large datasets paginated
- **Lazy Loading** - Activities loaded on demand
- **Optimized Queries** - Efficient database queries

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection** - Check DATABASE_URL in .env
2. **Prisma Client** - Run `npm run db:generate`
3. **Migration Conflicts** - Reset database if needed
4. **Missing Data** - Verify data structure in seed file

### Reset Database

```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Re-seed data
npm run db:seed
```

## 📞 Support

For issues with the dummy data:

1. Check the test page at `/Pages/test-dummy-data`
2. Verify database connection and migrations
3. Review the data structure in seed files
4. Test individual components separately

## 🔄 Updates

To update the dummy data:

1. Modify `seed-itinerary-data.js`
2. Update Prisma schema if needed
3. Run migrations: `npm run db:migrate`
4. Re-seed: `npm run db:seed`
5. Test with the test page

This comprehensive dummy data provides a realistic foundation for testing and demonstrating the MapSathi travel planning application! 🌍✈️
