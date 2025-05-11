import { type CurrentWeatherData } from "@/types";

import WindIcon from "@/assets/icons/Wind.svg";
import HumidityIcon from "@/assets/icons/Humidity.svg";
import UVIcon from "@/assets/icons/UV.svg";

const iconMap = {
  wind_speed: {
    icon: WindIcon,
    iconAlt: "Wind speed",
  },
  humidity: {
    icon: HumidityIcon,
    iconAlt: "Humidity",
  },
  uvi: {
    icon: UVIcon,
    iconAlt: "UV index",
  },
};

const CurrentWeather: React.FC<CurrentWeatherData> = ({
  weather,
  iconUrl,
  currentTemp,
  feelsLike,
  // highLow,
  details,
}) => (
  <section className="mt-8">
    <div className="flex justify-center items-center gap-x-4 mt-4">
      <div className="flex flex-col w-full justify-center items-center">
        {/* Weather */}
        <img src={iconUrl} alt={weather[0].description} className="w-20 h-20" />
        <h2>{weather[0].main}</h2>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-4xl">{currentTemp}</h3>
        <h3 className="text-lg">Feels like {feelsLike}</h3>
        {/* <p className="">{highLow}</p> */}
        <div className="flex gap-x-6 mt-2">
          {details.map((detail, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={iconMap[detail.key].icon}
                alt={iconMap[detail.key].iconAlt}
                className="w-4 h-4"
              />
              <p className="text-sm">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CurrentWeather;
