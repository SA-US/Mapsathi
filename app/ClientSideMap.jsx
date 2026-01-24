'use client';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L from 'leaflet';
// Note: PDF export is handled by PdfExportControl via CDN-loaded jsPDF

// Location Control Component
function LocationControl({ onCurrentLocationFound }) {
  const map = useMap();
  const firstFixRef = useRef(false);
  const watchIdRef = useRef(null);

  useEffect(() => {
    const getCurrentLocation = () => {
      if (!('geolocation' in navigator)) {
        alert('Geolocation is not supported by this browser.');
        return;
      }
      try {
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
          watchIdRef.current = null;
        }
        firstFixRef.current = false;
        const id = navigator.geolocation.watchPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const acc = position.coords.accuracy;

            // Update parent with each fix
            onCurrentLocationFound({ lat, lon, accuracy: acc });

            // Center map on first good fix
            if (!firstFixRef.current && isFinite(lat) && isFinite(lon)) {
              map.setView([lat, lon], Math.max(map.getZoom(), 15));
              firstFixRef.current = true;
            }

            // Stop watching if accuracy is reasonably good
            if (acc !== null && acc <= 50) {
              if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
              }
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
            alert('Unable to get your location. Please enable precise location in device settings and ensure HTTPS.');
            if (watchIdRef.current !== null) {
              navigator.geolocation.clearWatch(watchIdRef.current);
              watchIdRef.current = null;
            }
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 15000
          }
        );
        watchIdRef.current = id;
        // Safety stop after 20s
        setTimeout(() => {
          if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
          }
        }, 20000);
      } catch (e) {
        console.error('Geolocation exception:', e);
        alert('Location request failed.');
      }
    };

    const locationControl = L.control({ position: 'topleft' });

    locationControl.onAdd = () => {
      const btn = L.DomUtil.create('button', 'leaflet-bar');
      btn.innerHTML = '📍';
      btn.title = 'Get Current Location';
      btn.style.background = 'white';
      btn.style.cursor = 'pointer';
      btn.style.width = '34px';
      btn.style.height = '34px';
      btn.style.marginTop = '10px';
      btn.style.fontSize = '16px';
      btn.style.border = 'none';

      L.DomEvent.on(btn, 'click', (e) => {
        L.DomEvent.stopPropagation(e);
        btn.innerHTML = '⏳';
        btn.disabled = true;
        
        getCurrentLocation();
        
        setTimeout(() => {
          btn.innerHTML = '📍';
          btn.disabled = false;
        }, 2000);
      });

      return btn;
    };

    locationControl.addTo(map);

    return () => {
      if (watchIdRef.current !== null) {
        try { navigator.geolocation.clearWatch(watchIdRef.current); } catch(_) {}
        watchIdRef.current = null;
      }
      map.removeControl(locationControl);
    };
  }, [map, onCurrentLocationFound]);

  return null;
}

