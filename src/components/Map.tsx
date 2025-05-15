import React, { useRef } from "react";
import { useMapbox } from "@/hooks/useMapbox";
/**
 * Map
 *
 * Displays an interactive MapboxGL map centered on given coordinates.
 * Optionally allows setting an initial zoom level.
 *
 * @param props - Map component props
 * @returns JSX.Element
 */
const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useMapbox(mapContainerRef);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default Map;
