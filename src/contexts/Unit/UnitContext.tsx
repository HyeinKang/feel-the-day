import { createContext } from "react";
import { type UnitContextType } from "./";
/**
 * UnitContext
 *
 * React Context providing unit system and setter function.
 */
export const UnitContext = createContext<UnitContextType | undefined>(
  undefined,
);
