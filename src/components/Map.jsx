
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

const Map = ({ center = [-118.243683, 34.052235], zoom = 13 }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;
    
    mapboxgl.accessToken = mapboxToken;
    
    if (map.current) return;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: zoom,
      scrollZoom: false
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add marker
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#E07A5F" stroke="#E07A5F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>';
    
    new mapboxgl.Marker(markerElement)
      .setLngLat(center)
      .addTo(map.current);

    return () => map.current?.remove();
  }, [center, zoom, mapboxToken]);

  const handleSubmitToken = (e) => {
    e.preventDefault();
    const token = e.target.token.value;
    if (token) {
      setMapboxToken(token);
      setShowTokenInput(false);
      localStorage.setItem('mapbox_token', token);
    }
  };

  // Check for token in localStorage on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      setShowTokenInput(false);
    }
  }, []);

  return (
    <div className="relative h-full w-full">
      {showTokenInput ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <form onSubmit={handleSubmitToken} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl font-medium text-ceramic-navy mb-4">Enter Mapbox Token</h3>
            <p className="text-gray-600 mb-4">
              To display the map, please enter your Mapbox public token. 
              You can get one for free by signing up at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-ceramic-terracotta underline">mapbox.com</a>.
            </p>
            <div className="mb-4">
              <input
                type="text"
                name="token"
                placeholder="Enter your Mapbox public token"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ceramic-terracotta"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full"
            >
              Set Token
            </button>
          </form>
        </div>
      ) : null}
      <div ref={mapContainer} className="h-full w-full rounded-none"></div>
    </div>
  );
};

export default Map;
