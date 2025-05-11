import { type HourlyForecastCardData } from "@/types";
import HourlyForecastCardItem from "./HourlyForecastCardItem";

interface HourlyForecastCardProps {
  hourlyForecasts: HourlyForecastCardData[];
}

const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({
  hourlyForecasts,
}) => (
  <section>
    <hr className="border-t border-gray-300 mb-4" />
    <div className="flex flex-start gap-x-6 py-2 overflow-x-auto">
      {hourlyForecasts.map((forecast, index) => (
        <HourlyForecastCardItem key={index} {...forecast} />
      ))}
    </div>
  </section>
);

export default HourlyForecastCard;
