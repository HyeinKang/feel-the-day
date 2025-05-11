import axios from "axios";
import { type Coordinates } from "@/types";
import { type OneCallWeatherResponse } from "@/types/api";

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

if (!OPENWEATHER_API_KEY) {
  throw new Error(
    "VITE_OPENWEATHER_API_KEY is not set in environment variables.",
  );
}

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/3.0/onecall",
  timeout: 5000,
});

export async function fetchWeatherByCoordinates(
  coordinates: Coordinates,
  signal?: AbortSignal,
): Promise<OneCallWeatherResponse> {
  const { lat, lng } = coordinates;

  const response = await weatherApi.get<OneCallWeatherResponse>("", {
    params: {
      lat,
      lon: lng,
      appid: OPENWEATHER_API_KEY,
      units: "metric",
      exclude: "minutely,alerts",
    },
    signal,
  });

  return response.data;
}
