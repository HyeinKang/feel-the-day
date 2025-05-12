export function formatTemperatureWithUnit(
  value: number,
  unit: "°C" | "°F",
): string {
  return `${value.toString()} ${unit}`;
}
