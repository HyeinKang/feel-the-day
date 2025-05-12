import { createContext } from "react";
import { type UnitContextType } from "./";

export const UnitContext = createContext<UnitContextType | undefined>(
  undefined,
);
