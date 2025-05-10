import React, { useEffect, useRef } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface MapProps {
  setSelectedLngLat: (coordinates: [number, number]) => void;
}

const Map: React.FC<MapProps> = ({ setSelectedLngLat }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);

  useEffect(() => {
    const accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

    if (!mapContainerRef.current || !accessToken) {
      console.error(
        "Mapbox access token is missing or map container is unavailable.",
      );
      return;
    }

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    mapRef.current = map;

    const geocoder = new MapboxGeocoder({
      accessToken,
      mapboxgl: mapboxgl as unknown as typeof import("mapbox-gl"),
    });

    map.on("load", () => {
      const geocoderContainer = document.getElementById("geocoder");
      if (geocoderContainer) {
        geocoderContainer.appendChild(geocoder.onAdd(map));
      }

      geocoder.on(
        "result",
        (e: { result: { geometry: { coordinates: [number, number] } } }) => {
          console.log(e.result);
          const [lng, lat] = e.result.geometry.coordinates;
          setSelectedLngLat([lng, lat]);
        },
      );
    });

    map.scrollZoom.disable();
    map.addControl(new mapboxgl.NavigationControl(), "bottom-left");

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
    });

    map.addControl(geolocateControl, "bottom-left");

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      setSelectedLngLat([lng, lat]);
    });

    geolocateControl.on("geolocate", (e) => {
      console.log(
        `lng: ${e.coords.longitude.toString()}, lat: ${e.coords.latitude.toString()}`,
      );
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [setSelectedLngLat]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default Map;
