/**
 * CoordinatesContext types
 */

import { type Coordinates } from "@/types";

export interface CoordinatesContextType {
  coordinates: Coordinates | null;
  locationName: string | null;
  setCoordinates: (coords: Coordinates | null) => void;
}
