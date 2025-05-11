import Wind from "@/assets/icons/Wind.svg";
import Humidity from "@/assets/icons/Humidity.svg";
import UV from "@/assets/icons/UV.svg";
import SunnyCloudyIcon from "@/assets/icons/SunnyCloudy.svg";
import { type Coordinates } from "@/types";

interface WeatherCardProps {
  coordinates: Coordinates | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ coordinates }) => {
  return (
    <div className="absolute top-16 bottom-16 right-10 z-10 w-1/2 overflow-y-auto bg-[#ffffff80] backdrop-blur-[12px] px-4 py-8 rounded-xl">
      {/* Location */}
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

      {/* Weather */}
      <section className="mt-8">
        <div className="flex justify-center items-center gap-x-4 mt-4">
          <div className="flex w-full justify-center items-center">
            <img
              src={SunnyCloudyIcon}
              alt="Sunny cloudy"
              className="w-20 h-20"
            />
          </div>
          <div className="flex flex-col w-full">
            <h3 className="text-4xl">23°</h3>
            <h3 className="text-lg">Feels like 25°</h3>
            <p className="">H: 25° L: 11°</p>

            {/* Weather Details */}
            <div className="flex gap-x-6 mt-2">
              <div className="flex flex-col items-center">
                <div className="flex w-full justify-center items-center">
                  <img src={Humidity} alt="Humidity" className="w-4 h-4" />
                </div>
                <p className="text-sm">60%</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex w-full justify-center items-center">
                  <img src={Wind} alt="Wind" className="w-4 h-4" />
                </div>
                <p className="text-sm">5 km/h</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex w-full justify-center items-center">
                  <img src={UV} alt="UV index" className="w-4 h-4" />
                </div>
                <p className="text-sm">3</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* yesterday and tomorrow Weather */}
      <section className="mt-8">
        <div className="flex justify-between mt-8">
          <div className="flex flex-col gap-y-2 items-center w-1/3">
            <h4 className="text-sm">Yesterday</h4>
            <div className="flex w-full justify-center items-center">
              <img
                src={SunnyCloudyIcon}
                alt="Sunny cloudy"
                className="w-12 h-12"
              />
            </div>
            <p className="text-xl">22°</p>
            <div>
              <p className="text-sm">Feels like 22°</p>
              <p className="text-sm">H: 25° L: 11°</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 items-center w-1/3">
            <h4 className="text-sm">Tomorrow</h4>
            <div className="flex w-full justify-center items-center">
              <img
                src={SunnyCloudyIcon}
                alt="Sunny cloudy"
                className="w-12 h-12"
              />
            </div>
            <p className="text-xl">24°</p>
            <div>
              <p className="text-sm">Feels like 27°</p>
              <p className="text-sm">H: 25° L: 11°</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 items-center w-1/3">
            <h4 className="text-sm">Day After Tomorrow</h4>
            <div className="flex w-full justify-center items-center">
              <img
                src={SunnyCloudyIcon}
                alt="Sunny cloudy"
                className="w-12 h-12"
              />
            </div>
            <p className="text-xl">25°</p>
            <div>
              <p className="text-sm">Feels like 18°</p>
              <p className="text-sm">H: 25° L: 11°</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming 24 - Hourly Weather */}
      <section className="mt-8">
        <hr className="border-t border-gray-300 mb-4" />
        <div className="flex flex-start gap-x-6 py-2 overflow-x-auto">
          <div className="flex flex-col items-center gap-y-6">
            <h4 className="whitespace-nowrap text-sm">Now</h4>
            <div className="flex w-full justify-center items-center">
              <img
                src={SunnyCloudyIcon}
                alt="Sunny cloudy"
                className="w-8 h-8"
              />
            </div>
            <p className="text-lg">23°</p>
          </div>
          {Array.from({ length: 11 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-y-6">
              <h4 className="whitespace-nowrap text-sm">{index + 1} PM</h4>
              <div className="flex w-full justify-center items-center">
                <img
                  src={SunnyCloudyIcon}
                  alt="Sunny cloudy"
                  className="w-8 h-8"
                />
              </div>
              <p className="text-lg">23°</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WeatherCard;
