'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic';
import { 
  MapPin, 
  Eye, 
  EyeOff, 
  Palette,
  Brush,
  Layers,
  Sparkles,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

// Dynamic import for map component
const ItineraryMap = dynamic(() => import('@/components/ItineraryMap'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>
});

// Sample itinerary data
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
    },
    {
      day: 2,
      title: 'Cultural Day',
      theme: 'Arts & Local Life',
      activities: [
        {
          time: '9:00 AM',
          title: 'Hawa Mahal',
          description: 'Palace of Winds',
          duration: '1 hour',
          cost: '₹200'
        }
      ]
    }
  ]
};

const TestMapStylingPage = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [showMap, setShowMap] = useState(true);
  const [themeVariant, setThemeVariant] = useState('gradient');

  const handleMapLocationClick = (locationData) => {
    if (locationData.type === 'daySelect') {
      setSelectedDay(locationData.dayNumber);
    }
  };

  const themeVariants = [
    {
      id: 'gradient',
      name: 'Gradient Theme',
      description: 'Blue to purple gradient with transparency',
      cardClass: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
      contentClass: 'bg-gradient-to-br from-blue-50/50 via-white/30 to-purple-50/50',
      mapClass: 'bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20'
    },
    {
      id: 'enhanced',
      name: 'Enhanced Theme',
      description: 'More prominent gradient colors',
      cardClass: 'bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100',
      contentClass: 'bg-gradient-to-br from-blue-100/70 via-white/50 to-purple-100/70',
      mapClass: 'bg-gradient-to-br from-blue-200/30 via-white/20 to-purple-200/30'
    },
    {
      id: 'subtle',
      name: 'Subtle Theme',
      description: 'Light gradient with minimal color',
      cardClass: 'bg-gradient-to-br from-gray-50 via-white to-gray-50',
      contentClass: 'bg-gradient-to-br from-gray-50/30 via-white/20 to-gray-50/30',
      mapClass: 'bg-gradient-to-br from-gray-100/10 via-transparent to-gray-100/10'
    }
  ];

  const currentTheme = themeVariants.find(t => t.id === themeVariant) || themeVariants[0];

  return (
    <div className={`min-h-screen ${currentTheme.cardClass}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Interactive Map Styling Test
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Test different gradient themes for the Interactive Trip Map
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setShowMap(!showMap)}
                variant="outline"
                className="flex items-center gap-2"
              >
                {showMap ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showMap ? 'Hide Map' : 'Show Map'}
              </Button>
            </div>
          </div>

          {/* Theme Selector */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme Variants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {themeVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setThemeVariant(variant.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        themeVariant === variant.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-left">
                        <h3 className="font-semibold mb-1">{variant.name}</h3>
                        <p className="text-sm text-gray-600">{variant.description}</p>
                      </div>
                      {themeVariant === variant.id && (
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-2" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="overflow-hidden">
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
                    <Badge className="bg-white/20 text-white border-white/20 mt-2">
                      {currentTheme.name}
                    </Badge>
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
                <CardContent className={`p-0 ${currentTheme.contentClass}`}>
                  <div className={`h-96 md:h-[500px] relative w-full ${currentTheme.mapClass}`}>
                    <ItineraryMap 
                      itinerary={sampleItinerary}
                      selectedDay={selectedDay}
                      onLocationClick={handleMapLocationClick}
                      isCustomizing={false}
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>

          {/* Styling Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brush className="w-5 h-5" />
                  Applied Styling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Page Background</h4>
                    <div className={`p-3 rounded ${currentTheme.cardClass}`}>
                      <code className="text-xs">
                        {currentTheme.cardClass}
                      </code>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Card Background</h4>
                    <div className={`p-3 rounded ${currentTheme.contentClass}`}>
                      <code className="text-xs">
                        {currentTheme.contentClass}
                      </code>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Map Container</h4>
                    <div className={`p-3 rounded ${currentTheme.mapClass}`}>
                      <code className="text-xs">
                        {currentTheme.mapClass}
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Visual Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Full height gradient background</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Theme-colored map container</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Gradient card backgrounds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Transparent overlays</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Consistent color scheme</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Navigation */}
          <div className="mt-12">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Test in Actual Application</h3>
                  <p className="text-gray-600 mb-6">
                    See the enhanced map styling in the real itinerary page
                  </p>
                  <Button
                    onClick={() => window.location.href = '/Pages/trip-planner/itinerary'}
                    className="flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    View Live Itinerary Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestMapStylingPage;
