import { type OneCallWeatherResponse } from "@/types/api/weather";
import {
  type CurrentWeatherCardData,
  type DailyWeatherCardData,
  type HourlyForecastCardData,
} from "@/types";

export function formatCurrentWeather(
  apiData: OneCallWeatherResponse,
): CurrentWeatherCardData {
  return {
    weather: apiData.current.weather,
    currentTemp: Math.round(apiData.current.temp),
    feelsLike: Math.round(apiData.current.feels_like),
    details: [
      { key: "wind_speed", value: Math.round(apiData.current.wind_speed) },
      { key: "humidity", value: apiData.current.humidity },
      { key: "uvi", value: Math.round(apiData.current.uvi) },
    ],
    iconUrl: `https://openweathermap.org/img/wn/${apiData.current.weather[0].icon}@2x.png`,
  };
}

export function formatDailyForecasts(
  apiData: OneCallWeatherResponse,
): DailyWeatherCardData[] {
  return apiData.daily.slice(0, 3).map((day) => ({
    dayLabel: new Date(day.dt * 1000).toLocaleDateString(undefined, {
      weekday: "long",
    }),
    iconUrl: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
    temp: `${Math.round(day.temp.day).toString()}°C`,
    feelsLike: `${Math.round(day.feels_like.day).toString()}°C`,
    highLow: `H: ${Math.round(day.temp.max).toString()}° L: ${Math.round(day.temp.min).toString()}°`,
  }));
}

export function formatHourlyForecasts(
  apiData: OneCallWeatherResponse,
): HourlyForecastCardData[] {
  return apiData.hourly.slice(0, 12).map((hour) => ({
    timeLabel: new Date(hour.dt * 1000).getHours().toString() + "h",
    iconUrl: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`,
    temp: `${Math.round(hour.temp).toString()}°C`,
  }));
}
