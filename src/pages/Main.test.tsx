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
    window.localStorage.clear();
    vi.spyOn(window.localStorage.__proto__, "setItem");
    vi.spyOn(window.localStorage.__proto__, "getItem");
  });

  it("writes the new theme into localStorage when toggled", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <SwitchWithContext />
      </ThemeProvider>,
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(window.localStorage.setItem).not.toHaveBeenCalled();

    const btn = screen.getByRole("switch", {
      name: /switch dark\/light mode/i,
    });
    await user.click(btn);

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(window.localStorage.setItem).toHaveBeenCalledWith("theme", "dark");

    expect(window.localStorage.getItem("theme")).toBe("dark");
  });
});
