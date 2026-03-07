'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Phone, MapPin, Clock, Star, Navigation, X, ChevronRight, AlertTriangle, Heart, Flame } from 'lucide-react';

const EmergencyPanel = ({ userLocation, city, isVisible, onClose }) => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'All Services', icon: Shield, color: 'bg-blue-500' },
    { id: 'police', name: 'Police', icon: Shield, color: 'bg-blue-600' },
    { id: 'ambulance', name: 'Ambulance', icon: Heart, color: 'bg-red-500' },
    { id: 'fire', name: 'Fire Brigade', icon: Flame, color: 'bg-orange-500' },
    { id: 'hospital', name: 'Hospitals', icon: Heart, color: 'bg-green-500' },
    { id: 'women', name: 'Women Helpline', icon: Shield, color: 'bg-pink-500' }
  ];

  useEffect(() => {
    if (isVisible && userLocation) {
      fetchEmergencyServices();
    }
  }, [isVisible, userLocation, selectedCategory, city]);

  const fetchEmergencyServices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        lat: userLocation.lat,
        lon: userLocation.lon,
        type: selectedCategory === 'all' ? '' : selectedCategory,
        city: city || ''
      });

      const response = await fetch(`/api/emergency-services?${params}`);
      const data = await response.json();

      if (data.ok) {
        setServices(data.services);
      }
    } catch (error) {
      console.error('Failed to fetch emergency services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceCall = (service) => {
    window.open(`tel:${service.phone}`);
  };

  const handleGetDirections = (service) => {
    window.open(service.directions, '_blank');
  };

  const handleEmergencyRequest = async (service) => {
    try {
      const response = await fetch('/api/emergency-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          emergencyType: service.type,
          location: userLocation,
          description: 'Emergency assistance requested via Mapsathi'
        })
      });

      if (response.ok) {
        // Success notification would be handled by the calling component
        handleServiceCall(service);
      }
    } catch (error) {
      console.error('Failed to request emergency service:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-[9997] flex items-end justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white w-full max-w-2xl max-h-[80vh] rounded-t-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Shield className="w-6 h-6 mr-3" />
                <h2 className="text-2xl font-bold">Emergency Services</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Location Info */}
            <div className="flex items-center text-sm opacity-90">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{city || 'Current Location'} • {services.length} services nearby</span>
            </div>
          </div>

          {/* Categories */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-red-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Services List */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No emergency services found nearby</p>
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className={`p-2 rounded-lg ${categories.find(c => c.id === service.type)?.color || 'bg-gray-500'} mr-3`}>
                            {React.createElement(categories.find(c => c.id === service.type)?.icon || Shield, { 
                              className: 'w-4 h-4 text-white' 
                            })}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{service.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Star className="w-3 h-3 mr-1 text-yellow-500" />
                              <span>{service.rating}</span>
                              <span className="mx-2">•</span>
                              <MapPin className="w-3 h-3 mr-1" />
                              <span>{service.distance} km</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{service.address}</p>
                        
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>ETA: {service.estimatedArrival}</span>
                          {service.isOpen && (
                            <span className="ml-3 px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                              Open 24/7
                            </span>
                          )}
                        </div>

                        {/* Specialties */}
                        {service.specialties && service.specialties.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {service.specialties.slice(0, 3).map((specialty, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      <motion.button
                        onClick={() => handleEmergencyRequest(service)}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Emergency Call
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleGetDirections(service)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Navigation className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">🚨 In case of life-threatening emergency</p>
              <p className="font-bold text-red-600">Call 112 (Pan-India Emergency Number)</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmergencyPanel;
