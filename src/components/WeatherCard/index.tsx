import {
  type Coordinates,
  type WeatherDetail,
  type DailyForecast,
  type HourlyForecast,
} from "@/types/weather";
import WeatherSummary from "./WeatherSummary";
import DailyForecastCard from "./DailyForecastCard";
import HourlyForecastCard from "./HourlyForecastCard";

import WindIcon from "@/assets/icons/Wind.svg";
import HumidityIcon from "@/assets/icons/Humidity.svg";
import UVIcon from "@/assets/icons/UV.svg";
import SunnyCloudyIcon from "@/assets/icons/SunnyCloudy.svg";

interface WeatherCardProps {
  coordinates: Coordinates | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ coordinates }) => {
  const weatherDetails: WeatherDetail[] = [
    { label: "Humidity", value: "60%", icon: HumidityIcon },
    { label: "Wind", value: "5 km/h", icon: WindIcon },
    { label: "UV Index", value: "3", icon: UVIcon },
  ];

  const dailyForecasts: DailyForecast[] = [
    {
      dayLabel: "Yesterday",
      temperature: "22°",
      feelsLike: "22°",
      highLow: "H: 25° L: 11°",
      icon: SunnyCloudyIcon,
    },
    {
      dayLabel: "Tomorrow",
      temperature: "24°",
      feelsLike: "27°",
      highLow: "H: 25° L: 11°",
      icon: SunnyCloudyIcon,
    },
    {
      dayLabel: "Day After Tomorrow",
      temperature: "25°",
      feelsLike: "18°",
      highLow: "H: 25° L: 11°",
      icon: SunnyCloudyIcon,
    },
  ];

  const hourlyForecasts: HourlyForecast[] = [
    { timeLabel: "Now", temperature: "23°", icon: SunnyCloudyIcon },
    ...Array.from({ length: 11 }).map((_, index) => ({
      timeLabel: `${String(index + 1)} PM`,
      temperature: "23°",
      icon: SunnyCloudyIcon,
    })),
  ];

  return (
    <div className="absolute top-16 bottom-16 right-10 z-10 w-1/2 overflow-y-auto bg-[#ffffff80] backdrop-blur-[12px] px-4 py-8 rounded-xl">
      <h2 className="text-xl text-center mb-4 font-medium">Seoul</h2>
      {coordinates && (
        <p className="text-sm text-center">
          {`Latitude: ${coordinates.lat.toFixed(2)}, Longitude: ${coordinates.lng.toFixed(2)}`}
        </p>
      )}
      <p className="text-sm text-center">
        It is 5° higher and feels 1° higher than yesterday.
      </p>
      <p className="text-sm text-center">
        It feels higher because of high Humidity and strong UV index.
      </p>

      {/* Weather Summary */}
      <WeatherSummary
        icon={SunnyCloudyIcon}
        temperature="23°"
        feelsLike="25°"
        highLow="H: 25° L: 11°"
        details={weatherDetails}
      />

      {/* Daily Forecasts */}
      <div className="flex justify-between mt-8">
        {dailyForecasts.map((forecast, index) => (
          <DailyForecastCard key={index} {...forecast} />
        ))}
      </div>

      {/* Hourly Forecast */}
      <section className="mt-8">
        <hr className="border-t border-gray-300 mb-4" />
        <div className="flex flex-start gap-x-6 py-2 overflow-x-auto">
          {hourlyForecasts.map((forecast, index) => (
            <HourlyForecastCard key={index} {...forecast} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WeatherCard;
