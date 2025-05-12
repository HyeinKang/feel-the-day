export function formatTimestampToLocalTimeLabel(timestamp: number): string {
  const forecastDate = new Date(timestamp * 1000);
  const now = new Date();

  const differenceInHours = Math.abs(now.getHours() - forecastDate.getHours());
  if (differenceInHours === 0) {
    return "Now";
  }

  const hours = forecastDate.getHours() % 12 || 12;
  const ampm = forecastDate.getHours() >= 12 ? "PM" : "AM";

  return `${hours.toString()} ${ampm}`;
}
