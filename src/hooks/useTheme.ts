import { useContext } from "react";
import { ThemeContext, type ThemeContextType } from "@/context/Theme";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
