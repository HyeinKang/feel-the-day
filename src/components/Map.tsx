/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface MapProps {
  setSelectedLngLat: (coordinates: [number, number]) => void;
}

const Map: React.FC<MapProps> = ({ setSelectedLngLat }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

    if (!mapContainerRef.current || !mapboxgl.accessToken) {
      console.error(
        "Mapbox access token is missing or map container is not available",
      );
      return;
    }

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    mapRef.current.on("load", () => {
      // Append geocoder(searchbar) to the map
      const geocoderContainer = document.getElementById("geocoder");
      if (geocoderContainer && mapRef.current) {
          geocoderContainer.appendChild(geocoder.onAdd(mapRef.current));
      }

      geocoder.on("result", (e: { result: { geometry: { coordinates: [number, number] } } }) => {
        const [lng, lat] = e.result.geometry.coordinates;
        setSelectedLngLat([lng, lat]);
      });
    });

    // Manage controls
    mapRef.current.scrollZoom.disable();
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "bottom-left");

    // Add geolocate control(find-my-location) to the map
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    mapRef.current.addControl(geolocate, "bottom-left");

    // Handle map click
    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      setSelectedLngLat([lng, lat]);
    });

    geolocate.on("geolocate", (e: { coords: { longitude: number; latitude: number } }) => {
      console.log(`lng: ${e.coords.longitude}, lat: ${e.coords.latitude}`);
    });

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
