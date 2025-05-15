// src/context/CoordinatesProvider.test.tsx
import { useContext } from "react";
import { describe, it, afterEach, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CoordinatesProvider, CoordinatesContext } from "./";
import * as reverseModule from "@/api/reverseGeocode";

function TestConsumer() {
  const ctx = useContext(CoordinatesContext);
  if (!ctx) {
    throw new Error("TestConsumer must be wrapped in CoordinatesProvider");
  }
  const { locationName, setCoordinates } = ctx;

  return (
    <>
      <div data-testid="location">{locationName ?? ""}</div>
      <button
        onClick={() => {
          setCoordinates({ lat: 1, lng: 2 });
        }}
      >
        Set
      </button>
      <button
        onClick={() => {
          setCoordinates(null);
        }}
      >
        Clear
      </button>
    </>
  );
}

describe("CoordinatesProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts with no locationName", () => {
    render(
      <CoordinatesProvider>
        <TestConsumer />
      </CoordinatesProvider>,
    );
    expect(screen.getByTestId("location").textContent).toBe("");
  });

  it("updates locationName when reverseGeocode resolves", async () => {
    vi.spyOn(reverseModule, "reverseGeocode").mockResolvedValueOnce(
      "Paris, FR",
    );

    const user = userEvent.setup();
    render(
      <CoordinatesProvider>
        <TestConsumer />
      </CoordinatesProvider>,
    );

    await user.click(screen.getByText("Set"));

    await waitFor(() => {
      expect(reverseModule.reverseGeocode).toHaveBeenCalledWith(1, 2);
    });

    await waitFor(() => {
      expect(screen.getByTestId("location").textContent).toBe("Paris, FR");
    });
  });

  it("falls back to 'Unknown location' on error", async () => {
    vi.spyOn(reverseModule, "reverseGeocode").mockRejectedValueOnce(
      new Error("fail"),
    );

    const user = userEvent.setup();
    render(
      <CoordinatesProvider>
        <TestConsumer />
      </CoordinatesProvider>,
    );

    await user.click(screen.getByText("Set"));

    await waitFor(() => {
      expect(screen.getByTestId("location").textContent).toBe(
        "Unknown location",
      );
    });
  });

  it("resets to empty when coords are cleared", async () => {
    vi.spyOn(reverseModule, "reverseGeocode").mockResolvedValueOnce(
      "Tokyo, JP",
    );

    const user = userEvent.setup();
    render(
      <CoordinatesProvider>
        <TestConsumer />
      </CoordinatesProvider>,
    );

    await user.click(screen.getByText("Set"));
    await waitFor(() => {
      expect(screen.getByTestId("location").textContent).toBe("Tokyo, JP");
    });

    await user.click(screen.getByText("Clear"));
    expect(screen.getByTestId("location").textContent).toBe("");
  });
});
