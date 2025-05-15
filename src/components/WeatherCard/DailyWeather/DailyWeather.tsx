import { type DailyWeatherItemType } from "./types/dailyWeather";
import DailyWeatherItem from "./DailyWeatherItem";
/**
 * Props for the DailyWeather component.
 */
export interface DailyWeatherProps {
  dailyWeatherComparison: DailyWeatherItemType[];
}

export const DailyWeather: React.FC<DailyWeatherProps> = ({
  dailyWeatherComparison,
}) => (
  <section>
    <div className="flex justify-between">
      {dailyWeatherComparison.map((forecast, index) => (
        <DailyWeatherItem key={index} {...forecast} />
      ))}
    </div>
  </section>
);
