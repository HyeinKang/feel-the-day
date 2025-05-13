import { Sun, X } from "lucide-react";

import { useCoordinates } from "@/hooks/useCoordinates";
import { useUnit } from "@/hooks/useUnit";
import { useWeather } from "@/hooks/useWeather";

import Map from "@/components/Map";
import WeatherCard from "@/components/WeatherCard";
import LocationSearchBar from "@/components/LocationSearchBar";
import { TemperatureUnitSwitch } from "@/components/TemperatureUnitSwitch";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

function Main() {
  const { coordinates, setCoordinates } = useCoordinates();
  const { unitSystem, setUnitSystem } = useUnit();
  const {
    fetchAllWeather,
    weatherData,
    overviewData,
    yesterdayWeatherData,
    isOverviewLoading,
    isLoading,
    error,
  } = useWeather(coordinates, unitSystem);

  return (
    <>
      <div className="flex flex-col h-screen bg-background-primary">
        <main className="relative flex-grow">
          <Map />
          <div className="absolute top-0 sm:top-4 right-0 sm:right-4 z-10 w-full sm:max-w-[480px] max-h-[100dvh] sm:max-h-[90dvh] flex flex-col bg-[#eaeaea80] backdrop-blur-[24px] p-4 sm:p-6 rounded-xl">
            <header className="flex flex-col gap-y-2">
              <div className="flex items-center justify-between">
                <h1 className="flex gap-x-2 items-center justify-start font-medium text-lg">
                  <Sun size={20} className="text-orange-400" />
                  Feel the day
                </h1>
                {coordinates && (
                  <TemperatureUnitSwitch
                    onChange={setUnitSystem}
                    value={unitSystem}
                  />
                )}
              </div>
              {!coordinates && (
                <div className="hidden sm:flex flex-col gap-y-4">
                  <h2>
                    A weather app that helps you{" "}
                    <span className="italic">feel the day</span> by comparing
                    today’s temperature to yesterday’s.
                  </h2>
                </div>
              )}
              <div className="flex items-center gap-x-2 border-b border-gray-400">
                <LocationSearchBar />
                {coordinates && (
                  <button
                    type="button"
                    aria-label="Close"
                    className="p-2 rounded-full hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
                    onClick={() => {
                      setCoordinates(null);
                    }}
                  >
                    <X size={24} />
                  </button>
                )}
              </div>
            </header>
            {isLoading ? (
              <div className="flex items-center justify-center pt-4 sm:pt-6">
                <Loader />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center pt-4 sm:pt-6">
                <p>Failed to load weather: {error.message}</p>
                <Button
                  value="Reload"
                  role="button"
                  ariaLabel="Reload the weather data"
                  onClick={() => {
                    void fetchAllWeather();
                  }}
                />
              </div>
            ) : coordinates ? (
              <WeatherCard
                weatherData={weatherData}
                overviewData={overviewData}
                yesterdayWeatherData={yesterdayWeatherData}
                isOverviewLoading={isOverviewLoading}
              />
            ) : null}
          </div>
        </main>
        <footer className="z-10 w-full bg-white p-2 text-sm text-center">
          <p>© Feel the day, Hyein Kang</p>
        </footer>
      </div>
    </>
  );
}

export default Main;
