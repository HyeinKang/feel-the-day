import React, { useRef } from "react";
import { useMapbox } from "@/hooks/useMapbox";

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useMapbox(mapContainerRef);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default Map;
