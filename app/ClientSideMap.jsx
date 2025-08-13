'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import leafletImage from 'leaflet-image';
import L from 'leaflet';

// Download Button Component
function DownloadControl() {
  const map = useMap();

  useEffect(() => {
    const downloadButton = L.control({ position: 'topleft' });

    downloadButton.onAdd = () => {
      const btn = L.DomUtil.create('button', 'leaflet-bar');
      btn.innerHTML = '⬇️';
      btn.title = 'Download High Quality Map';
      btn.style.background = 'white';
      btn.style.cursor = 'pointer';
      btn.style.width = '34px';
      btn.style.height = '34px';

      btn.onclick = () => {
        leafletImage(map, (err, canvas) => {
          if (err) {
            console.error(err);
            return;
          }
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'Map_sathi.png';
          link.click();
        });
      };

      return btn;
    };

    downloadButton.addTo(map);

    // Cleanup: remove the button when component unmounts
    return () => {
      downloadButton.remove();
    };
  }, [map]);

  return null;
}

export default function ClientSideMap({ cityData }) {
  return (
    <MapContainer
      key={cityData.id}
      center={cityData.center}
      zoom={cityData.zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <DownloadControl />

      {cityData.markers.map((m) => (
        <Marker key={m.id} position={m.pos}>
          <Popup>{m.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
