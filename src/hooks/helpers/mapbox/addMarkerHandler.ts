// Map click handler
import mapboxgl, { Map as MapboxMap, Marker } from "mapbox-gl";
import { type Coordinates } from "@/types";

interface MapMarkerHandlerProps {
  mapRef: React.RefObject<MapboxMap | null>;
  coordinates: Coordinates | null;
  markerRef: React.RefObject<Marker | null>;
}

export function addMarkerHandler({
  mapRef,
  coordinates,
  markerRef,
}: MapMarkerHandlerProps) {
  if (!mapRef.current) return;

  if (!coordinates) {
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
    return;
  }

  if (markerRef.current) {
    markerRef.current.setLngLat(coordinates);
  } else {
    markerRef.current = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(mapRef.current);
  }
}
