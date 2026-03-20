// Comprehensive dummy data for MapSathi itinerary planning
// This file contains realistic data for multiple destinations with various activities

const destinations = [
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    description: 'The Pink City - known for its royal palaces, forts, and vibrant culture',
    bestTimeToVisit: 'October to March',
    averageDuration: '2-3 days',
    budget: {
      budget: { min: 5000, max: 10000 },
      moderate: { min: 10000, max: 20000 },
      premium: { min: 20000, max: 35000 },
      luxury: { min: 35000, max: 50000 }
    },
    coordinates: [26.9124, 75.7873],
    popularFor: ['heritage', 'culture', 'food', 'shopping'],
    activities: {
      sightseeing: [
        {
          id: 'amber-fort',
          name: 'Amber Fort',
          description: 'Magnificent hilltop fort with elephant ride option',
          duration: '3 hours',
          cost: 500,
          timeSlots: ['8:00 AM', '9:00 AM', '10:00 AM'],
          highlights: ['Elephant Ride', 'Sheesh Mahal', 'Light Show'],
          coordinates: [26.9855, 75.8513],
          rating: 4.6,
          tips: 'Arrive early to avoid crowds, book elephant ride in advance'
        },
        {
          id: 'city-palace',
          name: 'City Palace',
          description: 'Royal residence with museum and courtyards',
          duration: '2 hours',
          cost: 300,
          timeSlots: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
          highlights: ['Museum', 'Chandra Mahal', 'Mubarak Mahal'],
          coordinates: [26.9257, 75.8236],
          rating: 4.4,
          tips: 'Hire a guide for historical insights'
        },
        {
          id: 'hawa-mahal',
          name: 'Hawa Mahal',
          description: 'Palace of Winds with intricate architecture',
          duration: '1 hour',
          cost: 200,
          timeSlots: ['9:00 AM', '11:00 AM', '4:00 PM'],
          highlights: ['953 Windows', 'Architectural Marvel', 'Photography'],
          coordinates: [26.9239, 75.8267],
          rating: 4.3,
          tips: 'Best viewed in morning light'
        },
        {
          id: 'jantar-mantar',
          name: 'Jantar Mantar',
          description: 'Ancient astronomical observatory',
          duration: '1.5 hours',
          cost: 150,
          timeSlots: ['10:00 AM', '11:30 AM', '2:30 PM'],
          highlights: ['World Heritage Site', 'Ancient Instruments', 'Astronomy'],
          coordinates: [26.9247, 75.8237],
          rating: 4.5,
          tips: 'Take a guide to understand the instruments'
        },
        {
          id: 'jal-mahal',
          name: 'Jal Mahal',
          description: 'Water Palace in the middle of Man Sagar Lake',
          duration: '1 hour',
          cost: 100,
          timeSlots: ['6:00 AM', '5:00 PM'],
          highlights: ['Lake View', 'Sunset Point', 'Photography'],
          coordinates: [26.9276, 75.8398],
          rating: 4.2,
          tips: 'Best during sunrise or sunset'
        },
        {
          id: 'nahargarh-fort',
          name: 'Nahargarh Fort',
          description: 'Sunset fort with panoramic city views',
          duration: '2 hours',
          cost: 200,
          timeSlots: ['4:00 PM', '5:00 PM', '6:00 PM'],
          highlights: ['Sunset Views', 'City Panorama', 'Restaurant'],
          coordinates: [26.9345, 75.7872],
          rating: 4.4,
          tips: 'Perfect for sunset photography'
        },
        {
          id: 'albert-hall',
          name: 'Albert Hall Museum',
          description: 'Art and history museum in Ram Niwas Garden',
          duration: '2 hours',
          cost: 100,
          timeSlots: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
          highlights: ['Art Collection', 'Egyptian Mummy', 'Architecture'],
          coordinates: [26.9234, 75.8210],
          rating: 4.1,
          tips: 'Combine with Ram Niwas Garden visit'
        }
      ],
      dining: [
        {
          id: 'chokhi-dhani',
          name: 'Chokhi Dhani',
          description: 'Traditional Rajasthani village experience with cultural performances',
          duration: '3 hours',
          cost: 800,
          timeSlots: ['6:00 PM', '7:00 PM', '8:00 PM'],
          highlights: ['Traditional Food', 'Cultural Show', 'Village Experience'],
          coordinates: [26.8456, 75.8260],
          rating: 4.5,
          tips: 'Book in advance, especially on weekends'
        },
        {
          id: 'suvarna-mahal',
          name: 'Suvarna Mahal - Rambagh Palace',
          description: 'Fine dining in royal ambiance',
          duration: '2 hours',
          cost: 2000,
          timeSlots: ['7:00 PM', '8:30 PM'],
          highlights: ['Royal Ambiance', 'Gourmet Cuisine', 'Live Music'],
          coordinates: [26.9257, 75.8236],
          rating: 4.7,
          tips: 'Dress code applies, reservations required'
        },
        {
          id: 'handi-restaurant',
          name: 'Handi Restaurant',
          description: 'Authentic Rajasthani cuisine',
          duration: '1.5 hours',
          cost: 600,
          timeSlots: ['12:00 PM', '1:00 PM', '2:00 PM', '8:00 PM', '9:00 PM'],
          highlights: ['Laal Maans', 'Dal Baati Churma', 'Traditional Thali'],
          coordinates: [26.9124, 75.7873],
          rating: 4.3,
          tips: 'Try their signature Laal Maans'
        },
        {
          id: 'masala-chowk',
          name: 'Masala Chowk',
          description: 'Food court with multiple local cuisines',
          duration: '1.5 hours',
          cost: 400,
          timeSlots: ['12:00 PM', '1:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
          highlights: ['Street Food', 'Multiple Cuisines', 'Affordable'],
          coordinates: [26.9239, 75.8267],
          rating: 4.2,
          tips: 'Great variety, try different stalls'
        },
        {
          id: '1135-ad',
          name: '1135 AD',
          description: 'Medieval themed restaurant with live entertainment',
          duration: '2 hours',
          cost: 1200,
          timeSlots: ['7:30 PM', '8:30 PM'],
          highlights: ['Medieval Theme', 'Live Entertainment', 'Theme Dinner'],
          coordinates: [26.9150, 75.8220],
          rating: 4.4,
          tips: 'Great for families with kids'
        }
      ],
      shopping: [
        {
          id: 'johari-bazaar',
          name: 'Johari Bazaar',
          description: 'Famous jewelry and gemstone market',
          duration: '2 hours',
          cost: 0,
          timeSlots: ['10:00 AM', '11:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Gemstones', 'Traditional Jewelry', 'Kundan Work'],
          coordinates: [26.9239, 75.8267],
          rating: 4.3,
          tips: 'Bargain is expected, verify authenticity'
        },
        {
          id: 'bapu-bazaar',
          name: 'Bapu Bazaar',
          description: 'Traditional clothes and souvenirs',
          duration: '2 hours',
          cost: 0,
          timeSlots: ['10:00 AM', '11:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Textiles', 'Souvenirs', 'Mojari Shoes'],
          coordinates: [26.9239, 75.8267],
          rating: 4.1,
          tips: 'Best for traditional Rajasthani items'
        },
        {
          id: 'tripolia-bazaar',
          name: 'Tripolia Bazaar',
          description: 'Traditional crafts and textiles',
          duration: '1.5 hours',
          cost: 0,
          timeSlots: ['10:00 AM', '11:00 AM', '4:00 PM'],
          highlights: ['Handicrafts', 'Textiles', 'Blue Pottery'],
          coordinates: [26.9239, 75.8267],
          rating: 4.0,
          tips: 'Good for blue pottery and handicrafts'
        },
        {
          id: 'anokhi-museum',
          name: 'Anokhi Museum of Hand Printing',
          description: 'Traditional block printing museum',
          duration: '1 hour',
          cost: 50,
          timeSlots: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
          highlights: ['Block Printing', 'Textile History', 'Craft Demonstration'],
          coordinates: [26.9457, 75.8198],
          rating: 4.2,
          tips: 'Combine with shopping at Anokhi store'
        }
      ],
      culture: [
        {
          id: 'rajasthan-cultural-show',
          name: 'Rajasthan Cultural Show',
          description: 'Traditional dance and music performances',
          duration: '2 hours',
          cost: 500,
          timeSlots: ['7:00 PM', '8:00 PM'],
          highlights: ['Ghoomar Dance', 'Puppet Show', 'Folk Music'],
          coordinates: [26.9150, 75.8220],
          rating: 4.3,
          tips: 'Great introduction to Rajasthani culture'
        },
        {
          id: 'puppet-show',
          name: 'Traditional Puppet Show',
          description: 'Rajasthani puppet performance',
          duration: '1 hour',
          cost: 200,
          timeSlots: ['6:00 PM', '7:00 PM', '8:00 PM'],
          highlights: ['Kathputli', 'Traditional Stories', 'Cultural Experience'],
          coordinates: [26.9239, 75.8267],
          rating: 4.1,
          tips: 'Kid-friendly, short and entertaining'
        },
        {
          id: 'folk-music-evening',
          name: 'Folk Music Evening',
          description: 'Live folk music performance',
          duration: '1.5 hours',
          cost: 300,
          timeSlots: ['7:30 PM', '9:00 PM'],
          highlights: ['Traditional Instruments', 'Folk Songs', 'Cultural Experience'],
          coordinates: [26.9150, 75.8220],
          rating: 4.2,
          tips: 'Intimate setting, authentic experience'
        }
      ],
      adventure: [
        {
          id: 'elephant-safari',
          name: 'Elephant Safari',
          description: 'Ride elephants through the forest',
          duration: '2 hours',
          cost: 1500,
          timeSlots: ['8:00 AM', '9:00 AM', '4:00 PM'],
          highlights: ['Elephant Ride', 'Forest Trail', 'Wildlife Viewing'],
          coordinates: [26.9855, 75.8513],
          rating: 4.6,
          tips: 'Book in advance, wear comfortable clothes'
        },
        {
          id: 'hot-air-balloon',
          name: 'Hot Air Balloon',
          description: 'Aerial view of the city at sunrise',
          duration: '3 hours',
          cost: 3000,
          timeSlots: ['5:30 AM', '6:00 AM'],
          highlights: ['Sunrise Flight', 'Aerial Views', 'Photography'],
          coordinates: [26.9124, 75.7873],
          rating: 4.8,
          tips: 'Weather dependent, book in advance'
        },
        {
          id: 'zip-line',
          name: 'Zip Line Adventure',
          description: 'Thrilling zip line experience',
          duration: '2 hours',
          cost: 2000,
          timeSlots: ['10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'],
          highlights: ['Adventure', 'Adrenaline Rush', 'Scenic Views'],
          coordinates: [26.9457, 75.8198],
          rating: 4.4,
          tips: 'Weight restrictions apply'
        }
      ],
      nature: [
        {
          id: 'central-park',
          name: 'Central Park',
          description: 'Morning walk in beautiful gardens',
          duration: '1 hour',
          cost: 0,
          timeSlots: ['6:00 AM', '7:00 AM', '5:00 PM', '6:00 PM'],
          highlights: ['Gardens', 'Morning Walk', 'Jogging Track'],
          coordinates: [26.9124, 75.7873],
          rating: 4.0,
          tips: 'Peaceful morning or evening walk'
        },
        {
          id: 'kanak-vrindavan',
          name: 'Kanak Vrindavan Gardens',
          description: 'Beautiful garden with fountains',
          duration: '1.5 hours',
          cost: 100,
          timeSlots: ['8:00 AM', '9:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Fountains', 'Gardens', 'Photography'],
          coordinates: [26.9457, 75.8198],
          rating: 4.2,
          tips: 'Best during morning hours'
        },
        {
          id: 'smriti-van',
          name: 'Smriti Van',
          description: 'Nature park with diverse flora',
          duration: '2 hours',
          cost: 50,
          timeSlots: ['7:00 AM', '8:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Nature Walk', 'Bird Watching', 'Flora'],
          coordinates: [26.9124, 75.7873],
          rating: 3.9,
          tips: 'Good for nature lovers'
        }
      ]
    },
    accommodation: [
      {
        id: 'rambagh-palace',
        name: 'Rambagh Palace',
        type: 'luxury',
        price: 15000,
        rating: 4.8,
        amenities: ['Spa', 'Pool', 'Restaurant', 'Bar', 'Garden', 'Gym'],
        coordinates: [26.9257, 75.8236],
        description: 'Former royal palace converted to luxury hotel'
      },
      {
        id: 'fairmont-jaipur',
        name: 'Fairmont Jaipur',
        type: 'premium',
        price: 8000,
        rating: 4.6,
        amenities: ['Spa', 'Pool', 'Restaurant', 'Bar', 'Business Center', 'Gym'],
        coordinates: [26.9457, 75.8198],
        description: 'Modern luxury with traditional architecture'
      },
      {
        id: 'hilton-jaipur',
        name: 'Hilton Jaipur',
        type: 'premium',
        price: 6000,
        rating: 4.5,
        amenities: ['Pool', 'Restaurant', 'Bar', 'Business Center', 'Gym'],
        coordinates: [26.9124, 75.7873],
        description: 'International standard with Indian hospitality'
      },
      {
        id: 'pearl-palace',
        name: 'Pearl Palace',
        type: 'moderate',
        price: 3000,
        rating: 4.3,
        amenities: ['Restaurant', 'WiFi', 'Parking', 'Room Service'],
        coordinates: [26.9239, 75.8267],
        description: 'Heritage hotel with traditional charm'
      },
      {
        id: 'zostel-jaipur',
        name: 'Zostel Jaipur',
        type: 'budget',
        price: 800,
        rating: 4.1,
        amenities: ['WiFi', 'Common Room', 'Lockers', 'Kitchen'],
        coordinates: [26.9150, 75.8220],
        description: 'Backpacker hostel with vibrant atmosphere'
      }
    ],
    transport: [
      {
        id: 'private-car',
        name: 'Private Car with Driver',
        type: 'private',
        cost: 2000,
        description: 'Comfortable AC car with experienced driver'
      },
      {
        id: 'app-cab',
        name: 'App-based Cab',
        type: 'app',
        cost: 800,
        description: 'Uber/Ola for local transportation'
      },
      {
        id: 'auto-rickshaw',
        name: 'Auto Rickshaw',
        type: 'auto',
        cost: 400,
        description: 'Traditional three-wheeler for short distances'
      },
      {
        id: 'bus-transport',
        name: 'Public Bus',
        type: 'public',
        cost: 200,
        description: 'Economical public transportation'
      },
      {
        id: 'rental-bike',
        name: 'Rental Bike/Scooter',
        type: 'rental',
        cost: 600,
        description: 'Freedom to explore at your own pace'
      }
    ]
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    description: 'The City of Lakes - known for its lakes, palaces, and romantic ambiance',
    bestTimeToVisit: 'September to March',
    averageDuration: '2-3 days',
    budget: {
      budget: { min: 6000, max: 12000 },
      moderate: { min: 12000, max: 25000 },
      premium: { min: 25000, max: 40000 },
      luxury: { min: 40000, max: 60000 }
    },
    coordinates: [24.5780, 73.6865],
    popularFor: ['lakes', 'romance', 'palaces', 'culture'],
    activities: {
      sightseeing: [
        {
          id: 'city-palace-udaipur',
          name: 'City Palace',
          description: 'Massive palace complex on Lake Pichola',
          duration: '3 hours',
          cost: 400,
          timeSlots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'],
          highlights: ['Crystal Gallery', 'Vintage Cars', 'Lake View'],
          coordinates: [24.5761, 73.6786],
          rating: 4.6,
          tips: 'Hire guide for historical context'
        },
        {
          id: 'lake-palace',
          name: 'Lake Palace Hotel',
          description: 'Floating palace on Lake Pichola',
          duration: '2 hours',
          cost: 800,
          timeSlots: ['10:00 AM', '11:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Lake View', 'Architecture', 'Photography'],
          coordinates: [24.5761, 73.6786],
          rating: 4.7,
          tips: 'View from outside, stay requires booking'
        },
        {
          id: 'saheliyon-ki-bari',
          name: 'Saheliyon Ki Bari',
          description: 'Garden of the Maidens',
          duration: '1.5 hours',
          cost: 150,
          timeSlots: ['8:00 AM', '9:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Fountains', 'Gardens', 'Marble Work'],
          coordinates: [24.5776, 73.6786],
          rating: 4.2,
          tips: 'Beautiful in morning light'
        },
        {
          id: 'monsoon-palace',
          name: 'Monsoon Palace',
          description: 'Hilltop palace with sunset views',
          duration: '2 hours',
          cost: 300,
          timeSlots: ['4:00 PM', '5:00 PM', '6:00 PM'],
          highlights: ['Sunset Views', 'City Panorama', 'Photography'],
          coordinates: [24.5761, 73.6786],
          rating: 4.5,
          tips: 'Best for sunset photography'
        }
      ],
      dining: [
        {
          id: 'ambrai-restaurant',
          name: 'Ambrai Restaurant',
          description: 'Fine dining with lake view',
          duration: '2 hours',
          cost: 1500,
          timeSlots: ['7:00 PM', '8:00 PM', '9:00 PM'],
          highlights: ['Lake View', 'Continental Cuisine', 'Romantic Setting'],
          coordinates: [24.5761, 73.6786],
          rating: 4.6,
          tips: 'Book window table for best view'
        },
        {
          id: 'lake-view-restaurant',
          name: 'Lake View Restaurant',
          description: 'Multi-cuisine with lake views',
          duration: '1.5 hours',
          cost: 800,
          timeSlots: ['12:00 PM', '1:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
          highlights: ['Lake View', 'Indian Cuisine', 'Family Friendly'],
          coordinates: [24.5761, 73.6786],
          rating: 4.3,
          tips: 'Good for families'
        }
      ],
      lakes: [
        {
          id: 'lake-pichola-boat',
          name: 'Lake Pichola Boat Ride',
          description: 'Scenic boat ride on Lake Pichola',
          duration: '1 hour',
          cost: 400,
          timeSlots: ['9:00 AM', '10:00 AM', '4:00 PM', '5:00 PM', '6:00 PM'],
          highlights: ['Scenic Views', 'Lake Palace', 'City Palace'],
          coordinates: [24.5761, 73.6786],
          rating: 4.5,
          tips: 'Sunset rides are most popular'
        },
        {
          id: 'fatehsagar-lake',
          name: 'Fateh Sagar Lake',
          description: 'Artificial lake with Nehru Island',
          duration: '1.5 hours',
          cost: 300,
          timeSlots: ['8:00 AM', '9:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Boat Ride', 'Nehru Garden', 'Scenic Views'],
          coordinates: [24.6053, 73.6896],
          rating: 4.3,
          tips: 'Less crowded than Lake Pichola'
        }
      ]
    }
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    country: 'India',
    description: 'Beach paradise known for its beaches, nightlife, and Portuguese heritage',
    bestTimeToVisit: 'November to February',
    averageDuration: '3-5 days',
    budget: {
      budget: { min: 8000, max: 15000 },
      moderate: { min: 15000, max: 30000 },
      premium: { min: 30000, max: 50000 },
      luxury: { min: 50000, max: 80000 }
    },
    coordinates: [15.2993, 74.1240],
    popularFor: ['beaches', 'nightlife', 'heritage', 'seafood'],
    activities: {
      beaches: [
        {
          id: 'baga-beach',
          name: 'Baga Beach',
          description: 'Popular beach with water sports',
          duration: '3 hours',
          cost: 500,
          timeSlots: ['9:00 AM', '10:00 AM', '3:00 PM', '4:00 PM'],
          highlights: ['Water Sports', 'Beach Shacks', 'Nightlife'],
          coordinates: [15.5559, 73.7568],
          rating: 4.3,
          tips: 'Great for water sports and nightlife'
        },
        {
          id: 'calangute-beach',
          name: 'Calangute Beach',
          description: 'Longest beach in North Goa',
          duration: '2 hours',
          cost: 300,
          timeSlots: ['8:00 AM', '9:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Beach Walk', 'Shacks', 'Water Sports'],
          coordinates: [15.5434, 73.7761],
          rating: 4.2,
          tips: 'Less crowded than Baga'
        },
        {
          id: 'palolem-beach',
          name: 'Palolem Beach',
          description: 'Scenic crescent-shaped beach',
          duration: '3 hours',
          cost: 400,
          timeSlots: ['8:00 AM', '9:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Scenic Beauty', 'Dolphin Watching', 'Beach Huts'],
          coordinates: [15.0083, 74.0223],
          rating: 4.6,
          tips: 'Beautiful sunset views'
        }
      ],
      heritage: [
        {
          id: 'old-goa-churches',
          name: 'Old Goa Churches',
          description: 'UNESCO World Heritage churches',
          duration: '3 hours',
          cost: 200,
          timeSlots: ['9:00 AM', '10:00 AM', '3:00 PM', '4:00 PM'],
          highlights: ['Basilica of Bom Jesus', 'Se Cathedral', 'Portuguese Architecture'],
          coordinates: [15.5022, 73.8222],
          rating: 4.5,
          tips: 'Plan half day for all churches'
        },
        {
          id: 'aguada-fort',
          name: 'Aguada Fort',
          description: '17th century Portuguese fort',
          duration: '2 hours',
          cost: 100,
          timeSlots: ['9:00 AM', '10:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Lighthouse', 'Sea Views', 'Historical Significance'],
          coordinates: [15.4806, 73.7958],
          rating: 4.3,
          tips: 'Great views of Arabian Sea'
        }
      ],
      nightlife: [
        {
          id: 'titos-lane',
          name: 'Tito\'s Lane',
          description: 'Famous nightlife hub',
          duration: '4 hours',
          cost: 2000,
          timeSlots: ['9:00 PM', '10:00 PM', '11:00 PM'],
          highlights: ['Nightclubs', 'Music', 'Dancing'],
          coordinates: [15.5559, 73.7568],
          rating: 4.2,
          tips: 'Popular with tourists, can be crowded'
        },
        {
          id: 'casino-cruise',
          name: 'Casino Cruise',
          description: 'Floating casino on Mandovi River',
          duration: '3 hours',
          cost: 3000,
          timeSlots: ['8:00 PM', '9:00 PM', '10:00 PM'],
          highlights: ['Casino Games', 'Dinner', 'Entertainment'],
          coordinates: [15.5022, 73.8222],
          rating: 4.1,
          tips: 'Dress code applies, book in advance'
        }
      ]
    }
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'Kerala',
    country: 'India',
    description: 'God\'s Own Country - known for backwaters, beaches, and hill stations',
    bestTimeToVisit: 'September to March',
    averageDuration: '4-6 days',
    budget: {
      budget: { min: 10000, max: 20000 },
      moderate: { min: 20000, max: 40000 },
      premium: { min: 40000, max: 60000 },
      luxury: { min: 60000, max: 100000 }
    },
    coordinates: [10.8505, 76.2711],
    popularFor: ['backwaters', 'beaches', 'hill-stations', 'ayurveda'],
    activities: {
      backwaters: [
        {
          id: 'alleppey-houseboat',
          name: 'Alleppey Houseboat',
          description: 'Overnight stay in traditional houseboat',
          duration: '24 hours',
          cost: 8000,
          timeSlots: ['12:00 PM'],
          highlights: ['Backwaters', 'Traditional Experience', 'Scenic Views'],
          coordinates: [9.4981, 76.3388],
          rating: 4.7,
          tips: 'Book premium houseboat for better experience'
        },
        {
          id: 'kumarakom-backwaters',
          name: 'Kumarakom Backwaters',
          description: 'Serene backwater village experience',
          duration: '4 hours',
          cost: 1500,
          timeSlots: ['8:00 AM', '9:00 AM', '3:00 PM', '4:00 PM'],
          highlights: ['Bird Sanctuary', 'Village Life', 'Scenic Beauty'],
          coordinates: [9.6174, 76.4280],
          rating: 4.5,
          tips: 'Combine with bird sanctuary visit'
        }
      ],
      beaches: [
        {
          id: 'kovalam-beach',
          name: 'Kovalam Beach',
          description: 'Famous beach with lighthouse',
          duration: '3 hours',
          cost: 500,
          timeSlots: ['8:00 AM', '9:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Lighthouse', 'Beach Activities', 'Sunset Views'],
          coordinates: [8.3846, 76.9785],
          rating: 4.4,
          tips: 'Three beaches: Lighthouse, Hawa, Samudra'
        },
        {
          id: 'varkala-beach',
          name: 'Varkala Beach',
          description: 'Cliff beach with natural springs',
          duration: '3 hours',
          cost: 400,
          timeSlots: ['8:00 AM', '9:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Cliffs', 'Natural Springs', 'Sunset Views'],
          coordinates: [8.7359, 76.8393],
          rating: 4.6,
          tips: 'Unique cliff setting, great for photography'
        }
      ],
      hillStations: [
        {
          id: 'munnar-tea-plantations',
          name: 'Munnar Tea Plantations',
          description: 'Scenic tea gardens and hills',
          duration: '6 hours',
          cost: 2000,
          timeSlots: ['8:00 AM', '9:00 AM'],
          highlights: ['Tea Gardens', 'Hill Views', 'Tea Museum'],
          coordinates: [10.0886, 77.0595],
          rating: 4.7,
          tips: 'Best visited during winter months'
        },
        {
          id: 'thekkady-wildlife',
          name: 'Thekkady Wildlife Sanctuary',
          description: 'Periyar Tiger Reserve',
          duration: '4 hours',
          cost: 1500,
          timeSlots: ['6:00 AM', '2:00 PM'],
          highlights: ['Wildlife Safari', 'Boat Safari', 'Spice Plantations'],
          coordinates: [9.5404, 77.1939],
          rating: 4.5,
          tips: 'Book safari in advance'
        }
      ]
    }
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    country: 'India',
    description: 'Hill station known for snow, mountains, and adventure activities',
    bestTimeToVisit: 'March to June, October to December',
    averageDuration: '3-4 days',
    budget: {
      budget: { min: 8000, max: 15000 },
      moderate: { min: 15000, max: 25000 },
      premium: { min: 25000, max: 40000 },
      luxury: { min: 40000, max: 60000 }
    },
    coordinates: [32.2430, 77.1894],
    popularFor: ['mountains', 'adventure', 'snow', 'romance'],
    activities: {
      adventure: [
        {
          id: 'solang-valley',
          name: 'Solang Valley',
          description: 'Adventure sports and snow activities',
          duration: '4 hours',
          cost: 2000,
          timeSlots: ['9:00 AM', '10:00 AM'],
          highlights: ['Paragliding', 'Skiing', 'Cable Car'],
          coordinates: [32.3223, 77.1756],
          rating: 4.6,
          tips: 'Best time for skiing: December to February'
        },
        {
          id: 'rohtang-pass',
          name: 'Rohtang Pass',
          description: 'High mountain pass with snow',
          duration: '6 hours',
          cost: 3000,
          timeSlots: ['6:00 AM', '7:00 AM'],
          highlights: ['Snow Views', 'Mountain Scenery', 'Photography'],
          coordinates: [32.3835, 77.2508],
          rating: 4.7,
          tips: 'Check weather conditions, permits required'
        }
      ],
      sightseeing: [
        {
          id: 'hadimba-temple',
          name: 'Hadimba Temple',
          description: 'Ancient temple in cedar forest',
          duration: '1 hour',
          cost: 100,
          timeSlots: ['8:00 AM', '9:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Architecture', 'Forest Setting', 'Cultural Significance'],
          coordinates: [32.2398, 77.1904],
          rating: 4.3,
          tips: 'Peaceful morning visit recommended'
        },
        {
          id: 'manu-temple',
          name: 'Manu Temple',
          description: 'Temple dedicated to sage Manu',
          duration: '1 hour',
          cost: 50,
          timeSlots: ['8:00 AM', '9:00 AM', '4:00 PM', '5:00 PM'],
          highlights: ['Mythological Significance', 'Mountain Views', 'Peaceful'],
          coordinates: [32.2430, 77.1894],
          rating: 4.1,
          tips: 'Combine with Hadimba Temple visit'
        }
      ]
    }
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    country: 'India',
    description: 'Yoga capital of the world known for spirituality and adventure',
    bestTimeToVisit: 'September to April',
    averageDuration: '2-3 days',
    budget: {
      budget: { min: 5000, max: 10000 },
      moderate: { min: 10000, max: 20000 },
      premium: { min: 20000, max: 35000 },
      luxury: { min: 35000, max: 50000 }
    },
    coordinates: [30.0869, 78.2676],
    popularFor: ['yoga', 'spirituality', 'adventure', 'rafting'],
    activities: {
      spiritual: [
        {
          id: 'triveni-ghat',
          name: 'Triveni Ghat',
          description: 'Confluence of Ganga, Yamuna, and Saraswati',
          duration: '1 hour',
          cost: 0,
          timeSlots: ['5:00 AM', '6:00 AM', '6:00 PM', '7:00 PM'],
          highlights: ['Ganga Aarti', 'Spiritual Experience', 'River Views'],
          coordinates: [30.0869, 78.2676],
          rating: 4.6,
          tips: 'Evening Ganga Aarti is must-see'
        },
        {
          id: 'beatles-ashram',
          name: 'Beatles Ashram',
          description: 'Where Beatles stayed and meditated',
          duration: '1.5 hours',
          cost: 150,
          timeSlots: ['9:00 AM', '10:00 AM', '3:00 PM', '4:00 PM'],
          highlights: ['Beatles History', 'Meditation Caves', 'Artwork'],
          coordinates: [30.0869, 78.2676],
          rating: 4.2,
          tips: 'Interesting for music lovers'
        }
      ],
      adventure: [
        {
          id: 'river-rafting',
          name: 'River Rafting',
          description: 'White water rafting in Ganges',
          duration: '3 hours',
          cost: 1500,
          timeSlots: ['9:00 AM', '10:00 AM', '2:00 PM'],
          highlights: ['Adventure', 'Scenic Views', 'Thrills'],
          coordinates: [30.0869, 78.2676],
          rating: 4.8,
          tips: 'Best season: September to November'
        },
        {
          id: 'bungee-jumping',
          name: 'Bungee Jumping',
          description: 'India\'s highest bungee jumping',
          duration: '2 hours',
          cost: 3000,
          timeSlots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'],
          highlights: ['Adventure', 'Thrill', 'Mountain Views'],
          coordinates: [30.0869, 78.2676],
          rating: 4.7,
          tips: 'Weight and age restrictions apply'
        }
      ]
    }
  }
];

// Sample itineraries for different destinations and preferences
const sampleItineraries = [
  {
    id: 'jaipur-heritage-3days',
    destination: 'jaipur',
    duration: '3 days',
    travelers: 'Couple',
    budget: 'moderate',
    interests: ['sightseeing', 'culture', 'dining'],
    title: 'Royal Heritage Experience',
    description: 'Explore the rich cultural heritage of Jaipur',
    days: [
      {
        day: 1,
        title: 'Fortress Day',
        theme: 'Royal Forts & Palaces',
        activities: [
          {
            time: '8:00 AM',
            title: 'Amber Fort Visit',
            description: 'Start with the magnificent Amber Fort',
            duration: '3 hours',
            cost: '₹500'
          },
          {
            time: '12:00 PM',
            title: 'Traditional Rajasthani Lunch',
            description: 'Authentic cuisine at Chokhi Dhani',
            duration: '2 hours',
            cost: '₹800'
          },
          {
            time: '2:30 PM',
            title: 'City Palace Tour',
            description: 'Explore the royal residence',
            duration: '2 hours',
            cost: '₹300'
          },
          {
            time: '5:00 PM',
            title: 'Hawa Mahal Visit',
            description: 'Photography at the Palace of Winds',
            duration: '1 hour',
            cost: '₹200'
          }
        ]
      },
      {
        day: 2,
        title: 'Cultural Immersion',
        theme: 'Arts & Local Life',
        activities: [
          {
            time: '9:00 AM',
            title: 'Jantar Mantar',
            description: 'Ancient astronomical observatory',
            duration: '1.5 hours',
            cost: '₹150'
          },
          {
            time: '11:00 AM',
            title: 'Local Market Shopping',
            description: 'Shop for traditional handicrafts',
            duration: '2 hours',
            cost: 'Varies'
          },
          {
            time: '1:00 PM',
            title: 'Traditional Lunch',
            description: 'Rajasthani thali at local restaurant',
            duration: '1.5 hours',
            cost: '₹600'
          },
          {
            time: '3:00 PM',
            title: 'Albert Hall Museum',
            description: 'Art and history museum',
            duration: '2 hours',
            cost: '₹100'
          },
          {
            time: '6:00 PM',
            title: 'Cultural Show',
            description: 'Traditional Rajasthani dance and music',
            duration: '2 hours',
            cost: '₹500'
          }
        ]
      },
      {
        day: 3,
        title: 'Nature & Relaxation',
        theme: 'Gardens & Lakes',
        activities: [
          {
            time: '8:00 AM',
            title: 'Jal Mahal',
            description: 'Water Palace in Man Sagar Lake',
            duration: '1 hour',
            cost: '₹100'
          },
          {
            time: '10:00 AM',
            title: 'Central Park Walk',
            description: 'Morning walk in beautiful gardens',
            duration: '1 hour',
            cost: 'Free'
          },
          {
            time: '12:00 PM',
            title: 'Farewell Lunch',
            description: 'Special Rajasthani meal',
            duration: '1.5 hours',
            cost: '₹800'
          },
          {
            time: '3:00 PM',
            title: 'Nahargarh Fort',
            description: 'Sunset views from the fort',
            duration: '2 hours',
            cost: '₹200'
          }
        ]
      }
    ],
    accommodation: {
      name: 'Pearl Palace Heritage Hotel',
      price: '₹3000/night',
      type: 'heritage'
    },
    transport: {
      name: 'Private Car with Driver',
      cost: '₹2000/day',
      type: 'private'
    },
    totalCost: 18400
  },
  {
    id: 'goa-beaches-4days',
    destination: 'goa',
    duration: '4 days',
    travelers: 'Friends',
    budget: 'moderate',
    interests: ['beaches', 'nightlife', 'dining'],
    title: 'Beach Paradise & Nightlife',
    description: 'Perfect blend of beaches, parties, and Goan cuisine',
    days: [
      {
        day: 1,
        title: 'North Goa Beaches',
        theme: 'Beach Exploration',
        activities: [
          {
            time: '9:00 AM',
            title: 'Calangute Beach',
            description: 'Start with the longest beach in North Goa',
            duration: '2 hours',
            cost: '₹300'
          },
          {
            time: '11:30 AM',
            title: 'Baga Beach Water Sports',
            description: 'Try parasailing and jet skiing',
            duration: '2 hours',
            cost: '₹1500'
          },
          {
            time: '2:00 PM',
            title: 'Beach Shack Lunch',
            description: 'Fresh seafood at beach shack',
            duration: '1.5 hours',
            cost: '₹800'
          },
          {
            time: '4:00 PM',
            title: 'Anjuna Beach',
            description: 'Famous flea market and beach',
            duration: '2 hours',
            cost: '₹200'
          }
        ]
      },
      {
        day: 2,
        title: 'Heritage & Culture',
        theme: 'Portuguese Heritage',
        activities: [
          {
            time: '9:00 AM',
            title: 'Old Goa Churches',
            description: 'UNESCO World Heritage site',
            duration: '3 hours',
            cost: '₹200'
          },
          {
            time: '12:30 PM',
            title: 'Traditional Goan Lunch',
            description: 'Authentic Goan cuisine',
            duration: '1.5 hours',
            cost: '₹600'
          },
          {
            time: '2:30 PM',
            title: 'Aguada Fort',
            description: 'Historic Portuguese fort',
            duration: '2 hours',
            cost: '₹100'
          },
          {
            time: '5:00 PM',
            title: 'Panjim City Walk',
            description: 'Explore the capital city',
            duration: '2 hours',
            cost: 'Free'
          }
        ]
      },
      {
        day: 3,
        title: 'South Goa Serenity',
        theme: 'Pristine Beaches',
        activities: [
          {
            time: '8:00 AM',
            title: 'Palolem Beach',
            description: 'Beautiful crescent-shaped beach',
            duration: '3 hours',
            cost: '₹400'
          },
          {
            time: '12:00 PM',
            title: 'Beachside Lunch',
            description: 'Fresh seafood with ocean view',
            duration: '1.5 hours',
            cost: '₹700'
          },
          {
            time: '2:30 PM',
            title: 'Butterfly Beach',
            description: 'Secluded beach with butterflies',
            duration: '2 hours',
            cost: '₹300'
          },
          {
            time: '5:00 PM',
            title: 'Benaulim Beach',
            description: 'Quiet beach for relaxation',
            duration: '2 hours',
            cost: '₹200'
          }
        ]
      },
      {
        day: 4,
        title: 'Adventure & Nightlife',
        theme: 'Thrills & Parties',
        activities: [
          {
            time: '9:00 AM',
            title: 'Dudhsagar Falls',
            description: 'Majestic waterfall trek',
            duration: '4 hours',
            cost: '₹1500'
          },
          {
            time: '2:00 PM',
            title: 'Spice Plantation Tour',
            description: 'Learn about Goan spices',
            duration: '2 hours',
            cost: '₹500'
          },
          {
            time: '5:00 PM',
            title: 'Casino Cruise',
            description: 'Floating casino experience',
            duration: '3 hours',
            cost: '₹3000'
          },
          {
            time: '9:00 PM',
            title: 'Tito\'s Lane Nightlife',
            description: 'Famous nightlife hub',
            duration: '3 hours',
            cost: '₹2000'
          }
        ]
      }
    ],
    accommodation: {
      name: 'Candolim Beach Resort',
      price: '₹4000/night',
      type: 'beach resort'
    },
    transport: {
      name: 'Rental Scooter',
      cost: '₹600/day',
      type: 'rental'
    },
    totalCost: 25200
  },
  {
    id: 'kerala-backwaters-5days',
    destination: 'kerala',
    duration: '5 days',
    travelers: 'Family',
    budget: 'premium',
    interests: ['backwaters', 'beaches', 'hill-stations'],
    title: 'God\'s Own Country Experience',
    description: 'Complete Kerala experience with backwaters, beaches, and hills',
    days: [
      {
        day: 1,
        title: 'Cochin Arrival',
        theme: 'Historic Port City',
        activities: [
          {
            time: '10:00 AM',
            title: 'Fort Kochi',
            description: 'Historic Dutch and Portuguese influences',
            duration: '2 hours',
            cost: '₹500'
          },
          {
            time: '12:30 PM',
            title: 'Kerala Lunch',
            description: 'Traditional Sadhya meal',
            duration: '1.5 hours',
            cost: '₹800'
          },
          {
            time: '2:30 PM',
            title: 'Chinese Fishing Nets',
            description: 'Iconic fishing nets operation',
            duration: '1 hour',
            cost: '₹200'
          },
          {
            time: '4:00 PM',
            title: 'Jew Town',
            description: 'Synagogue and spice market',
            duration: '2 hours',
            cost: '₹300'
          },
          {
            time: '7:00 PM',
            title: 'Kathakali Performance',
            description: 'Traditional Kerala dance form',
            duration: '2 hours',
            cost: '₹600'
          }
        ]
      },
      {
        day: 2,
        title: 'Munnar Hills',
        theme: 'Tea Gardens & Mountains',
        activities: [
          {
            time: '8:00 AM',
            title: 'Drive to Munnar',
            description: 'Scenic drive through Western Ghats',
            duration: '4 hours',
            cost: '₹2000'
          },
          {
            time: '12:30 PM',
            title: 'Lunch at Tea Garden',
            description: 'Plantation restaurant',
            duration: '1 hour',
            cost: '₹600'
          },
          {
            time: '2:00 PM',
            title: 'Tea Museum Visit',
            description: 'Learn about tea processing',
            duration: '1.5 hours',
            cost: '₹200'
          },
          {
            time: '4:00 PM',
            title: 'Mattupetty Dam',
            description: 'Scenic dam and lake',
            duration: '2 hours',
            cost: '₹300'
          }
        ]
      },
      {
        day: 3,
        title: 'Alleppey Backwaters',
        theme: 'Houseboat Experience',
        activities: [
          {
            time: '12:00 PM',
            title: 'Board Houseboat',
            description: 'Traditional Kerala houseboat',
            duration: '24 hours',
            cost: '₹8000'
          },
          {
            time: '1:00 PM',
            title: 'Lunch on Houseboat',
            description: 'Traditional Kerala cuisine',
            duration: '1.5 hours',
            cost: 'Included'
          },
          {
            time: '3:00 PM',
            title: 'Backwater Cruise',
            description: 'Scenic cruise through backwaters',
            duration: '3 hours',
            cost: 'Included'
          },
          {
            time: '6:00 PM',
            title: 'Village Visit',
            description: 'Traditional Kerala village',
            duration: '2 hours',
            cost: 'Included'
          }
        ]
      },
      {
        day: 4,
        title: 'Kumarakom',
        theme: 'Bird Sanctuary & Village Life',
        activities: [
          {
            time: '8:00 AM',
            title: 'Bird Sanctuary',
            description: 'Migratory birds watching',
            duration: '2 hours',
            cost: '₹500'
          },
          {
            time: '10:30 AM',
            title: 'Village Walk',
            description: 'Traditional Kerala village life',
            duration: '2 hours',
            cost: '₹300'
          },
          {
            time: '1:00 PM',
            title: 'Traditional Lunch',
            description: 'Homemade Kerala meal',
            duration: '1.5 hours',
            cost: '₹600'
          },
          {
            time: '3:00 PM',
            title: 'Backwater Shikara Ride',
            description: 'Traditional boat ride',
            duration: '2 hours',
            cost: '₹800'
          }
        ]
      },
      {
        day: 5,
        title: 'Kovalam Beach',
        theme: 'Beach Relaxation',
        activities: [
          {
            time: '9:00 AM',
            title: 'Drive to Kovalam',
            description: 'Scenic coastal drive',
            duration: '3 hours',
            cost: '₹2000'
          },
          {
            time: '12:30 PM',
            title: 'Beachside Lunch',
            description: 'Fresh seafood with ocean view',
            duration: '1.5 hours',
            cost: '₹800'
          },
          {
            time: '2:30 PM',
            title: 'Lighthouse Beach',
            description: 'Climb the lighthouse for views',
            duration: '2 hours',
            cost: '₹200'
          },
          {
            time: '5:00 PM',
            title: 'Sunset at Beach',
            description: 'Beautiful sunset views',
            duration: '1.5 hours',
            cost: 'Free'
          }
        ]
      }
    ],
    accommodation: {
      name: 'Luxury Houseboat & Beach Resort',
      price: '₹8000/night',
      type: 'luxury'
    },
    transport: {
      name: 'Private Car with Driver',
      cost: '₹3000/day',
      type: 'private'
    },
    totalCost: 48400
  }
];

// Database seeding function
const seedItineraryData = async () => {
  console.log('🌍 Starting to seed MapSathi itinerary data...');
  
  try {
    // In a real application, this would connect to your database
    // For now, we'll just log the data structure
    
    console.log('📍 Destinations to seed:', destinations.length);
    console.log('📋 Sample itineraries to seed:', sampleItineraries.length);
    
    // Log sample data structure
    console.log('\n🏛️ Sample Destination Structure:');
    console.log(JSON.stringify(destinations[0], null, 2));
    
    console.log('\n📅 Sample Itinerary Structure:');
    console.log(JSON.stringify(sampleItineraries[0], null, 2));
    
    console.log('\n✅ Data seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Destinations: ${destinations.length}`);
    console.log(`- Total Activities: ${destinations.reduce((acc, dest) => acc + Object.values(dest.activities).reduce((actAcc, category) => actAcc + category.length, 0), 0)}`);
    console.log(`- Sample Itineraries: ${sampleItineraries.length}`);
    
    return {
      success: true,
      destinations: destinations.length,
      activities: destinations.reduce((acc, dest) => acc + Object.values(dest.activities).reduce((actAcc, category) => actAcc + category.length, 0), 0),
      itineraries: sampleItineraries.length
    };
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    return { success: false, error: error.message };
  }
};

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    destinations,
    sampleItineraries,
    seedItineraryData
  };
}

// For browser environment
if (typeof window !== 'undefined') {
  window.MapSathiData = {
    destinations,
    sampleItineraries,
    seedItineraryData
  };
}
