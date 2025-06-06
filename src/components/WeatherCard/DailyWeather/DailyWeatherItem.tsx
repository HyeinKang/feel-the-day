import { useUnit } from "@/contexts/Unit/useUnit";

import { type DailyWeatherItemType } from "./types/dailyWeather";
import { formatTemperatureWithUnit } from "../_helpers/formatTemperature";

const DailyWeatherComparisonItem: React.FC<DailyWeatherItemType> = ({
  dayLabel,
  temp,
  feelsLike,
  high,
  low,
  iconUrl,
  iconDescription,
  summery,
}) => {
  const { temperatureUnit } = useUnit();

  const temperature = formatTemperatureWithUnit(temp, temperatureUnit);
  const feelsLikeTemperature = formatTemperatureWithUnit(
    feelsLike,
    temperatureUnit,
  );
  const highTemperature = high
    ? formatTemperatureWithUnit(high, temperatureUnit)
    : null;
  const lowTemperature = low
    ? formatTemperatureWithUnit(low, temperatureUnit)
    : null;

  return (
    <div className="flex flex-col gap-y-2 items-center w-fit-content">
      <h4 className="text-sm">{dayLabel}</h4>
      <img
        src={iconUrl}
        alt={[iconDescription, summery].join(": ")}
        className="w-12 h-12"
      />
      <p className="text-xl font-medium">{temperature}</p>
      <div className="text-center">
        <p className="text-sm">Feels like {feelsLikeTemperature}</p>
        <p className="text-sm">
          {highTemperature && lowTemperature
            ? `H: ${highTemperature} L: ${lowTemperature}`
            : "-"}
        </p>
      </div>
    </div>
  );
};

export default DailyWeatherComparisonItem;
