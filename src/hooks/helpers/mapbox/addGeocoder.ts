// Location search
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { type Coordinates } from "@/types";

/**
 * @internal
 * Configuration options for the addGeocoder helper.
 */
export interface GeocoderProps {
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
    placeholder: "Click on the map or search for a location.",
  });

  map.on("load", () => {
    const geocoderContainer = document.getElementById("geocoder");
    if (geocoderContainer) {
      geocoderContainer.appendChild(geocoder.onAdd(map));

      // Small delay to allow DOM to render
      setTimeout(() => {
        const searchIcon = document.querySelector(
          ".mapboxgl-ctrl-geocoder--icon.mapboxgl-ctrl-geocoder--icon-search",
        );
        if (searchIcon) {
          searchIcon.outerHTML = `<svg class="mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-search" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>`;
        }
      }, 100); // 100ms delay to make sure Geocoder DOM is ready
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
