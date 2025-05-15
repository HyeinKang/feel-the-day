import { createContext } from "react";
import { type CoordinatesContextType } from "./";

export const CoordinatesContext = createContext<
  CoordinatesContextType | undefined
>(undefined);
