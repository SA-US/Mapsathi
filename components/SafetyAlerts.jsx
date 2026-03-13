'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, X, Info, Zap, CloudRain, Wind, ThermometerSun } from 'lucide-react';
import { toast } from 'react-toastify';

const SafetyAlerts = ({ searchLocation, destinationInfo }) => {
  const [locationWeatherData, setLocationWeatherData] = useState({});

  // Icon mapping for string values from API
  const iconMap = {
    'alert': AlertTriangle,
    'shield': Shield,
    'info': Info,
    'cloud': CloudRain,
    'thermometer': ThermometerSun,
    'zap': Zap,
    'wind': Wind
  };

  useEffect(() => {
    if (searchLocation) {
      fetchLocationWeather(searchLocation, 'search');
    }
  }, [searchLocation]);

  // Fetch alerts for destination
  useEffect(() => {
    if (destinationInfo) {
      fetchLocationWeather(destinationInfo, 'destination');
    }
  }, [destinationInfo]);

  const fetchLocationWeather = async (location, type) => {
    try {
      const response = await fetch(`/api/safety-alerts?lat=${location.lat}&lon=${location.lon}`);
      const data = await response.json();
      
      if (data.ok && data.weather) {
        const weather = data.weather;
        
        // Update weather data for this location
        setLocationWeatherData(prev => ({
          ...prev,
          [`${type}-${location.lat}-${location.lon}`]: {
            weather: weather,
            locationName: location.name || `${type} location`
          }
        }));
        
        // Show single toast notification with weather info
        showWeatherToast(weather, type, location.name);
      }
    } catch (error) {
      console.error(`Failed to fetch ${type} location weather:`, error);
    }
  };

  const showWeatherToast = (weather, locationType, locationName = '') => {
    const tempColor = weather.temperature > 30 ? '🔴' : weather.temperature < 15 ? '🔵' : '🟢';
    const aqiColor = weather.aqi > 150 ? '🔴' : weather.aqi > 100 ? '🟡' : '🟢';
    
    toast.info(
      <div>
        <strong>🌤️ {locationType === 'search' ? 'Search Location' : 'Destination'} Weather</strong>
        {locationName && <div><small>{locationName}</small></div>}
        <div className="mt-1 text-sm">
          {tempColor} Temp: {weather.temperature}°C | 
          💧 Humidity: {weather.humidity}% | 
          💨 Wind: {weather.windSpeed} km/h | 
          {aqiColor} AQI: {weather.aqi}
        </div>
      </div>,
      { 
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      }
    );
  };

  // Component doesn't render anything visible, only shows toast notifications
  return null;
};

export default SafetyAlerts;
