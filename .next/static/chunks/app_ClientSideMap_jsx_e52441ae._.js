(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/ClientSideMap.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientSideMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/MapContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/TileLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Popup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Polyline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Polyline.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Circle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2d$defaulticon$2d$compatibility$2f$src$2f$Icon$2e$Default$2e$compatibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet-defaulticon-compatibility/src/Icon.Default.compatibility.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
// Note: PDF export is handled by PdfExportControl via CDN-loaded jsPDF
// Location Control Component
function LocationControl(param) {
    let { onCurrentLocationFound } = param;
    _s();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    const firstFixRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const watchIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LocationControl.useEffect": ()=>{
            const getCurrentLocation = {
                "LocationControl.useEffect.getCurrentLocation": ()=>{
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
                        const id = navigator.geolocation.watchPosition({
                            "LocationControl.useEffect.getCurrentLocation.id": (position)=>{
                                const lat = position.coords.latitude;
                                const lon = position.coords.longitude;
                                const acc = position.coords.accuracy;
                                // Update parent with each fix
                                onCurrentLocationFound({
                                    lat,
                                    lon,
                                    accuracy: acc
                                });
                                // Center map on first good fix
                                if (!firstFixRef.current && isFinite(lat) && isFinite(lon)) {
                                    map.setView([
                                        lat,
                                        lon
                                    ], Math.max(map.getZoom(), 15));
                                    firstFixRef.current = true;
                                }
                                // Stop watching if accuracy is reasonably good
                                if (acc !== null && acc <= 50) {
                                    if (watchIdRef.current !== null) {
                                        navigator.geolocation.clearWatch(watchIdRef.current);
                                        watchIdRef.current = null;
                                    }
                                }
                            }
                        }["LocationControl.useEffect.getCurrentLocation.id"], {
                            "LocationControl.useEffect.getCurrentLocation.id": (error)=>{
                                console.error('Geolocation error:', error);
                                alert('Unable to get your location. Please enable precise location in device settings and ensure HTTPS.');
                                if (watchIdRef.current !== null) {
                                    navigator.geolocation.clearWatch(watchIdRef.current);
                                    watchIdRef.current = null;
                                }
                            }
                        }["LocationControl.useEffect.getCurrentLocation.id"], {
                            enableHighAccuracy: true,
                            maximumAge: 0,
                            timeout: 15000
                        });
                        watchIdRef.current = id;
                        // Safety stop after 20s
                        setTimeout({
                            "LocationControl.useEffect.getCurrentLocation": ()=>{
                                if (watchIdRef.current !== null) {
                                    navigator.geolocation.clearWatch(watchIdRef.current);
                                    watchIdRef.current = null;
                                }
                            }
                        }["LocationControl.useEffect.getCurrentLocation"], 20000);
                    } catch (e) {
                        console.error('Geolocation exception:', e);
                        alert('Location request failed.');
                    }
                }
            }["LocationControl.useEffect.getCurrentLocation"];
            const locationControl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].control({
                position: 'topleft'
            });
            locationControl.onAdd = ({
                "LocationControl.useEffect": ()=>{
                    const btn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('button', 'leaflet-bar');
                    btn.innerHTML = '📍';
                    btn.title = 'Get Current Location';
                    btn.style.background = 'white';
                    btn.style.cursor = 'pointer';
                    btn.style.width = '34px';
                    btn.style.height = '34px';
                    btn.style.marginTop = '10px';
                    btn.style.fontSize = '16px';
                    btn.style.border = 'none';
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.on(btn, 'click', {
                        "LocationControl.useEffect": (e)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.stopPropagation(e);
                            btn.innerHTML = '⏳';
                            btn.disabled = true;
                            getCurrentLocation();
                            setTimeout({
                                "LocationControl.useEffect": ()=>{
                                    btn.innerHTML = '📍';
                                    btn.disabled = false;
                                }
                            }["LocationControl.useEffect"], 2000);
                        }
                    }["LocationControl.useEffect"]);
                    return btn;
                }
            })["LocationControl.useEffect"];
            locationControl.addTo(map);
            return ({
                "LocationControl.useEffect": ()=>{
                    if (watchIdRef.current !== null) {
                        try {
                            navigator.geolocation.clearWatch(watchIdRef.current);
                        } catch (_) {}
                        watchIdRef.current = null;
                    }
                    map.removeControl(locationControl);
                }
            })["LocationControl.useEffect"];
        }
    }["LocationControl.useEffect"], [
        map,
        onCurrentLocationFound
    ]);
    return null;
}
_s(LocationControl, "qOLHMs5grAnjmW2xkwyZGCoaFbQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c = LocationControl;
// Search Control Component
function SearchControl(param) {
    let { onLocationFound, onGetDirections, currentLocation } = param;
    _s1();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    const [lastSearchResult, setLastSearchResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchControl.useEffect": ()=>{
            const performSearch = {
                "SearchControl.useEffect.performSearch": async (query)=>{
                    try {
                        const response = await fetch("https://nominatim.openstreetmap.org/search?format=json&q=".concat(encodeURIComponent(query), "&limit=1"));
                        const data = await response.json();
                        if (data && data.length > 0) {
                            const result = data[0];
                            const lat = parseFloat(result.lat);
                            const lon = parseFloat(result.lon);
                            map.setView([
                                lat,
                                lon
                            ], 13);
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
                }
            }["SearchControl.useEffect.performSearch"];
            const getDirections = {
                "SearchControl.useEffect.getDirections": async (destination)=>{
                    if (!currentLocation) {
                        alert('Please get your current location first');
                        return;
                    }
                    onGetDirections({
                        from: {
                            lat: currentLocation.lat,
                            lon: currentLocation.lon
                        },
                        to: {
                            lat: destination.lat,
                            lon: destination.lon
                        },
                        destinationName: destination.name
                    });
                }
            }["SearchControl.useEffect.getDirections"];
            const searchControl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].control({
                position: 'topright'
            });
            searchControl.onAdd = ({
                "SearchControl.useEffect": ()=>{
                    const container = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                    container.style.backgroundColor = 'white';
                    container.style.padding = '8px';
                    container.style.borderRadius = '4px';
                    container.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    const searchInput = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('input', '', container);
                    searchInput.type = 'text';
                    searchInput.placeholder = 'Search location...';
                    searchInput.style.border = '1px solid #ddd';
                    searchInput.style.borderRadius = '4px';
                    searchInput.style.padding = '6px 10px';
                    searchInput.style.width = '200px';
                    searchInput.style.fontSize = '14px';
                    const searchButton = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('button', '', container);
                    searchButton.innerHTML = '🔍';
                    searchButton.style.marginLeft = '4px';
                    searchButton.style.border = 'none';
                    searchButton.style.background = '#007cba';
                    searchButton.style.color = 'white';
                    searchButton.style.borderRadius = '4px';
                    searchButton.style.padding = '6px 10px';
                    searchButton.style.cursor = 'pointer';
                    const directionsButton = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('button', '', container);
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
                    directionsButton.style.display = lastSearchResult || currentLocation ? 'inline-block' : 'none';
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.on(searchButton, 'click', {
                        "SearchControl.useEffect": async (e)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.stopPropagation(e);
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
                        }
                    }["SearchControl.useEffect"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.on(directionsButton, 'click', {
                        "SearchControl.useEffect": async (e)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.stopPropagation(e);
                            if (!lastSearchResult) {
                                alert('Please search for a destination first');
                                return;
                            }
                            directionsButton.innerHTML = '⏳';
                            directionsButton.disabled = true;
                            await getDirections(lastSearchResult);
                            directionsButton.innerHTML = '🧭';
                            directionsButton.disabled = false;
                        }
                    }["SearchControl.useEffect"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.on(searchInput, 'keypress', {
                        "SearchControl.useEffect": async (e)=>{
                            if (e.key === 'Enter') {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.stopPropagation(e);
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
                        }
                    }["SearchControl.useEffect"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.disableClickPropagation(container);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.disableScrollPropagation(container);
                    return container;
                }
            })["SearchControl.useEffect"];
            searchControl.addTo(map);
            return ({
                "SearchControl.useEffect": ()=>{
                    map.removeControl(searchControl);
                }
            })["SearchControl.useEffect"];
        }
    }["SearchControl.useEffect"], [
        map,
        onLocationFound,
        onGetDirections,
        currentLocation,
        lastSearchResult
    ]);
    // Update directions button visibility when search target or current location changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchControl.useEffect": ()=>{
            const controls = document.querySelectorAll('.leaflet-control-custom button[title="Get Directions"]');
            controls.forEach({
                "SearchControl.useEffect": (btn)=>{
                    // visible if we have either a last search result or current location
                    const hasTarget = !!document.querySelector('.leaflet-control-custom input');
                    btn.style.display = lastSearchResult || currentLocation ? 'inline-block' : 'none';
                }
            }["SearchControl.useEffect"]);
        }
    }["SearchControl.useEffect"], [
        lastSearchResult,
        currentLocation
    ]);
    return null;
}
_s1(SearchControl, "zQbgbyc1Ym1A1GCdfErHiBGwy4g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c1 = SearchControl;
// Offline Control Component (tile prefetch + offline toggle)
function OfflineControl(param) {
    let { onOfflineToggle, onPrefetchZoomRange } = param;
    _s2();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    const [isOffline, setIsOffline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OfflineControl.useEffect": ()=>{
            // Listen for SW progress updates
            const onMsg = {
                "OfflineControl.useEffect.onMsg": (event)=>{
                    const { type, payload } = event.data || {};
                    if (type === 'PRECACHE_PROGRESS') {
                        setProgress(payload);
                    } else if (type === 'PRECACHE_DONE') {
                        setProgress({
                            done: payload.done,
                            total: payload.total,
                            pct: 100
                        });
                        setTimeout({
                            "OfflineControl.useEffect.onMsg": ()=>setProgress(null)
                        }["OfflineControl.useEffect.onMsg"], 1500);
                        alert("Offline download complete (tiles: ".concat(payload.done, ")"));
                    }
                }
            }["OfflineControl.useEffect.onMsg"];
            navigator.serviceWorker && navigator.serviceWorker.addEventListener('message', onMsg);
            return ({
                "OfflineControl.useEffect": ()=>{
                    navigator.serviceWorker && navigator.serviceWorker.removeEventListener('message', onMsg);
                }
            })["OfflineControl.useEffect"];
        }
    }["OfflineControl.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OfflineControl.useEffect": ()=>{
            const control = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].control({
                position: 'topleft'
            });
            control.onAdd = ({
                "OfflineControl.useEffect": ()=>{
                    const container = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('div', 'leaflet-bar');
                    container.style.background = 'white';
                    container.style.display = 'flex';
                    container.style.flexDirection = 'column';
                    container.style.gap = '6px';
                    container.style.padding = '6px';
                    // Prevent map interactions from being hijacked
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.disableClickPropagation(container);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.disableScrollPropagation(container);
                    // Download (precache) button
                    const dl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('button', '', container);
                    dl.innerHTML = '💾';
                    dl.title = 'Download current area for offline';
                    dl.style.width = '34px';
                    dl.style.height = '34px';
                    dl.style.cursor = 'pointer';
                    // Offline toggle button
                    const tog = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('button', '', container);
                    tog.innerHTML = isOffline ? '🛜✖' : '🛜';
                    tog.title = isOffline ? 'Go online' : 'Force offline (use cached tiles)';
                    tog.style.width = '34px';
                    tog.style.height = '34px';
                    tog.style.cursor = 'pointer';
                    const prog = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('div', '', container);
                    prog.style.fontSize = '11px';
                    prog.style.textAlign = 'center';
                    prog.style.width = '34px';
                    prog.style.color = '#333';
                    const setProgText = {
                        "OfflineControl.useEffect.setProgText": ()=>{
                            if (progress && typeof progress.pct === 'number') {
                                prog.textContent = "".concat(progress.pct, "%");
                            } else {
                                prog.textContent = '';
                            }
                        }
                    }["OfflineControl.useEffect.setProgText"];
                    setProgText();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.on(dl, 'click', {
                        "OfflineControl.useEffect": async (e)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.stopPropagation(e);
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
                                    await postToSW({
                                        type: 'PRECACHE_TILES',
                                        payload: tileUrls
                                    });
                                    try {
                                        onPrefetchZoomRange && onPrefetchZoomRange(minZ, maxZ);
                                    } catch (_) {}
                                }
                            } catch (err) {
                                console.error('Precaching failed', err);
                                alert('Offline download failed.');
                            } finally{
                                dl.disabled = false;
                                dl.innerHTML = '💾';
                            }
                        }
                    }["OfflineControl.useEffect"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.on(tog, 'click', {
                        "OfflineControl.useEffect": async (e)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.stopPropagation(e);
                            const next = !isOffline;
                            setIsOffline(next);
                            tog.innerHTML = next ? '🛜✖' : '🛜';
                            tog.title = next ? 'Go online' : 'Force offline (use cached tiles)';
                            try {
                                await postToSW({
                                    type: 'SET_FORCE_OFFLINE',
                                    payload: next
                                });
                                try {
                                    onOfflineToggle && onOfflineToggle(next);
                                } catch (_) {}
                                if (next) {
                                    alert('Offline mode ON. Tiles will be served from cache.');
                                } else {
                                    alert('Offline mode OFF. Back online.');
                                }
                            } catch (err) {
                                console.warn('SW message failed', err);
                            }
                        }
                    }["OfflineControl.useEffect"]);
                    // Keep progress UI updated
                    const int = setInterval(setProgText, 300);
                    container._progInterval = int;
                    return container;
                }
            })["OfflineControl.useEffect"];
            control.addTo(map);
            return ({
                "OfflineControl.useEffect": ()=>{
                    if (control && control.remove) control.remove();
                    if (control && control.getContainer() && control.getContainer()._progInterval) {
                        clearInterval(control.getContainer()._progInterval);
                    }
                }
            })["OfflineControl.useEffect"];
        }
    }["OfflineControl.useEffect"], [
        map,
        isOffline,
        progress
    ]);
    // Helpers
    const postToSW = async (msg)=>{
        if (!('serviceWorker' in navigator)) throw new Error('Service Worker not supported');
        const reg = await navigator.serviceWorker.ready;
        const sw = reg.active || reg.waiting || reg.installing;
        if (!sw) throw new Error('No active Service Worker');
        sw.postMessage(msg);
    };
    const buildTileList = (bounds, minZ, maxZ)=>{
        const north = bounds.getNorth();
        const south = bounds.getSouth();
        const east = bounds.getEast();
        const west = bounds.getWest();
        const urls = [];
        const maxTiles = 1200; // safety limit (wider area for better zooming)
        const lat2tile = (lat, z)=>{
            const rad = lat * Math.PI / 180;
            return Math.floor((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2 * Math.pow(2, z));
        };
        const lon2tile = (lon, z)=>Math.floor((lon + 180) / 360 * Math.pow(2, z));
        for(let z = minZ; z <= maxZ; z++){
            const xMin = lon2tile(west, z);
            const xMax = lon2tile(east, z);
            const yMin = lat2tile(north, z);
            const yMax = lat2tile(south, z);
            for(let x = xMin; x <= xMax; x++){
                for(let y = yMin; y <= yMax; y++){
                    // Use a single subdomain to keep URL deterministic
                    const url = "https://a.tile.openstreetmap.org/".concat(z, "/").concat(x, "/").concat(y, ".png");
                    urls.push(url);
                    if (urls.length >= maxTiles) return urls;
                }
            }
        }
        return urls;
    };
    return null;
}
_s2(OfflineControl, "/3+x16D+3W5KiReE4P0U165yOlk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c2 = OfflineControl;
// (PDF export control removed per request)
function QueryControl(param) {
    let { onAreaPicked } = param;
    _s3();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    const typeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('both');
    const radiusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(500);
    const pickingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QueryControl.useEffect": ()=>{
            const control = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].control({
                position: 'topright'
            });
            control.onAdd = ({
                "QueryControl.useEffect": ()=>{
                    const container = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                    container.style.backgroundColor = 'white';
                    container.style.padding = '8px';
                    container.style.borderRadius = '4px';
                    container.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    const label = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('div', '', container);
                    label.textContent = 'What do you want to know?';
                    label.style.fontSize = '12px';
                    label.style.marginBottom = '6px';
                    const sel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('select', '', container);
                    sel.style.border = '1px solid #ddd';
                    sel.style.borderRadius = '4px';
                    sel.style.padding = '6px 8px';
                    sel.style.width = '180px';
                    sel.style.fontSize = '14px';
                    sel.innerHTML = '<option value="both">Hazards and Crowd</option><option value="hazards">Only Hazards</option><option value="crowd">Only Crowd</option>';
                    sel.value = typeRef.current;
                    const rWrap = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('div', '', container);
                    rWrap.style.marginTop = '6px';
                    const rLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('label', '', rWrap);
                    rLabel.textContent = 'Radius (m): ';
                    const rInput = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('input', '', rWrap);
                    rInput.type = 'number';
                    rInput.min = '50';
                    rInput.max = '3000';
                    rInput.step = '50';
                    rInput.value = String(radiusRef.current);
                    rInput.style.width = '100px';
                    rInput.style.border = '1px solid #ddd';
                    rInput.style.borderRadius = '4px';
                    rInput.style.padding = '4px 6px';
                    const pickBtn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('button', '', container);
                    pickBtn.textContent = 'Pick on map';
                    pickBtn.style.marginTop = '6px';
                    pickBtn.style.border = 'none';
                    pickBtn.style.background = '#6f42c1';
                    pickBtn.style.color = 'white';
                    pickBtn.style.borderRadius = '4px';
                    pickBtn.style.padding = '6px 10px';
                    pickBtn.style.cursor = 'pointer';
                    const hint = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomUtil.create('div', '', container);
                    hint.style.marginTop = '6px';
                    hint.style.fontSize = '12px';
                    hint.style.color = '#555';
                    hint.textContent = '';
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.on(sel, 'change', {
                        "QueryControl.useEffect": (e)=>{
                            typeRef.current = sel.value;
                        }
                    }["QueryControl.useEffect"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.on(rInput, 'change', {
                        "QueryControl.useEffect": (e)=>{
                            const v = Math.max(50, Math.min(3000, parseInt(rInput.value || '500', 10)));
                            radiusRef.current = v;
                            rInput.value = String(v);
                        }
                    }["QueryControl.useEffect"]);
                    const startPicking = {
                        "QueryControl.useEffect.startPicking": ()=>{
                            if (pickingRef.current) return;
                            pickingRef.current = true;
                            pickBtn.textContent = 'Click on map...';
                            hint.textContent = 'Click a location to mark the area';
                            const once = {
                                "QueryControl.useEffect.startPicking.once": (ev)=>{
                                    pickingRef.current = false;
                                    pickBtn.textContent = 'Pick on map';
                                    hint.textContent = '';
                                    const { lat, lng } = ev.latlng || {};
                                    if (typeof lat === 'number' && typeof lng === 'number') {
                                        try {
                                            onAreaPicked && onAreaPicked({
                                                lat,
                                                lon: lng
                                            }, typeRef.current, radiusRef.current);
                                        } catch (_) {}
                                    }
                                }
                            }["QueryControl.useEffect.startPicking.once"];
                            map.once('click', once);
                        }
                    }["QueryControl.useEffect.startPicking"];
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.on(pickBtn, 'click', {
                        "QueryControl.useEffect": (e)=>{
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.stopPropagation(e);
                            startPicking();
                        }
                    }["QueryControl.useEffect"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.disableClickPropagation(container);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].DomEvent.disableScrollPropagation(container);
                    return container;
                }
            })["QueryControl.useEffect"];
            control.addTo(map);
            return ({
                "QueryControl.useEffect": ()=>{
                    map.removeControl(control);
                }
            })["QueryControl.useEffect"];
        }
    }["QueryControl.useEffect"], [
        map,
        onAreaPicked
    ]);
    return null;
}
_s3(QueryControl, "Di2pv7yVIXgXJNzqbbYIG56FSvA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c3 = QueryControl;
function ClientSideMap(param) {
    let { cityData } = param;
    _s4();
    const [searchMarkers, setSearchMarkers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentLocation, setCurrentLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [routeCoordinates, setRouteCoordinates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [routeInstructions, setRouteInstructions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isOfflineMode, setIsOfflineMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cachedMaxZ, setCachedMaxZ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(19);
    const [hazardMarkers, setHazardMarkers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [crowdMarkers, setCrowdMarkers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [destinationInfo, setDestinationInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [destinationRadius] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(500);
    const [queryCenter, setQueryCenter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [queryRadius, setQueryRadius] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(500);
    const [queryHazards, setQueryHazards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [queryCrowd, setQueryCrowd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Track latest routing request to ignore stale responses
    const routeReqIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Register Service Worker for offline tiles
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientSideMap.useEffect": ()=>{
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/service-worker.js').then({
                    "ClientSideMap.useEffect": (reg)=>{
                        console.log('Service Worker registered', reg.scope);
                        // If this page is not yet controlled, reload after activation so SW can handle fetch
                        if (!navigator.serviceWorker.controller) {
                            const reloadOnce = {
                                "ClientSideMap.useEffect.reloadOnce": ()=>{
                                    console.log('Service Worker activated. Reloading to enable offline...');
                                    window.location.reload();
                                }
                            }["ClientSideMap.useEffect.reloadOnce"];
                            if (reg.installing) {
                                reg.installing.addEventListener('statechange', {
                                    "ClientSideMap.useEffect": ()=>{
                                        if (reg.installing.state === 'activated') reloadOnce();
                                    }
                                }["ClientSideMap.useEffect"]);
                            } else if (reg.waiting) {
                                // In some cases waiting is already activated for this scope once a new client loads
                                reloadOnce();
                            }
                        }
                    }
                }["ClientSideMap.useEffect"]).catch({
                    "ClientSideMap.useEffect": (err)=>console.warn('Service Worker registration failed', err)
                }["ClientSideMap.useEffect"]);
            }
        }
    }["ClientSideMap.useEffect"], []);
    const handleLocationFound = (location)=>{
        // Add new search marker
        const newMarker = {
            id: "search-".concat(Date.now()),
            pos: [
                location.lat,
                location.lon
            ],
            title: location.name,
            isSearchResult: true
        };
        // Replace previous search markers with new one
        setSearchMarkers([
            newMarker
        ]);
    };
    const handleCurrentLocationFound = (location)=>{
        setCurrentLocation(location);
    };
    // Fetch with timeout helper
    const fetchWithTimeout = async function(url) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, timeoutMs = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 8000;
        const controller = new AbortController();
        const t = setTimeout(()=>controller.abort(), timeoutMs);
        try {
            const resp = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            return resp;
        } finally{
            clearTimeout(t);
        }
    };
    const handleAreaPicked = async (center, type, radius)=>{
        setQueryCenter(center);
        setQueryRadius(radius);
        setQueryHazards([]);
        setQueryCrowd([]);
        try {
            const qs = (lat, lon, r)=>"lat=".concat(encodeURIComponent(lat), "&lon=").concat(encodeURIComponent(lon), "&r=").concat(encodeURIComponent(r));
            const calls = [];
            if (type === 'both' || type === 'hazards') calls.push(fetch("/api/hazards?".concat(qs(center.lat, center.lon, radius))));
            else calls.push(Promise.resolve(null));
            if (type === 'both' || type === 'crowd') calls.push(fetch("/api/crowd?".concat(qs(center.lat, center.lon, radius))));
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
    const handleGetDirections = async (routeData)=>{
        // Increment request id and capture for this run
        const reqId = ++routeReqIdRef.current;
        // Show immediate placeholder straight line while computing better route
        const placeholderCoords = [
            [
                routeData.from.lat,
                routeData.from.lon
            ],
            [
                routeData.to.lat,
                routeData.to.lon
            ]
        ];
        setRouteCoordinates(placeholderCoords);
        const placeholderDistance = calculateDistance(routeData.from.lat, routeData.from.lon, routeData.to.lat, routeData.to.lon);
        const placeholderBearing = calculateBearing(routeData.from.lat, routeData.from.lon, routeData.to.lat, routeData.to.lon);
        const placeholderDirection = getDirectionFromBearing(placeholderBearing);
        const placeholderInstructions = [
            "Start from your current location",
            "Head ".concat(placeholderDirection, " towards ").concat(routeData.destinationName),
            "Distance: ".concat(placeholderDistance.toFixed(2), " km (straight line)"),
            "Calculating optimal route..."
        ];
        setRouteInstructions(placeholderInstructions);
        window.currentRouteCoordinates = placeholderCoords;
        window.currentRouteInstructions = placeholderInstructions;
        setDestinationInfo({
            lat: routeData.to.lat,
            lon: routeData.to.lon,
            name: routeData.destinationName
        });
        setHazardMarkers([]);
        setCrowdMarkers([]);
        try {
            const qs = (lat, lon, r)=>"lat=".concat(encodeURIComponent(lat), "&lon=").concat(encodeURIComponent(lon), "&r=").concat(encodeURIComponent(r));
            const [hzRes, crRes] = await Promise.all([
                fetch("/api/hazards?".concat(qs(routeData.to.lat, routeData.to.lon, destinationRadius))),
                fetch("/api/crowd?".concat(qs(routeData.to.lat, routeData.to.lon, destinationRadius)))
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
            const mapboxResponse = await fetchWithTimeout("https://api.mapbox.com/directions/v5/mapbox/driving/".concat(routeData.from.lon, ",").concat(routeData.from.lat, ";").concat(routeData.to.lon, ",").concat(routeData.to.lat, "?geometries=geojson&overview=full&steps=true&access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"), {}, 9000);
            if (mapboxResponse.ok) {
                const mapboxData = await mapboxResponse.json();
                if (mapboxData.routes && mapboxData.routes.length > 0) {
                    const route = mapboxData.routes[0];
                    const coordinates = route.geometry.coordinates.map((coord)=>[
                            coord[1],
                            coord[0]
                        ]);
                    if (routeReqIdRef.current !== reqId) return; // stale
                    setRouteCoordinates(coordinates);
                    window.currentRouteCoordinates = coordinates;
                    const distance = (route.distance / 1000).toFixed(2);
                    const duration = Math.round(route.duration / 60);
                    let instructions = [
                        "Start from your current location"
                    ];
                    try {
                        if (route.legs && route.legs.length > 0) {
                            route.legs.forEach((leg)=>{
                                if (leg.steps && leg.steps.length) {
                                    leg.steps.forEach((step, idx)=>{
                                        if (step.maneuver && step.maneuver.instruction) {
                                            instructions.push("".concat(idx + 1, ". ").concat(step.maneuver.instruction));
                                        }
                                    });
                                }
                            });
                        }
                    } catch (_) {}
                    instructions.push("Distance: ".concat(distance, " km"), "Estimated time: ".concat(duration, " minutes (driving)"), "Arrive at ".concat(routeData.destinationName), "Route provided by MapBox");
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
        for (const base of osrmBases){
            if (osrmSucceeded) break;
            try {
                const url = "".concat(base, "/route/v1/driving/").concat(routeData.from.lon, ",").concat(routeData.from.lat, ";").concat(routeData.to.lon, ",").concat(routeData.to.lat, "?overview=full&geometries=geojson&steps=true");
                const response = await fetchWithTimeout(url, {}, 9000);
                console.log("OSRM[".concat(base, "] status:"), response.status);
                if (!response.ok) continue;
                const data = await response.json();
                if (!data.routes || !data.routes.length) continue;
                const route = data.routes[0];
                const coordinates = route.geometry.coordinates.map((coord)=>[
                        coord[1],
                        coord[0]
                    ]);
                if (routeReqIdRef.current !== reqId) return; // stale
                setRouteCoordinates(coordinates);
                window.currentRouteCoordinates = coordinates;
                const distance = (route.distance / 1000).toFixed(2);
                const duration = Math.round(route.duration / 60);
                const prettyDistance = (m)=>{
                    if (m >= 1000) return "".concat((m / 1000).toFixed(1), " km");
                    return "".concat(Math.round(m), " m");
                };
                const buildOsrmInstruction = (step, idx)=>{
                    const maneuver = step.maneuver || {};
                    const type = (maneuver.type || '').toLowerCase();
                    const modifier = (maneuver.modifier || '').toLowerCase();
                    const name = step.name && step.name.trim() !== '' ? step.name : 'unnamed road';
                    const dist = prettyDistance(step.distance || 0);
                    let phrase = '';
                    switch(type){
                        case 'depart':
                            phrase = "Head ".concat(modifier || 'straight', " on ").concat(name, " for ").concat(dist);
                            break;
                        case 'arrive':
                            phrase = "Arrive at destination";
                            break;
                        case 'turn':
                            phrase = "Turn ".concat(modifier || '', " onto ").concat(name, " for ").concat(dist).replace('  ', ' ');
                            break;
                        case 'continue':
                            phrase = "Continue ".concat(modifier || 'straight', " on ").concat(name, " for ").concat(dist).replace('  ', ' ');
                            break;
                        case 'end of road':
                            phrase = "At the end of the road, turn ".concat(modifier || '', " onto ").concat(name, " for ").concat(dist).replace('  ', ' ');
                            break;
                        case 'merge':
                            phrase = "Merge ".concat(modifier ? modifier + ' ' : '', "onto ").concat(name, " for ").concat(dist);
                            break;
                        case 'fork':
                            phrase = "Keep ".concat(modifier || '', " onto ").concat(name, " for ").concat(dist).replace('  ', ' ');
                            break;
                        case 'roundabout':
                            {
                                const exit = maneuver.exit ? ", take the ".concat(maneuver.exit, " exit") : '';
                                phrase = "At the roundabout".concat(exit, " onto ").concat(name, " for ").concat(dist);
                                break;
                            }
                        default:
                            phrase = "".concat(type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Continue', " ").concat(modifier || '', " on ").concat(name, " for ").concat(dist).replace('  ', ' ');
                    }
                    return "".concat(idx + 1, ". ").concat(phrase);
                };
                let instructions = [
                    "Start from your current location"
                ];
                if (route.legs && route.legs.length > 0) {
                    route.legs.forEach((leg)=>{
                        if (leg.steps && leg.steps.length) {
                            leg.steps.forEach((step, idx)=>{
                                instructions.push(buildOsrmInstruction(step, idx));
                            });
                        }
                    });
                }
                instructions.push("Distance: ".concat(distance, " km"), "Estimated time: ".concat(duration, " minutes (driving)"), "Arrive at ".concat(routeData.destinationName));
                if (routeReqIdRef.current !== reqId) return; // stale
                setRouteInstructions(instructions);
                window.currentRouteInstructions = instructions;
                console.log('Loaded OSRM route from', base);
                osrmSucceeded = true;
            } catch (e) {
                console.warn("OSRM[".concat(base, "] failed"), e);
            }
        }
        if (!osrmSucceeded) {
            // Final fallback to straight line
            console.log('Falling back to straight line route');
            const coordinates = [
                [
                    routeData.from.lat,
                    routeData.from.lon
                ],
                [
                    routeData.to.lat,
                    routeData.to.lon
                ]
            ];
            if (routeReqIdRef.current !== reqId) return; // stale
            setRouteCoordinates(coordinates);
            window.currentRouteCoordinates = coordinates;
            const distance = calculateDistance(routeData.from.lat, routeData.from.lon, routeData.to.lat, routeData.to.lon);
            const bearing = calculateBearing(routeData.from.lat, routeData.from.lon, routeData.to.lat, routeData.to.lon);
            const direction = getDirectionFromBearing(bearing);
            const instructions = [
                "Start from your current location",
                "Head ".concat(direction, " towards ").concat(routeData.destinationName),
                "Distance: ".concat(distance.toFixed(2), " km (straight line)"),
                "Estimated time: ".concat(Math.round(distance * 2), " minutes (walking)"),
                "Note: Routing services unavailable, showing direct path",
                "Arrive at destination"
            ];
            if (routeReqIdRef.current !== reqId) return; // stale
            setRouteInstructions(instructions);
            window.currentRouteInstructions = instructions;
        }
    };
    // Helper function to calculate distance between two points
    const calculateDistance = (lat1, lon1, lat2, lon2)=>{
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };
    // Helper function to calculate bearing between two points
    const calculateBearing = (lat1, lon1, lat2, lon2)=>{
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const lat1Rad = lat1 * Math.PI / 180;
        const lat2Rad = lat2 * Math.PI / 180;
        const y = Math.sin(dLon) * Math.cos(lat2Rad);
        const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
        const bearing = Math.atan2(y, x) * 180 / Math.PI;
        return (bearing + 360) % 360; // Normalize to 0-360
    };
    // Helper function to convert bearing to direction
    const getDirectionFromBearing = (bearing)=>{
        const directions = [
            'North',
            'Northeast',
            'East',
            'Southeast',
            'South',
            'Southwest',
            'West',
            'Northwest'
        ];
        const index = Math.round(bearing / 45) % 8;
        return directions[index];
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
        center: cityData.center,
        zoom: cityData.zoom,
        scrollWheelZoom: true,
        style: {
            height: '100%',
            width: '100%'
        },
        preferCanvas: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                subdomains: [
                    'a'
                ],
                detectRetina: false,
                maxNativeZoom: 19,
                keepBuffer: 4,
                crossOrigin: "anonymous"
            }, void 0, false, {
                fileName: "[project]/app/ClientSideMap.jsx",
                lineNumber: 950,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LocationControl, {
                onCurrentLocationFound: handleCurrentLocationFound
            }, void 0, false, {
                fileName: "[project]/app/ClientSideMap.jsx",
                lineNumber: 960,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchControl, {
                onLocationFound: handleLocationFound,
                onGetDirections: handleGetDirections,
                currentLocation: currentLocation
            }, void 0, false, {
                fileName: "[project]/app/ClientSideMap.jsx",
                lineNumber: 961,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QueryControl, {
                onAreaPicked: handleAreaPicked
            }, void 0, false, {
                fileName: "[project]/app/ClientSideMap.jsx",
                lineNumber: 966,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OfflineControl, {
                onOfflineToggle: (val)=>setIsOfflineMode(!!val),
                onPrefetchZoomRange: (minZ, maxZ)=>setCachedMaxZ(maxZ)
            }, void 0, false, {
                fileName: "[project]/app/ClientSideMap.jsx",
                lineNumber: 967,
                columnNumber: 7
            }, this),
            routeCoordinates.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Polyline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Polyline"], {
                        positions: routeCoordinates,
                        color: "white",
                        weight: 8,
                        opacity: 0.8,
                        renderer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].canvas()
                    }, void 0, false, {
                        fileName: "[project]/app/ClientSideMap.jsx",
                        lineNumber: 976,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Polyline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Polyline"], {
                        positions: routeCoordinates,
                        color: "#4285F4",
                        weight: 5,
                        opacity: 0.9,
                        renderer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].canvas()
                    }, void 0, false, {
                        fileName: "[project]/app/ClientSideMap.jsx",
                        lineNumber: 984,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            currentLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                        position: [
                            currentLocation.lat,
                            currentLocation.lon
                        ],
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "📍 Your Location"
                                    }, void 0, false, {
                                        fileName: "[project]/app/ClientSideMap.jsx",
                                        lineNumber: 1000,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/app/ClientSideMap.jsx",
                                        lineNumber: 1001,
                                        columnNumber: 17
                                    }, this),
                                    "Accuracy: ±",
                                    Math.round(currentLocation.accuracy),
                                    "m"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/ClientSideMap.jsx",
                                lineNumber: 999,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/ClientSideMap.jsx",
                            lineNumber: 998,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/ClientSideMap.jsx",
                        lineNumber: 997,
                        columnNumber: 11
                    }, this),
                    Number.isFinite(currentLocation.accuracy) && currentLocation.accuracy > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Circle"], {
                        center: [
                            currentLocation.lat,
                            currentLocation.lon
                        ],
                        radius: Math.min(currentLocation.accuracy, 200),
                        pathOptions: {
                            color: '#0d6efd',
                            fillColor: '#cfe2ff',
                            fillOpacity: 0.2
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/ClientSideMap.jsx",
                        lineNumber: 1007,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true),
            destinationInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Circle"], {
                center: [
                    destinationInfo.lat,
                    destinationInfo.lon
                ],
                radius: destinationRadius,
                pathOptions: {
                    color: '#d9534f',
                    fillColor: '#f5c6cb',
                    fillOpacity: 0.15
                }
            }, void 0, false, {
                fileName: "[project]/app/ClientSideMap.jsx",
                lineNumber: 1017,
                columnNumber: 9
            }, this),
            cityData.markers.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                    position: m.pos,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                        children: m.title
                    }, void 0, false, {
                        fileName: "[project]/app/ClientSideMap.jsx",
                        lineNumber: 1027,
                        columnNumber: 11
                    }, this)
                }, m.id, false, {
                    fileName: "[project]/app/ClientSideMap.jsx",
                    lineNumber: 1026,
                    columnNumber: 9
                }, this)),
            queryCenter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Circle"], {
                center: [
                    queryCenter.lat,
                    queryCenter.lon
                ],
                radius: queryRadius,
                pathOptions: {
                    color: '#6f42c1',
                    fillColor: '#d9c7ff',
                    fillOpacity: 0.2
                }
            }, void 0, false, {
                fileName: "[project]/app/ClientSideMap.jsx",
                lineNumber: 1032,
                columnNumber: 9
            }, this),
            queryHazards.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                    position: [
                        h.lat,
                        h.lon
                    ],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        "⚠️ ",
                                        h.title || 'Hazard'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ClientSideMap.jsx",
                                    lineNumber: 1042,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/app/ClientSideMap.jsx",
                                    lineNumber: 1043,
                                    columnNumber: 15
                                }, this),
                                "Type: ",
                                h.type || 'n/a',
                                typeof h.severity !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/ClientSideMap.jsx",
                                            lineNumber: 1045,
                                            columnNumber: 56
                                        }, this),
                                        "Severity: ",
                                        h.severity
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ClientSideMap.jsx",
                            lineNumber: 1041,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/ClientSideMap.jsx",
                        lineNumber: 1040,
                        columnNumber: 11
                    }, this)
                }, "qhz-".concat(h.id), false, {
                    fileName: "[project]/app/ClientSideMap.jsx",
                    lineNumber: 1039,
                    columnNumber: 9
                }, this)),
            queryCrowd.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                    position: [
                        c.lat,
                        c.lon
                    ],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        "👥 ",
                                        c.title || 'Crowd'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ClientSideMap.jsx",
                                    lineNumber: 1054,
                                    columnNumber: 15
                                }, this),
                                typeof c.level !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/ClientSideMap.jsx",
                                            lineNumber: 1055,
                                            columnNumber: 53
                                        }, this),
                                        "Level: ",
                                        c.level
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ClientSideMap.jsx",
                            lineNumber: 1053,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/ClientSideMap.jsx",
                        lineNumber: 1052,
                        columnNumber: 11
                    }, this)
                }, "qcr-".concat(c.id), false, {
                    fileName: "[project]/app/ClientSideMap.jsx",
                    lineNumber: 1051,
                    columnNumber: 9
                }, this)),
            searchMarkers.map((marker)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                    position: marker.pos,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "📍 Search Result"
                                }, void 0, false, {
                                    fileName: "[project]/app/ClientSideMap.jsx",
                                    lineNumber: 1066,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/app/ClientSideMap.jsx",
                                    lineNumber: 1067,
                                    columnNumber: 15
                                }, this),
                                marker.title,
                                routeInstructions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: '10px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Directions:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ClientSideMap.jsx",
                                            lineNumber: 1071,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            style: {
                                                margin: '5px 0',
                                                paddingLeft: '15px'
                                            },
                                            children: routeInstructions.map((instruction, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    style: {
                                                        fontSize: '12px'
                                                    },
                                                    children: instruction
                                                }, index, false, {
                                                    fileName: "[project]/app/ClientSideMap.jsx",
                                                    lineNumber: 1074,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/ClientSideMap.jsx",
                                            lineNumber: 1072,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ClientSideMap.jsx",
                                    lineNumber: 1070,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ClientSideMap.jsx",
                            lineNumber: 1065,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/ClientSideMap.jsx",
                        lineNumber: 1064,
                        columnNumber: 11
                    }, this)
                }, marker.id, false, {
                    fileName: "[project]/app/ClientSideMap.jsx",
                    lineNumber: 1063,
                    columnNumber: 9
                }, this)),
            hazardMarkers.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                    position: [
                        h.lat,
                        h.lon
                    ],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        "⚠️ ",
                                        h.title || 'Hazard'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ClientSideMap.jsx",
                                    lineNumber: 1088,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/app/ClientSideMap.jsx",
                                    lineNumber: 1089,
                                    columnNumber: 15
                                }, this),
                                "Type: ",
                                h.type || 'n/a',
                                typeof h.severity !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/ClientSideMap.jsx",
                                            lineNumber: 1091,
                                            columnNumber: 56
                                        }, this),
                                        "Severity: ",
                                        h.severity
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ClientSideMap.jsx",
                            lineNumber: 1087,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/ClientSideMap.jsx",
                        lineNumber: 1086,
                        columnNumber: 11
                    }, this)
                }, "hz-".concat(h.id), false, {
                    fileName: "[project]/app/ClientSideMap.jsx",
                    lineNumber: 1085,
                    columnNumber: 9
                }, this)),
            crowdMarkers.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                    position: [
                        c.lat,
                        c.lon
                    ],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        "👥 ",
                                        c.title || 'Crowd'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ClientSideMap.jsx",
                                    lineNumber: 1101,
                                    columnNumber: 15
                                }, this),
                                typeof c.level !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/ClientSideMap.jsx",
                                            lineNumber: 1102,
                                            columnNumber: 53
                                        }, this),
                                        "Level: ",
                                        c.level
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ClientSideMap.jsx",
                            lineNumber: 1100,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/ClientSideMap.jsx",
                        lineNumber: 1099,
                        columnNumber: 11
                    }, this)
                }, "cr-".concat(c.id), false, {
                    fileName: "[project]/app/ClientSideMap.jsx",
                    lineNumber: 1098,
                    columnNumber: 9
                }, this))
        ]
    }, cityData.id, true, {
        fileName: "[project]/app/ClientSideMap.jsx",
        lineNumber: 942,
        columnNumber: 5
    }, this);
}
_s4(ClientSideMap, "1HayDGcU54+Ty+sGJTl0fyW7qOU=");
_c4 = ClientSideMap;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "LocationControl");
__turbopack_context__.k.register(_c1, "SearchControl");
__turbopack_context__.k.register(_c2, "OfflineControl");
__turbopack_context__.k.register(_c3, "QueryControl");
__turbopack_context__.k.register(_c4, "ClientSideMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/ClientSideMap.jsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/ClientSideMap.jsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=app_ClientSideMap_jsx_e52441ae._.js.map