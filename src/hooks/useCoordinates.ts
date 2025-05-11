import { useContext } from "react";
import { CoordinatesContext } from "@/context/Coordinates/CoordinatesContext";

export const useCoordinates = () => {
  const context = useContext(CoordinatesContext);
  if (!context) {
    throw new Error("useCoordinates must be used within CoordinatesProvider");
  }
  return context;
};
