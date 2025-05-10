import { useState } from "react";
import Map from "@/components/Map";
import WeatherCard from "@/components/WeatherCard";
import LocationSearchBar from "@/components/LocationSearchBar";

function App() {
  const [selectedLngLat, setSelectedLngLat] = useState<[number, number] | null>(
    null,
  );

  return (
    <div className="flex flex-col h-screen bg-background-primary">
      <header className="flex flex-col gap-y-2 absolute top-0 z-10 p-4 bg-white">
        <h2 className="text-xl font-semibold text-primary">
          Welcome to the Map
        </h2>
        <p className="text-sm text-gray-500">
          Click on the map to get the coordinates
        </p>
        <p className="text-sm text-gray-500">or search for a location</p>
        <LocationSearchBar />
      </header>
      <main className="relative flex-grow">
        <Map setSelectedLngLat={setSelectedLngLat} />
        <WeatherCard coordinates={selectedLngLat} />
      </main>
      <footer className="z-10 w-full bg-white p-2 text-sm text-center">
        <p>© Feel the day, Hyein Kang</p>
      </footer>
    </div>
  );
}

export default App;
