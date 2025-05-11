export { type Coordinates } from "./coordinates";

export interface DailyForecast {
  dayLabel: string;
  temperature: string;
  feelsLike: string;
  highLow: string;
  icon: string;
}

export interface CurrentWeatherCardData {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  currentTemp: number;
  feelsLike: number;
  details: { key: "wind_speed" | "humidity" | "uvi"; value: number }[];
  iconUrl: string;
}

export interface DailyWeatherCardData {
  dayLabel: string; // "Today", "Tomorrow"
  iconUrl: string;
  temp: string; // "23°C"
  feelsLike: string; // "25°C"
  highLow: string; // "H: 25° L: 11°"
}

export interface HourlyForecastCardData {
  timeLabel: string;
  temp: number;
  feels_like: number;
  iconUrl: string;
  weatherDescription: string;
}
