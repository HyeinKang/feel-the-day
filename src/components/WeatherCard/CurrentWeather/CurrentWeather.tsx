import { useUnit } from "@/hooks/useUnit";

import { type CurrentWeatherType } from "./types/currentWeather";
import { getWeatherDetailIcon } from "../_helpers/getWeatherDetailIcon";
import { formatTemperatureWithUnit } from "../_helpers/formatTemperature";

export const CurrentWeather: React.FC<CurrentWeatherType> = ({
  weather,
  iconUrl,
  currentTemp,
  feelsLike,
  details,
  today,
}) => {
  const { temperatureUnit, windSpeedUnit } = useUnit();
  const currentTemperature = formatTemperatureWithUnit(
    currentTemp,
    temperatureUnit,
  );
  const feelsLikeTemperature = formatTemperatureWithUnit(
    feelsLike,
    temperatureUnit,
  );
  const highTemperature = formatTemperatureWithUnit(
    today.temp.max,
    temperatureUnit,
  );
  const lowTemperature = formatTemperatureWithUnit(
    today.temp.min,
    temperatureUnit,
  );
  return (
    <section className="py-1">
      <div className="flex justify-center items-center gap-x-4">
        <div className="flex flex-col w-full justify-center items-center">
          <img
            src={iconUrl}
            alt={[weather[0].main, weather[0].description].join(": ")}
            className="w-16 h-16"
          />
          <p>{weather[0].main}</p>
        </div>
        <div className="flex flex-col w-full">
          <h3 className="text-4xl font-medium">{currentTemperature}</h3>
          <h3 className="text-lg">Feels like {feelsLikeTemperature}</h3>
          <h3 className="flex gap-x-3 text-sm">
            <span>High: {highTemperature}</span>
            <span>Low: {lowTemperature}</span>
          </h3>
        </div>
      </div>
      <div className="flex justify-center gap-x-20 mt-6">
        {details.map((detail, index) => {
          const result = getWeatherDetailIcon(detail.key, detail.value);
          const { IconComponent, alt } = result;
          const unit =
            detail.key === "wind_speed"
              ? windSpeedUnit
              : detail.key === "humidity"
                ? "%"
                : undefined;
          return (
            <div
              key={index}
              aria-label={alt}
              className="flex gap-x-2 items-center"
            >
              <IconComponent className="w-4 h-4" alt={alt} />
              <p className="text-sm">
                {detail.value}
                {unit}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
