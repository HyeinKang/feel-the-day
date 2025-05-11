import { type HourlyForecast } from "@/types/weather";

const HourlyForecastCard: React.FC<HourlyForecast> = ({
  timeLabel,
  temperature,
  icon,
}) => (
  <div className="flex flex-col items-center gap-y-6">
    <h4 className="whitespace-nowrap text-sm">{timeLabel}</h4>
    <img src={icon} alt={timeLabel} className="w-8 h-8" />
    <p className="text-lg">{temperature}</p>
  </div>
);

export default HourlyForecastCard;
