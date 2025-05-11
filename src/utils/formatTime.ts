export function formatTimestampToLocalTimeLabel(timestamp: number): string {
  const forecastDate = new Date(timestamp * 1000);
  const now = new Date();

  const timeDifference = Math.abs(now.getTime() - forecastDate.getTime());
  const differenceInMinutes = timeDifference / 1000 / 60;

  if (differenceInMinutes <= 30) {
    return "Now";
  }

  const hours = forecastDate.getHours() % 12 || 12;
  const ampm = forecastDate.getHours() >= 12 ? "PM" : "AM";

  return `${hours.toString()} ${ampm}`;
}
