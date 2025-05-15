import { useContext } from "react";
import { ThemeContext, type ThemeContextType } from "./";
/**
 * useTheme
 *
 * Custom hook to consume the ThemeContext.
 *
 * @returns Theme context value and setter function.
 * @throws If used outside of ThemeProvider.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
