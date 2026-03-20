'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic';
import { 
  Settings, 
  DollarSign, 
  Clock, 
  Users,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Sparkles,
  TrendingUp
} from 'lucide-react';

// Dynamic import for map component
const ItineraryMap = dynamic(() => import('@/components/ItineraryMap'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>
});

// Sample base itinerary
const baseItinerary = {
  destination: 'Jaipur',
  duration: '3 days',
  travelers: 'Couple',
  budget: 'Moderate',
  days: [
    {
      day: 1,
      title: 'Historical Heritage Day',
      theme: 'Royal Palaces & Forts',
      activities: [
        {
          time: '8:00 AM',
          title: 'Amber Fort Visit',
          description: 'Explore the magnificent Amber Fort',
          duration: '3 hours',
          cost: '₹500'
        },
        {
          time: '12:00 PM',
          title: 'Traditional Lunch',
          description: 'Authentic Rajasthani cuisine',
          duration: '1.5 hours',
          cost: '₹800'
        }
      ]
    }
  ]
};

const TestCustomizeItineraryPage = () => {
  const [itinerary, setItinerary] = useState(baseItinerary);
  const [showCustomize, setShowCustomize] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [customizationHistory, setCustomizationHistory] = useState([]);

  // Generate customized itinerary based on user preferences
  const generateCustomizedItinerary = (customizations) => {
    const baseItinerary = { ...itinerary };
    
    // Activity database with costs and categories
    const activityDatabase = {
      sightseeing: [
        { title: 'Amber Fort Visit', description: 'Explore the magnificent Amber Fort with elephant ride option', duration: '3 hours', cost: '₹500', type: 'sightseeing' },
        { title: 'City Palace Tour', description: 'Royal residence with museum and courtyards', duration: '2 hours', cost: '₹300', type: 'sightseeing' },
        { title: 'Hawa Mahal', description: 'Palace of Winds with intricate architecture', duration: '1 hour', cost: '₹200', type: 'sightseeing' },
        { title: 'Jantar Mantar', description: 'Ancient astronomical observatory', duration: '1.5 hours', cost: '₹150', type: 'sightseeing' },
        { title: 'Albert Hall Museum', description: 'Art and history museum', duration: '2 hours', cost: '₹100', type: 'sightseeing' }
      ],
      dining: [
        { title: 'Traditional Rajasthani Lunch', description: 'Authentic Rajasthani cuisine at Chokhi Dhani', duration: '1.5 hours', cost: '₹800', type: 'dining' },
        { title: 'Fine Dining Experience', description: 'Multi-cuisine restaurant with royal ambiance', duration: '2 hours', cost: '₹1200', type: 'dining' },
        { title: 'Street Food Tour', description: 'Explore local flavors and street delicacies', duration: '2 hours', cost: '₹400', type: 'dining' },
        { title: 'Rooftop Dinner', description: 'Romantic dinner with city views', duration: '1.5 hours', cost: '₹600', type: 'dining' }
      ],
      shopping: [
        { title: 'Local Market Shopping', description: 'Shop for traditional handicrafts and textiles', duration: '2 hours', cost: 'Varies', type: 'shopping' },
        { title: 'Johari Bazaar', description: 'Famous jewelry and gemstone market', duration: '2 hours', cost: 'Varies', type: 'shopping' },
        { title: 'Bapu Bazaar', description: 'Traditional clothes and souvenirs', duration: '1.5 hours', cost: 'Varies', type: 'shopping' }
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

    // Get activities based on interests and budget
    const getActivitiesForInterests = (interests, budget, pace) => {
      let allActivities = [];
      
      interests.forEach(interest => {
        if (activityDatabase[interest]) {
          allActivities = allActivities.concat(activityDatabase[interest]);
        }
      });

      // Apply budget filtering and adjust costs
      const budgetMultiplier = budgetMultipliers[budget] || 1.0;
      allActivities = allActivities.map(activity => ({
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

    // Generate time slots
    const generateTimeSlots = (activities, pace) => {
      const timeSlots = [];
      const startHour = pace === 'relaxed' ? 9 : pace === 'packed' ? 8 : 8;
      const endHour = 20;
      const activitiesPerDay = paceActivityCounts[pace] || 4;
      
      activities.forEach((activity, index) => {
        const hour = startHour + Math.floor(index / activitiesPerDay);
        const minute = (index % activitiesPerDay) * (endHour - startHour) / activitiesPerDay * 60;
        
        timeSlots.push({
          ...activity,
          time: `${Math.floor(hour % 24 || 12)}:${minute < 10 ? '0' : ''}${Math.floor(minute)} ${hour >= 12 && hour < 24 ? 'PM' : 'AM'}`
        });
      });
      
      return timeSlots;
    };

    // Generate new days
    const activities = getActivitiesForInterests(customizations.interests, customizations.budget, customizations.pace);
    const timeActivities = generateTimeSlots(activities, customizations.pace);
    
    const newDays = [];
    const activitiesPerDay = paceActivityCounts[customizations.pace] || 4;
    
    for (let day = 1; day <= parseInt(baseItinerary.duration); day++) {
      const startIndex = (day - 1) * activitiesPerDay;
      const endIndex = Math.min(startIndex + activitiesPerDay, timeActivities.length);
      const dayActivities = timeActivities.slice(startIndex, endIndex);
      
      newDays.push({
        day,
        title: `Day ${day}: Customized Experience`,
        theme: `Based on ${customizations.interests.join(', ')}`,
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
    const newItinerary = generateCustomizedItinerary(customizations);
    setItinerary(newItinerary);
    setShowCustomize(false);
    
    // Add to customization history
    setCustomizationHistory(prev => [
      ...prev,
      {
        timestamp: new Date().toLocaleString(),
        customizations,
        totalCost: calculateTotalCost(newItinerary)
      }
    ]);
  };

  const calculateTotalCost = (itineraryData) => {
    if (!itineraryData) return 0;
    
    let totalCost = 0;
    
    // Add activity costs
    itineraryData.days.forEach(day => {
      day.activities.forEach(activity => {
        const cost = activity.cost.replace('₹', '').replace(',', '').replace('Varies', '500');
        totalCost += parseInt(cost) || 0;
      });
    });
    
    // Add accommodation cost
    const accommodationCost = itineraryData.accommodation?.price?.replace('₹', '').replace('/night', '').replace(',', '') || 1500;
    totalCost += (parseInt(accommodationCost) || 1500) * parseInt(itineraryData.duration);
    
    // Add transport cost
    const transportCost = itineraryData.transport?.cost?.replace('₹', '').replace('/day', '').replace(',', '') || 800;
    totalCost += (parseInt(transportCost) || 800) * parseInt(itineraryData.duration);
    
    return totalCost;
  };

  const resetItinerary = () => {
    setItinerary(baseItinerary);
    setCustomizationHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Customized Itinerary Test
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Test the improved customization functionality with real itinerary regeneration
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setShowCustomize(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Settings className="w-4 h-4" />
                Customize Itinerary
              </Button>
              <Button
                variant="outline"
                onClick={resetItinerary}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset to Original
              </Button>
            </div>
          </div>

          {/* Current Itinerary Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Destination</span>
                </div>
                <div className="text-lg font-semibold">{itinerary.destination}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Budget</span>
                </div>
                <div className="text-lg font-semibold capitalize">{itinerary.budget}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <div className="text-lg font-semibold">{itinerary.duration}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium">Total Cost</span>
                </div>
                <div className="text-lg font-semibold">₹{calculateTotalCost(itinerary).toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Itinerary Display */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    Current Itinerary
                    {itinerary.customizations && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Customized
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {itinerary.days.map((day) => (
                      <div key={day.day} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-2">{day.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{day.theme}</p>
                        <div className="space-y-2">
                          {day.activities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                              <div className="text-sm font-medium text-blue-600 min-w-[80px]">
                                {activity.time}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{activity.title}</div>
                                <div className="text-sm text-gray-600">{activity.description}</div>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className="text-xs text-gray-500">{activity.duration}</span>
                                  <span className="text-xs font-medium text-green-600">{activity.cost}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map Integration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    Interactive Map View
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px] relative">
                    <ItineraryMap 
                      itinerary={itinerary}
                      selectedDay={selectedDay}
                      onLocationClick={() => {}}
                      isCustomizing={false}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customization History */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customization History</CardTitle>
                </CardHeader>
                <CardContent>
                  {customizationHistory.length === 0 ? (
                    <p className="text-sm text-gray-500">No customizations yet</p>
                  ) : (
                    <div className="space-y-3">
                      {customizationHistory.map((history, index) => (
                        <div key={index} className="border rounded p-3">
                          <div className="text-xs text-gray-500 mb-1">{history.timestamp}</div>
                          <div className="text-sm font-medium mb-1">
                            Budget: {history.customizations.budget}
                          </div>
                          <div className="text-sm font-medium mb-1">
                            Pace: {history.customizations.pace}
                          </div>
                          <div className="text-sm font-medium mb-1">
                            Interests: {history.customizations.interests.join(', ')}
                          </div>
                          <div className="text-sm font-semibold text-green-600">
                            Total: ₹{history.totalCost.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Features Demonstrated */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Features Demonstrated</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Real itinerary regeneration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Budget-based cost adjustment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Interest-based activity selection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Pace-based activity count</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Time slot generation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Accommodation & transport updates</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Customize Modal */}
          {showCustomize && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Customize Your Trip</h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowCustomize(false)}
                  >
                    Close
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Budget Selection */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Budget Range</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'budget', name: 'Budget', range: '₹5,000-10,000' },
                        { id: 'moderate', name: 'Moderate', range: '₹10,000-20,000' },
                        { id: 'premium', name: 'Premium', range: '₹20,000-35,000' },
                        { id: 'luxury', name: 'Luxury', range: '₹35,000+' }
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            const customizations = {
                              budget: option.id,
                              pace: 'moderate',
                              interests: ['sightseeing', 'dining']
                            };
                            handleCustomize(customizations);
                          }}
                          className="p-3 border rounded-lg hover:bg-gray-50 text-left"
                        >
                          <div className="font-medium">{option.name}</div>
                          <div className="text-sm text-gray-600">{option.range}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Test Options */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Test Options</h3>
                    <div className="space-y-2">
                      <Button
                        onClick={() => {
                          const customizations = {
                            budget: 'budget',
                            pace: 'relaxed',
                            interests: ['sightseeing']
                          };
                          handleCustomize(customizations);
                        }}
                        className="w-full"
                      >
                        Test: Budget + Relaxed + Sightseeing
                      </Button>
                      <Button
                        onClick={() => {
                          const customizations = {
                            budget: 'luxury',
                            pace: 'packed',
                            interests: ['adventure', 'dining', 'shopping']
                          };
                          handleCustomize(customizations);
                        }}
                        className="w-full"
                        variant="outline"
                      >
                        Test: Luxury + Packed + Adventure
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TestCustomizeItineraryPage;
