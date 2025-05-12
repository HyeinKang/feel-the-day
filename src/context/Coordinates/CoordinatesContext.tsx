import { createContext } from "react";
import { type CoordinatesContextType } from "@/context/Coordinates";

export const CoordinatesContext = createContext<
  CoordinatesContextType | undefined
>(undefined);
