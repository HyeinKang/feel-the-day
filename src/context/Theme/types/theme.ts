import { type Theme } from "@/types";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
