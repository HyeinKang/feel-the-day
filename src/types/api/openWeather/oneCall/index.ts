import {
  type CurrentWeather,
  type DailyForecast,
  type HourlyForecast,
  type MinutelyForecast,
  type WeatherAlert,
} from "./weatherData";

export interface OneCallWeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  minutely?: MinutelyForecast[];
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts?: WeatherAlert[];
}
