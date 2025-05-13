import React, { useEffect, useState } from "react";
import { type Theme } from "@/types";
import { ThemeContext } from "./";

const UNIT_SYSTEM_KEY = "theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const browserTheme = (): Theme => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return isDarkMode ? "dark" : "light";
  };
  const [theme, setThemeState] = useState<Theme>(browserTheme);

  const setTheme = (theme: Theme) => {
    setThemeState(theme);
    localStorage.setItem(UNIT_SYSTEM_KEY, theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(UNIT_SYSTEM_KEY) as Theme | null;
    setThemeState(savedTheme ?? browserTheme);
  }, []);

  useEffect(() => {
    const html = document.documentElement; // <html> element
    const currentTheme = html.getAttribute("data-theme");

    if (currentTheme === "dark") {
      html.setAttribute("data-theme", "light");
    } else {
      html.setAttribute("data-theme", "dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
