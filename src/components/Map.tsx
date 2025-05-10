import React, { useEffect, useRef } from 'react';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    if (!mapContainerRef.current || !mapboxgl.accessToken) {
        console.error('Mapbox access token is missing or map container is not available');
      return;
    }

    mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-79.4512, 43.6568],
        zoom: 13,
    });


    mapRef.current.scrollZoom.disable();
    mapRef.current.addControl(new mapboxgl.NavigationControl());

    mapRef.current.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl as any,
        })
    );

    // Add geolocate control to the map.
    mapRef.current.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        })
    );

    mapRef.current.on('click', (e) => {
        console.log(e);
    });
        
    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return <div ref={mapContainerRef} className='w-full h-full' />;
};

export default Map;
