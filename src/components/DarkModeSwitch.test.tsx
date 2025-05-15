import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DarkModeSwitch from "@/components/DarkModeSwitch";

describe("DarkModeSwitch", () => {
  const renderWithTheme = (value: "light" | "dark") => {
    const onChange = vi.fn();
    render(<DarkModeSwitch value={value} onChange={onChange} />);
    return onChange;
  };

  it('renders light→"View in Dark" with correct a11y attributes', () => {
    renderWithTheme("light");
    const btn = screen.getByRole("switch", {
      name: /Switch Dark\/Light mode/i,
    });
    expect(btn).toHaveTextContent("View in Dark");
    expect(btn).toHaveAttribute("role", "switch");
    expect(btn).toHaveAttribute("aria-label", "Switch Dark/Light mode");
  });

  it('renders dark→"View in Light"', () => {
    renderWithTheme("dark");
    const btn = screen.getByRole("switch", {
      name: /Switch Dark\/Light mode/i,
    });
    expect(btn).toHaveTextContent("View in Light");
  });

  it('calls onChange("dark") when clicked in light mode', async () => {
    const onChange = renderWithTheme("light");
    const user = userEvent.setup();
    const btn = screen.getByRole("switch");
    await user.click(btn);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("dark");
  });

  it('calls onChange("light") when clicked in dark mode', async () => {
    const onChange = renderWithTheme("dark");
    const user = userEvent.setup();
    const btn = screen.getByRole("switch");
    await user.click(btn);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("light");
  });
});
