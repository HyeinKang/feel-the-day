// Find user location
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import { type Coordinates } from "@/types";

interface GeolocateControlProps {
  map: MapboxMap;
  setCoordinates: (coordinates: Coordinates) => void;
}

export function addGeolocateControl({
  map,
  setCoordinates,
}: GeolocateControlProps) {
  const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true,
  });

  map.addControl(geolocateControl, "bottom-left");

  geolocateControl.on("geolocate", (e) => {
    const lng = e.coords.longitude;
    const lat = e.coords.latitude;

    setCoordinates({ lng, lat });
  });
}
