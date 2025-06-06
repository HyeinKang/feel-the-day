import React, { useMemo } from "react";

import {
  type OneCallWeatherResponse,
  type OverviewResponse,
  type TimemachineResponse,
} from "@/types/api/openWeather";

import WeatherSummary from "./WeatherSummary";
import { CurrentWeather, type CurrentWeatherType } from "./CurrentWeather";
import { DailyWeather, type DailyWeatherItemType } from "./DailyWeather";
import { HourlyForecast, type HourlyForecastItemType } from "./HourlyForecast";
import {
  formatOverview,
  formatCurrentWeather,
  formatDailyForecasts,
  formatHourlyForecasts,
} from "./_helpers/formatWeatherData";
/**
 * Props for the WeatherCard component.
 */
export interface WeatherCardProps {
  weatherData: OneCallWeatherResponse | null;
  overviewData: OverviewResponse | null;
  yesterdayWeatherData: TimemachineResponse | null;
  isOverviewLoading: boolean;
}
/**
 * WeatherCard
 *
 * A composite component that displays current weather, daily forecasts,
 * hourly forecasts, and a weather summary section.
 *
 * @param props - Props containing the weatherData object
 * @returns JSX.Element
 */
const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  overviewData,
  yesterdayWeatherData,
  isOverviewLoading,
}) => {
  const overview: string | null = useMemo(() => {
    if (!overviewData) return null;
    return formatOverview(overviewData);
  }, [overviewData]);

  const currentWeather: CurrentWeatherType | null = useMemo(() => {
    if (!weatherData) return null;
    return formatCurrentWeather(weatherData);
  }, [weatherData]);

  const dailyWeatherComparison: DailyWeatherItemType[] = useMemo(() => {
    if (!weatherData) return [];
    return formatDailyForecasts(weatherData, yesterdayWeatherData);
  }, [weatherData, yesterdayWeatherData]);

  const hourlyForecasts: HourlyForecastItemType[] = useMemo(() => {
    if (!weatherData) return [];
    return formatHourlyForecasts(weatherData, weatherData.timezone);
  }, [weatherData]);

  if (!currentWeather) {
    return null; // In case no data
  }

  return (
    <section className="flex flex-col gap-y-8 pt-6 overflow-y-auto">
      <CurrentWeather
        weather={currentWeather.weather}
        iconUrl={currentWeather.iconUrl}
        currentTemp={currentWeather.currentTemp}
        feelsLike={currentWeather.feelsLike}
        details={currentWeather.details}
        today={currentWeather.today}
      />
      <hr className="border-t" />
      <WeatherSummary
        overview={overview}
        isOverviewLoading={isOverviewLoading}
      />
      <hr className="border-t" />
      <DailyWeather dailyWeatherComparison={dailyWeatherComparison} />
      <hr className="border-t" />
      <HourlyForecast hourlyForecasts={hourlyForecasts} />
    </section>
  );
};

export default WeatherCard;
