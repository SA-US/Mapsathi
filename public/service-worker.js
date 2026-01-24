/* Service Worker for offline tiles and assets */
const VERSION = 'v1';
const APP_SHELL_CACHE = `app-shell-${VERSION}`;
const TILE_CACHE = `tile-cache-${VERSION}`;
let FORCE_OFFLINE = false;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      // Cache minimal app shell if needed; keep this small
      return cache.addAll([
        '/',
      ]).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => ![APP_SHELL_CACHE, TILE_CACHE].includes(k))
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

// Receive messages from clients (e.g., toggle offline)
self.addEventListener('message', (event) => {
  const { type, payload } = event.data || {};
  if (type === 'SET_FORCE_OFFLINE') {
    FORCE_OFFLINE = !!payload;
  }
});

// Helper: determine if request is a map tile
function isTileRequest(url) {
  // Match OSM tile server
  return /\b(a|b|c)\.tile\.openstreetmap\.org\/.+\/(\d+)\/(\d+)\/(\d+)\.png$/.test(url);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = request.url;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // For map tiles: cache-first, then network
  if (isTileRequest(url)) {
    event.respondWith(
      caches.open(TILE_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        if (FORCE_OFFLINE) {
          // Offline but tile missing
          return new Response(null, { status: 504, statusText: 'Tile not available offline' });
        }
        try {
          const response = await fetch(request, { mode: 'cors' });
          if (response && response.ok) {
            cache.put(request, response.clone());
          }
          return response;
        } catch (e) {
          // Network failed, try cache fallback again
          const fallback = await cache.match(request);
          return fallback || new Response(null, { status: 504, statusText: 'Tile fetch failed' });
        }
      })
    );
    return;
  }

  // For app shell/static: network-first with cache fallback
  event.respondWith(
    (async () => {
      try {
        if (FORCE_OFFLINE) throw new Error('Forced offline');
        const network = await fetch(request);
        const cache = await caches.open(APP_SHELL_CACHE);
        cache.put(request, network.clone());
        return network;
      } catch (e) {
        const cache = await caches.open(APP_SHELL_CACHE);
        const cached = await cache.match(request);
        return cached || new Response(null, { status: 504, statusText: 'Offline' });
      }
    })()
  );
});

// Utility exposed via postMessage: pre-cache a list of tile URLs
self.addEventListener('message', async (event) => {
  const { type, payload } = event.data || {};
  if (type === 'PRECACHE_TILES' && Array.isArray(payload)) {
    const cache = await caches.open(TILE_CACHE);
    let done = 0;
    const total = payload.length;

    // Send progress updates back to the client
    const sendProgress = (pct) => {
      event.source && event.source.postMessage({ type: 'PRECACHE_PROGRESS', payload: { done, total, pct } });
    };

    for (const url of payload) {
      try {
        const req = new Request(url, { mode: 'cors' });
        const existing = await cache.match(req);
        if (!existing) {
          const res = await fetch(req);
          if (res.ok) await cache.put(req, res.clone());
        }
      } catch (_) {}
      done += 1;
      if (done % 10 === 0 || done === total) sendProgress(Math.round((done / total) * 100));
    }

    event.source && event.source.postMessage({ type: 'PRECACHE_DONE', payload: { done, total } });
  }
});
