import { type DailyForecast } from "@/types/weather";

const DailyForecastCard: React.FC<DailyForecast> = ({
  dayLabel,
  temperature,
  feelsLike,
  highLow,
  icon,
}) => (
  <div className="flex flex-col gap-y-2 items-center w-1/3">
    <h4 className="text-sm">{dayLabel}</h4>
    <img src={icon} alt={dayLabel} className="w-12 h-12" />
    <p className="text-xl">{temperature}</p>
    <div className="text-center">
      <p className="text-sm">Feels like {feelsLike}</p>
      <p className="text-sm">{highLow}</p>
    </div>
  </div>
);

export default DailyForecastCard;
