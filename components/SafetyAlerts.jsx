'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, X, Info, Zap, CloudRain, Wind, ThermometerSun } from 'lucide-react';
import { toast } from 'react-toastify';

const SafetyAlerts = ({ userLocation, city }) => {
  const [alerts, setAlerts] = useState([]);
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (userLocation) {
      fetchSafetyAlerts();
      fetchWeatherAlerts();
      
      // Set up periodic updates
      const interval = setInterval(() => {
        fetchSafetyAlerts();
        fetchWeatherAlerts();
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [userLocation, city]);

  const fetchSafetyAlerts = async () => {
    try {
      const response = await fetch(`/api/safety-alerts?lat=${userLocation.lat}&lon=${userLocation.lon}&city=${city}`);
      const data = await response.json();
      
      if (data.ok) {
        setAlerts(data.alerts || []);
      }
    } catch (error) {
      console.error('Failed to fetch safety alerts:', error);
    }
  };

  const fetchWeatherAlerts = async () => {
    try {
      // Mock weather data - in production, integrate with real weather API
      const mockWeather = {
        temperature: Math.round(Math.random() * 15 + 25), // 25-40°C
        humidity: Math.round(Math.random() * 40 + 40), // 40-80%
        windSpeed: Math.round(Math.random() * 20 + 5), // 5-25 km/h
        condition: ['clear', 'cloudy', 'rainy', 'stormy'][Math.floor(Math.random() * 4)]
      };
      
      setWeatherData(mockWeather);
      
      // Generate weather-based safety alerts
      if (mockWeather.temperature > 35) {
        addWeatherAlert('heat', 'Extreme heat warning! Stay hydrated and avoid prolonged sun exposure.');
      }
      if (mockWeather.condition === 'stormy') {
        addWeatherAlert('storm', 'Severe weather alert. Seek shelter immediately.');
      }
      if (mockWeather.windSpeed > 20) {
        addWeatherAlert('wind', 'High winds detected. Secure loose objects and avoid outdoor activities.');
      }
    } catch (error) {
      console.error('Failed to fetch weather alerts:', error);
    }
  };

  const addWeatherAlert = (type, message) => {
    const alertId = `weather-${type}`;
    if (!dismissedAlerts.has(alertId)) {
      setAlerts(prev => {
        const existing = prev.find(a => a.id === alertId);
        if (!existing) {
          return [...prev, {
            id: alertId,
            type: 'weather',
            severity: type === 'storm' ? 'high' : 'medium',
            title: `${type.charAt(0).toUpperCase() + type.slice(1)} Alert`,
            message,
            icon: type === 'heat' ? ThermometerSun : type === 'storm' ? Zap : Wind,
            timestamp: new Date().toISOString(),
            color: type === 'storm' ? 'bg-purple-500' : type === 'heat' ? 'bg-orange-500' : 'bg-blue-500'
          }];
        }
        return prev;
      });
    }
  };

  const dismissAlert = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const activeAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.id));

  if (activeAlerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 left-4 z-[9998] max-w-sm">
      <AnimatePresence>
        {activeAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            className="mb-3"
          >
            <div className={`bg-white rounded-xl shadow-2xl border-l-4 ${getSeverityColor(alert.severity)} overflow-hidden`}>
              {/* Alert Header */}
              <div className={`p-3 ${getSeverityColor(alert.severity)} bg-opacity-10`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)} mr-3`}>
                      {alert.icon ? (
                        <alert.icon className="w-4 h-4 text-white" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{alert.title}</h4>
                      <p className="text-xs text-gray-600">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Alert Content */}
              <div className="p-3">
                <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  {alert.type === 'safety' && (
                    <button
                      onClick={() => toast.info('Safety tips loaded', { position: 'top-center' })}
                      className="flex-1 px-3 py-1.5 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Shield className="w-3 h-3 inline mr-1" />
                      Safety Tips
                    </button>
                  )}
                  {alert.type === 'weather' && (
                    <button
                      onClick={() => toast.info('Weather forecast loading...', { position: 'top-center' })}
                      className="flex-1 px-3 py-1.5 bg-purple-500 text-white text-xs rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      <CloudRain className="w-3 h-3 inline mr-1" />
                      View Forecast
                    </button>
                  )}
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>

              {/* Progress bar for auto-dismiss (optional) */}
              {alert.severity === 'low' && (
                <div className="h-1 bg-gray-200">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 10, ease: 'linear' }}
                    onAnimationComplete={() => dismissAlert(alert.id)}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Alert Summary Badge */}
      {activeAlerts.length > 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
        >
          {activeAlerts.length}
        </motion.div>
      )}
    </div>
  );
};

export default SafetyAlerts;
