'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CustomizeTrip from '@/components/CustomizeTrip';
import destinationService from '@/services/destinationService';
import ReviewSystem from '@/components/ReviewSystem';
import dynamic from 'next/dynamic';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Heart, 
  Camera, 
  Utensils, 
  Hotel, 
  Car,
  Clock,
  DollarSign,
  Sparkles,
  Star,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Check,
  Compass,
  Route,
  Mountain,
  Plane,
  Train,
  Ship
} from 'lucide-react';

const TripPlannerPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [tripData, setTripData] = useState({
    destination: '',
    duration: '',
    travelers: '',
    budget: '',
    interests: [],
    accommodation: '',
    transport: '',
    activities: [],
    customizations: {}
  });

  // Location search functionality
  const searchLocations = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=in`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const results = data.map(result => ({
          name: result.display_name.split(',')[0],
          fullName: result.display_name,
          lat: parseFloat(result.lat),
          lon: parseFloat(result.lon),
          type: result.type
        }));
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setTripData(prev => ({
      ...prev,
      destination: location.name
    }));
    setSearchQuery(location.name);
    setSearchResults([]);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (value.trim()) {
      const timeoutId = setTimeout(() => {
        searchLocations(value);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  };

  const destinations = [
    { id: 'delhi', name: 'Delhi', icon: Mountain, description: 'Historical monuments & vibrant culture' },
    { id: 'mumbai', name: 'Mumbai', icon: Camera, description: 'Bollywood dreams & coastal vibes' },
    { id: 'jaipur', name: 'Jaipur', icon: Mountain, description: 'Pink city & royal palaces' },
    { id: 'goa', name: 'Goa', icon: Ship, description: 'Beaches & nightlife paradise' },
    { id: 'varanasi', name: 'Varanasi', icon: Heart, description: 'Spiritual capital & ancient traditions' },
    { id: 'kerala', name: 'Kerala', icon: Ship, description: 'Backwaters & serene landscapes' }
  ];

  const interests = [
    { id: 'adventure', name: 'Adventure', icon: Mountain, color: 'bg-green-500' },
    { id: 'culture', name: 'Culture', icon: Heart, color: 'bg-purple-500' },
    { id: 'food', name: 'Food', icon: Utensils, color: 'bg-orange-500' },
    { id: 'photography', name: 'Photography', icon: Camera, color: 'bg-blue-500' },
    { id: 'spiritual', name: 'Spiritual', icon: Star, color: 'bg-yellow-500' },
    { id: 'nature', name: 'Nature', icon: Compass, color: 'bg-emerald-500' }
  ];

  const activities = [
    { id: 'sightseeing', name: 'Sightseeing', icon: Camera, duration: '2-3 hours' },
    { id: 'food-tour', name: 'Food Tour', icon: Utensils, duration: '3-4 hours' },
    { id: 'adventure', name: 'Adventure Sports', icon: Mountain, duration: '4-5 hours' },
    { id: 'shopping', name: 'Shopping', icon: Heart, duration: '2-3 hours' },
    { id: 'relaxation', name: 'Spa & Wellness', icon: Star, duration: '2-3 hours' },
    { id: 'nightlife', name: 'Nightlife', icon: Sparkles, duration: '4-5 hours' }
  ];

  const updateTripData = (key, value) => {
    setTripData(prev => ({ ...prev, [key]: value }));
  };

  const toggleInterest = (interestId) => {
    setTripData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const toggleActivity = (activityId) => {
    setTripData(prev => ({
      ...prev,
      activities: prev.activities.includes(activityId)
        ? prev.activities.filter(id => id !== activityId)
        : [...prev.activities, activityId]
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const generateTrip = () => {
    // In a real app, this would call an API to generate the trip
    console.log('Generating trip with data:', tripData);
    router.push('/Pages/trip-planner/itinerary');
  };

  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Route className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Trip Planner</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Step {currentStep} of 3</span>
              <Progress value={progress} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    Choose Your Destination
                  </CardTitle>
                  <p className="text-gray-600">Select where you'd like to explore</p>
                </CardHeader>
                <CardContent>
                  {/* Location Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search for any location in India
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search cities, landmarks, or places..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {isSearching && (
                        <div className="absolute right-3 top-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        </div>
                      )}
                      
                      {/* Search Results Dropdown */}
                      {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                          {searchResults.map((result, index) => (
                            <div
                              key={index}
                              onClick={() => handleLocationSelect(result)}
                              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            >
                              <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <div>
                                  <div className="font-medium text-gray-900">{result.name}</div>
                                  <div className="text-sm text-gray-500">{result.fullName}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {selectedLocation && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-800">
                          Selected: {selectedLocation.name}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Popular Destinations */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Popular Destinations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {destinations.map((dest) => {
                        const Icon = dest.icon;
                        return (
                          <div
                            key={dest.id}
                            onClick={() => {
                              updateTripData('destination', dest.id);
                              setSelectedLocation(null);
                              setSearchQuery('');
                            }}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                              tripData.destination === dest.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-3 bg-blue-100 rounded-lg">
                                <Icon className="w-6 h-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{dest.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{dest.description}</p>
                              </div>
                            </div>
                            {tripData.destination === dest.id && (
                              <div className="mt-4 flex items-center gap-2 text-green-600">
                                <Check className="w-4 h-4" />
                                <span className="text-sm">Selected</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Duration and Travelers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      Trip Duration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {['2-3 days', '4-5 days', '1 week', '2 weeks'].map((duration) => (
                        <button
                          key={duration}
                          onClick={() => updateTripData('duration', duration)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            tripData.duration === duration
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {duration}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Number of Travelers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {['Solo', 'Couple', 'Family (3-4)', 'Group (5+)'].map((travelers) => (
                        <button
                          key={travelers}
                          onClick={() => updateTripData('travelers', travelers)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            tripData.travelers === travelers
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {travelers}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Heart className="w-6 h-6 text-purple-600" />
                    Select Your Interests
                  </CardTitle>
                  <p className="text-gray-600">What do you love to do while traveling?</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {interests.map((interest) => {
                      const Icon = interest.icon;
                      return (
                        <div
                          key={interest.id}
                          onClick={() => toggleInterest(interest.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                            tripData.interests.includes(interest.id)
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div className={`p-3 rounded-lg ${interest.color}`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-medium">{interest.name}</span>
                          </div>
                          {tripData.interests.includes(interest.id) && (
                            <div className="mt-2 flex justify-center">
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Budget and Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      Budget Range
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {['Budget', 'Moderate', 'Premium', 'Luxury'].map((budget) => (
                        <button
                          key={budget}
                          onClick={() => updateTripData('budget', budget)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            tripData.budget === budget
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Hotel className="w-5 h-5 text-blue-600" />
                      Accommodation Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {['Hotel', 'Hostel', 'Resort', 'Homestay'].map((accommodation) => (
                        <button
                          key={accommodation}
                          onClick={() => updateTripData('accommodation', accommodation)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            tripData.accommodation === accommodation
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {accommodation}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sparkles className="w-6 h-6 text-yellow-600" />
                    Choose Your Activities
                  </CardTitle>
                  <p className="text-gray-600">Select activities you'd like to include</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activities.map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div
                          key={activity.id}
                          onClick={() => toggleActivity(activity.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                            tripData.activities.includes(activity.id)
                              ? 'border-yellow-500 bg-yellow-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-yellow-100 rounded-lg">
                                <Icon className="w-5 h-5 text-yellow-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{activity.name}</h4>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {activity.duration}
                                </p>
                              </div>
                            </div>
                            {tripData.activities.includes(activity.id) && (
                              <Check className="w-5 h-5 text-green-600" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Transportation */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-blue-600" />
                    Transportation Preference
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 'flight', name: 'Flight', icon: Plane },
                      { id: 'train', name: 'Train', icon: Train },
                      { id: 'car', name: 'Car', icon: Car },
                      { id: 'bus', name: 'Bus', icon: Car }
                    ].map((transport) => {
                      const Icon = transport.icon;
                      return (
                        <button
                          key={transport.id}
                          onClick={() => updateTripData('transport', transport.id)}
                          className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                            tripData.transport === transport.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Icon className="w-6 h-6 text-blue-600" />
                            <span className="font-medium">{transport.name}</span>
                          </div>
                          {tripData.transport === transport.id && (
                            <Check className="w-4 h-4 text-green-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Trip Summary */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Route className="w-6 h-6 text-blue-600" />
                    Your Custom Trip Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Trip Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">
                            {destinations.find(d => d.id === tripData.destination)?.name || 'Not selected'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{tripData.duration || 'Not selected'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{tripData.travelers || 'Not selected'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{tripData.budget || 'Not selected'} budget</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Preferences</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">
                            {tripData.interests.length} interests selected
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">
                            {tripData.activities.length} activities selected
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Hotel className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{tripData.accommodation || 'Not selected'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{tripData.transport || 'Not selected'} transport</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => router.push('/Pages/maps')}
              className="flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              View Map
            </Button>
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={generateTrip}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Sparkles className="w-4 h-4" />
                Generate My Trip
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <ReviewSystem destinationId={tripData.destination} destinationName={tripData.destination} />
      </div>
    </div>
  );
};

export default TripPlannerPage;
