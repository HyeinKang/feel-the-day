// src/hooks/scheduleNextMinuteFetch.test.ts
import { scheduleNextMinuteFetch } from "./useWeather";
import { describe, it, expect, vi, beforeEach } from "vitest";

// we don’t need MSW here — we’re not doing network at this level
describe("scheduleNextMinuteFetch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  it("calls the callback once every minute and stops on cleanup", () => {
    const cb = vi.fn();
    // 1) freeze at exactly hh:mm:00 so the first fire is in 60 000ms
    vi.setSystemTime(new Date(2025, 4, 15, 12, 0, 0));

    // 2) install the scheduler
    const cleanup = scheduleNextMinuteFetch(cb);

    // no calls _yet_ (first is scheduled for T+60s)
    expect(cb).not.toHaveBeenCalled();

    // 3) advance clock by 60 000ms → should fire once
    console.log("[TEST] advancing 60s");
    vi.advanceTimersByTime(60_000);
    expect(cb).toHaveBeenCalledTimes(1);

    // 4) advance another 60 000ms → second fire
    console.log("[TEST] advancing 60s2");
    vi.advanceTimersByTime(60_000);
    expect(cb).toHaveBeenCalledTimes(2);

    // 5) stop the scheduler
    cleanup();

    // 6) advance yet another minute → no new calls
    vi.advanceTimersByTime(60_000);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});
