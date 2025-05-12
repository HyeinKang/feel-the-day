import { type TemperatureUnit } from "@/types";

export function formatTemperatureWithUnit(
  value: number,
  unit: TemperatureUnit,
): string {
  return `${value.toString()} ${unit}`;
}
