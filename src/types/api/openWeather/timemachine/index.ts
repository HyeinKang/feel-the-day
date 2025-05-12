import { type TimemachineWeatherData } from "./weatherData";

export interface TimemachineResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  data: TimemachineWeatherData[];
}
