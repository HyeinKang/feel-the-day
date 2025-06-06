import { useState, useEffect, useCallback } from "react";

import { type Coordinates } from "@/types";
import { reverseGeocode } from "@/api/reverseGeocode";

import { CoordinatesContext } from "./";

/**
 * CoordinatesProvider
 *
 * Context provider managing user's location coordinates.
 *
 * @param children - React children that can consume the context
 */
export const CoordinatesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);

  const fetchLocationName = useCallback(async (lat: number, lng: number) => {
    try {
      const name = await reverseGeocode(lat, lng);
      setLocationName(name ?? "Unknown location");
    } catch (err) {
      console.error("Failed to get location name:", err);
      setLocationName("Unknown location");
    }
  }, []);

  useEffect(() => {
    if (coordinates) {
      void fetchLocationName(coordinates.lat, coordinates.lng);
    } else {
      setLocationName(null);
    }
  }, [coordinates, fetchLocationName]);

  return (
    <CoordinatesContext.Provider
      value={{
        coordinates,
        locationName,
        setCoordinates,
      }}
    >
      {children}
    </CoordinatesContext.Provider>
  );
};
