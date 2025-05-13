import React, { useMemo } from "react";

import { useCoordinates } from "@/hooks/useCoordinates";
import { useWeather } from "@/hooks/useWeather";
import { useUnit } from "@/hooks/useUnit";

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

const WeatherCard: React.FC = () => {
  const { coordinates } = useCoordinates();
  const { unitSystem } = useUnit();
  const {
    weatherData,
    overviewData,
    yesterdayWeatherData,
    isLoading,
    isOverviewLoading,
    error,
  } = useWeather(coordinates, unitSystem);

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
    <main className="flex flex-col gap-y-8 overflow-y-auto">
      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <div>
          <p>Failed to load weather: {error.message}</p>
          <button type="button">Reload</button>
        </div>
      ) : (
        <>
          <hr className="sticky top-0 border-t border-gray-300" />
          <CurrentWeather
            weather={currentWeather.weather}
            iconUrl={currentWeather.iconUrl}
            currentTemp={currentWeather.currentTemp}
            feelsLike={currentWeather.feelsLike}
            details={currentWeather.details}
            today={currentWeather.today}
          />
          <hr className="border-t border-gray-300" />
          <WeatherSummary
            overview={overview}
            isOverviewLoading={isOverviewLoading}
          />
          <hr className="border-t border-gray-300" />
          <DailyWeather dailyWeatherComparison={dailyWeatherComparison} />
          <hr className="border-t border-gray-300" />
          <HourlyForecast hourlyForecasts={hourlyForecasts} />
        </>
      )}
    </main>
  );
};

export default WeatherCard;
