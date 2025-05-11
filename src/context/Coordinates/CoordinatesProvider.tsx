import { useState, useEffect, useCallback } from "react";
import { CoordinatesContext } from "@/context/Coordinates/CoordinatesContext";
import { reverseGeocode } from "@/api/reverseGeocode";
import { type Coordinates } from "@/types";

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
      console.error("Failed to reverse geocode:", err);
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
      value={{ coordinates, locationName, setCoordinates }}
    >
      {children}
    </CoordinatesContext.Provider>
  );
};
