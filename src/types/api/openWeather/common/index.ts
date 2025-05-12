// Weather condition type (used in current, hourly, daily)
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}
