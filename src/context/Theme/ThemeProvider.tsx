import React, { useEffect, useState } from "react";
import { type Theme } from "@/types";
import { ThemeContext } from "./";

const UNIT_SYSTEM_KEY = "theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const browserTheme = (): Theme => {
    const savedTheme = localStorage.getItem(UNIT_SYSTEM_KEY) as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
  
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };
  const [theme, setThemeState] = useState<Theme>(browserTheme());

  const setTheme = (theme: Theme) => {
    setThemeState(theme);
    localStorage.setItem(UNIT_SYSTEM_KEY, theme);
  };

  useEffect(() => {
    const html = document.documentElement;

    if (theme === "dark") {
      html.setAttribute("data-theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
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
