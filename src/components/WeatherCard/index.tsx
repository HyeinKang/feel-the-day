import React, { useMemo } from "react";
import { useCoordinates } from "@/hooks/useCoordinates";
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

import {
  formatCurrentWeather,
  formatDailyForecasts,
  formatHourlyForecasts,
} from "@/utils/formatWeatherData";

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
  const { locationName } = useCoordinates();

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
    <div className="absolute top-16 bottom-16 right-10 z-10 w-1/2 overflow-y-auto bg-[#eaeaea80] backdrop-blur-[12px] px-4 py-8 rounded-xl">
      {/* Weather Summary */}
      {/* Location + Coordinates */}
      <h2 className="text-xl text-center mb-4 font-medium">{locationName}</h2>
      {/* <p className="text-sm text-center">
        It is 5° higher and feels 1° higher than yesterday.
      </p>
      <p className="text-sm text-center">
        It feels higher because of high Humidity and strong UV index.
      </p> */}

      {/* Current Weather */}
      <CurrentWeather
        weather={currentWeather.weather}
        iconUrl={currentWeather.iconUrl}
        currentTemp={currentWeather.currentTemp}
        feelsLike={currentWeather.feelsLike}
        // highLow={currentWeather.highLow}
        details={currentWeather.details}
      />

      {/* Daily Forecasts */}
      <section className="mt-8">
        <div className="flex justify-between">
          {dailyWeatherComparison.map((forecast, index) => (
            <DailyWeatherComparison key={index} {...forecast} />
          ))}
        </div>
      </section>

      {/* Hourly Forecasts */}
      <section className="mt-8">
        <hr className="border-t border-gray-300 mb-4" />
        <div className="flex flex-start gap-x-6 py-2 overflow-x-auto">
          {hourlyForecasts.map((forecast, index) => (
            <HourlyForecastCard key={index} {...forecast} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WeatherCard;
