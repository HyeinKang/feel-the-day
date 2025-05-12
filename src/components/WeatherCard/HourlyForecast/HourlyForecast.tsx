import { type HourlyForecastItemType } from "./";
import { HourlyForecastItem } from "./HourlyForecastItem";

interface HourlyForecastProps {
  hourlyForecasts: HourlyForecastItemType[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({
  hourlyForecasts,
}) => (
  <section>
    <hr className="border-t border-gray-300 mb-4" />
    <div className="flex flex-start gap-x-6 py-2 overflow-x-auto">
      {hourlyForecasts.map((forecast, index) => (
        <HourlyForecastItem key={index} {...forecast} />
      ))}
    </div>
  </section>
);
