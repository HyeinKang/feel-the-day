import { type WeatherDetail } from "@/types/weather";

interface WeatherSummaryProps {
  icon: string;
  temperature: string;
  feelsLike: string;
  highLow: string;
  details: WeatherDetail[];
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({
  icon,
  temperature,
  feelsLike,
  highLow,
  details,
}) => (
  <section className="mt-8">
    <div className="flex justify-center items-center gap-x-4 mt-4">
      <div className="flex w-full justify-center items-center">
        <img src={icon} alt="Weather icon" className="w-20 h-20" />
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-4xl">{temperature}</h3>
        <h3 className="text-lg">Feels like {feelsLike}</h3>
        <p className="">{highLow}</p>

        <div className="flex gap-x-6 mt-2">
          {details.map((detail, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={detail.icon} alt={detail.label} className="w-4 h-4" />
              <p className="text-sm">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WeatherSummary;
