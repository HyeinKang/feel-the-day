import { useEffect, useRef } from "react";
import mapboxgl, { Map as MapboxMap, Marker } from "mapbox-gl";
import { useCoordinates } from "@/hooks/useCoordinates";

import {
  addGeocoder,
  addGeolocateControl,
  addNavigationControl,
  addMapClickHandler,
  addMarkerHandler,
} from "./helpers/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

export function useMapbox(
  containerRef: React.RefObject<HTMLDivElement | null>,
) {
  const { locationName, coordinates, setCoordinates } = useCoordinates();
  const mapRef = useRef<MapboxMap | null>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const locationNameRef = useRef<string | null>(null);

  if (!accessToken) {
    console.error("Mapbox access token is missing.");
  }
  mapboxgl.accessToken = accessToken;

  useEffect(() => {
    if (!containerRef.current) {
      console.error("Map container unavailable.");
      return;
    }

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      // style: "mapbox://styles/mapbox/dark-v11",
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    mapRef.current = map;

    addNavigationControl(map);
    geocoderRef.current = addGeocoder({
      map,
      accessToken,
      setCoordinates,
    });
    addGeolocateControl({ map, setCoordinates });
    addMapClickHandler({ map, setCoordinates });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [containerRef, setCoordinates]);

  useEffect(() => {
    addMarkerHandler({ mapRef, coordinates, markerRef });
  }, [coordinates]);

  useEffect(() => {
    if (!geocoderRef.current) return;
    if (locationName) {
      geocoderRef.current.setInput(locationName);
    } else if (locationNameRef.current) {
      geocoderRef.current.clear();
    }
    locationNameRef.current = locationName;
  }, [locationName]);

  return { mapRef };
}
