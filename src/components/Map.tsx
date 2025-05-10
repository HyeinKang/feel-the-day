import React, { useEffect, useRef } from 'react';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

interface MapProps {
  setSelectedLngLat: (coordinates: [number, number]) => void;
}

const Map: React.FC<MapProps> = ({ setSelectedLngLat }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    if (!mapContainerRef.current || !mapboxgl.accessToken) {
      console.error('Mapbox access token is missing or map container is not available');
      return;
    }

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    if (!mapRef.current) {
      console.error('Mapbox map instance is not available');
      return;
    }

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken as string,
      mapboxgl: mapboxgl as any,
    });

    mapRef.current.on('load', () => {
      // Add the custom control to the map
      mapRef.current && document.getElementById('geocoder')?.appendChild(geocoder.onAdd(mapRef.current));

      geocoder.on('result', (e) => {
        const [lng, lat] = e.result.geometry.coordinates;
        setSelectedLngLat([lng, lat]);
      });

      // Add a marker at the initial location
      const marker = new mapboxgl.Marker()
        .setLngLat([-79.4512, 43.6568])
        .addTo(mapRef.current!);
      // Add a popup to the marker
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h3>Initial Location</h3><p>Click on the map to get coordinates</p>');
      marker.setPopup(popup);
      // Open the popup
      popup.addTo(mapRef.current!);
    });

    // Manage controls
    mapRef.current.scrollZoom.disable();
    mapRef.current.addControl(new mapboxgl.NavigationControl(),  'bottom-left');

    // Add geolocate control(find-my-location) to the map
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    mapRef.current.addControl(
      geolocate,
      'bottom-left'
    )

    // Handle map click
    mapRef.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      setSelectedLngLat([lng, lat]);
    });

    function locateUser(e) {
      console.log("A geolocate event has occurred.");
      console.log("lng:" + e.coords.longitude + ", lat:" + e.coords.latitude);
    }
    geolocate.on("geolocate", locateUser);

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [setSelectedLngLat]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default Map;