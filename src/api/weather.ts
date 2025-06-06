import axios from "axios";
import { type Coordinates, type UnitSystem } from "@/types";
import {
  type OneCallWeatherResponse,
  type OverviewResponse,
  type TimemachineResponse,
} from "@/types/api/openWeather";

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
  unitSystem: UnitSystem,
  signal?: AbortSignal,
): Promise<OneCallWeatherResponse> {
  const { lat, lng } = coordinates;

  const response = await weatherApi.get<OneCallWeatherResponse>("", {
    params: {
      lat,
      lon: lng,
      appid: OPENWEATHER_API_KEY,
      units: unitSystem,
      exclude: "minutely,alerts",
    },
    signal,
  });

  return response.data;
}

export async function fetchOverviewByCoordinates(
  coordinates: Coordinates,
  unitSystem: UnitSystem,
  signal?: AbortSignal,
): Promise<OverviewResponse> {
  const { lat, lng } = coordinates;

  const response = await weatherApi.get<OverviewResponse>("/overview", {
    params: {
      lat,
      lon: lng,
      appid: OPENWEATHER_API_KEY,
      units: unitSystem,
      exclude: "minutely,alerts",
    },
    signal,
  });

  return response.data;
}

export async function fetchPastWeatherByCoordinates(
  coordinates: Coordinates,
  unitSystem: UnitSystem,
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
      units: unitSystem,
      exclude: "minutely,alerts",
    },
    signal,
  });

  return response.data;
}
