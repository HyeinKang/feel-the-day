import { useUnit } from "@/context/Unit/useUnit";

import { type HourlyForecastItemType } from "./";
import { formatTemperatureWithUnit } from "../_helpers/formatTemperature";

export const HourlyForecastItem: React.FC<HourlyForecastItemType> = ({
  timeLabel,
  temp,
  feels_like,
  iconUrl,
  weatherDescription,
}) => {
  const { temperatureUnit } = useUnit();

  const temperature = formatTemperatureWithUnit(temp, temperatureUnit);
  const feelsLikeTemperature = formatTemperatureWithUnit(
    feels_like,
    temperatureUnit,
  );

  return (
    <div className="flex flex-col items-center gap-y-4 flex-shrink-0">
      <h4 className="whitespace-nowrap text-sm">{timeLabel}</h4>
      <img src={iconUrl} alt={weatherDescription} className="w-8 h-8" />
      <div className="flex flex-col gap-y-1 items-center">
        <h3 className="text-md font-medium">{temperature}</h3>
        <p className="text-xs">{feelsLikeTemperature}</p>
      </div>
    </div>
  );
};
