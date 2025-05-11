import React, { useRef } from "react";
import { useMapbox } from "@/hooks/useMapbox"; // Adjust the path if needed
import { type Coordinates } from "@/types";

interface MapProps {
  setCoordinates: (coordinates: Coordinates) => void;
}

const Map: React.FC<MapProps> = ({ setCoordinates }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useMapbox(mapContainerRef, setCoordinates);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default Map;
