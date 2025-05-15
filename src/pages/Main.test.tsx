import { describe, it, beforeAll, beforeEach, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { ThemeProvider } from "@/context/Theme";
import { useTheme } from "@/context/Theme/useTheme";
import DarkModeSwitch from "@/components/DarkModeSwitch";

// stub matchMedia so ThemeProvider can initialize without error
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

// helper to render the switch wired to context
function SwitchWithContext() {
  const { theme, setTheme } = useTheme();
  return <DarkModeSwitch value={theme} onChange={setTheme} />;
}

describe("ThemeProvider + DarkModeSwitch integration", () => {
  beforeEach(() => {
    // clear any prior theme in localStorage
    window.localStorage.clear();
    // spy on setItem
    vi.spyOn(window.localStorage.__proto__, "setItem");
  });

  it("writes the new theme into localStorage when toggled", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <SwitchWithContext />
      </ThemeProvider>,
    );

    // initial theme = light, so no writes yet
    expect(window.localStorage.setItem).not.toHaveBeenCalled();

    // click to switch to dark
    const btn = screen.getByRole("switch", {
      name: /switch dark\/light mode/i,
    });
    await user.click(btn);

    // wait for ThemeProvider’s effect to run
    await waitFor(() => {
      // The html attribute itself flips
      expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    });

    // Now check localStorage
    expect(window.localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");
  });
});
