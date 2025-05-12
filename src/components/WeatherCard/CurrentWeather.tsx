import { type CurrentWeatherData } from "@/types";
import { useUnit } from "@/hooks/useUnit";
import { getWeatherDetailIcon } from "@/utils/getWeatherDetailIcon";
import { type CurrentWeatherData } from "@/types";

const CurrentWeather: React.FC<CurrentWeatherData> = ({
  weather,
  iconUrl,
  currentTemp,
  feelsLike,
  details,
}) => (
  <section>
    <div className="flex justify-center items-center gap-x-4">
      <div className="flex flex-col w-full justify-center items-center">
        <img src={iconUrl} alt={weather[0].description} className="w-20 h-20" />
        <h2>{weather[0].main}</h2>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-4xl">{currentTemp}</h3>
        <h3 className="text-lg">Feels like {feelsLike}</h3>
        <div className="flex gap-x-6 mt-2">
          {details.map((detail, index) => {
            const result = getWeatherDetailIcon(detail.key, detail.value);
              const { IconComponent, alt } = result;
              const unit =
                detail.key === "wind_speed"
                  ? windSpeedUnit
                  : detail.key === "humidity"
                    ? "%"
                    : undefined;
            return (
              <div key={index} className="flex flex-col items-center">
                <IconComponent className="w-4 h-4" aria-label={alt} />
                <p className="text-sm">
                  {detail.value}
                  {unit}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default CurrentWeather;
