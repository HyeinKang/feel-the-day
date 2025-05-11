import { createContext } from "react";
import { type Coordinates } from "@/types";

export interface CoordinatesContextType {
  coordinates: Coordinates | null;
  locationName: string | null;
  setCoordinates: (coords: Coordinates) => void;
}

export const CoordinatesContext = createContext<
  CoordinatesContextType | undefined
>(undefined);
