import { useEffect, useRef } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";

import { useCoordinates } from "@/hooks/useCoordinates";

import {
  addGeocoder,
  addGeolocateControl,
  addNavigationControl,
  addMapClickHandler,
} from "./helpers/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

export function useMapbox(
  containerRef: React.RefObject<HTMLDivElement | null>,
) {
  const { setCoordinates } = useCoordinates();

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
      // style: "mapbox://styles/mapbox/dark-v11",
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    mapRef.current = map;

    addNavigationControl(map);
    addGeocoder({ map, accessToken, setCoordinates });
    addGeolocateControl({ map, setCoordinates });
    addMapClickHandler({ map, setCoordinates });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [containerRef, setCoordinates]);

  return { mapRef };
}
