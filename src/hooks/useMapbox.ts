import { useEffect, useRef } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import { type Coordinates } from "@/types";

import {
  addGeocoder,
  addGeolocateControl,
  addNavigationControl,
  addMapClickHandler,
} from "./helpers/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

export function useMapbox(
  containerRef: React.RefObject<HTMLDivElement | null>,
  setSelectedLngLat: (coordinates: Coordinates) => void,
) {
  if (!accessToken) {
    console.error("Mapbox access token is missing.");
  }
  mapboxgl.accessToken = accessToken;

  const mapRef = useRef<MapboxMap | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      console.error("Map container unavailable.");
      return;
    }

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    mapRef.current = map;

    addNavigationControl(map);
    addGeocoder(map, setSelectedLngLat, accessToken);
    addGeolocateControl(map, setSelectedLngLat);
    addMapClickHandler(map, setSelectedLngLat);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [containerRef, setSelectedLngLat]);

  return { mapRef };
}
