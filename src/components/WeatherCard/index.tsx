import React, { useMemo } from "react";
import { type Coordinates } from "@/types";
import {
  type CurrentWeatherData,
  type DailyWeatherComparisonData,
  type HourlyForecastCardData,
} from "@/types";
import {
  type OneCallWeatherResponse,
  type TimemachineResponse,
} from "@/types/api/weather";

import { useUnit } from "@/hooks/useUnit";
import {
  formatCurrentWeather,
  formatDailyForecasts,
  formatHourlyForecasts,
} from "@/utils/formatWeatherData";

import WeatherSummary from "./WeatherSummary";
import CurrentWeather from "./CurrentWeather";
import DailyWeatherComparison from "./DailyWeatherComparison";
import HourlyForecastCard from "./HourlyForecastCard";

interface WeatherCardProps {
  coordinates: Coordinates;
  weatherData: OneCallWeatherResponse | null;
  yesterdayWeatherData: TimemachineResponse | null;
  isLoading: boolean;
  error: Error | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  yesterdayWeatherData,
  isLoading,
  error,
}) => {
  const { unitSystem, setUnitSystem } = useUnit();

  const currentWeather: CurrentWeatherData | null = useMemo(() => {
    if (!weatherData) return null;
    return formatCurrentWeather(weatherData);
  }, [weatherData]);

  const dailyWeatherComparison: DailyWeatherComparisonData[] = useMemo(() => {
    if (!weatherData) return [];
    return formatDailyForecasts(weatherData, yesterdayWeatherData);
  }, [weatherData, yesterdayWeatherData]);

  const hourlyForecasts: HourlyForecastCardData[] = useMemo(() => {
    if (!weatherData) return [];
    return formatHourlyForecasts(weatherData);
  }, [weatherData]);

  if (isLoading) {
    return (
      <div className="absolute top-16 bottom-16 right-10 z-10 w-1/2 bg-white p-4 rounded-xl flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-16 bottom-16 right-10 z-10 w-1/2 bg-white p-4 rounded-xl flex items-center justify-center">
        Failed to load weather: {error.message}
      </div>
    );
  }

  if (!currentWeather) {
    return null; // In case no data
  }

  return (
    <div className="absolute top-16 bottom-16 right-10 z-10 w-1/2 flex flex-col gap-y-8 overflow-y-auto bg-[#eaeaea80] backdrop-blur-[12px] px-4 py-8 rounded-xl">
      <WeatherSummary />
      <CurrentWeather
        weather={currentWeather.weather}
        iconUrl={currentWeather.iconUrl}
        currentTemp={currentWeather.currentTemp}
        feelsLike={currentWeather.feelsLike}
        details={currentWeather.details}
        today={currentWeather.today}
      />
      <DailyWeatherComparison dailyWeatherComparison={dailyWeatherComparison} />
      <HourlyForecastCard hourlyForecasts={hourlyForecasts} />
    </div>
  );
};

export default WeatherCard;
