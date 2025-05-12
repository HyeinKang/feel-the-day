interface WeatherSummaryProps {
  locationName: string | null;
  overview: string | null;
  isOverviewLoading: boolean;
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({
  locationName,
  overview,
  isOverviewLoading,
}) => (
  <section className="mt-4">
    <h2 className="text-xl text-center font-medium">{locationName}</h2>
    {isOverviewLoading ? (
      <div className="animate-pulse flex-1 space-y-2 py-1">
        <div className="h-2 rounded bg-gray-200" />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-2 rounded bg-gray-200" />
        </div>
      </div>
    ) : (
      <p className="text-sm text-center capitalize">{overview}</p>
    )}
  </section>
);

export default WeatherSummary;
