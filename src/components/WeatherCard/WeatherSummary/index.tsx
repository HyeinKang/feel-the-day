interface WeatherSummaryProps {
  overview: string | null;
  isOverviewLoading: boolean;
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({
  overview,
  isOverviewLoading,
}) => (
  <section className="flex flex-col items-center w-full">
    {isOverviewLoading ? (
      <div className="animate-pulse flex-1 space-y-2 py-1">
        <div className="h-2 rounded bg-gray-200" />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-2 rounded bg-gray-200" />
        </div>
      </div>
    ) : (
      <p className="text-sm capitalize">{overview}</p>
    )}
  </section>
);

export default WeatherSummary;
