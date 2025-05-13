import { createContext } from "react";
import { type ThemeContextType } from "./";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
