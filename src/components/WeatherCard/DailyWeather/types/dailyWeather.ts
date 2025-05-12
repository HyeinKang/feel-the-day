export interface DailyWeatherItemType {
  dayLabel: string; // "Yesterday" | "Tomorrow" | "The day after tomorrow"
  iconUrl: string;
  temp: number;
  feelsLike: number;
  high: number | null;
  low: number | null;
}
