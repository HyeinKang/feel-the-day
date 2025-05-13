import { Sun, X } from "lucide-react";

import { useCoordinates } from "@/hooks/useCoordinates";
import { useUnit } from "@/hooks/useUnit";

import Map from "@/components/Map";
import WeatherCard from "@/components/WeatherCard";
import LocationSearchBar from "@/components/LocationSearchBar";
import { TemperatureUnitSwitch } from "@/components/TemperatureUnitSwitch";

function Main() {
  const { coordinates, setCoordinates } = useCoordinates();
  const { unitSystem, setUnitSystem } = useUnit();

  return (
    <>
      <div className="flex flex-col h-screen bg-background-primary">
        <main className="relative flex-grow">
          <Map />
          <div className="absolute top-0 sm:top-4 right-0 sm:right-4 z-10 w-full sm:max-w-[480px] max-h-[100dvh] sm:max-h-[90dvh] flex flex-col gap-y-6 bg-[#eaeaea80] backdrop-blur-[24px] p-4 sm:p-6 rounded-xl">
            <header className="flex flex-col gap-y-4">
              <div className="flex items-center justify-between">
                <h1 className="flex gap-x-2 items-center justify-start font-medium text-xl">
                  <Sun size={28} className="text-orange-400" />
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
              <div className="flex items-center gap-x-2 border-b">
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
            {coordinates && <WeatherCard />}
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
