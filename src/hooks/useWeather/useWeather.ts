import { useCallback, useState, useEffect } from "react";
import {
  type OneCallWeatherResponse,
  type OverviewResponse,
  type TimemachineResponse,
} from "@/types/api/openWeather";
import { type Coordinates, type UnitSystem } from "@/types";
import { type UseWeatherReturn } from "./types";
import {
  fetchWeatherByCoordinates,
  fetchOverviewByCoordinates,
  fetchPastWeatherByCoordinates,
} from "@/api/weather";
import { handleApiError } from "@/utils/handleApiError";

export function scheduleNextMinuteFetch(cb: () => void) {
  let timerId: number;

  const schedule = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const msToNext = (60 - seconds) * 1000;

    console.log(
      `[scheduler] now=${now.toISOString()} → running in ${msToNext.toString()}ms`,
    );

    timerId = window.setTimeout(() => {
      const firedAt = new Date();
      console.log(`[scheduler] 🔔 fetchAllWeather @ ${firedAt.toISOString()}`);
      cb();
      schedule();
    }, msToNext);
  };

  schedule();

  return () => {
    console.log(`[scheduler] clearing timer ${timerId.toString()}`);
    clearTimeout(timerId);
  };
}

/**
 * useWeather
 *
 * Fetches and provides current, past, and overview weather data.
 *
 * @param coordinates - User's location coordinates
 * @param unitSystem - 'metric' or 'imperial'
 * @returns Weather data objects and loading/error states
 */
export function useWeather(
  coordinates: Coordinates | null,
  unitSystem: UnitSystem,
): UseWeatherReturn {
  const [weatherData, setWeatherData] = useState<OneCallWeatherResponse | null>(
    null,
  );
  const [overviewData, setOverviewData] = useState<OverviewResponse | null>(
    null,
  );
  const [yesterdayWeatherData, setYesterdayWeatherData] =
    useState<TimemachineResponse | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);
  const [isOverviewLoading, setIsOverviewLoading] = useState<boolean>(false);
  const [isYesterdayWeatherLoading, setIsYesterdayWeatherLoading] =
    useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const isLoading = isWeatherLoading || isYesterdayWeatherLoading;

  const fetchAllWeather = useCallback(
    async (showLoading = true) => {
      if (!coordinates) return;

      const weatherController = new AbortController();
      const overviewController = new AbortController();
      const yesterdayController = new AbortController();

      if (showLoading) {
        setIsWeatherLoading(true);
        setIsOverviewLoading(true);
        setIsYesterdayWeatherLoading(true);
      }

      setError(null);

      const handleFetchError = (err: unknown) => {
        const handledError = handleApiError(err);
        if (handledError === "cancel") {
          console.log("Weather fetch canceled");
        } else {
          console.error("Fetch failed:", handledError);
          setError(handledError);
        }
      };

      try {
        const [overviewResponse, weatherResponse, yesterdayResponse] =
          await Promise.all([
            fetchOverviewByCoordinates(
              coordinates,
              unitSystem,
              overviewController.signal,
            ),
            fetchWeatherByCoordinates(
              coordinates,
              unitSystem,
              weatherController.signal,
            ),
            fetchPastWeatherByCoordinates(
              coordinates,
              unitSystem,
              yesterdayController.signal,
              Math.floor(Date.now() / 1000) - 86400,
            ),
          ]);

        setOverviewData(overviewResponse);
        setWeatherData(weatherResponse);
        setYesterdayWeatherData(yesterdayResponse);
      } catch (err) {
        handleFetchError(err);
      } finally {
        if (showLoading) {
          setIsOverviewLoading(false);
          setIsWeatherLoading(false);
          setIsYesterdayWeatherLoading(false);
        }
      }
    },
    [coordinates, unitSystem],
  );

  useEffect(() => {
    if (!coordinates) {
      setWeatherData(null);
      setYesterdayWeatherData(null);
      return;
    }

    void fetchAllWeather(true);
  }, [coordinates, unitSystem, fetchAllWeather]);

  useEffect(() => {
    // wrap your async fn so it still returns void
    const cleanup = scheduleNextMinuteFetch(() => {
      void fetchAllWeather(false);
    });
    return cleanup;
  }, [fetchAllWeather]);

  return {
    fetchAllWeather,
    weatherData,
    overviewData,
    yesterdayWeatherData,
    isLoading,
    isOverviewLoading,
    error,
  };
}
