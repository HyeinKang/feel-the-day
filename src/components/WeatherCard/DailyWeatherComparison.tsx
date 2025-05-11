import { type DailyWeatherComparisonData } from "@/types";

const DailyWeatherComparison: React.FC<DailyWeatherComparisonData> = ({
  dayLabel,
  temp,
  feelsLike,
  high,
  low,
  iconUrl,
}) => (
  <div className="flex flex-col gap-y-2 items-center w-1/3">
    <h4 className="text-sm">{dayLabel}</h4>
    <img src={iconUrl} alt={dayLabel} className="w-12 h-12" />
    <p className="text-xl">{temp}</p>
    <div className="text-center">
      <p className="text-sm">Feels like {feelsLike}</p>
      {high && low && (
        <p className="text-sm">
          H: {high} L: {low}
        </p>
      )}
    </div>
  </div>
);

export default DailyWeatherComparison;
