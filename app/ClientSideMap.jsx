'use client';
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function ClientSideMap({ cityData }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [lastSearchResult, setLastSearchResult] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeInstructions, setRouteInstructions] = useState([]);
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [hazardMarkers, setHazardMarkers] = useState([]);
  const [crowdMarkers, setCrowdMarkers] = useState([]);
  const [searchMarkers, setSearchMarkers] = useState([]);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const [destinationRadius, setDestinationRadius] = useState(1000);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [cachedMaxZ, setCachedMaxZ] = useState(null);
  const [autoDownloadMaps, setAutoDownloadMaps] = useState(true); // Auto-download preference
  
  // Track latest routing request to ignore stale responses
  const routeReqIdRef = useRef(0);

  // Update current city when cityData changes
  useEffect(() => {
    if (cityData?.id) {
      // Can add city-specific logic here
    }
  }, [cityData]);

  // Service Worker registration for offline maps
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((reg) => {
          console.log('Service Worker registered', reg.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  // Get user's current location
  const handleCurrentLocationFound = (location) => {
    setCurrentLocation(location);
    // Can add location-based features here
  };

  // Handle location found from search
  const handleLocationFound = (location) => {
    setLastSearchResult(location);
    // Can add search-based features here
  };

  // Handle get directions
  const handleGetDirections = async (routeData) => {
    // Increment request id and capture for this run
    const reqId = ++routeReqIdRef.current;

    // Show immediate placeholder straight line while computing better route
    const placeholderCoords = [
      [routeData.from.lat, routeData.from.lon],
      [routeData.to.lat, routeData.to.lon]
    ];
    setRouteCoordinates(placeholderCoords);
    
    const placeholderDistance = calculateDistance(
      routeData.from.lat, routeData.from.lon,
      routeData.to.lat, routeData.to.lon
    );
    
    const placeholderBearing = calculateBearing(
      routeData.from.lat, routeData.from.lon,
      routeData.to.lat, routeData.to.lon
    );
    
    const placeholderDirection = getDirectionFromBearing(placeholderBearing);
    const placeholderInstructions = [
      `Start from your current location`,
      `Head ${placeholderDirection} towards ${routeData.destinationName}`,
      `Distance: ${placeholderDistance.toFixed(2)} km (straight line)`,
      `Calculating optimal route...`
    ];
    setRouteInstructions(placeholderInstructions);

    setDestinationInfo({ lat: routeData.to.lat, lon: routeData.to.lon, name: routeData.destinationName });
    
    // Load hazards and crowd data for destination
    try {
      const qs = (lat, lon, r) => `lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&r=${encodeURIComponent(r)}`;
      const [hzRes, crRes] = await Promise.all([
        fetch(`/api/hazards?${qs(routeData.to.lat, routeData.to.lon, destinationRadius)}`),
        fetch(`/api/crowd?${qs(routeData.to.lat, routeData.to.lon, destinationRadius)}`)
      ]);
      
      if (routeReqIdRef.current !== reqId) return;
      
      if (hzRes.ok) {
        const hz = await hzRes.json();
        if (hz && hz.ok && Array.isArray(hz.items)) setHazardMarkers(hz.items);
      }
      if (crRes.ok) {
        const cr = await crRes.json();
        if (cr && cr.ok && Array.isArray(cr.items)) setCrowdMarkers(cr.items);
      }
    } catch (_) {}

    // Try OSRM for routing (free, no API key required)
    try {
      const osrmResponse = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${routeData.from.lon},${routeData.from.lat};${routeData.to.lon},${routeData.to.lat}?overview=full&geometries=geojson&steps=true`
      );
      
      if (osrmResponse.ok) {
        const data = await osrmResponse.json();
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
          
          if (routeReqIdRef.current !== reqId) return;
          setRouteCoordinates(coordinates);
          
          const distance = (route.distance / 1000).toFixed(2);
          const duration = Math.round(route.duration / 60);
          
          let instructions = [`Start from your current location`];
          
          if (route.legs && route.legs.length > 0) {
            route.legs.forEach(leg => {
              if (leg.steps && leg.steps.length) {
                leg.steps.forEach((step, idx) => {
                  if (step.maneuver && step.maneuver.instruction) {
                    instructions.push(`${idx + 1}. ${step.maneuver.instruction}`);
                  }
                });
              }
            });
          }
          
          instructions.push(
            `Distance: ${distance} km`,
            `Estimated time: ${duration} minutes (driving)`,
            `Arrive at ${routeData.destinationName}`,
            `Route provided by OSRM`
          );
          
          if (routeReqIdRef.current !== reqId) return;
          setRouteInstructions(instructions);
          console.log('Loaded OSRM route');
          
          // Auto-download tiles for the route
          await downloadRouteTilesForTravel(coordinates, routeData.destinationName);
          return;
        }
      }
    } catch (e) {
      console.warn('OSRM routing failed:', e);
    }

    // Fallback to straight line
    console.log('Falling back to straight line route');
    const coordinates = [
      [routeData.from.lat, routeData.from.lon],
      [routeData.to.lat, routeData.to.lon]
    ];
    
    if (routeReqIdRef.current !== reqId) return;
    setRouteCoordinates(coordinates);
    
    const distance = calculateDistance(
      routeData.from.lat, routeData.from.lon,
      routeData.to.lat, routeData.to.lon
    );
    
    const bearing = calculateBearing(
      routeData.from.lat, routeData.from.lon,
      routeData.to.lat, routeData.to.lon
    );
    
    const direction = getDirectionFromBearing(bearing);
    const instructions = [
      `Start from your current location`,
      `Head ${direction} towards ${routeData.destinationName}`,
      `Distance: ${distance.toFixed(2)} km (straight line)`,
      `Estimated time: ${Math.round(distance * 2)} minutes (walking)`,
      `Note: Routing services unavailable, showing direct path`,
      `Arrive at destination`
    ];
    
    if (routeReqIdRef.current !== reqId) return;
    setRouteInstructions(instructions);
    
    // Auto-download tiles for the straight line route
    await downloadRouteTilesForTravel(coordinates, routeData.destinationName);
  };

  // Helper functions
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const calculateBearing = (lat1, lon1, lat2, lon2) => {
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
    const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
              Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
    const brng = Math.atan2(y, x) * 180 / Math.PI;
    return (brng + 360) % 360;
  };

  const getDirectionFromBearing = (bearing) => {
    const directions = [
      'North', 'Northeast', 'East', 'Southeast',
      'South', 'Southwest', 'West', 'Northwest'
    ];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
  };

  // Service Worker communication for offline maps
  const postToSW = async (msg) => {
    if (!('serviceWorker' in navigator)) throw new Error('Service Worker not supported');
    const reg = await navigator.serviceWorker.ready;
    const sw = reg.active || reg.waiting || reg.installing;
    if (!sw) throw new Error('No active Service Worker');
    sw.postMessage(msg);
  };

  // Auto-download tiles for travel route
  const downloadRouteTilesForTravel = async (routeCoordinates, destinationName) => {
    // Check if user has enabled auto-download
    if (!autoDownloadMaps) {
      console.log('Auto-download disabled by user preference');
      return;
    }
    
    try {
      // Convert route coordinates to LatLng format
      const routePoints = routeCoordinates.map(coord => 
        L.latLng(coord[0], coord[1])
      );
      
      // Create bounds around the route with buffer
      const bounds = L.latLngBounds(routePoints);
      const bufferedBounds = bounds.pad(0.1); // 10% buffer around route
      
      // Use zoom levels suitable for navigation
      const minZ = 8; // Overview level
      const maxZ = 16; // Detailed navigation level
      
      const tileUrls = buildTileList(bufferedBounds, minZ, maxZ);
      
      if (!tileUrls.length) {
        console.log('No tiles to cache for this route.');
        return;
      }
      
      // Show user-friendly message
      const message = `🗺️ Preparing offline maps for your trip to ${destinationName}...\nDownloading ${tileUrls.length} tiles for route coverage.`;
      alert(message);
      
      // Send to service worker for downloading
      await postToSW({ type: 'PRECACHE_TILES', payload: tileUrls });
      console.log(`Auto-download started: ${tileUrls.length} tiles for route to ${destinationName}`);
      
    } catch (err) {
      console.error('Auto route tile download failed', err);
      // Don't show error to user as it's background functionality
    }
  };

  // Build tile list for offline caching
  const buildTileList = (bounds, minZ, maxZ) => {
    const north = bounds.getNorth();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const west = bounds.getWest();
    const urls = [];
    const maxTiles = 1200; // Safety limit

    const lat2tile = (lat, z) => {
      const rad = (lat * Math.PI) / 180;
      return Math.floor((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2 * Math.pow(2, z));
    };
    
    const lon2tile = (lon, z) => Math.floor(((lon + 180) / 360) * Math.pow(2, z));

    for (let z = minZ; z <= maxZ; z++) {
      const xMin = lon2tile(west, z);
      const xMax = lon2tile(east, z);
      const yMin = lat2tile(north, z);
      const yMax = lat2tile(south, z);
      
      for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
          const url = `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
          urls.push(url);
          if (urls.length >= maxTiles) return urls;
        }
      }
    }
    return urls;
  };

  // Handle area picked for queries
  const handleAreaPicked = (area) => {
    // Can add area-based features here
    console.log('Area picked:', area);
  };

  // Custom components for map controls
  const LocationControl = ({ onCurrentLocationFound }) => {
    const map = useMap();
    
    useEffect(() => {
      const control = L.control({ position: 'topleft' });
      control.onAdd = () => {
        const div = L.DomUtil.create('div', 'leaflet-bar');
        div.innerHTML = '<button style="background: white; border: 1px solid #ccc; padding: 5px; cursor: pointer;">📍</button>';
        div.onclick = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                const { latitude, longitude } = pos.coords;
                onCurrentLocationFound({ lat: latitude, lng: longitude });
              },
              (err) => console.error('Geolocation error:', err)
            );
          }
        };
        return div;
      };
      control.addTo(map);
    }, [map]);

    return null;
  };

  const SearchControl = ({ onLocationFound, onGetDirections, currentLocation }) => {
    const map = useMap();
    const [searchInput, setSearchInput] = useState('');

    const performSearch = async (query) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
          const result = data[0];
          const location = {
            name: result.display_name,
            lat: parseFloat(result.lat),
            lng: parseFloat(result.lon)
          };
          onLocationFound(location);
          return location;
        }
      } catch (error) {
        console.error('Search error:', error);
      }
      return null;
    };

    useEffect(() => {
      const control = L.control({ position: 'topleft' });
      control.onAdd = () => {
        const div = L.DomUtil.create('div', 'leaflet-bar');
        div.innerHTML = `
          <input type="text" placeholder="Search location..." 
                 style="padding: 5px; border: 1px solid #ccc; margin-right: 5px;" />
          <button style="background: white; border: 1px solid #ccc; padding: 5px; cursor: pointer;">🔍</button>
          <button style="background: #28a745; color: white; border: 1px solid #28a745; padding: 5px; cursor: pointer; margin-left: 5px;">🧭</button>
        `;
        
        const input = div.querySelector('input');
        const searchBtn = div.querySelector('button:first-of-type');
        const directionsBtn = div.querySelector('button:last-of-type');
        
        searchBtn.onclick = async () => {
          const result = await performSearch(input.value);
          if (result) {
            input.value = '';
          }
        };
        
        directionsBtn.onclick = async () => {
          const result = await performSearch(input.value);
          if (result && currentLocation) {
            onGetDirections({
              from: currentLocation,
              to: result,
              destinationName: result.name
            });
          }
        };
        
        return div;
      };
      control.addTo(map);
    }, [map, currentLocation, onGetDirections, onLocationFound]);

    return null;
  };

  const OfflineControl = ({ onOfflineToggle, onPrefetchZoomRange, autoDownloadMaps, setAutoDownloadMaps }) => {
    const map = useMap();
    const [isOffline, setIsOffline] = useState(false);
    const [progress, setProgress] = useState(null);

    useEffect(() => {
      // Listen for SW progress updates
      const onMsg = (event) => {
        const { type, payload } = event.data || {};
        if (type === 'PRECACHE_PROGRESS') {
          setProgress(payload);
        } else if (type === 'PRECACHE_DONE') {
          setProgress({ done: payload.done, total: payload.total, pct: 100 });
          setTimeout(() => setProgress(null), 1500);
          alert(`Offline download complete (tiles: ${payload.done})`);
        }
      };
      navigator.serviceWorker && navigator.serviceWorker.addEventListener('message', onMsg);
      return () => {
        navigator.serviceWorker && navigator.serviceWorker.removeEventListener('message', onMsg);
      };
    }, []);

    useEffect(() => {
      const control = L.control({ position: 'topleft' });
      control.onAdd = () => {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.backgroundColor = 'white';
        container.style.width = '34px';
        container.style.height = 'auto';
        container.style.borderRadius = '4px';
        container.style.marginTop = '10px';
        container.style.padding = '2px';
        container.style.boxShadow = '0 1px 5px rgba(0,0,0,0.65)';
        container.style.textAlign = 'center';

        // Download button
        const dl = L.DomUtil.create('button', '', container);
        dl.innerHTML = '💾';
        dl.title = 'Download current area for offline';
        dl.style.width = '34px';
        dl.style.height = '34px';
        dl.style.cursor = 'pointer';

        // Auto-download toggle button
        const autoDl = L.DomUtil.create('button', '', container);
        autoDl.innerHTML = autoDownloadMaps ? '📲✅' : '📲❌';
        autoDl.title = autoDownloadMaps ? 'Auto-download maps for routes (ON)' : 'Auto-download maps for routes (OFF)';
        autoDl.style.width = '34px';
        autoDl.style.height = '34px';
        autoDl.style.cursor = 'pointer';

        // Offline toggle button
        const tog = L.DomUtil.create('button', '', container);
        tog.innerHTML = isOffline ? '🛜✖' : '🛜';
        tog.title = isOffline ? 'Go online' : 'Force offline (use cached tiles)';
        tog.style.width = '34px';
        tog.style.height = '34px';
        tog.style.cursor = 'pointer';

        // Progress display
        const prog = L.DomUtil.create('div', '', container);
        prog.style.fontSize = '11px';
        prog.style.color = '#333';
        prog.style.padding = '2px';
        prog.style.width = '100%';
        prog.style.textAlign = 'center';

        const setProgText = () => {
          if (progress && progress.total) {
            prog.textContent = `${Math.round(progress.pct || 0)}%`;
          } else {
            prog.textContent = '';
          }
        };
        setProgText();

        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);

        // Event handlers
        L.DomEvent.on(dl, 'click', async (e) => {
          L.DomEvent.stopPropagation(e);
          dl.disabled = true;
          dl.innerHTML = '⏳';
          try {
            // Add download logic here
            alert('Download feature will be implemented');
          } catch (err) {
            console.error('Precaching failed', err);
            alert('Offline download failed.');
          } finally {
            dl.disabled = false;
            dl.innerHTML = '💾';
          }
        });

        L.DomEvent.on(autoDl, 'click', (e) => {
          L.DomEvent.stopPropagation(e);
          const newValue = !autoDownloadMaps;
          setAutoDownloadMaps(newValue);
          autoDl.innerHTML = newValue ? '📲✅' : '📲❌';
          autoDl.title = newValue ? 'Auto-download maps for routes (ON)' : 'Auto-download maps for routes (OFF)';
          alert(`Auto-download maps for routes ${newValue ? 'ENABLED' : 'DISABLED'}. Maps will ${newValue ? 'automatically' : 'not automatically'} download when you get directions.`);
        });

        L.DomEvent.on(tog, 'click', async (e) => {
          L.DomEvent.stopPropagation(e);
          const next = !isOffline;
          setIsOffline(next);
          tog.innerHTML = next ? '🛜✖' : '🛜';
          tog.title = next ? 'Go online' : 'Force offline (use cached tiles)';
          try {
            await postToSW({ type: 'SET_FORCE_OFFLINE', payload: next });
            try { onOfflineToggle && onOfflineToggle(next); } catch(_) {}
            if (next) {
              alert('Offline mode ON. Tiles will be served from cache.');
            } else {
              alert('Offline mode OFF. Back online.');
            }
          } catch (err) {
            console.error('Error toggling offline mode:', err);
            alert('Failed to toggle offline mode.');
          }
        });

        return container;
      };
      control.addTo(map);
    }, [map, isOffline, onOfflineToggle, onPrefetchZoomRange, autoDownloadMaps, setAutoDownloadMaps, progress]);

    return null;
  };

  const QueryControl = ({ onAreaPicked }) => {
    const map = useMap();
    
    useEffect(() => {
      const control = L.control({ position: 'topright' });
      control.onAdd = () => {
        const div = L.DomUtil.create('div', 'leaflet-bar');
        div.innerHTML = `
          <button style="background: #ffc107; color: black; border: 1px solid #ffc107; padding: 5px; cursor: pointer;">
            ⚠️ Hazards
          </button>
        `;
        div.onclick = () => {
          alert('Hazard detection feature will be implemented');
        };
        return div;
      };
      control.addTo(map);
    }, [map]);

    return null;
  };

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[cityData?.lat || 28.6139, cityData?.lng || 77.2090]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Current Location Marker */}
        {currentLocation && (
          <Marker position={[currentLocation.lat, currentLocation.lng]}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* Search Result Marker */}
        {lastSearchResult && (
          <Marker position={[lastSearchResult.lat, lastSearchResult.lng]}>
            <Popup>{lastSearchResult.name}</Popup>
          </Marker>
        )}

        {/* Hazard Markers */}
        {hazardMarkers.map((hazard, index) => (
          <Marker 
            key={`hazard-${index}`}
            position={[hazard.lat, hazard.lng]}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background: red; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px;">⚠️</div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })}
          >
            <Popup>
              <div>
                <strong>⚠️ Hazard Alert</strong><br/>
                {hazard.type || 'Unknown hazard'}<br/>
                {hazard.description || 'Use caution in this area'}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Crowd Density Markers */}
        {crowdMarkers.map((crowd, index) => (
          <Marker 
            key={`crowd-${index}`}
            position={[crowd.lat, crowd.lng]}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background: orange; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px;">👥</div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })}
          >
            <Popup>
              <div>
                <strong>👥 Crowd Information</strong><br/>
                Density: {crowd.density || 'Unknown'}<br/>
                {crowd.description || 'Crowd data for this area'}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Route Polyline */}
        {routeCoordinates.length > 0 && (
          <>
            {/* Background line for better visibility */}
            <Polyline 
              positions={routeCoordinates} 
              color="white" 
              weight={8}
              opacity={0.8}
            />
            {/* Main route line */}
            <Polyline 
              positions={routeCoordinates} 
              color="#3b82f6" 
              weight={4}
              opacity={0.9}
              dashArray="10, 5"
            />
          </>
        )}

        {/* Map Controls */}
        <LocationControl onCurrentLocationFound={handleCurrentLocationFound} />
        <SearchControl 
          onLocationFound={handleLocationFound} 
          onGetDirections={handleGetDirections}
          currentLocation={currentLocation}
        />
        <QueryControl onAreaPicked={handleAreaPicked} />
        <OfflineControl 
          onOfflineToggle={(val) => setIsOfflineMode(!!val)}
          onPrefetchZoomRange={(minZ, maxZ) => setCachedMaxZ(maxZ)}
          autoDownloadMaps={autoDownloadMaps}
          setAutoDownloadMaps={setAutoDownloadMaps}
        />
      </MapContainer>

      {/* Route Instructions Panel */}
      {routeInstructions.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm max-h-64 overflow-y-auto">
          <h3 className="font-bold text-sm mb-2">🧭 Route Instructions</h3>
          <div className="text-xs space-y-1">
            {routeInstructions.map((instruction, index) => (
              <div key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">{index + 1}.</span>
                <span>{instruction}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Panel */}
      {showEmergencyPanel && (
        <div className="absolute top-4 right-4 bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 max-w-xs">
          <h3 className="font-bold text-red-800 mb-2">🚨 Emergency Services</h3>
          <div className="space-y-2 text-sm">
            <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
              📞 Call Police (100)
            </button>
            <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
              🚑 Call Ambulance (108)
            </button>
            <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
              🚒 Call Fire (101)
            </button>
            <button 
              onClick={() => setShowEmergencyPanel(false)}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Emergency Button */}
      <button
        onClick={() => setShowEmergencyPanel(!showEmergencyPanel)}
        className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 z-10"
        title="Emergency Services"
      >
        🚨
      </button>
    </div>
  );
}
