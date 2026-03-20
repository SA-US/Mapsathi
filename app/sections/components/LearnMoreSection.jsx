'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
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
  Camera
} from 'lucide-react';

const LearnMoreSection = () => {
  const router = useRouter();

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold text-gray-900">
                Learn More About MapSathi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Interactive Maps */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <MapPin className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Interactive Maps</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Explore destinations with our advanced mapping technology and real-time navigation. 
                    Discover hidden gems and plan your perfect journey with detailed route information.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => router.push('/Pages/maps')}
                    className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
                    size="lg"
                  >
                    <Compass className="w-5 h-5" />
                    Explore Maps
                  </Button>
                </motion.div>
                
                {/* Key Attractions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Heart className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Key Attractions</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Discover must-visit places and hidden gems curated by local experts. 
                    From historical monuments to natural wonders, find the best attractions for your trip.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => router.push('/Pages/keyattractions')}
                    className="flex items-center gap-2 hover:bg-green-50 transition-colors"
                    size="lg"
                  >
                    <Star className="w-5 h-5" />
                    View Attractions
                  </Button>
                </motion.div>
                
                {/* About Us */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Users className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">About Us</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Learn about our mission to make travel planning simple and enjoyable for everyone. 
                    Join our community of travelers and explore the world with confidence.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => router.push('/Pages/aboutus')}
                    className="flex items-center gap-2 hover:bg-purple-50 transition-colors"
                    size="lg"
                  >
                    <TrendingUp className="w-5 h-5" />
                    Our Story
                  </Button>
                </motion.div>
              </div>
              
              {/* Why Choose MapSathi */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 text-center"
              >
                <h4 className="text-2xl font-bold mb-8 text-gray-900">Why Choose MapSathi?</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="flex flex-col items-center p-4"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-md">
                      <Sparkles className="w-8 h-8 text-blue-600" />
                    </div>
                    <h5 className="font-semibold text-lg mb-2 text-gray-900">AI-Powered</h5>
                    <p className="text-gray-600">Smart trip planning with artificial intelligence</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="flex flex-col items-center p-4"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-md">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h5 className="font-semibold text-lg mb-2 text-gray-900">Verified</h5>
                    <p className="text-gray-600">Trusted information from reliable sources</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    className="flex flex-col items-center p-4"
                  >
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 shadow-md">
                      <Route className="w-8 h-8 text-purple-600" />
                    </div>
                    <h5 className="font-semibold text-lg mb-2 text-gray-900">Custom Routes</h5>
                    <p className="text-gray-600">Personalized journeys tailored to your preferences</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="flex flex-col items-center p-4"
                  >
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 shadow-md">
                      <Camera className="w-8 h-8 text-orange-600" />
                    </div>
                    <h5 className="font-semibold text-lg mb-2 text-gray-900">Visual Guides</h5>
                    <p className="text-gray-600">Rich media content for better visualization</p>
                  </motion.div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default LearnMoreSection;
