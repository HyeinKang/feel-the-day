import { type HourlyForecastCardData } from "@/types";

const HourlyForecastCard: React.FC<HourlyForecastCardData> = ({
  timeLabel,
  temp,
  feels_like,
  iconUrl,
  weatherDescription,
}) => (
  <div className="flex flex-col items-center gap-y-4 flex-shrink-0">
    <h4 className="whitespace-nowrap text-sm">{timeLabel}</h4>
    <img src={iconUrl} alt={weatherDescription} className="w-8 h-8" />
    <div className="flex flex-col gap-y-1 items-center">
      <h3 className="text-md font-medium">{Math.round(temp)}</h3>
      <p className="text-xs">{Math.round(feels_like)}</p>
    </div>
  </div>
);

export default HourlyForecastCard;
