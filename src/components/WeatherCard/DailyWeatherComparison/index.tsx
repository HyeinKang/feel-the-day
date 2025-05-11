import { type DailyWeatherComparisonData } from "@/types";
import DailyWeatherComparisonItem from "./DailyWeatherComparisonItem";

interface DailyWeatherComparisonProps {
  dailyWeatherComparison: DailyWeatherComparisonData[];
}

const DailyWeatherComparison: React.FC<DailyWeatherComparisonProps> = ({
  dailyWeatherComparison,
}) => (
  <section>
    <div className="flex justify-between">
      {dailyWeatherComparison.map((forecast, index) => (
        <DailyWeatherComparisonItem key={index} {...forecast} />
      ))}
    </div>
  </section>
);

export default DailyWeatherComparison;
