import { useContext } from "react";
import {
  CoordinatesContext,
  type CoordinatesContextType,
} from "@/context/Coordinates";

export const useCoordinates = (): CoordinatesContextType => {
  const context = useContext(CoordinatesContext);
  if (!context) {
    throw new Error("useCoordinates must be used within CoordinatesProvider");
  }
  return context;
};
