import { useState, useEffect } from "react";
import { type Coordinates, type UnitSystem } from "@/types";
import {
  type OneCallWeatherResponse,
  type TimemachineResponse,
} from "@/types/api/openWeather";

import {
  fetchWeatherByCoordinates,
  fetchPastWeatherByCoordinates,
} from "@/api/weather";
import { handleApiError } from "@/utils/handleApiError";

interface UseWeatherReturn {
  weatherData: OneCallWeatherResponse | null;
  yesterdayWeatherData: TimemachineResponse | null;
  isLoading: boolean;
  error: Error | null;
}

export function useWeather(
  coordinates: Coordinates | null,
  unitSystem: UnitSystem,
): UseWeatherReturn {
  const [weatherData, setWeatherData] = useState<OneCallWeatherResponse | null>(
    null,
  );
  const [yesterdayWeatherData, setYesterdayWeatherData] =
    useState<TimemachineResponse | null>(null);

  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);
  const [isYesterdayWeatherLoading, setIsYesterdayWeatherLoading] =
    useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const isLoading = isWeatherLoading || isYesterdayWeatherLoading;

  useEffect(() => {
    if (!coordinates) {
      setWeatherData(null);
      setYesterdayWeatherData(null);
      return;
    }

    const weatherController = new AbortController();
    const yesterdayController = new AbortController();

    const fetchAllWeather = async () => {
      setIsWeatherLoading(true);
      setIsYesterdayWeatherLoading(true);
      setError(null);

      try {
        const [weatherResponse, yesterdayResponse] = await Promise.all([
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

        setWeatherData(weatherResponse);
        setYesterdayWeatherData(yesterdayResponse);
      } catch (err: unknown) {
        const handledError = handleApiError(err);

        if (handledError === "cancel") {
          console.log("Weather fetch canceled");
        } else {
          console.error("Failed to fetch weather:", handledError);
          setError(handledError);
        }
      } finally {
        setIsWeatherLoading(false);
        setIsYesterdayWeatherLoading(false);
      }
    };

    void fetchAllWeather();

    return () => {
      weatherController.abort();
      yesterdayController.abort();
    };
  }, [coordinates, unitSystem, refreshTrigger]);

  useEffect(() => {
    const scheduleNextMinuteFetch = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const millisecondsUntilNextMinute = (60 - seconds) * 1000;

      const timerId = setTimeout(() => {
        setRefreshTrigger((prev) => prev + 1);
        scheduleNextMinuteFetch(); // Schedule next one recursively
      }, millisecondsUntilNextMinute);

      return timerId;
    };

    const timerId = scheduleNextMinuteFetch();

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return { weatherData, yesterdayWeatherData, isLoading, error };
}
