'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic';
import { 
  MapPin, 
  Navigation, 
  CheckCircle, 
  Clock, 
  Star,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

// Dynamic import for map component
const ItineraryMap = dynamic(() => import('@/components/ItineraryMap'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">Loading enhanced map...</div>
});

// Sample enhanced itinerary data
const sampleItinerary = {
  destination: 'Jaipur',
  duration: '3 days',
  travelers: 'Couple',
  days: [
    {
      day: 1,
      title: 'Historical Heritage Day',
      theme: 'Royal Palaces & Forts',
      activities: [
        {
          time: '8:00 AM',
          title: 'Amber Fort Visit',
          description: 'Explore the magnificent Amber Fort with elephant ride option',
          duration: '3 hours',
          cost: '₹500'
        },
        {
          time: '12:00 PM',
          title: 'Traditional Rajasthani Lunch',
          description: 'Authentic Rajasthani cuisine at Chokhi Dhani',
          duration: '1.5 hours',
          cost: '₹800'
        },
        {
          time: '2:30 PM',
          title: 'City Palace Tour',
          description: 'Royal residence with museum and courtyards',
          duration: '2 hours',
          cost: '₹300'
        }
      ]
    },
    {
      day: 2,
      title: 'Cultural Exploration Day',
      theme: 'Arts & Local Life',
      activities: [
        {
          time: '9:00 AM',
          title: 'Hawa Mahal',
          description: 'Palace of Winds with intricate architecture',
          duration: '1 hour',
          cost: '₹200'
        },
        {
          time: '11:00 AM',
          title: 'Jantar Mantar',
          description: 'Ancient astronomical observatory',
          duration: '1.5 hours',
          cost: '₹150'
        },
        {
          time: '1:00 PM',
          title: 'Local Market Shopping',
          description: 'Shop for traditional handicrafts and textiles',
          duration: '2 hours',
          cost: 'Varies'
        }
      ]
    },
    {
      day: 3,
      title: 'Nature & Relaxation Day',
      theme: 'Gardens & Lakes',
      activities: [
        {
          time: '8:00 AM',
          title: 'Jal Mahal',
          description: 'Water Palace in the middle of Man Sagar Lake',
          duration: '1 hour',
          cost: '₹100'
        },
        {
          time: '10:00 AM',
          title: 'Central Park',
          description: 'Beautiful garden for morning walk',
          duration: '1 hour',
          cost: 'Free'
        },
        {
          time: '12:00 PM',
          title: 'Farewell Lunch',
          description: 'Traditional Rajasthani thali',
          duration: '1.5 hours',
          cost: '₹600'
        }
      ]
    }
  ]
};

const TestEnhancedMapPage = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showFeatures, setShowFeatures] = useState(true);
  const [testMode, setTestMode] = useState('navigation');

  const handleMapLocationClick = (locationData) => {
    if (locationData.type === 'daySelect') {
      setSelectedDay(locationData.dayNumber);
    } else {
      setSelectedLocation(locationData);
    }
  };

  const features = [
    {
      title: 'Day-wise Navigation',
      description: 'Navigate through destinations day by day',
      icon: Navigation,
      color: 'bg-blue-500',
      demo: 'navigation'
    },
    {
      title: 'Visited Destinations',
      description: 'Mark destinations as visited during your trip',
      icon: CheckCircle,
      color: 'bg-green-500',
      demo: 'visited'
    },
    {
      title: 'Darker Icons',
      description: 'More prominent and visible marker icons',
      icon: MapPin,
      color: 'bg-purple-500',
      demo: 'icons'
    },
    {
      title: 'Route Planning',
      description: 'Visualize routes between destinations',
      icon: ArrowRight,
      color: 'bg-orange-500',
      demo: 'routes'
    }
  ];

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
              Enhanced Map Functionality Test
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Test the new day-wise navigation, visited destinations, and enhanced map features
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant={testMode === 'navigation' ? 'default' : 'outline'}
                onClick={() => setTestMode('navigation')}
                className="flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Navigation Test
              </Button>
              <Button
                variant={testMode === 'visited' ? 'default' : 'outline'}
                onClick={() => setTestMode('visited')}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Visited Test
              </Button>
              <Button
                variant={testMode === 'visual' ? 'default' : 'outline'}
                onClick={() => setTestMode('visual')}
                className="flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Visual Test
              </Button>
            </div>
          </div>

          {/* Features Overview */}
          {showFeatures && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${feature.color}`}>
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-sm">{feature.title}</h3>
                      </div>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Main Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Container */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-6 h-6" />
                        Enhanced Interactive Map
                      </CardTitle>
                      <p className="text-blue-100 mt-1">
                        Day {selectedDay} • {sampleItinerary.days[selectedDay - 1]?.title}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFeatures(!showFeatures)}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      {showFeatures ? 'Hide' : 'Show'} Features
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[600px] relative">
                    <ItineraryMap 
                      itinerary={sampleItinerary}
                      selectedDay={selectedDay}
                      onLocationClick={handleMapLocationClick}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Control Panel */}
            <div className="space-y-6">
              {/* Test Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Test Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {testMode === 'navigation' && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Navigation className="w-4 h-4" />
                        Navigation Testing
                      </h4>
                      <ol className="text-sm text-gray-600 space-y-1">
                        <li>1. Click "Start Navigation" in map panel</li>
                        <li>2. Watch current destination highlight</li>
                        <li>3. Use Previous/Next buttons to navigate</li>
                        <li>4. Mark destinations as visited</li>
                        <li>5. Track progress bar</li>
                      </ol>
                    </div>
                  )}

                  {testMode === 'visited' && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Visited Testing
                      </h4>
                      <ol className="text-sm text-gray-600 space-y-1">
                        <li>1. Click on any map marker</li>
                        <li>2. Click "Mark Visited" button</li>
                        <li>3. See icon change to checkmark</li>
                        <li>4. Color changes to gray</li>
                        <li>5. Badge shows "✓ Visited"</li>
                      </ol>
                    </div>
                  )}

                  {testMode === 'visual' && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Visual Testing
                      </h4>
                      <ol className="text-sm text-gray-600 space-y-1">
                        <li>1. Observe darker icon colors</li>
                        <li>2. Check pulse animation on current</li>
                        <li>3. Test different day selections</li>
                        <li>4. Verify route lines display</li>
                        <li>5. Check responsive design</li>
                      </ol>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <Button
                      onClick={() => window.location.reload()}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset Test
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Location Details */}
              {selectedLocation && selectedLocation.type !== 'daySelect' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Selected Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Day {selectedLocation.dayNumber}</Badge>
                        <Badge variant="secondary">{selectedLocation.type}</Badge>
                      </div>
                      <h4 className="font-semibold">{selectedLocation.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedLocation.time}
                        </span>
                        <span>{selectedLocation.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600">{selectedLocation.description}</p>
                      <div className="font-medium text-green-600">{selectedLocation.cost}</div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Test Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Destinations</span>
                      <span className="font-semibold">
                        {sampleItinerary.days.reduce((acc, day) => acc + day.activities.length, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Day</span>
                      <span className="font-semibold">Day {selectedDay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Test Mode</span>
                      <Badge variant="outline">{testMode}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Enhanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Navigation className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Smart Navigation</h3>
                      <p className="text-sm text-gray-600">Day-by-day destination planning</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Current destination highlighting</li>
                    <li>• Progress tracking</li>
                    <li>• Previous/Next navigation</li>
                    <li>• Real-time updates</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Visited Tracking</h3>
                      <p className="text-sm text-gray-600">Mark destinations as visited</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Visual visited indicators</li>
                    <li>• Checkmark icons</li>
                    <li>• Gray color for visited</li>
                    <li>• Persistent state</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Enhanced Visuals</h3>
                      <p className="text-sm text-gray-600">Darker, more prominent icons</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Darker color scheme</li>
                    <li>• Pulse animations</li>
                    <li>• Better visibility</li>
                    <li>• Current destination badge</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestEnhancedMapPage;
