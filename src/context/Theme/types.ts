import { type Theme } from "@/types";
/**
 * ThemeContext types
 */

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
