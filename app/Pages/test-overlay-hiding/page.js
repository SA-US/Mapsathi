'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic';
import { 
  MapPin, 
  Settings, 
  Eye, 
  EyeOff, 
  Layers,
  CheckCircle,
  AlertCircle,
  Info
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

const TestOverlayHidingPage = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const handleMapLocationClick = (locationData) => {
    if (locationData.type === 'daySelect') {
      setSelectedDay(locationData.dayNumber);
    }
  };

  const toggleCustomization = () => {
    setIsCustomizing(!isCustomizing);
  };

  const overlayElements = [
    {
      name: 'Navigation Planning Panel',
      description: 'Start Navigation button and current destination display',
      position: 'top-left',
      icon: Settings
    },
    {
      name: 'Activity Types Legend',
      description: 'Color-coded activity type indicators',
      position: 'bottom-left',
      icon: Layers
    },
    {
      name: 'Day Selector',
      description: 'Day selection buttons',
      position: 'top-right',
      icon: MapPin
    },
    {
      name: 'Zoom Controls',
      description: 'Map zoom in/out buttons',
      position: 'top-left (leaflet)',
      icon: Eye
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Map Overlay Hiding Test
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Test the hiding of map UI overlays during customization
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={toggleCustomization}
                variant={isCustomizing ? 'destructive' : 'default'}
                className="flex items-center gap-2"
              >
                {isCustomizing ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Customization Mode ON
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Customization Mode OFF
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowInstructions(!showInstructions)}
                className="flex items-center gap-2"
              >
                <Info className="w-4 h-4" />
                {showInstructions ? 'Hide' : 'Show'} Instructions
              </Button>
            </div>
          </div>

          {/* Instructions */}
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Test Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        When Customization Mode is OFF:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• All map overlays are visible</li>
                        <li>• Navigation panel shows current destination</li>
                        <li>• Activity legend displays color codes</li>
                        <li>• Day selector allows day switching</li>
                        <li>• Zoom controls are accessible</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-red-600 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        When Customization Mode is ON:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• All map overlays are hidden</li>
                        <li>• Navigation panel disappears</li>
                        <li>• Activity legend is hidden</li>
                        <li>• Day selector is hidden</li>
                        <li>• Zoom controls are hidden</li>
                        <li>• Map background remains visible</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Map Container */}
            <div className="lg:col-span-3">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-6 h-6" />
                        Interactive Map Test
                      </CardTitle>
                      <p className="text-blue-100 mt-1">
                        {isCustomizing ? 'Customization Mode - Overlays Hidden' : 'Normal Mode - Overlays Visible'}
                      </p>
                    </div>
                    <Badge variant={isCustomizing ? 'destructive' : 'default'} className="bg-white/20 text-white border-white/20">
                      {isCustomizing ? 'CUSTOMIZING' : 'NORMAL'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[500px] relative">
                    <ItineraryMap 
                      itinerary={sampleItinerary}
                      selectedDay={selectedDay}
                      onLocationClick={handleMapLocationClick}
                      isCustomizing={isCustomizing}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status Panel */}
            <div className="space-y-6">
              {/* Overlay Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Overlay Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {overlayElements.map((element, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <element.icon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{element.name}</span>
                        </div>
                        <Badge variant={isCustomizing ? 'secondary' : 'default'}>
                          {isCustomizing ? 'Hidden' : 'Visible'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Test Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Test Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={toggleCustomization}
                    variant={isCustomizing ? 'destructive' : 'default'}
                    className="w-full"
                  >
                    {isCustomizing ? 'Exit Customization Mode' : 'Enter Customization Mode'}
                  </Button>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2 text-sm">Quick Test Steps:</h4>
                    <ol className="text-xs text-gray-600 space-y-1">
                      <li>1. Click "Enter Customization Mode"</li>
                      <li>2. Verify all overlays disappear</li>
                      <li>3. Check map background remains</li>
                      <li>4. Click "Exit Customization Mode"</li>
                      <li>5. Verify overlays reappear</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Visual Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Visual Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isCustomizing ? 'bg-red-500' : 'bg-green-500'}`}></div>
                      <span className="text-sm">Mode: {isCustomizing ? 'Customization' : 'Normal'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isCustomizing ? 'bg-gray-400' : 'bg-blue-500'}`}></div>
                      <span className="text-sm">Overlays: {isCustomizing ? 'Hidden' : 'Visible'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Map: Always Visible</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feature Details */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Implementation Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Settings className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">State Management</h3>
                      <p className="text-sm text-gray-600">isCustomizing prop controls visibility</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Boolean state tracking</li>
                    <li>• Prop drilling to map</li>
                    <li>• Conditional rendering</li>
                    <li>• Smooth transitions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Eye className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">CSS Transitions</h3>
                      <p className="text-sm text-gray-600">Smooth fade in/out animations</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• opacity-0 to opacity-100</li>
                    <li>• invisible to visible</li>
                    <li>• 300ms duration</li>
                    <li>• Tailwind transitions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Layers className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Overlay Elements</h3>
                      <p className="text-sm text-gray-600">All UI controls hidden during customization</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Navigation panel</li>
                    <li>• Activity legend</li>
                    <li>• Day selector</li>
                    <li>• Zoom controls</li>
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

export default TestOverlayHidingPage;
