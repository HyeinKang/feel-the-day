import { type HourlyForecastItemType } from "./";
import { HourlyForecastItem } from "./HourlyForecastItem";

interface HourlyForecastProps {
  hourlyForecasts: HourlyForecastItemType[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({
  hourlyForecasts,
}) => (
  <section className="pb-6">
    <div className="flex flex-start gap-x-8 py-2 overflow-x-auto">
      {hourlyForecasts.map((forecast, index) => (
        <HourlyForecastItem key={index} {...forecast} />
      ))}
    </div>
  </section>
);
