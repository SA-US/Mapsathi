'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, AlertTriangle, MapPin, Clock, Users, Shield } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

const SOSButton = ({ userLocation, onEmergencyCall }) => {
  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isActivated) {
      triggerEmergency();
    }
  }, [countdown, isActivated]);

  const triggerEmergency = async () => {
    try {
      const response = await fetch('/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: userLocation,
          timestamp: new Date().toISOString(),
          type: 'emergency'
        })
      });

      if (response.ok) {
        toast.success('Emergency services notified! Help is on the way.', {
          position: 'top-center',
          style: { backgroundColor: '#dc2626', color: 'white' }
        });
        onEmergencyCall?.();
      } else {
        throw new Error(`API responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('SOS API Error:', error);
      toast.error('Failed to contact emergency services. Please call 112 directly.', {
        position: 'top-center',
        style: { backgroundColor: '#dc2626', color: 'white' }
      });
    }
    
    setIsActivated(false);
    setCountdown(0);
  };

  const handleSOSPress = () => {
    if (!isActivated) {
      setIsActivated(true);
      setCountdown(5);
      toast.warning('SOS activated! Cancel within 5 seconds...', {
        position: 'top-center',
        style: { backgroundColor: '#f59e0b', color: 'white' }
      });
    } else {
      setIsActivated(false);
      setCountdown(0);
      toast.info('SOS cancelled', { position: 'top-center' });
    }
  };

  const emergencyServices = [
    { name: 'Police', number: '112', icon: Shield, color: 'bg-blue-500' },
    { name: 'Ambulance', number: '108', icon: Phone, color: 'bg-red-500' },
    { name: 'Fire Brigade', number: '101', icon: AlertTriangle, color: 'bg-orange-500' },
    { name: 'Women Helpline', number: '1091', icon: Users, color: 'bg-pink-500' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <ToastContainer />
      
      {/* Emergency Services Panel */}
      <AnimatePresence>
        {showEmergencyPanel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-4 w-80 border border-gray-100"
            style={{ zIndex: 10000 }}
          >
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-red-500" />
              Emergency Services
            </h3>
            <div className="space-y-2">
              {emergencyServices.map((service) => (
                <motion.button
                  key={service.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(`tel:${service.number}`)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${service.color} mr-3`}>
                      <service.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.number}</p>
                    </div>
                  </div>
                  <Phone className="w-4 h-4 text-gray-400" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOS Button */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing ring effect when activated */}
        <AnimatePresence>
          {isActivated && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.3)' }}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.7, 0.3, 0]
              }}
              transition={{
                duration: 1,
                repeat: countdown > 0 ? Infinity : 0,
                ease: "easeOut"
              }}
            />
          )}
        </AnimatePresence>

        {/* Main SOS Button */}
        <motion.button
          onClick={handleSOSPress}
          className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
            isActivated 
              ? 'bg-gradient-to-r from-red-600 to-red-700 ring-4 ring-red-300' 
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
          }`}
          animate={isActivated ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.3, repeat: countdown > 0 ? Infinity : 0 }}
        >
          {isActivated ? (
            <div className="text-white font-bold text-lg">
              {countdown}
            </div>
          ) : (
            <div className="relative">
              <Phone className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse" />
            </div>
          )}
        </motion.button>

        {/* Emergency Services Toggle */}
        <motion.button
          onClick={() => setShowEmergencyPanel(!showEmergencyPanel)}
          className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Shield className="w-4 h-4 text-gray-600" />
        </motion.button>
      </motion.div>

      {/* Location Info */}
      {userLocation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-20 left-0 bg-white rounded-lg shadow-lg px-3 py-2 text-xs text-gray-600 max-w-xs"
        >
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1 text-red-500" />
            <span>Location shared with emergency services</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SOSButton;
