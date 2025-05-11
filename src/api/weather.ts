import axios from "axios";
import { type Coordinates } from "@/types";
import {
  type OneCallWeatherResponse,
  type TimemachineResponse,
} from "@/types/api";

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

export async function fetchPastWeatherByCoordinates(
  coordinates: Coordinates,
  signal?: AbortSignal,
  dt?: number,
): Promise<TimemachineResponse> {
  const { lat, lng } = coordinates;

  const response = await weatherApi.get<TimemachineResponse>("/timemachine", {
    params: {
      lat,
      lon: lng,
      appid: OPENWEATHER_API_KEY,
      dt: dt ?? Math.floor(Date.now() / 1000) - 86400, // 24 hours ago by default
      units: "metric",
      exclude: "minutely,alerts",
    },
    signal,
  });

  return response.data;
}