// Search Control Component
function SearchControl({ onLocationFound, onGetDirections, currentLocation }) {
  const map = useMap();
  const [lastSearchResult, setLastSearchResult] = useState(null);

  useEffect(() => {
    const performSearch = async (query) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const result = data[0];
          const lat = parseFloat(result.lat);
          const lon = parseFloat(result.lon);
          
          map.setView([lat, lon], 13);
          
          const locationData = {
            lat,
            lon,
            name: result.display_name,
            query
          };
          
          setLastSearchResult(locationData);
          onLocationFound(locationData);
          
          return locationData;
        } else {
          alert('Location not found. Please try a different search term.');
          return null;
        }
      } catch (error) {
        console.error('Search error:', error);
        alert('Search failed. Please try again.');
        return null;
      }
    };

    const getDirections = async (destination) => {
      if (!currentLocation) {
        alert('Please get your current location first');
        return;
      }

      onGetDirections({
        from: { lat: currentLocation.lat, lon: currentLocation.lon },
        to: { lat: destination.lat, lon: destination.lon },
        destinationName: destination.name
      });
    };

    const searchControl = L.control({ position: 'topright' });

    searchControl.onAdd = () => {
      const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      container.style.backgroundColor = 'white';
      container.style.padding = '8px';
      container.style.borderRadius = '4px';
      container.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

      const searchInput = L.DomUtil.create('input', '', container);
      searchInput.type = 'text';
      searchInput.placeholder = 'Search location...';
      searchInput.style.border = '1px solid #ddd';
      searchInput.style.borderRadius = '4px';
      searchInput.style.padding = '6px 10px';
      searchInput.style.width = '200px';
      searchInput.style.fontSize = '14px';

      const searchButton = L.DomUtil.create('button', '', container);
      searchButton.innerHTML = '🔍';
      searchButton.style.marginLeft = '4px';
      searchButton.style.border = 'none';
      searchButton.style.background = '#007cba';
      searchButton.style.color = 'white';
      searchButton.style.borderRadius = '4px';
      searchButton.style.padding = '6px 10px';
      searchButton.style.cursor = 'pointer';

      const directionsButton = L.DomUtil.create('button', '', container);
      directionsButton.innerHTML = '🧭';
      directionsButton.title = 'Get Directions';
      directionsButton.style.marginLeft = '4px';
      directionsButton.style.border = 'none';
      directionsButton.style.background = '#28a745';
      directionsButton.style.color = 'white';
      directionsButton.style.borderRadius = '4px';
      directionsButton.style.padding = '6px 10px';
      directionsButton.style.cursor = 'pointer';
      // Show if we have a search result OR current location
      directionsButton.style.display = (lastSearchResult || currentLocation) ? 'inline-block' : 'none';

      

      L.DomEvent.on(searchButton, 'click', async (e) => {
        L.DomEvent.stopPropagation(e);
        const query = searchInput.value.trim();
        if (!query) return;

        searchButton.innerHTML = '⏳';
        searchButton.disabled = true;

        const result = await performSearch(query);
        
        if (result) {
          // Show directions button after a search, even if current location isn't set yet
          directionsButton.style.display = 'inline-block';
        }

        searchButton.innerHTML = '🔍';
        searchButton.disabled = false;
      });

      L.DomEvent.on(directionsButton, 'click', async (e) => {
        L.DomEvent.stopPropagation(e);
        
        if (!lastSearchResult) {
          alert('Please search for a destination first');
          return;
        }

        directionsButton.innerHTML = '⏳';
        directionsButton.disabled = true;

        await getDirections(lastSearchResult);

        directionsButton.innerHTML = '🧭';
        directionsButton.disabled = false;
      });

      

      L.DomEvent.on(searchInput, 'keypress', async (e) => {
        if (e.key === 'Enter') {
          L.DomEvent.stopPropagation(e);
          const query = searchInput.value.trim();
          if (!query) return;

          searchButton.innerHTML = '⏳';
          searchButton.disabled = true;

          const result = await performSearch(query);
          
          if (result && currentLocation) {
            directionsButton.style.display = 'inline-block';
          }

          searchButton.innerHTML = '🔍';
          searchButton.disabled = false;
        }
      });

      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      return container;
    };

    searchControl.addTo(map);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, onLocationFound, onGetDirections, currentLocation, lastSearchResult]);

  // Update directions button visibility when search target or current location changes
  useEffect(() => {
    const controls = document.querySelectorAll('.leaflet-control-custom button[title="Get Directions"]');
    controls.forEach(btn => {
      // visible if we have either a last search result or current location
      const hasTarget = !!document.querySelector('.leaflet-control-custom input');
      btn.style.display = (lastSearchResult || currentLocation) ? 'inline-block' : 'none';
    });
  }, [lastSearchResult, currentLocation]);

  

  return null;
}

