export { type Coordinates } from "./coordinates";

export interface WeatherDetail {
  label: string;
  value: string;
  icon: string; // icon path or import
}

export interface DailyForecast {
  dayLabel: string;
  temperature: string;
  feelsLike: string;
  highLow: string;
  icon: string;
}

export interface HourlyForecast {
  timeLabel: string;
  temperature: string;
  icon: string;
}
