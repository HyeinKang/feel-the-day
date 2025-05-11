// Find user location
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import { type Coordinates } from "@/types";

export function addGeolocateControl(
  map: MapboxMap,
  setSelectedLngLat: (coordinates: Coordinates) => void,
) {
  const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true,
  });

  map.addControl(geolocateControl, "bottom-left");

  geolocateControl.on("geolocate", (e) => {
    const lng = e.coords.longitude;
    const lat = e.coords.latitude;

    setSelectedLngLat({ lng, lat });
  });
}
