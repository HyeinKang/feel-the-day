import { useState, useEffect } from "react";
import { fetchWeatherByCoordinates } from "@/api/weather";
import { handleApiError } from "@/utils/handleApiError";
import { type Coordinates } from "@/types";
import { type OneCallWeatherResponse } from "@/types/api/weather";

interface UseWeatherReturn {
  weatherData: OneCallWeatherResponse | null;
  isLoading: boolean;
  error: Error | null;
}

export function useWeather(coordinates: Coordinates | null): UseWeatherReturn {
  const [weatherData, setWeatherData] = useState<OneCallWeatherResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!coordinates) {
      setWeatherData(null);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchWeatherByCoordinates(coordinates, signal);
        setWeatherData(data);
      } catch (err: unknown) {
        const handledError = handleApiError(err);

        if (handledError === "cancel") {
          console.log("Weather fetch canceled");
        } else {
          console.error("Failed to fetch weather:", handledError);
          setError(handledError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void fetchWeather();

    return () => {
      controller.abort();
    };
  }, [coordinates]);

  return { weatherData, isLoading, error };
}
