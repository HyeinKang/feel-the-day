export { type Coordinates } from "./coordinates";

export interface CurrentWeatherData {
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
  today: {
    temp: {
      max: number;
      min: number;
    };
  }; // This should be replaced with the actual type of the "today" property from the API response
}

export interface DailyWeatherComparisonData {
  dayLabel: string; // "Yesterday" | "Tomorrow" | "The day after tomorrow"
  iconUrl: string;
  temp: number;
  feelsLike: number;
  high: number | null;
  low: number | null;
}

export interface HourlyForecastCardData {
  timeLabel: string;
  temp: number;
  feels_like: number;
  iconUrl: string;
  weatherDescription: string;
}
