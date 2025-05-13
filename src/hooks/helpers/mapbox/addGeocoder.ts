// Location search
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { type Coordinates } from "@/types";

interface GeocoderProps {
  map: MapboxMap;
  setCoordinates: (coordinates: Coordinates | null) => void;
  accessToken: string;
}

export function addGeocoder({
  map,
  accessToken,
  setCoordinates,
}: GeocoderProps) {
  if (!accessToken) {
    console.error("Mapbox access token is missing.");
  }

  const geocoder = new MapboxGeocoder({
    accessToken,
    mapboxgl: mapboxgl as unknown as typeof import("mapbox-gl"),
    flyTo: {
      duration: 0,
      speed: 0,
      curve: 0,
      essential: true,
    },
    marker: false,
  });

  map.on("load", () => {
    const geocoderContainer = document.getElementById("geocoder");
    if (geocoderContainer) {
      geocoderContainer.appendChild(geocoder.onAdd(map));
    }
  });

  geocoder.on(
    "result",
    (e: {
      result: {
        geometry: { coordinates: [number, number] };
        place_name: string;
      };
    }) => {
      const [lng, lat] = e.result.geometry.coordinates;
      setCoordinates({ lng, lat });
    },
  );

  geocoder.on("clear", () => {
    setCoordinates(null);
  });

  return geocoder;
}
