import { createContext } from "react";
import { type UnitContextType } from "@/context/Unit";

export const UnitContext = createContext<UnitContextType | undefined>(
  undefined,
);
