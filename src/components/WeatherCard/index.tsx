import React, { useMemo } from "react";
import { X } from "lucide-react";

import { useCoordinates } from "@/hooks/useCoordinates";
import { useWeather } from "@/hooks/useWeather";
import { useUnit } from "@/hooks/useUnit";
import { TemperatureUnitSwitch } from "@/components/TemperatureUnitSwitch";

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
  const { locationName, coordinates, setCoordinates } = useCoordinates();
  const { unitSystem, setUnitSystem } = useUnit();
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
    <div className="absolute top-16 bottom-16 right-10 z-10 w-1/2 flex flex-col gap-y-8 overflow-y-auto bg-[#eaeaea80] backdrop-blur-[12px] px-4 py-8 rounded-xl">
      <div className="flex justify-end items-center gap-x-4">
        <TemperatureUnitSwitch onChange={setUnitSystem} value={unitSystem} />
        <button
          type="button"
          aria-label="Close"
          className="p-2 rounded-full hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
          onClick={() => {
            setCoordinates(null);
          }}
        >
          <X size={24} />
        </button>
      </div>
      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <div>Failed to load weather: {error.message}</div>
      ) : (
        <>
      <WeatherSummary
        locationName={locationName}
        overview={overview}
        isOverviewLoading={isOverviewLoading}
      />
      <CurrentWeather
        weather={currentWeather.weather}
        iconUrl={currentWeather.iconUrl}
        currentTemp={currentWeather.currentTemp}
        feelsLike={currentWeather.feelsLike}
        details={currentWeather.details}
        today={currentWeather.today}
      />
      <DailyWeather dailyWeatherComparison={dailyWeatherComparison} />
      <HourlyForecast hourlyForecasts={hourlyForecasts} />
        </>
      )}
    </div>
  );
};

export default WeatherCard;
