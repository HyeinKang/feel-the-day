import { useState } from 'react'
import Map from "@/components/Map";
import WeatherCard from "@/components/WeatherCard";

function App() {
  const [count, setCount] = useState(0)
  // const [selectedCity, setSelectedCity] = useState(null)

  return (
    <div className="flex flex-col h-screen bg-background-primary">
      <header className="absolute top-0 z-10 p-4 bg-white">
        <h2 className="text-xl font-semibold text-primary">Welcome to the Map</h2>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </header>
      <main className="relative flex-grow-1">
        <Map />
        <WeatherCard  />
      </main>
      <footer className="z-10 w-full bg-white p-2 text-sm text-center">
        <p>© Feel the day, Hyein Kang</p>
      </footer>
    </div>
  )
}

export default App
