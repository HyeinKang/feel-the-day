import {
  type OneCallWeatherResponse,
  type OverviewResponse,
  type TimemachineResponse,
} from "@/types/api/openWeather";

export interface UseWeatherReturn {
  fetchAllWeather: (showLoading?: boolean) => Promise<void>;
  weatherData: OneCallWeatherResponse | null;
  overviewData: OverviewResponse | null;
  yesterdayWeatherData: TimemachineResponse | null;
  isLoading: boolean;
  isOverviewLoading: boolean;
  error: Error | null;
}
