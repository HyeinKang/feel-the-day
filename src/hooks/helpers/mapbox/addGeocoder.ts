// Location search
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { type Coordinates } from "@/types";

export function addGeocoder(
  map: MapboxMap,
  setCoordinates: (coordinates: Coordinates) => void,
  accessToken: string,
) {
  if (!accessToken) {
    console.error("Mapbox access token is missing.");
  }

  const geocoder = new MapboxGeocoder({
    accessToken,
    mapboxgl: mapboxgl as unknown as typeof import("mapbox-gl"),
  });

  map.on("load", () => {
    const geocoderContainer = document.getElementById("geocoder");
    if (geocoderContainer) {
      geocoderContainer.appendChild(geocoder.onAdd(map));
    }
  });

  geocoder.on(
    "result",
    (e: { result: { geometry: { coordinates: [number, number] } } }) => {
      console.log(e.result);
      const [lng, lat] = e.result.geometry.coordinates;
      setCoordinates({ lng, lat });
    },
  );
}
