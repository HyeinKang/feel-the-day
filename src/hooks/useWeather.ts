import { useCallback, useState, useEffect } from "react";
import { type Coordinates, type UnitSystem } from "@/types";
import {
  type OneCallWeatherResponse,
  type OverviewResponse,
  type TimemachineResponse,
} from "@/types/api/openWeather";

import {
  fetchWeatherByCoordinates,
  fetchOverviewByCoordinates,
  fetchPastWeatherByCoordinates,
} from "@/api/weather";
import { handleApiError } from "@/utils/handleApiError";

interface UseWeatherReturn {
  weatherData: OneCallWeatherResponse | null;
  overviewData: OverviewResponse | null;
  yesterdayWeatherData: TimemachineResponse | null;
  isLoading: boolean;
  isOverviewLoading: boolean;
  error: Error | null;
}

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
    const scheduleNextMinuteFetch = () => {
      let timerId: number;

      const schedule = () => {
        const now = new Date();
        const seconds = now.getSeconds();
        const millisecondsUntilNextMinute = (60 - seconds) * 1000;

        timerId = window.setTimeout(() => {
          void fetchAllWeather(false);
          schedule();
        }, millisecondsUntilNextMinute);
      };

      schedule();

      return () => {
        clearTimeout(timerId);
      };
    };

    const cleanup = scheduleNextMinuteFetch();

    return cleanup;
  }, [fetchAllWeather]);

  return {
    weatherData,
    overviewData,
    yesterdayWeatherData,
    isLoading,
    isOverviewLoading,
    error,
  };
}
