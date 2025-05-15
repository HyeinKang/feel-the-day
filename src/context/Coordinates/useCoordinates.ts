import { useContext } from "react";
import { CoordinatesContext, type CoordinatesContextType } from "./";

/**
 * useCoordinates
 *
 * Custom hook to consume CoordinatesContext easily.
 *
 * @returns {CoordinatesContextValue} Coordinates and setter
 * @throws {Error} If used outside of CoordinatesProvider
 */
export const useCoordinates = (): CoordinatesContextType => {
  const context = useContext(CoordinatesContext);
  if (!context) {
    throw new Error("useCoordinates must be used within CoordinatesProvider");
  }
  return context;
};
