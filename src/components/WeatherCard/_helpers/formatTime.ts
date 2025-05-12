export function formatTimestampToLocalTimeLabel(
  timestamp: number,
  timezone: string,
): string {
  const forecastDate = new Date(timestamp * 1000);
  const now = new Date();

  // Get the forecast hour and current hour in the location timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    hour12: true,
  });

  const forecastHourString = formatter.format(forecastDate);
  const nowHourString = formatter.format(now);

  if (forecastHourString === nowHourString) {
    return "Now";
  }

  return forecastHourString; // e.g., "3 PM"
}
