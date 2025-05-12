import { type TemperatureUnit } from "@/context/Unit/types/unit";

export function formatTemperatureWithUnit(
  value: number,
  unit: TemperatureUnit,
): string {
  return `${value.toString()} ${unit}`;
}
