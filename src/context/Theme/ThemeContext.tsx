import { createContext } from "react";
import { type ThemeContextType } from "./";
/**
 * ThemeContext
 *
 * Provides the current color theme and a function to toggle between light, dark, and system themes.
 *
 * @returns {ThemeContextValue} Current theme and toggle function
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
