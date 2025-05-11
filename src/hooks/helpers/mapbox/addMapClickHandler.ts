// Map click handler
import { Map as MapboxMap } from "mapbox-gl";
import { type Coordinates } from "@/types";

export function addMapClickHandler(
  map: MapboxMap,
  setCoordinates: (coordinates: Coordinates) => void,
) {
  map.on("click", (e) => {
    const { lng, lat } = e.lngLat;
    setCoordinates({ lng, lat });
  });
}
