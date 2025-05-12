import {
  type OneCallWeatherResponse,
  type TimemachineResponse,
} from "@/types/api/openWeather";

import { type CurrentWeatherType } from "../CurrentWeather";
import { type DailyWeatherItemType } from "../DailyWeather";
import { type HourlyForecastItemType } from "../HourlyForecast";
import { formatTimestampToLocalTimeLabel } from "./formatTime";

export function formatCurrentWeather(
  apiData: OneCallWeatherResponse,
): CurrentWeatherType {
  return {
    weather: apiData.current.weather,
    currentTemp: Math.round(apiData.current.temp),
    feelsLike: Math.round(apiData.current.feels_like),
    details: [
      { key: "wind_speed", value: Math.round(apiData.current.wind_speed) },
      { key: "humidity", value: apiData.current.humidity },
      { key: "uvi", value: Math.round(apiData.current.uvi) },
    ],
    iconUrl: `https://openweathermap.org/img/wn/${apiData.current.weather[0].icon}@4x.png`,
    today: {
      temp: {
        max: Math.round(apiData.daily[0].temp.max),
        min: Math.round(apiData.daily[0].temp.min),
      },
    },
  };
}

export function formatDailyForecasts(
  apiData: OneCallWeatherResponse,
  yesterdayWeatherData: TimemachineResponse | null,
): DailyWeatherItemType[] {
  const dailyWeatherComparison: DailyWeatherItemType[] = [];

  // 1. If yesterday's weather data exists, format it
  if (yesterdayWeatherData && yesterdayWeatherData.data.length > 0) {
    const yesterday = yesterdayWeatherData.data[0];

    dailyWeatherComparison.push({
      dayLabel: "Yesterday",
      iconUrl: `https://openweathermap.org/img/wn/${yesterday.weather[0].icon}@2x.png`,
      temp: Math.round(yesterday.temp),
      feelsLike: Math.round(yesterday.feels_like),
      high: null,
      low: null,
    });
  }

  // 2. Then format upcoming days from OneCall daily data
  dailyWeatherComparison.push(
    ...apiData.daily.slice(0, 3).map((day) => ({
      dayLabel: new Date(day.dt * 1000).toLocaleDateString(undefined, {
        weekday: "long",
      }),
      iconUrl: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
      temp: Math.round(day.temp.day),
      feelsLike: Math.round(day.feels_like.day),
      high: Math.round(day.temp.max),
      low: Math.round(day.temp.min),
    })),
  );

  return dailyWeatherComparison;
}

export function formatHourlyForecasts(
  apiData: OneCallWeatherResponse,
): HourlyForecastItemType[] {
  return apiData.hourly.slice(0, 24).map((hour) => ({
    timeLabel: formatTimestampToLocalTimeLabel(hour.dt),
    iconUrl: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`,
    weatherDescription: hour.weather[0].description,
    temp: Math.round(hour.temp),
    feels_like: Math.round(hour.feels_like),
  }));
}
