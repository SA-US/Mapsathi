'use client';
import React, { useState } from "react";
import {Button} from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, 
  Heart, 
  Users, 
  Compass,
  Star,
  TrendingUp,
  Sparkles,
  Check,
  Route,
  Camera,
  X
} from 'lucide-react';

const HeroSection = () => {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  const handleGetStarted = () => {
    router.push('/Pages/trip-planner');
  };

  const handleLearnMore = () => {
    setShowDetails(!showDetails);
  };

  return (

<section className="relative w-full h-[90vh] flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 animate-fadeIn">
        <h1 className="text-white font-bold text-4xl md:text-6xl font-['Montserrat'] mb-4 drop-shadow-lg">
          Welcome to <span className="text-blue-400">MapSathi</span>
        </h1>
        <p className="text-gray-200 text-lg md:text-2xl max-w-2xl mx-auto mb-8 drop-shadow-md">
          Explore the world with intuitive mapping, local insights, and immersive travel experiences.
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={handleGetStarted}
            className="bg-blue-500 hover:bg-blue-600 transition-transform hover:scale-105"
          >
            Get Started
          </Button>
          <Button 
            onClick={handleLearnMore}
            variant="outline" 
            className="bg-blue-500 hover:bg-blue-600 transition-transform hover:scale-105"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Learn More Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">Learn More About MapSathi</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Interactive Maps */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Interactive Maps</h3>
                    <p className="text-gray-600 mb-4">
                      Explore destinations with advanced mapping technology and real-time navigation.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => router.push('/Pages/maps')}
                      className="flex items-center gap-2"
                    >
                      <Compass className="w-4 h-4" />
                      Explore Maps
                    </Button>
                  </div>
                  
                  {/* Key Attractions */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Key Attractions</h3>
                    <p className="text-gray-600 mb-4">
                      Discover must-visit places and hidden gems curated by local experts.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => router.push('/Pages/keyattractions')}
                      className="flex items-center gap-2"
                    >
                      <Star className="w-4 h-4" />
                      View Attractions
                    </Button>
                  </div>
                  
                  {/* About Us */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">About Us</h3>
                    <p className="text-gray-600 mb-4">
                      Learn about our mission to make travel planning simple and enjoyable.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => router.push('/Pages/aboutus')}
                      className="flex items-center gap-2"
                    >
                      <TrendingUp className="w-4 h-4" />
                      Our Story
                    </Button>
                  </div>
                </div>
                
                {/* Why Choose MapSathi */}
                <div className="text-center">
                  <h4 className="text-xl font-semibold mb-6">Why Choose MapSathi?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <Sparkles className="w-6 h-6 text-blue-600" />
                      </div>
                      <h5 className="font-medium">AI-Powered</h5>
                      <p className="text-sm text-gray-600">Smart trip planning</p>
                    </div>
                    <div className="flex flex-col items-center p-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <Check className="w-6 h-6 text-green-600" />
                      </div>
                      <h5 className="font-medium">Verified</h5>
                      <p className="text-sm text-gray-600">Trusted information</p>
                    </div>
                    <div className="flex flex-col items-center p-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                        <Route className="w-6 h-6 text-purple-600" />
                      </div>
                      <h5 className="font-medium">Custom Routes</h5>
                      <p className="text-sm text-gray-600">Personalized journeys</p>
                    </div>
                    <div className="flex flex-col items-center p-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                        <Camera className="w-6 h-6 text-orange-600" />
                      </div>
                      <h5 className="font-medium">Visual Guides</h5>
                      <p className="text-sm text-gray-600">Rich media content</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
