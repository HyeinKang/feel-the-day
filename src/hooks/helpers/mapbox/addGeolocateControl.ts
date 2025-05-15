// Find user location
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import { type Coordinates } from "@/types";

/**
 * @internal
 * Configuration options for the addGeolocationControl helper.
 */
export interface GeolocateControlProps {
  map: MapboxMap;
  setCoordinates: (coordinates: Coordinates) => void;
}

export function addGeolocateControl({
  map,
  setCoordinates,
}: GeolocateControlProps) {
  const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: false,
  });

  map.addControl(geolocateControl, "bottom-left");

  geolocateControl.on("geolocate", (e) => {
    const lng = e.coords.longitude;
    const lat = e.coords.latitude;
    map.stop();
    map.jumpTo({
      center: [lng, lat],
      zoom: 15,
    });

    setCoordinates({ lng, lat });
  });

  map.on("load", () => {
    geolocateControl.trigger();
  });
}
