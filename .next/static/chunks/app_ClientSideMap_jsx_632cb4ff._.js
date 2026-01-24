(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/ClientSideMap.jsx [app-client] (ecmascript, next/dynamic entry, async loader)": ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_e8576944._.js",
  "static/chunks/app_ClientSideMap_jsx_70f37b78._.js",
  {
    "path": "static/chunks/node_modules_b2432a8b._.css",
    "included": [
      "[project]/node_modules/leaflet/dist/leaflet.css [app-client] (css)",
      "[project]/node_modules/leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css [app-client] (css)"
    ],
    "moduleChunks": [
      "static/chunks/node_modules_leaflet_dist_leaflet_css_e59ae46c._.single.css",
      "static/chunks/b2997_et-defaulticon-compatibility_dist_leaflet-defaulticon-compatibility_css_e59ae46c._.single.css"
    ]
  },
  "static/chunks/app_ClientSideMap_jsx_55afa0cb._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/app/ClientSideMap.jsx [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
}]);