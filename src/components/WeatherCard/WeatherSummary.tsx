import { useCoordinates } from "@/hooks/useCoordinates";

const WeatherSummary: React.FC = () => {
  const { locationName } = useCoordinates();

  return (
    <section className="mt-4">
      {/* Location + Coordinates */}
      <h2 className="text-xl text-center font-medium">{locationName}</h2>
      {/* <p className="text-sm text-center">
              It is 5° higher and feels 1° higher than yesterday.
            </p>
            <p className="text-sm text-center">
              It feels higher because of high Humidity and strong UV index.
            </p> */}
    </section>
  );
};

export default WeatherSummary;
