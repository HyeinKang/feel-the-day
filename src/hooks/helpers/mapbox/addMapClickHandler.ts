// Map click handler
import { Map as MapboxMap } from "mapbox-gl";
import { type Coordinates } from "@/types";

/**
 * @internal
 * Configuration options for the addMapckClick helper.
 */
export interface MapClickHandlerProps {
  map: MapboxMap;
  setCoordinates: (coordinates: Coordinates) => void;
}

export function addMapClickHandler({
  map,
  setCoordinates,
}: MapClickHandlerProps) {
  map.on("click", (e) => {
    const { lng, lat } = e.lngLat;
    setCoordinates({ lng, lat });
  });
}
