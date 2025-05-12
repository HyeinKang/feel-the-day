import { type DailyWeatherComparisonData } from "@/types";
import { useUnit } from "@/hooks/useUnit";
import { formatTemperatureWithUnit } from "@/utils/formatTemperature";

const DailyWeatherComparisonItem: React.FC<DailyWeatherComparisonData> = ({
  dayLabel,
  temp,
  feelsLike,
  high,
  low,
  iconUrl,
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
    <div className="flex flex-col gap-y-2 items-center w-1/3">
      <h4 className="text-sm">{dayLabel}</h4>
      <img src={iconUrl} alt={dayLabel} className="w-12 h-12" />
      <p className="text-xl">{temperature}</p>
      <div className="text-center">
        <p className="text-sm">Feels like {feelsLikeTemperature}</p>
        {high && low && (
          <p className="text-sm">
            H: {highTemperature} L: {lowTemperature}
          </p>
        )}
      </div>
    </div>
  );
};

export default DailyWeatherComparisonItem;
