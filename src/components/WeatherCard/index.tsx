import React, { useMemo } from "react";

import {
  type OneCallWeatherResponse,
  type TimemachineResponse,
} from "@/types/api/openWeather";
import { useUnit } from "@/hooks/useUnit";
import { TemperatureUnitSwitch } from "@/components/TemperatureUnitSwitch";

import WeatherSummary from "./WeatherSummary";
import { CurrentWeather, type CurrentWeatherType } from "./CurrentWeather";
import { DailyWeather, type DailyWeatherItemType } from "./DailyWeather";
import { HourlyForecast, type HourlyForecastItemType } from "./HourlyForecast";
import {
  formatCurrentWeather,
  formatDailyForecasts,
  formatHourlyForecasts,
} from "./_helpers/formatWeatherData";

interface WeatherCardProps {
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
    return formatHourlyForecasts(weatherData);
  }, [weatherData]);

  const CenteredCard: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <div className="absolute top-16 bottom-16 right-10 z-10 w-1/2 bg-white p-4 rounded-xl flex items-center justify-center">
      {children}
    </div>
  );

  if (isLoading) {
    return <CenteredCard>Loading...</CenteredCard>;
  }

  if (error) {
    return <CenteredCard>Failed to load weather: {error.message}</CenteredCard>;
  }

  if (!currentWeather) {
    return null; // In case no data
  }

  return (
    <div className="absolute top-16 bottom-16 right-10 z-10 w-1/2 flex flex-col gap-y-8 overflow-y-auto bg-[#eaeaea80] backdrop-blur-[12px] px-4 py-8 rounded-xl">
      <div className="flex justify-end items-center gap-x-4">
        <TemperatureUnitSwitch onChange={setUnitSystem} value={unitSystem} />
      </div>
      <WeatherSummary />
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
    </div>
  );
};

export default WeatherCard;
