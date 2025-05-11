// Map navigation controls
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";

export function addNavigationControl(map: MapboxMap) {
  map.scrollZoom.disable();
  map.addControl(new mapboxgl.NavigationControl(), "bottom-left");
}
