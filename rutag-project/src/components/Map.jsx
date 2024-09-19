// components/Map.jsx
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Default center and zoom level
const defaultCenter = [28.6139, 77.2090];
const defaultZoom = 18;

const Map = ({ center = defaultCenter, zoom = defaultZoom, onMapClick }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline && mapRef.current) {
      const map = L.map(mapRef.current).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        errorTileUrl: '', // Optional: Handle tile load errors
      }).addTo(map);

      mapInstanceRef.current = map;

      if (onMapClick) {
        map.on('click', (e) => {
          const { lat, lng } = e.latlng;
          console.log(`Map clicked at: ${lat}, ${lng}`);
          onMapClick({ lat, lng });

          if (markerRef.current) {
            console.log('Updating marker position');
            markerRef.current.setLatLng([lat, lng]);
          } else {
            console.log('Adding new marker');
            markerRef.current = L.marker([lat, lng]).addTo(mapInstanceRef.current);
            console.log(markerRef.current);
          }
        });
      }

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }
      };
    }
  }, [center, zoom, onMapClick, isOnline]);

  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      markerRef.current.addTo(mapInstanceRef.current);
    }
  }, [mapInstanceRef.current, markerRef.current]);

  return (
    <div style={{ position: 'relative' }}>
      {isOnline ? (
        <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
      ) : (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8d7da', color: '#721c24', padding: '20px', borderRadius: '4px' }}>
          <strong>You are offline. The map is not available.</strong>
        </div>
      )}
    </div>
  );
};

export default Map;


/*import { useEffect, useRef, useState } from 'react';

const defaultCenter = { lat: 28.6139, lng: 77.2090 };
const defaultZoom = 13;

const loadGoogleMapsScript = (callback) => {
  const existingScript = document.getElementById('googleMaps');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB3-l14Daw7RDkUiBOVFCvlNLp6DdWvvnk&libraries=places`;
    script.id = 'googleMaps';
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  } else if (callback) {
    callback();
  }
};

const Map = ({ center = defaultCenter, zoom = defaultZoom, onMapClick }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    loadGoogleMapsScript(() => {
    if (mapRef.current) {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
      });

      setMap(mapInstance);

      if (onMapClick) {
        mapInstance.addListener('click', (e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          console.log(`Map clicked at: ${lat}, ${lng}`); ///
          onMapClick({ lat, lng });

          if (markerRef.current) {
            console.log('Updating marker position'); ///
            markerRef.current.setPosition({ lat, lng });
          } else {
            console.log('Adding new marker'); ///
            markerRef.current = new window.google.maps.Marker({
              position: { lat, lng },
              map: mapInstance,
            });
          }
        });
      }
    }
  })
  }, [center, zoom, onMapClick]);

  useEffect(() => {
    if (map && markerRef.current) {
      markerRef.current.setMap(map);
    }
  }, [map, markerRef.current]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>;
};

export default Map;*/





