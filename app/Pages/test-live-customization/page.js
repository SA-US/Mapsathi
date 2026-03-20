'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import destinationService from '@/services/destinationService';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  Star,
  Users,
  Settings,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  TrendingUp
} from 'lucide-react';

const TestLiveCustomizationPage = () => {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customizationHistory, setCustomizationHistory] = useState([]);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    loadInitialItinerary();
  }, []);

  const loadInitialItinerary = () => {
    setLoading(true);
    try {
      // Load sample itinerary
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
    } catch (error) {
      console.error('Error loading itinerary:', error);
    } finally {
      setLoading(false);
    }
  };

  const runCustomizationTest = (customizations) => {
    setLoading(true);
    
    try {
      // Get destination data
      const destination = destinationService.getDestinationById('jaipur');
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
        selectedActivities.push(...activities.slice(0, 2));
      });

      // Generate new days
      const days = [];
      const activitiesPerDay = customizations.pace === 'relaxed' ? 2 : customizations.pace === 'packed' ? 4 : 3;
      const totalDays = parseInt(itinerary.duration) || 3;
      
      for (let day = 1; day <= totalDays; day++) {
        const startIndex = (day - 1) * activitiesPerDay;
        const endIndex = Math.min(startIndex + activitiesPerDay, selectedActivities.length);
        const dayActivities = selectedActivities.slice(startIndex, endIndex);
        
        const formattedActivities = dayActivities.map((activity, index) => ({
          time: `${8 + index * 2}:00 AM`,
          title: activity.name,
          type: activity.category,
          duration: activity.duration,
          description: activity.description,
          highlights: activity.highlights,
          cost: `₹${activity.cost}`,
          tips: activity.tips
        }));

        days.push({
          day,
          title: `Day ${day}: ${customizations.interests[0] ? customizations.interests[0].charAt(0).toUpperCase() + customizations.interests[0].slice(1) : 'Heritage'} Experience`,
          theme: `Based on ${customizations.interests.join(', ')}`,
          activities: formattedActivities
        });
      }

      // Get accommodation and transport
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
      
      // Add to history
      setCustomizationHistory(prev => [
        ...prev,
        {
          timestamp: new Date().toLocaleString(),
          customizations,
          totalCost: estimatedCost,
          activitiesCount: days.reduce((acc, day) => acc + day.activities.length, 0)
        }
      ]);

      // Add test result
      setTestResults(prev => [
        ...prev,
        {
          timestamp: new Date().toLocaleString(),
          budget: customizations.budget,
          interests: customizations.interests,
          pace: customizations.pace,
          totalCost: estimatedCost,
          success: true
        }
      ]);

    } catch (error) {
      console.error('Customization error:', error);
      setTestResults(prev => [
        ...prev,
        {
          timestamp: new Date().toLocaleString(),
          error: error.message,
          success: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickTests = [
    {
      name: 'Budget Adventure',
      customizations: {
        budget: 'budget',
        interests: ['adventure', 'nature'],
        pace: 'packed'
      }
    },
    {
      name: 'Luxury Heritage',
      customizations: {
        budget: 'luxury',
        interests: ['sightseeing', 'culture', 'dining'],
        pace: 'relaxed'
      }
    },
    {
      name: 'Moderate Culture',
      customizations: {
        budget: 'moderate',
        interests: ['culture', 'shopping'],
        pace: 'moderate'
      }
    },
    {
      name: 'Premium Adventure',
      customizations: {
        budget: 'premium',
        interests: ['adventure', 'dining', 'shopping'],
        pace: 'packed'
      }
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Loading Customization Test...</h2>
        </div>
      </div>
    );
  }

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
              Live Customization Test
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Test real-time itinerary customization with dynamic data
            </p>
            <Button onClick={loadInitialItinerary} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Reset to Original
            </Button>
          </div>

          {/* Current Itinerary Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Destination</span>
                </div>
                <div className="text-lg font-semibold">{itinerary?.destination || 'Jaipur'}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Budget</span>
                </div>
                <div className="text-lg font-semibold capitalize">{itinerary?.budget || 'moderate'}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <div className="text-lg font-semibold">{itinerary?.duration || '3 days'}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium">Total Cost</span>
                </div>
                <div className="text-lg font-semibold">{itinerary?.overview?.totalCost || '₹18,400'}</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Test Buttons */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Quick Customization Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickTests.map((test, index) => (
                    <Button
                      key={index}
                      onClick={() => runCustomizationTest(test.customizations)}
                      className="flex items-center gap-2"
                      variant="outline"
                    >
                      <Settings className="w-4 h-4" />
                      {test.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Itinerary Display */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-6 h-6" />
                    Current Itinerary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {itinerary?.days?.map((day) => (
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

              {/* Accommodation & Transport */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Accommodation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="font-semibold">{itinerary?.accommodation?.name}</div>
                      <div className="text-sm text-gray-600">{itinerary?.accommodation?.description}</div>
                      <div className="text-sm font-medium text-green-600">{itinerary?.accommodation?.price}</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Transport</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="font-semibold">{itinerary?.transport?.name}</div>
                      <div className="text-sm text-gray-600">{itinerary?.transport?.description}</div>
                      <div className="text-sm font-medium text-green-600">{itinerary?.transport?.cost}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Test Results */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {testResults.length === 0 ? (
                      <p className="text-sm text-gray-500">No tests run yet</p>
                    ) : (
                      testResults.map((result, index) => (
                        <div key={index} className={`border rounded p-3 ${result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                          <div className="text-xs text-gray-500 mb-1">{result.timestamp}</div>
                          {result.success ? (
                            <div>
                              <div className="text-sm font-medium mb-1">Success!</div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <div>Budget: {result.budget}</div>
                                <div>Interests: {result.interests?.join(', ')}</div>
                                <div>Pace: {result.pace}</div>
                                <div className="font-semibold text-green-600">Total: ₹{result.totalCost?.toLocaleString()}</div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="text-sm font-medium mb-1 text-red-600">Error</div>
                              <div className="text-sm text-red-600">{result.error}</div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Customization History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    Customization History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {customizationHistory.length === 0 ? (
                      <p className="text-sm text-gray-500">No customizations yet</p>
                    ) : (
                      customizationHistory.map((history, index) => (
                        <div key={index} className="border rounded p-3">
                          <div className="text-xs text-gray-500 mb-1">{history.timestamp}</div>
                          <div className="text-sm space-y-1">
                            <div>Budget: {history.customizations.budget}</div>
                            <div>Interests: {history.customizations.interests.join(', ')}</div>
                            <div>Pace: {history.customizations.pace}</div>
                            <div className="font-semibold text-green-600">Total: ₹{history.totalCost.toLocaleString()}</div>
                            <div className="text-xs text-gray-600">Activities: {history.activitiesCount}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Test Navigation */}
          <div className="mt-12">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Test in Actual Application</h3>
                  <p className="text-gray-600 mb-6">
                    See the live customization in the real itinerary page
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

export default TestLiveCustomizationPage;
