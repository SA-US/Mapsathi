'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Calendar, 
  Clock, 
  DollarSign,
  Users,
  MapPin,
  Star,
  Heart,
  Camera,
  Utensils,
  Hotel,
  Car,
  Plus,
  Minus,
  Save,
  RotateCcw,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Mountain,
  Plane,
  Train
} from 'lucide-react';

const CustomizeTrip = ({ itinerary, onCustomize, onSave }) => {
  const [customizations, setCustomizations] = useState({
    budget: itinerary.budget || 'moderate',
    pace: 'moderate',
    interests: [...(itinerary.interests || [])],
    accommodation: 'hotel',
    transport: 'private',
    mealPreferences: [],
    specialRequests: '',
    freeTime: 2
  });

  const [activeTab, setActiveTab] = useState('budget');
  const [hasChanges, setHasChanges] = useState(false);

  const updateCustomization = (key, value) => {
    setCustomizations(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const toggleInterest = (interest) => {
    setCustomizations(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
    setHasChanges(true);
  };

  const toggleMealPreference = (preference) => {
    setCustomizations(prev => ({
      ...prev,
      mealPreferences: prev.mealPreferences.includes(preference)
        ? prev.mealPreferences.filter(p => p !== preference)
        : [...prev.mealPreferences, preference]
    }));
    setHasChanges(true);
  };

  const resetCustomizations = () => {
    setCustomizations({
      budget: 'moderate',
      pace: 'moderate',
      interests: [],
      accommodation: 'hotel',
      transport: 'private',
      mealPreferences: [],
      specialRequests: '',
      freeTime: 2
    });
    setHasChanges(false);
  };

  const saveCustomizations = () => {
    // Call the onSave callback with customizations
    onSave(customizations);
    setHasChanges(false);
  };

  const budgetOptions = [
    { id: 'budget', name: 'Budget', range: '₹5,000-10,000', icon: DollarSign, color: 'bg-green-100 text-green-800' },
    { id: 'moderate', name: 'Moderate', range: '₹10,000-20,000', icon: DollarSign, color: 'bg-blue-100 text-blue-800' },
    { id: 'premium', name: 'Premium', range: '₹20,000-35,000', icon: DollarSign, color: 'bg-purple-100 text-purple-800' },
    { id: 'luxury', name: 'Luxury', range: '₹35,000+', icon: DollarSign, color: 'bg-yellow-100 text-yellow-800' }
  ];

  const paceOptions = [
    { id: 'relaxed', name: 'Relaxed', description: '2-3 activities per day', icon: Clock },
    { id: 'moderate', name: 'Moderate', description: '4-5 activities per day', icon: Clock },
    { id: 'packed', name: 'Packed', description: '6+ activities per day', icon: Clock }
  ];

  const interestOptions = [
    { id: 'adventure', name: 'Adventure', icon: Mountain, color: 'bg-green-100 text-green-800' },
    { id: 'culture', name: 'Culture', icon: Heart, color: 'bg-purple-100 text-purple-800' },
    { id: 'food', name: 'Food', icon: Utensils, color: 'bg-orange-100 text-orange-800' },
    { id: 'photography', name: 'Photography', icon: Camera, color: 'bg-blue-100 text-blue-800' },
    { id: 'shopping', name: 'Shopping', icon: Star, color: 'bg-pink-100 text-pink-800' },
    { id: 'nature', name: 'Nature', icon: Heart, color: 'bg-emerald-100 text-emerald-800' }
  ];

  const mealPreferences = [
    { id: 'vegetarian', name: 'Vegetarian' },
    { id: 'vegan', name: 'Vegan' },
    { id: 'gluten-free', name: 'Gluten-Free' },
    { id: 'halal', name: 'Halal' },
    { id: 'jain', name: 'Jain' },
    { id: 'no-spicy', name: 'No Spicy Food' }
  ];

  const tabs = [
    { id: 'budget', name: 'Budget', icon: DollarSign },
    { id: 'pace', name: 'Pace', icon: Clock },
    { id: 'interests', name: 'Interests', icon: Heart },
    { id: 'accommodation', name: 'Stay', icon: Hotel },
    { id: 'transport', name: 'Transport', icon: Car },
    { id: 'meals', name: 'Meals', icon: Utensils },
    { id: 'special', name: 'Special', icon: Sparkles }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Customize Your Trip</h2>
            </div>
            <div className="flex items-center gap-2">
              {hasChanges && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Unsaved Changes
                </Badge>
              )}
              <Button
                variant="outline"
                onClick={resetCustomizations}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={saveCustomizations}
                disabled={!hasChanges}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b bg-gray-50">
          <div className="flex gap-1 p-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <AnimatePresence mode="wait">
            {activeTab === 'budget' && (
              <motion.div
                key="budget"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4">Select Your Budget Range</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {budgetOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <div
                        key={option.id}
                        onClick={() => updateCustomization('budget', option.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                          customizations.budget === option.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{option.name}</h4>
                            <p className="text-sm text-gray-600">{option.range}</p>
                          </div>
                        </div>
                        {customizations.budget === option.id && (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-2" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'pace' && (
              <motion.div
                key="pace"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4">Choose Your Travel Pace</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paceOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <div
                        key={option.id}
                        onClick={() => updateCustomization('pace', option.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                          customizations.pace === option.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <Icon className="w-8 h-8 text-blue-600" />
                          <h4 className="font-semibold text-center">{option.name}</h4>
                          <p className="text-sm text-gray-600 text-center">{option.description}</p>
                        </div>
                        {customizations.pace === option.id && (
                          <CheckCircle className="w-5 h-5 text-green-600 mx-auto mt-2" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'interests' && (
              <motion.div
                key="interests"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4">Select Your Interests</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {interestOptions.map((interest) => {
                    const Icon = interest.icon;
                    return (
                      <div
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                          customizations.interests.includes(interest.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className={`p-3 rounded-lg ${interest.color}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-medium">{interest.name}</span>
                        </div>
                        {customizations.interests.includes(interest.id) && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'accommodation' && (
              <motion.div
                key="accommodation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4">Accommodation Preference</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Hotel', 'Resort', 'Hostel', 'Homestay'].map((type) => (
                    <div
                      key={type}
                      onClick={() => updateCustomization('accommodation', type.toLowerCase())}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                        customizations.accommodation === type.toLowerCase()
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Hotel className="w-8 h-8 text-blue-600" />
                        <span className="font-medium">{type}</span>
                      </div>
                      {customizations.accommodation === type.toLowerCase() && (
                        <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'transport' && (
              <motion.div
                key="transport"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4">Transportation Preference</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'flight', name: 'Flight', icon: Plane },
                    { id: 'train', name: 'Train', icon: Train },
                    { id: 'car', name: 'Car', icon: Car },
                    { id: 'bus', name: 'Bus', icon: Car }
                  ].map((transport) => {
                    const Icon = transport.icon;
                    return (
                      <div
                        key={transport.id}
                        onClick={() => updateCustomization('transport', transport.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                          customizations.transport === transport.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Icon className="w-8 h-8 text-blue-600" />
                          <span className="font-medium">{transport.name}</span>
                        </div>
                        {customizations.transport === transport.id && (
                          <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-2" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'meals' && (
              <motion.div
                key="meals"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4">Meal Preferences</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mealPreferences.map((preference) => (
                    <div
                      key={preference.id}
                      onClick={() => toggleMealPreference(preference.id)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                        customizations.mealPreferences.includes(preference.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{preference.name}</span>
                      </div>
                      {customizations.mealPreferences.includes(preference.id) && (
                        <CheckCircle className="w-4 h-4 text-green-600 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'special' && (
              <motion.div
                key="special"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4">Special Requests & Free Time</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Free Time Per Day
                    </label>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() => updateCustomization('freeTime', Math.max(1, customizations.freeTime - 1))}
                        className="w-10 h-10 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{customizations.freeTime}</div>
                        <div className="text-sm text-gray-600">hours</div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => updateCustomization('freeTime', Math.min(6, customizations.freeTime + 1))}
                        className="w-10 h-10 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      value={customizations.specialRequests}
                      onChange={(e) => updateCustomization('specialRequests', e.target.value)}
                      placeholder="Any special requirements or preferences..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900">AI Recommendations</h4>
                        <p className="text-sm text-blue-800 mt-1">
                          Based on your preferences, we'll automatically adjust your itinerary to include more activities you love while maintaining a comfortable pace.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CustomizeTrip;