// Offline Control Component (tile prefetch + offline toggle)
function OfflineControl({ onOfflineToggle, onPrefetchZoomRange }) {
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
      const container = L.DomUtil.create('div', 'leaflet-bar');
      container.style.background = 'white';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '6px';
      container.style.padding = '6px';
      // Prevent map interactions from being hijacked
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      // Download (precache) button
      const dl = L.DomUtil.create('button', '', container);
      dl.innerHTML = '💾';
      dl.title = 'Download current area for offline';
      dl.style.width = '34px';
      dl.style.height = '34px';
      dl.style.cursor = 'pointer';

      // Offline toggle button
      const tog = L.DomUtil.create('button', '', container);
      tog.innerHTML = isOffline ? '🛜✖' : '🛜';
      tog.title = isOffline ? 'Go online' : 'Force offline (use cached tiles)';
      tog.style.width = '34px';
      tog.style.height = '34px';
      tog.style.cursor = 'pointer';

      const prog = L.DomUtil.create('div', '', container);
      prog.style.fontSize = '11px';
      prog.style.textAlign = 'center';
      prog.style.width = '34px';
      prog.style.color = '#333';
      const setProgText = () => {
        if (progress && typeof progress.pct === 'number') {
          prog.textContent = `${progress.pct}%`;
        } else {
          prog.textContent = '';
        }
      };
      setProgText();

      L.DomEvent.on(dl, 'click', async (e) => {
        L.DomEvent.stopPropagation(e);
        dl.disabled = true;
        dl.innerHTML = '⏳';
        try {
          const bounds = map.getBounds();
          const zoom = map.getZoom();
          const minZ = Math.max(0, zoom - 2);
          const maxZ = Math.min(19, zoom + 2);

          const tileUrls = buildTileList(bounds, minZ, maxZ);
          if (!tileUrls.length) {
            alert('No tiles to cache. Try zooming in.');
          } else {
            await postToSW({ type: 'PRECACHE_TILES', payload: tileUrls });
            try { onPrefetchZoomRange && onPrefetchZoomRange(minZ, maxZ); } catch(_) {}
          }
        } catch (err) {
          console.error('Precaching failed', err);
          alert('Offline download failed.');
        } finally {
          dl.disabled = false;
          dl.innerHTML = '💾';
        }
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
          console.warn('SW message failed', err);
        }
      });

      // Keep progress UI updated
      const int = setInterval(setProgText, 300);
      container._progInterval = int;

      return container;
    };

    control.addTo(map);
    return () => {
      if (control && control.remove) control.remove();
      if (control && control.getContainer() && control.getContainer()._progInterval) {
        clearInterval(control.getContainer()._progInterval);
      }
    };
  }, [map, isOffline, progress]);

  // Helpers
  const postToSW = async (msg) => {
    if (!('serviceWorker' in navigator)) throw new Error('Service Worker not supported');
    const reg = await navigator.serviceWorker.ready;
    const sw = reg.active || reg.waiting || reg.installing;
    if (!sw) throw new Error('No active Service Worker');
    sw.postMessage(msg);
  };

  const buildTileList = (bounds, minZ, maxZ) => {
    const north = bounds.getNorth();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const west = bounds.getWest();
    const urls = [];
    const maxTiles = 1200; // safety limit (wider area for better zooming)

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
          // Use a single subdomain to keep URL deterministic
          const url = `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
          urls.push(url);
          if (urls.length >= maxTiles) return urls;
        }
      }
    }
    return urls;
  };

  return null;
}

// (PDF export control removed per request)

function QueryControl({ onAreaPicked }) {
  const map = useMap();
  const typeRef = useRef('both');
  const radiusRef = useRef(500);
  const pickingRef = useRef(false);

  useEffect(() => {
    const control = L.control({ position: 'topright' });
    control.onAdd = () => {
      const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      container.style.backgroundColor = 'white';
      container.style.padding = '8px';
      container.style.borderRadius = '4px';
      container.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

      const label = L.DomUtil.create('div', '', container);
      label.textContent = 'What do you want to know?';
      label.style.fontSize = '12px';
      label.style.marginBottom = '6px';

      const sel = L.DomUtil.create('select', '', container);
      sel.style.border = '1px solid #ddd';
      sel.style.borderRadius = '4px';
      sel.style.padding = '6px 8px';
      sel.style.width = '180px';
      sel.style.fontSize = '14px';
      sel.innerHTML = '<option value="both">Hazards and Crowd</option><option value="hazards">Only Hazards</option><option value="crowd">Only Crowd</option>';
      sel.value = typeRef.current;

      const rWrap = L.DomUtil.create('div', '', container);
      rWrap.style.marginTop = '6px';
      const rLabel = L.DomUtil.create('label', '', rWrap);
      rLabel.textContent = 'Radius (m): ';
      const rInput = L.DomUtil.create('input', '', rWrap);
      rInput.type = 'number';
      rInput.min = '50';
      rInput.max = '3000';
      rInput.step = '50';
      rInput.value = String(radiusRef.current);
      rInput.style.width = '100px';
      rInput.style.border = '1px solid #ddd';
      rInput.style.borderRadius = '4px';
      rInput.style.padding = '4px 6px';

      const pickBtn = L.DomUtil.create('button', '', container);
      pickBtn.textContent = 'Pick on map';
      pickBtn.style.marginTop = '6px';
      pickBtn.style.border = 'none';
      pickBtn.style.background = '#6f42c1';
      pickBtn.style.color = 'white';
      pickBtn.style.borderRadius = '4px';
      pickBtn.style.padding = '6px 10px';
      pickBtn.style.cursor = 'pointer';

      const hint = L.DomUtil.create('div', '', container);
      hint.style.marginTop = '6px';
      hint.style.fontSize = '12px';
      hint.style.color = '#555';
      hint.textContent = '';

      L.DomEvent.on(sel, 'change', (e) => {
        typeRef.current = sel.value;
      });
      L.DomEvent.on(rInput, 'change', (e) => {
        const v = Math.max(50, Math.min(3000, parseInt(rInput.value || '500', 10)));
        radiusRef.current = v;
        rInput.value = String(v);
      });

      const startPicking = () => {
        if (pickingRef.current) return;
        pickingRef.current = true;
        pickBtn.textContent = 'Click on map...';
        hint.textContent = 'Click a location to mark the area';
        const once = (ev) => {
          pickingRef.current = false;
          pickBtn.textContent = 'Pick on map';
          hint.textContent = '';
          const { lat, lng } = ev.latlng || {};
          if (typeof lat === 'number' && typeof lng === 'number') {
            try { onAreaPicked && onAreaPicked({ lat, lon: lng }, typeRef.current, radiusRef.current); } catch(_) {}
          }
        };
        map.once('click', once);
      };

      L.DomEvent.on(pickBtn, 'click', (e) => {
        L.DomEvent.stopPropagation(e);
        startPicking();
      });

      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);
      return container;
    };
    control.addTo(map);
    return () => {
      map.removeControl(control);
    };
  }, [map, onAreaPicked]);

  return null;
}

export default function ClientSideMap({ cityData }) {
  const [searchMarkers, setSearchMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeInstructions, setRouteInstructions] = useState([]);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [cachedMaxZ, setCachedMaxZ] = useState(19);
  const [hazardMarkers, setHazardMarkers] = useState([]);
  const [crowdMarkers, setCrowdMarkers] = useState([]);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const [destinationRadius] = useState(500);
  const [queryCenter, setQueryCenter] = useState(null);
  const [queryRadius, setQueryRadius] = useState(500);
  const [queryHazards, setQueryHazards] = useState([]);
  const [queryCrowd, setQueryCrowd] = useState([]);
  
  // Track latest routing request to ignore stale responses
  const routeReqIdRef = useRef(0);

  // Register Service Worker for offline tiles
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((reg) => {
          console.log('Service Worker registered', reg.scope);
          // If this page is not yet controlled, reload after activation so SW can handle fetch
          if (!navigator.serviceWorker.controller) {
            const reloadOnce = () => {
              console.log('Service Worker activated. Reloading to enable offline...');
              window.location.reload();
            };
            if (reg.installing) {
              reg.installing.addEventListener('statechange', () => {
                if (reg.installing.state === 'activated') reloadOnce();
              });
            } else if (reg.waiting) {
              // In some cases waiting is already activated for this scope once a new client loads
              reloadOnce();
            }
          }
        })
        .catch((err) => console.warn('Service Worker registration failed', err));
    }
  }, []);

  const handleLocationFound = (location) => {
    // Add new search marker
    const newMarker = {
      id: `search-${Date.now()}`,
      pos: [location.lat, location.lon],
      title: location.name,
      isSearchResult: true
    };
    
    // Replace previous search markers with new one
    setSearchMarkers([newMarker]);
  };

  const handleCurrentLocationFound = (location) => {
    setCurrentLocation(location);
  };

  

  // Fetch with timeout helper
  const fetchWithTimeout = async (url, options = {}, timeoutMs = 8000) => {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const resp = await fetch(url, { ...options, signal: controller.signal });
      return resp;
    } finally {
      clearTimeout(t);
    }
  };

  const handleAreaPicked = async (center, type, radius) => {
    setQueryCenter(center);
    setQueryRadius(radius);
    setQueryHazards([]);
    setQueryCrowd([]);
    try {
      const qs = (lat, lon, r) => `lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&r=${encodeURIComponent(r)}`;
      const calls = [];
      if (type === 'both' || type === 'hazards') calls.push(fetch(`/api/hazards?${qs(center.lat, center.lon, radius)}`));
      else calls.push(Promise.resolve(null));
      if (type === 'both' || type === 'crowd') calls.push(fetch(`/api/crowd?${qs(center.lat, center.lon, radius)}`));
      else calls.push(Promise.resolve(null));
      const [hzRes, crRes] = await Promise.all(calls);
      if (hzRes && hzRes.ok) {
        const hz = await hzRes.json();
        if (hz && hz.ok && Array.isArray(hz.items)) setQueryHazards(hz.items);
      }
      if (crRes && crRes.ok) {
        const cr = await crRes.json();
        if (cr && cr.ok && Array.isArray(cr.items)) setQueryCrowd(cr.items);
      }
    } catch (_) {}
  };

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
    window.currentRouteCoordinates = placeholderCoords;
    window.currentRouteInstructions = placeholderInstructions;

    setDestinationInfo({ lat: routeData.to.lat, lon: routeData.to.lon, name: routeData.destinationName });
    setHazardMarkers([]);
    setCrowdMarkers([]);
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

    // First try Mapbox (more reliable when a proper token is available)
    try {
      const mapboxResponse = await fetchWithTimeout(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${routeData.from.lon},${routeData.from.lat};${routeData.to.lon},${routeData.to.lat}?geometries=geojson&overview=full&steps=true&access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`
      , {}, 9000);
      if (mapboxResponse.ok) {
        const mapboxData = await mapboxResponse.json();
        if (mapboxData.routes && mapboxData.routes.length > 0) {
          const route = mapboxData.routes[0];
          const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
          if (routeReqIdRef.current !== reqId) return; // stale
          setRouteCoordinates(coordinates);
          window.currentRouteCoordinates = coordinates;
          const distance = (route.distance / 1000).toFixed(2);
          const duration = Math.round(route.duration / 60);
          let instructions = [`Start from your current location`];
          try {
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
          } catch (_) {}
          instructions.push(
            `Distance: ${distance} km`,
            `Estimated time: ${duration} minutes (driving)`,
            `Arrive at ${routeData.destinationName}`,
            `Route provided by MapBox`
          );
          if (routeReqIdRef.current !== reqId) return; // stale
          setRouteInstructions(instructions);
          window.currentRouteInstructions = instructions;
          console.log('Loaded Mapbox route');
          return; // success
        }
      }
    } catch (e) {
      console.warn('Mapbox failed/timeout, trying OSRM:', e);
    }

    // Next, try multiple public OSRM endpoints with timeout; do not throw on failure.
    let osrmSucceeded = false;
    const osrmBases = [
      'https://router.project-osrm.org',
      'https://routing.openstreetmap.de/routed-car',
      'https://nav.fossgis.de/routed-car'
    ];
    for (const base of osrmBases) {
      if (osrmSucceeded) break;
      try {
        const url = `${base}/route/v1/driving/${routeData.from.lon},${routeData.from.lat};${routeData.to.lon},${routeData.to.lat}?overview=full&geometries=geojson&steps=true`;
        const response = await fetchWithTimeout(url, {}, 9000);
        console.log(`OSRM[${base}] status:`, response.status);
        if (!response.ok) continue;
        const data = await response.json();
        if (!data.routes || !data.routes.length) continue;
        const route = data.routes[0];
        const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
        if (routeReqIdRef.current !== reqId) return; // stale
        setRouteCoordinates(coordinates);
        window.currentRouteCoordinates = coordinates;
        const distance = (route.distance / 1000).toFixed(2);
        const duration = Math.round(route.duration / 60);
        const prettyDistance = (m) => {
          if (m >= 1000) return `${(m / 1000).toFixed(1)} km`;
          return `${Math.round(m)} m`;
        };
        const buildOsrmInstruction = (step, idx) => {
          const maneuver = step.maneuver || {};
          const type = (maneuver.type || '').toLowerCase();
          const modifier = (maneuver.modifier || '').toLowerCase();
          const name = step.name && step.name.trim() !== '' ? step.name : 'unnamed road';
          const dist = prettyDistance(step.distance || 0);
          let phrase = '';
          switch (type) {
            case 'depart':
              phrase = `Head ${modifier || 'straight'} on ${name} for ${dist}`;
              break;
            case 'arrive':
              phrase = `Arrive at destination`;
              break;
            case 'turn':
              phrase = `Turn ${modifier || ''} onto ${name} for ${dist}`.replace('  ', ' ');
              break;
            case 'continue':
              phrase = `Continue ${modifier || 'straight'} on ${name} for ${dist}`.replace('  ', ' ');
              break;
            case 'end of road':
              phrase = `At the end of the road, turn ${modifier || ''} onto ${name} for ${dist}`.replace('  ', ' ');
              break;
            case 'merge':
              phrase = `Merge ${modifier ? modifier + ' ' : ''}onto ${name} for ${dist}`;
              break;
            case 'fork':
              phrase = `Keep ${modifier || ''} onto ${name} for ${dist}`.replace('  ', ' ');
              break;
            case 'roundabout': {
              const exit = maneuver.exit ? `, take the ${maneuver.exit} exit` : '';
              phrase = `At the roundabout${exit} onto ${name} for ${dist}`;
              break;
            }
            default:
              phrase = `${type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Continue'} ${modifier || ''} on ${name} for ${dist}`.replace('  ', ' ');
          }
          return `${idx + 1}. ${phrase}`;
        };
        let instructions = [`Start from your current location`];
        if (route.legs && route.legs.length > 0) {
          route.legs.forEach(leg => {
            if (leg.steps && leg.steps.length) {
              leg.steps.forEach((step, idx) => {
                instructions.push(buildOsrmInstruction(step, idx));
              });
            }
          });
        }
        instructions.push(
          `Distance: ${distance} km`,
          `Estimated time: ${duration} minutes (driving)`,
          `Arrive at ${routeData.destinationName}`
        );
        if (routeReqIdRef.current !== reqId) return; // stale
        setRouteInstructions(instructions);
        window.currentRouteInstructions = instructions;
        console.log('Loaded OSRM route from', base);
        osrmSucceeded = true;
      } catch (e) {
        console.warn(`OSRM[${base}] failed`, e);
      }
    }

    if (!osrmSucceeded) {
      // Final fallback to straight line
      console.log('Falling back to straight line route');
      const coordinates = [
        [routeData.from.lat, routeData.from.lon],
        [routeData.to.lat, routeData.to.lon]
      ];
      if (routeReqIdRef.current !== reqId) return; // stale
      setRouteCoordinates(coordinates);
      window.currentRouteCoordinates = coordinates;
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
      if (routeReqIdRef.current !== reqId) return; // stale
      setRouteInstructions(instructions);
      window.currentRouteInstructions = instructions;
    }
  };

  // Helper function to calculate distance between two points
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

  // Helper function to calculate bearing between two points
  const calculateBearing = (lat1, lon1, lat2, lon2) => {
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    
    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
    
    const bearing = Math.atan2(y, x) * 180 / Math.PI;
    return (bearing + 360) % 360; // Normalize to 0-360
  };

  // Helper function to convert bearing to direction
  const getDirectionFromBearing = (bearing) => {
    const directions = [
      'North', 'Northeast', 'East', 'Southeast',
      'South', 'Southwest', 'West', 'Northwest'
    ];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
  };

  return (
    <MapContainer
      key={cityData.id}
      center={cityData.center}
      zoom={cityData.zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      preferCanvas={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        subdomains={['a']}
        detectRetina={false}
        maxNativeZoom={19}
        keepBuffer={4}
        crossOrigin="anonymous"
      />

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
      />

      {/* Route polyline */}
      {routeCoordinates.length > 0 && (
        <>
          {/* Background line for better visibility */}
          <Polyline 
            positions={routeCoordinates} 
            color="white" 
            weight={8}
            opacity={0.8}
            renderer={L.canvas()}
          />
          {/* Main route line */}
          <Polyline 
            positions={routeCoordinates} 
            color="#4285F4" 
            weight={5}
            opacity={0.9}
            renderer={L.canvas()}
          />
        </>
      )}

      {/* Current location marker */}
      {currentLocation && (
        <>
          <Marker position={[currentLocation.lat, currentLocation.lon]}>
            <Popup>
              <div>
                <strong>📍 Your Location</strong>
                <br />
                Accuracy: ±{Math.round(currentLocation.accuracy)}m
              </div>
            </Popup>
          </Marker>
          {Number.isFinite(currentLocation.accuracy) && currentLocation.accuracy > 0 && (
            <Circle
              center={[currentLocation.lat, currentLocation.lon]}
              radius={Math.min(currentLocation.accuracy, 200)}
              pathOptions={{ color: '#0d6efd', fillColor: '#cfe2ff', fillOpacity: 0.2 }}
            />
          )}
        </>
      )}

      {destinationInfo && (
        <Circle
          center={[destinationInfo.lat, destinationInfo.lon]}
          radius={destinationRadius}
          pathOptions={{ color: '#d9534f', fillColor: '#f5c6cb', fillOpacity: 0.15 }}
        />
      )}

      {/* Original city markers */}
      {cityData.markers.map((m) => (
        <Marker key={m.id} position={m.pos}>
          <Popup>{m.title}</Popup>
        </Marker>
      ))}

      {queryCenter && (
        <Circle
          center={[queryCenter.lat, queryCenter.lon]}
          radius={queryRadius}
          pathOptions={{ color: '#6f42c1', fillColor: '#d9c7ff', fillOpacity: 0.2 }}
        />
      )}
      {queryHazards.map((h) => (
        <Marker key={`qhz-${h.id}`} position={[h.lat, h.lon]}>
          <Popup>
            <div>
              <strong>⚠️ {h.title || 'Hazard'}</strong>
              <br />
              Type: {h.type || 'n/a'}
              {typeof h.severity !== 'undefined' && (<><br />Severity: {h.severity}</>)}
            </div>
          </Popup>
        </Marker>
      ))}
      {queryCrowd.map((c) => (
        <Marker key={`qcr-${c.id}`} position={[c.lat, c.lon]}>
          <Popup>
            <div>
              <strong>👥 {c.title || 'Crowd'}</strong>
              {typeof c.level !== 'undefined' && (<><br />Level: {c.level}</>)}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Search result markers */}
      {searchMarkers.map((marker) => (
        <Marker key={marker.id} position={marker.pos}>
          <Popup>
            <div>
              <strong>📍 Search Result</strong>
              <br />
              {marker.title}
              {routeInstructions.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <strong>Directions:</strong>
                  <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                    {routeInstructions.map((instruction, index) => (
                      <li key={index} style={{ fontSize: '12px' }}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {hazardMarkers.map((h) => (
        <Marker key={`hz-${h.id}`} position={[h.lat, h.lon]}>
          <Popup>
            <div>
              <strong>⚠️ {h.title || 'Hazard'}</strong>
              <br />
              Type: {h.type || 'n/a'}
              {typeof h.severity !== 'undefined' && (<><br />Severity: {h.severity}</>)}
            </div>
          </Popup>
        </Marker>
      ))}

      {crowdMarkers.map((c) => (
        <Marker key={`cr-${c.id}`} position={[c.lat, c.lon]}>
          <Popup>
            <div>
              <strong>👥 {c.title || 'Crowd'}</strong>
              {typeof c.level !== 'undefined' && (<><br />Level: {c.level}</>)}
            </div>
          </Popup>
        </Marker>
      ))}

      
    </MapContainer>
  );
}
