'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CustomizeTrip from '@/components/CustomizeTrip';
import destinationService from '@/services/destinationService';
import dynamic from 'next/dynamic';

// Dynamic import for map component to avoid SSR issues
const ItineraryMap = dynamic(() => import('@/components/ItineraryMap'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>
});
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign,
  Heart,
  Camera,
  Utensils,
  Hotel,
  Car,
  Star,
  Route,
  Navigation,
  Phone,
  Globe,
  ChevronRight,
  Share2,
  Edit,
  Sparkles,
  TrendingUp,
  Mountain,
  Compass,
  Sun,
  Cloud,
  Coffee,
  ShoppingBag,
  Music,
  Plane,
  Train
} from 'lucide-react';

const ItineraryPage = () => {
  const router = useRouter();
  const [itinerary, setItinerary] = useState({ days: [] });
  const [loading, setLoading] = useState(true);
  const [showCustomize, setShowCustomize] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [showMap, setShowMap] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  useEffect(() => {
    // Load dynamic itinerary data
    const loadItinerary = async () => {
      try {
        // Get URL parameters to determine if this is a custom itinerary
        const urlParams = new URLSearchParams(window.location.search);
        const customData = urlParams.get('custom');
        
        if (customData) {
          // Load custom itinerary from URL or localStorage
          const customItinerary = JSON.parse(decodeURIComponent(customData));
          setItinerary(customItinerary);
        } else {
          // Load sample itinerary or create dynamic one
          const sampleItinerary = destinationService.getSampleItineraryById('jaipur-heritage-3days');
          if (sampleItinerary) {
            setItinerary({
              ...sampleItinerary,
              destination: sampleItinerary.destination,
              duration: sampleItinerary.duration,
              travelers: sampleItinerary.travelers,
              budget: sampleItinerary.budget,
              overview: {
                title: sampleItinerary.title,
                description: sampleItinerary.description,
                totalCost: `₹${sampleItinerary.totalCost.toLocaleString()}`,
                bestTime: 'October - March',
                weather: 'Pleasant, 20-25°C'
              },
              accommodation: sampleItinerary.accommodation,
              transport: sampleItinerary.transport
            });
          }
        }
      } catch (error) {
        console.error('Error loading itinerary:', error);
        // Fallback to basic data
        setItinerary({
          destination: 'Jaipur',
          duration: '3 days',
          travelers: 'Couple',
          budget: 'moderate',
          days: [],
          essentials: {
            documents: ['ID Proof', 'Hotel Booking', 'Train/Flight Tickets'],
            clothing: ['Comfortable walking shoes', 'Cotton clothes', 'Hat', 'Sunglasses'],
            health: ['Basic medications', 'Sunscreen', 'Hand sanitizer'],
            electronics: ['Phone charger', 'Power bank', 'Camera']
          },
          emergency: {
            police: '100',
            ambulance: '108',
            tourist: '+91-141-2567890',
            hospital: 'SMS Hospital, Jaipur'
          }
        });
        setLoading(false);
      }
    };

    loadItinerary();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Creating Your Perfect Trip...</h2>
          <p className="text-gray-600 mt-2">Our AI is crafting the best itinerary for you</p>
        </div>
      </div>
    );
  }

  // Generate customized itinerary based on user preferences
  const generateCustomizedItinerary = (customizations) => {
    const baseItinerary = { ...itinerary };
    
    // Helper Functions
    const getDayTitle = (day, interests) => {
      const themes = {
        adventure: ['Adventure Day', 'Thrill Seekers Day', 'Extreme Sports Day'],
        culture: ['Cultural Heritage Day', 'Traditional Arts Day', 'Local Culture Day'],
        food: ['Culinary Journey Day', 'Foodie Paradise Day', 'Local Flavors Day'],
        photography: ['Photography Day', 'Picture Perfect Day', 'Scenic Shots Day'],
        shopping: ['Shopping Spree Day', 'Market Discovery Day', 'Bargain Hunt Day'],
        nature: ['Nature Escape Day', 'Green Oasis Day', 'Serene Gardens Day']
      };
      
      const interest = interests[0] || 'sightseeing';
      const dayThemes = themes[interest] || ['Heritage Day', 'Royal Day', 'Historical Day'];
      return dayThemes[day - 1] || dayThemes[0];
    };

    const getDayTheme = (day, interests) => {
      const themes = {
        adventure: 'Adventure & Thrills',
        culture: 'Cultural Immersion',
        food: 'Culinary Experiences',
        photography: 'Photography Hotspots',
        shopping: 'Shopping & Markets',
        nature: 'Nature & Gardens'
      };
      
      const interest = interests[0] || 'sightseeing';
      return themes[interest] || 'Heritage & History';
    };

    const getActivitiesForInterests = (interests, budget, pace) => {
      let allActivities = [];
      
      interests.forEach(interest => {
        if (activityDatabase[interest]) {
          allActivities = allActivities.concat(activityDatabase[interest]);
        }
      });

      // Apply budget filtering and adjust costs
      const budgetMultiplier = budgetMultipliers[budget] || 1.0;
      allActivities = allActivities?.map(activity => ({
        ...activity,
        cost: activity.cost === 'Free' ? 'Free' : activity.cost === 'Varies' ? 'Varies' : 
          `₹${Math.round(parseInt(activity.cost.replace('₹', '')) * budgetMultiplier)}`
      }));

      // Shuffle and select activities based on pace
      const shuffled = allActivities.sort(() => Math.random() - 0.5);
      const activitiesPerDay = paceActivityCounts[pace] || 4;
      const totalActivities = activitiesPerDay * parseInt(baseItinerary.duration) || 8;
      
      return shuffled.slice(0, totalActivities);
    };

    const generateTimeSlots = (activities, pace, freeTime) => {
      const timeSlots = [];
      const startHour = pace === 'relaxed' ? 9 : pace === 'packed' ? 8 : 8;
      const endHour = 20; // 8 PM
      const activitiesPerDay = paceActivityCounts[pace] || 4;
      
      let currentHour = startHour;
      activities.forEach((activity, index) => {
        const hour = currentHour + Math.floor(index / activitiesPerDay);
        const minute = (index % activitiesPerDay) * (endHour - startHour) / activitiesPerDay * 60;
        
        timeSlots.push({
          ...activity,
          time: `${Math.floor(hour % 24 || 12)}:${minute < 10 ? '0' : ''}${Math.floor(minute)} ${hour >= 12 && hour < 24 ? 'PM' : 'AM'}`
        });
      });
      
      return timeSlots;
    };
    
    // Activity database with costs and categories
    const activityDatabase = {
      sightseeing: [
        { title: 'Amber Fort Visit', description: 'Explore the magnificent Amber Fort with elephant ride option', duration: '3 hours', cost: '₹500', type: 'sightseeing' },
        { title: 'City Palace Tour', description: 'Royal residence with museum and courtyards', duration: '2 hours', cost: '₹300', type: 'sightseeing' },
        { title: 'Hawa Mahal', description: 'Palace of Winds with intricate architecture', duration: '1 hour', cost: '₹200', type: 'sightseeing' },
        { title: 'Jantar Mantar', description: 'Ancient astronomical observatory', duration: '1.5 hours', cost: '₹150', type: 'sightseeing' },
        { title: 'Albert Hall Museum', description: 'Art and history museum', duration: '2 hours', cost: '₹100', type: 'sightseeing' },
        { title: 'Jal Mahal', description: 'Water Palace in the middle of Man Sagar Lake', duration: '1 hour', cost: '₹100', type: 'sightseeing' },
        { title: 'Nahargarh Fort', description: 'Sunset fort with panoramic views', duration: '2 hours', cost: '₹200', type: 'sightseeing' }
      ],
      dining: [
        { title: 'Traditional Rajasthani Lunch', description: 'Authentic Rajasthani cuisine at Chokhi Dhani', duration: '1.5 hours', cost: '₹800', type: 'dining' },
        { title: 'Fine Dining Experience', description: 'Multi-cuisine restaurant with royal ambiance', duration: '2 hours', cost: '₹1200', type: 'dining' },
        { title: 'Street Food Tour', description: 'Explore local flavors and street delicacies', duration: '2 hours', cost: '₹400', type: 'dining' },
        { title: 'Rooftop Dinner', description: 'Romantic dinner with city views', duration: '1.5 hours', cost: '₹600', type: 'dining' },
        { title: 'Traditional Thali', description: 'Complete Rajasthani thali experience', duration: '1 hour', cost: '₹500', type: 'dining' }
      ],
      shopping: [
        { title: 'Local Market Shopping', description: 'Shop for traditional handicrafts and textiles', duration: '2 hours', cost: 'Varies', type: 'shopping' },
        { title: 'Johari Bazaar', description: 'Famous jewelry and gemstone market', duration: '2 hours', cost: 'Varies', type: 'shopping' },
        { title: 'Bapu Bazaar', description: 'Traditional clothes and souvenirs', duration: '1.5 hours', cost: 'Varies', type: 'shopping' },
        { title: 'Artisan Village', description: 'Watch craftsmen at work', duration: '1 hour', cost: '₹200', type: 'shopping' }
      ],
      culture: [
        { title: 'Cultural Show', description: 'Traditional Rajasthani dance and music performance', duration: '2 hours', cost: '₹500', type: 'entertainment' },
        { title: 'Puppet Show', description: 'Traditional Rajasthani puppet performance', duration: '1 hour', cost: '₹200', type: 'entertainment' },
        { title: 'Folk Music Evening', description: 'Live folk music performance', duration: '1.5 hours', cost: '₹300', type: 'entertainment' }
      ],
      adventure: [
        { title: 'Elephant Safari', description: 'Ride elephants through the forest', duration: '2 hours', cost: '₹1500', type: 'adventure' },
        { title: 'Hot Air Balloon', description: 'Aerial view of the city at sunrise', duration: '3 hours', cost: '₹3000', type: 'adventure' },
        { title: 'Zip Line Adventure', description: 'Thrilling zip line experience', duration: '2 hours', cost: '₹2000', type: 'adventure' }
      ],
      nature: [
        { title: 'Central Park Walk', description: 'Morning walk in beautiful gardens', duration: '1 hour', cost: 'Free', type: 'nature' },
        { title: 'Kanak Vrindavan Gardens', description: 'Beautiful garden with fountains', duration: '1.5 hours', cost: '₹100', type: 'nature' },
        { title: 'Sunset Point', description: 'Best spot to watch sunset', duration: '1 hour', cost: 'Free', type: 'nature' }
      ]
    };

    // Budget-based cost multipliers
    const budgetMultipliers = {
      budget: 0.7,
      moderate: 1.0,
      premium: 1.5,
      luxury: 2.0
    };

    // Pace-based activity counts
    const paceActivityCounts = {
      relaxed: 2,
      moderate: 4,
      packed: 6
    };

    // Generate new days
    const activities = getActivitiesForInterests(customizations.interests, customizations.budget, customizations.pace);
    const timeActivities = generateTimeSlots(activities, customizations.pace, customizations.freeTime);
    
    const newDays = [];
    const activitiesPerDay = paceActivityCounts[customizations.pace] || 4;
    
    for (let day = 1; day <= parseInt(baseItinerary.duration); day++) {
      const startIndex = (day - 1) * activitiesPerDay;
      const endIndex = Math.min(startIndex + activitiesPerDay, timeActivities.length);
      const dayActivities = timeActivities.slice(startIndex, endIndex);
      
      newDays.push({
        day,
        title: `Day ${day}: ${getDayTitle(day, customizations.interests)}`,
        theme: getDayTheme(day, customizations.interests),
        activities: dayActivities
      });
    }

    // Update accommodation and transport based on budget
    const accommodationOptions = {
      budget: { name: 'Budget Hotel', price: '₹800/night', type: 'hotel' },
      moderate: { name: 'Comfortable Hotel', price: '₹1500/night', type: 'hotel' },
      premium: { name: 'Premium Hotel', price: '₹3000/night', type: 'hotel' },
      luxury: { name: 'Luxury Resort', price: '₹6000/night', type: 'resort' }
    };

    const transportOptions = {
      budget: { name: 'Public Transport', cost: '₹200/day', type: 'public' },
      moderate: { name: 'Private Car', cost: '₹800/day', type: 'private' },
      premium: { name: 'Premium Car', cost: '₹1500/day', type: 'private' },
      luxury: { name: 'Luxury Vehicle', cost: '₹3000/day', type: 'luxury' }
    };

    return {
      ...baseItinerary,
      customizations,
      budget: customizations.budget,
      days: newDays,
      accommodation: accommodationOptions[customizations.budget],
      transport: transportOptions[customizations.budget],
      overview: {
        title: `Your Custom ${baseItinerary.destination} Adventure`,
        description: `A personalized ${baseItinerary.duration} journey tailored to your interests and budget`
      }
    };
  };

  const handleCustomize = (customizations) => {
    // Generate new customized itinerary using destination service
    const destination = destinationService.getDestinationById(itinerary.destination || 'jaipur');
    if (!destination) {
      console.error('Destination not found');
      return;
    }

    // Calculate estimated cost
    const estimatedCost = destinationService.calculateItineraryCost(
      destination.id,
      itinerary.duration || '3 days',
      customizations.budget,
      itinerary.travelers || 'Couple',
      customizations.interests
    );

    // Get activities based on interests
    const selectedActivities = [];
    customizations.interests.forEach(interest => {
      const activities = destinationService.getActivitiesByCategory(destination.id, interest);
      selectedActivities.push(...activities.slice(0, 2)); // Take 2 activities per interest
    });

    // Generate new days with activities
    const days = [];
    const activitiesPerDay = customizations.pace === 'relaxed' ? 2 : customizations.pace === 'packed' ? 4 : 3;
    const totalDays = parseInt(itinerary.duration) || 3;
    
    for (let day = 1; day <= totalDays; day++) {
      const startIndex = (day - 1) * activitiesPerDay;
      const endIndex = Math.min(startIndex + activitiesPerDay, selectedActivities.length);
      const dayActivities = selectedActivities.slice(startIndex, endIndex);
      
      // Format activities for display
      const formattedActivities = dayActivities.map((activity, index) => ({
        time: `${8 + index * 2}:00 AM`,
        title: activity.name,
        type: activity.category,
        duration: activity.duration,
        description: activity.description,
        highlights: activity.highlights,
        cost: `₹${activity.cost}`,
        tips: activity.tips,
        location: {
          name: activity.name,
          coordinates: activity.coordinates,
          address: `${destination.name}, ${destination.state}`
        }
      }));

      days.push({
        day,
        title: `Day ${day}: ${customizations.interests[0] ? customizations.interests[0].charAt(0).toUpperCase() + customizations.interests[0].slice(1) : 'Heritage'} Experience`,
        theme: `Based on ${customizations.interests.join(', ')}`,
        activities: formattedActivities
      });
    }

    // Get accommodation and transport based on budget
    const accommodation = destinationService.getAccommodationOptions(destination.id, customizations.budget)[0];
    const transport = destinationService.getTransportOptions(destination.id)[0];

    // Create new itinerary
    const newItinerary = {
      ...itinerary,
      customizations,
      budget: customizations.budget,
      days,
      accommodation,
      transport,
      overview: {
        title: `Custom ${destination.name} Adventure`,
        description: `A personalized ${itinerary.duration} journey tailored to your interests and budget`,
        totalCost: `₹${estimatedCost.toLocaleString()}`,
        bestTime: destination.bestTimeToVisit,
        weather: 'Pleasant'
      }
    };

    setItinerary(newItinerary);
    setShowCustomize(false);
    setIsCustomizing(false);
  };

  // Calculate total cost
  const calculateTotalCost = () => {
    if (!itinerary || !itinerary.days) return 0;
    
    let totalCost = 0;
    
    // Add activity costs
    itinerary.days.forEach(day => {
      day?.activities?.forEach(activity => {
        const cost = activity.cost.replace('₹', '').replace(',', '').replace('Varies', '500');
        totalCost += parseInt(cost) || 0;
      });
    });
    
    // Add accommodation cost
    const accCost = itinerary?.accommodation?.price?.replace('₹', '').replace('/night', '').replace(',', '') || '0';
    totalCost += (parseInt(accCost) || 0) * parseInt(itinerary.duration || 1);
    
    // Add transport cost
    const transCost = itinerary?.transport?.cost?.replace('₹', '').replace('/day', '').replace(',', '') || '0';
    totalCost += (parseInt(transCost) || 0) * parseInt(itinerary.duration || 1);
    
    return totalCost;
  };

  // Get cost breakdown
  const getCostBreakdown = () => {
    if (!itinerary || !itinerary.days) return {};
    
    let activitiesCost = 0;
    let accommodationCost = 0;
    let transportCost = 0;
    
    // Calculate activities cost
    itinerary?.days?.forEach(day => {
      day?.activities?.forEach(activity => {
        const cost = activity.cost.replace('₹', '').replace(',', '').replace('Varies', '500');
        activitiesCost += parseInt(cost) || 0;
      });
    });
    
    // Calculate accommodation cost
    const accCost = itinerary?.accommodation?.price?.replace('₹', '').replace('/night', '').replace(',', '') || '0';
    accommodationCost = (parseInt(accCost) || 0) * parseInt(itinerary.duration || 1);
    
    // Calculate transport cost
    const transCost = itinerary?.transport?.cost?.replace('₹', '').replace('/day', '').replace(',', '') || '0';
    transportCost = (parseInt(transCost) || 0) * parseInt(itinerary.duration || 1);
    
    return {
      activities: activitiesCost,
      accommodation: accommodationCost,
      transport: transportCost,
      total: activitiesCost + accommodationCost + transportCost
    };
  };

  // Handle customization state changes
  const handleCustomizeOpen = () => {
    setIsCustomizing(true);
    setShowCustomize(true);
  };

  const handleCustomizeClose = () => {
    setIsCustomizing(false);
    setShowCustomize(false);
  };

  // Handle map location clicks
  const handleMapLocationClick = (locationData) => {
    if (locationData.type === 'daySelect') {
      setSelectedDay(locationData.dayNumber);
    } else {
      setSelectedLocation(locationData);
    }
  };

  // Handle navigation state changes
  const handleNavigationStateChange = (state) => {
    // You can store navigation state in parent if needed
    console.log('Navigation state changed:', state);
  };

  // Share itinerary
  const shareItinerary = async () => {
    setSharing(true);
    try {
      const shareData = {
        title: `My ${itinerary.destination} Trip Itinerary`,
        text: `Check out my ${itinerary.duration} trip to ${itinerary.destination}! Total cost: ₹${calculateTotalCost().toLocaleString()}`,
        url: window.location.href
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert('Itinerary link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setSharing(false);
    }
  };

  const getActivityIcon = (type) => {
    const icons = {
      sightseeing: Camera,
      food: Utensils,
      adventure: Mountain,
      shopping: ShoppingBag,
      spiritual: Heart,
      entertainment: Music,
      relaxation: Star
    };
    return icons[type] || Camera;
  };

  const getTypeColor = (type) => {
    const colors = {
      sightseeing: 'bg-blue-100 text-blue-800',
      food: 'bg-orange-100 text-orange-800',
      adventure: 'bg-green-100 text-green-800',
      shopping: 'bg-purple-100 text-purple-800',
      spiritual: 'bg-pink-100 text-pink-800',
      entertainment: 'bg-yellow-100 text-yellow-800',
      relaxation: 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push('/Pages/trip-planner')}
                className="flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to Planner
              </Button>
              <div className="flex items-center gap-2">
                <Route className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Your Custom Itinerary</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={shareItinerary}
                disabled={sharing}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                {sharing ? 'Sharing...' : 'Share'}
              </Button>
              <Button 
                onClick={handleCustomizeOpen}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Edit className="w-4 h-4" />
                Customize
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="itinerary-content" className="max-w-7xl mx-auto px-4 py-8">
        {/* Interactive Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    Interactive Trip Map
                  </CardTitle>
                  <p className="text-blue-100 mt-1">
                    Explore your itinerary locations on the map
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMap(!showMap)}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    {showMap ? 'Hide Map' : 'Show Map'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {showMap && (
              <CardContent className="p-0 bg-gradient-to-br from-blue-50/50 via-white/30 to-purple-50/50">
                <div className="h-96 md:h-[500px] relative w-full bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20">
                  <ItineraryMap 
                    itinerary={itinerary}
                    selectedDay={selectedDay}
                    onLocationClick={handleMapLocationClick}
                    isCustomizing={isCustomizing}
                  />
                </div>
                
                {/* Selected Location Details */}
                {selectedLocation && selectedLocation.type !== 'daySelect' && (
                  <div className="border-t border-blue-200/50 p-4 bg-gradient-to-r from-blue-50/70 to-purple-50/70 backdrop-blur-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Day {selectedLocation.dayNumber}</Badge>
                          <Badge variant="secondary">{selectedLocation.type}</Badge>
                        </div>
                        <h4 className="font-semibold text-lg">{selectedLocation.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {selectedLocation.time}
                          </span>
                          <span>{selectedLocation.duration}</span>
                          <span className="font-medium text-green-600">{selectedLocation.cost}</span>
                        </div>
                        <p className="text-gray-600 mt-2">{selectedLocation.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedLocation(null)}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </motion.div>

        {/* Trip Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-3xl">{itinerary.overview.title}</CardTitle>
              <p className="text-blue-100">{itinerary.overview.description}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  <div>
                    <p className="text-sm text-blue-100">Destination</p>
                    <p className="font-semibold">{itinerary.destination}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6" />
                  <div>
                    <p className="text-sm text-blue-100">Duration</p>
                    <p className="font-semibold">{itinerary.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6" />
                  <div>
                    <p className="text-sm text-blue-100">Travelers</p>
                    <p className="font-semibold">{itinerary.travelers}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6" />
                  <div>
                    <p className="text-sm text-blue-100">Budget</p>
                    <p className="font-semibold">₹{calculateTotalCost().toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Itinerary */}
        <div className="space-y-8">
          {itinerary?.days?.length > 0 ? (
            itinerary?.days?.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        {day.title}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{day.theme}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {day.activities.length} Activities
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {day?.activities?.map((activity, activityIndex) => {
                      const Icon = getActivityIcon(activity.type);
                      return (
                        <div key={activityIndex} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="flex gap-6">
                            <div className="flex-shrink-0">
                              <div className="flex items-center gap-3">
                                <div className="text-sm font-medium text-gray-500 w-16">
                                  {activity.time}
                                </div>
                                <div className={`p-2 rounded-lg ${getTypeColor(activity.type)}`}>
                                  <Icon className="w-5 h-5" />
                                </div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {activity.title}
                                  </h3>
                                  <p className="text-gray-600 mt-1">{activity.description}</p>
                                  
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    {activity?.highlights?.map((highlight, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {highlight}
                                      </Badge>
                                    ))}
                                  </div>

                                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {activity.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <DollarSign className="w-4 h-4" />
                                      {activity.cost}
                                    </div>
                                  </div>

                                  {activity.tips && (
                                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                      <p className="text-sm text-blue-800">
                                        <span className="font-semibold">💡 Tip:</span> {activity.tips}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="ml-4">
                                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <Camera className="w-8 h-8 text-gray-400" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No Itinerary Available
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {loading ? 'Loading your itinerary...' : 'Please create an itinerary from the trip planner.'}
                    </p>
                    {!loading && (
                      <Button
                        onClick={() => router.push('/Pages/trip-planner')}
                        className="flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Create Itinerary
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Cost Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <DollarSign className="w-6 h-6" />
                Estimated Cost Breakdown
              </CardTitle>
              <p className="text-green-600">Detailed cost analysis for your {itinerary.duration} trip</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Camera className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Activities</h4>
                      <p className="text-sm text-gray-600">All planned activities</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">₹{getCostBreakdown().activities.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((getCostBreakdown().activities / getCostBreakdown().total) * 100)}% of total
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Hotel className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Accommodation</h4>
                      <p className="text-sm text-gray-600">{itinerary.duration} nights</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">₹{getCostBreakdown().accommodation.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((getCostBreakdown().accommodation / getCostBreakdown().total) * 100)}% of total
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Car className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Transportation</h4>
                      <p className="text-sm text-gray-600">{itinerary.duration} days</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">₹{getCostBreakdown().transport.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((getCostBreakdown().transport / getCostBreakdown().total) * 100)}% of total
                  </p>
                </div>
              </div>

              {/* Total Cost Summary */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Total Estimated Cost</h3>
                    <p className="text-green-100 mt-1">For {itinerary.travelers} • {itinerary.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">₹{getCostBreakdown().total.toLocaleString()}</p>
                    <p className="text-green-100 text-sm">All inclusive estimate</p>
                  </div>
                </div>
              </div>

              {/* Cost Tips */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Money-Saving Tips</h4>
                    <ul className="text-sm text-blue-800 mt-2 space-y-1">
                      <li>• Book accommodation 2-3 weeks in advance for better rates</li>
                      <li>• Consider local transport for cost-effective travel</li>
                      <li>• Look for combo tickets for multiple attractions</li>
                      <li>• Try local street food for authentic and budget-friendly meals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Accommodation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-blue-600" />
                  Accommodation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">{itinerary.accommodation.name}</h4>
                    <p className="text-sm text-gray-600">{itinerary.accommodation.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(itinerary.accommodation.rating)
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {itinerary.accommodation.rating}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{itinerary.accommodation.price}</p>
                    <p className="text-sm text-gray-600">{itinerary.accommodation.address}</p>
                    <p className="text-sm text-blue-600">{itinerary.accommodation.contact}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {itinerary?.accommodation?.amenities?.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transport */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-600" />
                  Transportation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">{itinerary.transport.type}</h4>
                    <p className="text-sm text-gray-600">{itinerary.transport.details}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{itinerary.transport.cost}</p>
                    <p className="text-sm text-blue-600">{itinerary.transport.contact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Essentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-blue-600" />
                  Travel Essentials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(itinerary?.essentials || {}).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="font-medium capitalize text-sm">{category}</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {items?.map((item, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <Phone className="w-5 h-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-red-800">Police</p>
                  <p className="text-lg font-bold text-red-600">{itinerary.emergency.police}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-800">Ambulance</p>
                  <p className="text-lg font-bold text-red-600">{itinerary.emergency.ambulance}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-800">Tourist Helpline</p>
                  <p className="text-lg font-bold text-red-600">{itinerary.emergency.tourist}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-800">Hospital</p>
                  <p className="text-sm text-red-600">{itinerary.emergency.hospital}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Customize Modal */}
      {showCustomize && (
        <CustomizeTrip
          itinerary={itinerary}
          onCustomize={handleCustomize}
          onSave={handleCustomize}
        />
      )}
    </div>
  );
};

export default ItineraryPage;
