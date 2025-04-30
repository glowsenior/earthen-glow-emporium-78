
import React, { useRef, useEffect } from 'react';

const GoogleMap = ({ address, zoom = 15 }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Function to initialize the map
    const initializeMap = () => {
      if (!window.google) {
        console.error('Google Maps JavaScript API not loaded');
        return;
      }

      // Convert address to coordinates using Geocoding service
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          
          const mapOptions = {
            center: { lat: lat(), lng: lng() },
            zoom,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
              {
                featureType: "administrative",
                elementType: "labels.text.fill",
                stylers: [{ color: "#444444" }]
              },
              {
                featureType: "landscape",
                elementType: "all",
                stylers: [{ color: "#f2f2f2" }]
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: [{ visibility: "off" }]
              },
              {
                featureType: "road",
                elementType: "all",
                stylers: [{ saturation: -100 }, { lightness: 45 }]
              },
              {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "off" }]
              }
            ]
          };

          // Create the map
          mapInstanceRef.current = new window.google.maps.Map(
            mapRef.current,
            mapOptions
          );

          // Add marker
          new window.google.maps.Marker({
            position: { lat: lat(), lng: lng() },
            map: mapInstanceRef.current,
            title: 'Earthen Glow',
            animation: window.google.maps.Animation.DROP,
          });
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
    };

    // Load Google Maps API if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        // Clean up map instance if needed
      }
    };
  }, [address, zoom]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg shadow-md" 
      style={{ minHeight: '400px' }}
    />
  );
};

export default GoogleMap;
