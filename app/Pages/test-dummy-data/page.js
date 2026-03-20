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
  Search,
  Filter,
  Globe,
  TrendingUp,
  Activity,
  Hotel,
  Car,
  CheckCircle,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

const TestDummyDataPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    try {
      const allDestinations = destinationService.getAllDestinations();
      setDestinations(allDestinations);
      
      // Calculate statistics
      const totalActivities = allDestinations.reduce((acc, dest) => {
        return acc + Object.values(dest.activities).reduce((actAcc, category) => actAcc + category.length, 0);
      }, 0);
      
      const totalStates = new Set(allDestinations.map(d => d.state)).size;
      const totalCategories = new Set(allDestinations.flatMap(d => Object.keys(d.activities))).size;
      
      setStats({
        destinations: allDestinations.length,
        activities: totalActivities,
        states: totalStates,
        categories: totalCategories,
        sampleItineraries: destinationService.getSampleItineraries().length
      });
      
      // Select first destination by default
      if (allDestinations.length > 0) {
        setSelectedDestination(allDestinations[0]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredDestinations = () => {
    let filtered = destinations;
    
    if (searchQuery) {
      filtered = destinationService.searchDestinations(searchQuery);
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(dest => 
        dest.popularFor.includes(selectedCategory)
      );
    }
    
    return filtered;
  };

  const getActivitiesForCategory = (category) => {
    if (!selectedDestination) return [];
    return destinationService.getActivitiesByCategory(selectedDestination.id, category);
  };

  const categories = [
    { id: 'all', name: 'All Categories', icon: Globe },
    { id: 'sightseeing', name: 'Sightseeing', icon: MapPin },
    { id: 'dining', name: 'Dining', icon: Activity },
    { id: 'shopping', name: 'Shopping', icon: TrendingUp },
    { id: 'culture', name: 'Culture', icon: Star },
    { id: 'adventure', name: 'Adventure', icon: Activity },
    { id: 'nature', name: 'Nature', icon: Globe },
    { id: 'beaches', name: 'Beaches', icon: Globe },
    { id: 'backwaters', name: 'Backwaters', icon: Globe },
    { id: 'hill-stations', name: 'Hill Stations', icon: Globe }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Loading Destination Data...</h2>
          <p className="text-gray-600 mt-2">Preparing realistic travel data for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              MapSathi Dummy Data Showcase
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Explore realistic travel data for multiple destinations across India
            </p>
            <Button onClick={loadData} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Reload Data
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.destinations}</div>
                <div className="text-sm text-gray-600">Destinations</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.activities}</div>
                <div className="text-sm text-gray-600">Activities</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.states}</div>
                <div className="text-sm text-gray-600">States</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.categories}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-pink-600">{stats.sampleItineraries}</div>
                <div className="text-sm text-gray-600">Sample Itineraries</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-1"
                  >
                    <Icon className="w-3 h-3" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Destinations List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Destinations ({getFilteredDestinations().length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {getFilteredDestinations().map(destination => (
                      <div
                        key={destination.id}
                        onClick={() => setSelectedDestination(destination)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedDestination?.id === destination.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">{destination.name}</div>
                        <div className="text-sm text-gray-600">{destination.state}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {destination.popularFor.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Destination Details */}
            <div className="lg:col-span-2">
              {selectedDestination ? (
                <div className="space-y-6">
                  {/* Destination Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        {selectedDestination.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-600">{selectedDestination.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              Best Time
                            </div>
                            <div className="font-medium">{selectedDestination.bestTimeToVisit}</div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              Duration
                            </div>
                            <div className="font-medium">{selectedDestination.averageDuration}</div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <DollarSign className="w-4 h-4" />
                              Budget
                            </div>
                            <div className="font-medium">
                              ₹{selectedDestination.budget.moderate?.min || 5000} - 
                              ₹{selectedDestination.budget.moderate?.max || 20000}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Star className="w-4 h-4" />
                              Popular For
                            </div>
                            <div className="font-medium">
                              {selectedDestination.popularFor.join(', ')}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {selectedDestination.popularFor.map(tag => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Activities by Category */}
                  {Object.entries(selectedDestination.activities).map(([category, activities]) => (
                    <Card key={category}>
                      <CardHeader>
                        <CardTitle className="capitalize flex items-center gap-2">
                          <Activity className="w-5 h-5" />
                          {category} ({activities.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {activities.slice(0, 3).map(activity => (
                            <div key={activity.id} className="border rounded-lg p-3">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-semibold">{activity.name}</h4>
                                  <p className="text-sm text-gray-600">{activity.description}</p>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-green-600">₹{activity.cost}</div>
                                  <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Star className="w-3 h-3 fill-current text-yellow-500" />
                                    {activity.rating}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {activity.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {activity.timeSlots.length} slots
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {activity.highlights.slice(0, 3).map(highlight => (
                                  <Badge key={highlight} variant="secondary" className="text-xs">
                                    {highlight}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                          {activities.length > 3 && (
                            <div className="text-center">
                              <Button variant="outline" size="sm">
                                View {activities.length - 3} more {category}
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Accommodation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Hotel className="w-5 h-5" />
                        Accommodation Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedDestination.accommodation.map(acc => (
                          <div key={acc.id} className="border rounded-lg p-3">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold">{acc.name}</h4>
                                <p className="text-sm text-gray-600">{acc.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-green-600">₹{acc.price}/night</div>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Star className="w-3 h-3 fill-current text-yellow-500" />
                                  {acc.rating}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {acc.amenities.slice(0, 3).map(amenity => (
                                <Badge key={amenity} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Transport */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Car className="w-5 h-5" />
                        Transport Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedDestination.transport.map(transport => (
                          <div key={transport.id} className="border rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">{transport.name}</h4>
                                <p className="text-sm text-gray-600">{transport.description}</p>
                              </div>
                              <div className="font-semibold text-green-600">₹{transport.cost}/day</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Select a Destination
                    </h3>
                    <p className="text-gray-600">
                      Choose a destination from the list to view detailed information
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sample Itineraries */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Sample Itineraries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {destinationService.getSampleItineraries().map(itinerary => (
                    <div key={itinerary.id} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{itinerary.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{itinerary.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {itinerary.destination}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {itinerary.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {itinerary.travelers}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{itinerary.budget}</Badge>
                        <div className="font-semibold text-green-600">₹{itinerary.totalCost}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestDummyDataPage;
