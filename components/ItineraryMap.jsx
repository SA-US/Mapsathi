'use client';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import './ItineraryMap.css';
import L from 'leaflet';
import { MapPin, Navigation, Clock, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

// Custom icons for different activity types with visited state
const createCustomIcon = (type, color = '#1e40af', isVisited = false, isCurrent = false) => {
  const actualColor = isVisited ? visitedColors[type] : color;
  const size = isCurrent ? 44 : 36;
  const borderWidth = isCurrent ? 4 : 3;
  
  const iconHtml = `
    <div class="custom-map-marker" style="
      background-color: ${actualColor};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: ${borderWidth}px solid white;
      box-shadow: ${isCurrent ? '0 4px 15px rgba(0,0,0,0.5)' : '0 3px 10px rgba(0,0,0,0.4)'};
      position: relative;
      z-index: ${isCurrent ? 2000 : 1000};
      pointer-events: none;
      ${isCurrent ? 'animation: pulse 2s infinite;' : ''}
    ">
      ${isVisited ? `
        <svg width="${size * 0.6}" height="${size * 0.6}" viewBox="0 0 24 24" fill="white" style="pointer-events: none;">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      ` : `
        <svg width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 24 24" fill="white" style="pointer-events: none;">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      `}
      ${isCurrent ? `
        <div style="
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
          border: 2px solid white;
        ">NOW</div>
      ` : ''}
    </div>
  `;
  
  return L.divIcon({
    html: iconHtml,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size/2, size],
    popupAnchor: [0, -size],
    shadowSize: [0, 0],
    shadowAnchor: [0, 0]
  });
};

// Activity type colors - darker and more prominent
const activityColors = {
  'sightseeing': '#1e40af',      // Dark Blue
  'dining': '#991b1b',           // Dark Red
  'accommodation': '#047857',    // Dark Green
  'transport': '#92400e',        // Dark Orange/Brown
  'shopping': '#5b21b6',         // Dark Purple
  'entertainment': '#9f1239',    // Dark Pink
  'default': '#374151'           // Dark Gray
};

// Visited state colors
const visitedColors = {
  'sightseeing': '#6b7280',      // Gray when visited
  'dining': '#6b7280',
  'accommodation': '#6b7280',
  'transport': '#6b7280',
  'shopping': '#6b7280',
  'entertainment': '#6b7280',
  'default': '#6b7280'
};

const ItineraryMap = ({ itinerary, selectedDay, onLocationClick, isCustomizing = false }) => {
  const [mapCenter, setMapCenter] = useState([26.9124, 75.7873]); // Default to Jaipur
  const [mapZoom, setMapZoom] = useState(12);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [visitedDestinations, setVisitedDestinations] = useState(new Set());
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [navigationMode, setNavigationMode] = useState(false);
  const mapRef = useRef(null);

  // Sample coordinates for Jaipur attractions (in real app, these would come from API)
  const locationCoordinates = {
    'Amber Fort': [26.9855, 75.8513],
    'City Palace': [26.9254, 75.8237],
    'Hawa Mahal': [26.9237, 75.8268],
    'Jantar Mantar': [26.9240, 75.8245],
    'Albert Hall': [26.9185, 75.8225],
    'Jal Mahal': [26.9375, 75.8425],
    'Nahargarh Fort': [26.9450, 75.7975],
    'Chokhi Dhani': [26.8220, 75.8520],
    'Pink City Bazaar': [26.9230, 75.8250],
    'Local Restaurant': [26.9250, 75.8240]
  };

  useEffect(() => {
    if (itinerary && itinerary.destination) {
      // Set map center based on destination
      const destinationCenters = {
        'Jaipur': [26.9124, 75.7873],
        'Delhi': [28.6139, 77.2090],
        'Mumbai': [19.0760, 72.8777],
        'Bangalore': [12.9716, 77.5946],
        'Goa': [15.2993, 74.1240]
      };
      
      const center = destinationCenters[itinerary.destination] || [26.9124, 75.7873];
      setMapCenter(center);
      setMapZoom(12);
    }
  }, [itinerary]);

  useEffect(() => {
    // Generate route coordinates for selected day
    if (itinerary && selectedDay && itinerary.days) {
      const day = itinerary.days[selectedDay - 1];
      if (day && day.activities) {
        const coords = day.activities
          .map(activity => {
            // Try to find coordinates for the activity location
            for (const [location, coord] of Object.entries(locationCoordinates)) {
              if (activity.title.toLowerCase().includes(location.toLowerCase())) {
                return coord;
              }
            }
            // Return default coordinates if not found
            return [
              mapCenter[0] + (Math.random() - 0.5) * 0.1,
              mapCenter[1] + (Math.random() - 0.5) * 0.1
            ];
          })
          .filter(coord => coord);
        
        setRouteCoordinates(coords);
      }
    }
  }, [itinerary, selectedDay, mapCenter]);

  const getActivityType = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('fort') || titleLower.includes('palace') || titleLower.includes('mahal') || titleLower.includes('museum')) {
      return 'sightseeing';
    } else if (titleLower.includes('restaurant') || titleLower.includes('food') || titleLower.includes('lunch') || titleLower.includes('dinner')) {
      return 'dining';
    } else if (titleLower.includes('hotel') || titleLower.includes('resort') || titleLower.includes('stay')) {
      return 'accommodation';
    } else if (titleLower.includes('market') || titleLower.includes('bazaar') || titleLower.includes('shopping')) {
      return 'shopping';
    } else if (titleLower.includes('entertainment') || titleLower.includes('show') || titleLower.includes('cultural')) {
      return 'entertainment';
    }
    return 'default';
  };

  const getAllMarkers = () => {
    if (!itinerary || !itinerary.days) return [];
    
    const markers = [];
    itinerary.days.forEach((day, dayIndex) => {
      day.activities.forEach((activity, actIndex) => {
        let coordinates = null;
        
        // Try to find exact coordinates
        for (const [location, coord] of Object.entries(locationCoordinates)) {
          if (activity.title.toLowerCase().includes(location.toLowerCase())) {
            coordinates = coord;
            break;
          }
        }
        
        // Generate nearby coordinates if not found
        if (!coordinates) {
          coordinates = [
            mapCenter[0] + (Math.random() - 0.5) * 0.05,
            mapCenter[1] + (Math.random() - 0.5) * 0.05
          ];
        }
        
        const markerId = `${day.day}-${actIndex}`;
        markers.push({
          ...activity,
          coordinates,
          dayNumber: day.day,
          activityIndex: actIndex,
          type: getActivityType(activity.title),
          id: markerId,
          isVisited: visitedDestinations.has(markerId),
          isCurrent: navigationMode && currentDestinationIndex === markers.length
        });
      });
    });
    
    return markers;
  };

  // Handle destination visit
  const handleVisitDestination = (markerId) => {
    setVisitedDestinations(prev => new Set([...prev, markerId]));
    if (navigationMode) {
      setCurrentDestinationIndex(prev => prev + 1);
    }
  };

  // Handle navigation mode toggle
  const handleNavigationMode = () => {
    setNavigationMode(!navigationMode);
    if (!navigationMode) {
      setCurrentDestinationIndex(0);
    }
  };

  // Handle zoom control visibility during customization
  useEffect(() => {
    const zoomControls = document.querySelector('.leaflet-control-zoom');
    if (zoomControls) {
      if (isCustomizing) {
        zoomControls.classList.add('hidden');
      } else {
        zoomControls.classList.remove('hidden');
      }
    }
  }, [isCustomizing]);

  // Get current destination for navigation
  const getCurrentDestination = () => {
    const markers = getAllMarkers();
    if (selectedDay) {
      const dayMarkers = markers.filter(m => m.dayNumber === selectedDay);
      return dayMarkers[currentDestinationIndex] || null;
    }
    return markers[currentDestinationIndex] || null;
  };

  const markers = getAllMarkers();
  const filteredMarkers = selectedDay 
    ? markers.filter(m => m.dayNumber === selectedDay)
    : markers;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
        ref={mapRef}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Route line for selected day */}
        {selectedDay && routeCoordinates.length > 1 && (
          <Polyline
            positions={routeCoordinates}
            color="#3b82f6"
            weight={4}
            opacity={0.8}
            dashArray="10, 5"
            smoothFactor={1}
          />
        )}
        
        {/* Activity markers */}
        {filteredMarkers.map((marker, index) => (
          <Marker
            key={`${marker.dayNumber}-${marker.activityIndex}`}
            position={marker.coordinates}
            icon={createCustomIcon(
              marker.type, 
              activityColors[marker.type], 
              marker.isVisited,
              marker.isCurrent
            )}
            eventHandlers={{
              click: () => {
                if (onLocationClick) {
                  onLocationClick(marker);
                }
              }
            }}
          >
            <Popup
              maxWidth={280}
              minWidth={220}
              className="custom-map-popup"
            >
              <div className="p-3 min-w-[220px]">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: marker.isVisited ? visitedColors[marker.type] : activityColors[marker.type] }}
                  />
                  <span className="font-semibold text-sm">Day {marker.dayNumber}</span>
                  <Badge variant={marker.isVisited ? "secondary" : "default"} className="text-xs">
                    {marker.type}
                  </Badge>
                  {marker.isCurrent && (
                    <Badge variant="destructive" className="text-xs">
                      Current
                    </Badge>
                  )}
                </div>
                <h4 className="font-medium text-sm mb-1">{marker.title}</h4>
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {marker.time}
                  </span>
                  <span>{marker.duration}</span>
                </div>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{marker.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-600 text-sm">{marker.cost}</span>
                  <div className="flex gap-2">
                    {!marker.isVisited && (
                      <button
                        onClick={() => handleVisitDestination(marker.id)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                      >
                        Mark Visited
                      </button>
                    )}
                    {marker.isVisited && (
                      <Badge variant="outline" className="text-xs">
                        ✓ Visited
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Navigation Control Panel */}
      <div className={`absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-[1000] pointer-events-auto max-w-xs transition-all duration-300 ${
        isCustomizing ? 'opacity-0 invisible' : 'opacity-100 visible'
      }`}>
        <h4 className="font-semibold text-sm mb-3 text-gray-900">Navigation Planning</h4>
        
        {/* Navigation Mode Toggle */}
        <div className="mb-3">
          <button
            onClick={handleNavigationMode}
            className={`w-full px-3 py-2 text-sm rounded-lg transition-colors ${
              navigationMode 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {navigationMode ? '🧭 Navigation ON' : '🧭 Start Navigation'}
          </button>
        </div>

        {navigationMode && (
          <div className="space-y-3">
            {/* Current Destination */}
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-600 font-medium mb-1">Current Destination</div>
              <div className="text-sm font-semibold text-blue-900">
                {getCurrentDestination()?.title || 'No more destinations'}
              </div>
              <div className="text-xs text-blue-700 mt-1">
                {getCurrentDestination()?.time || ''}
              </div>
            </div>

            {/* Progress */}
            <div className="text-xs text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Progress</span>
                <span>{currentDestinationIndex} / {filteredMarkers.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(currentDestinationIndex / filteredMarkers.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentDestinationIndex(Math.max(0, currentDestinationIndex - 1))}
                className="flex-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200"
              >
                ← Previous
              </button>
              <button
                onClick={() => setCurrentDestinationIndex(Math.min(filteredMarkers.length - 1, currentDestinationIndex + 1))}
                className="flex-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Map Legend */}
      <div className={`absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-[1000] pointer-events-auto transition-all duration-300 ${
        isCustomizing ? 'opacity-0 invisible' : 'opacity-100 visible'
      }`}>
        <h4 className="font-semibold text-xs mb-2 text-gray-900">Activity Types</h4>
        <div className="space-y-1">
          {Object.entries(activityColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: color }}
              />
              <span className="capitalize text-gray-700">{type}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-gray-700">Visited</span>
          </div>
        </div>
      </div>
      
      {/* Day Selector */}
      {itinerary && itinerary.days && (
        <div className={`absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-[1000] pointer-events-auto transition-all duration-300 ${
          isCustomizing ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}>
          <h4 className="font-semibold text-xs mb-2 text-gray-900">Select Day</h4>
          <div className="flex flex-col gap-1">
            {itinerary.days.map((day) => (
              <button
                key={day.day}
                onClick={() => onLocationClick && onLocationClick({ type: 'daySelect', dayNumber: day.day })}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  selectedDay === day.day 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Day {day.day}
              </button>
            ))}
            <button
              onClick={() => onLocationClick && onLocationClick({ type: 'daySelect', dayNumber: null })}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                !selectedDay 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Days
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryMap;
