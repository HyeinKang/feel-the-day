import React from "react";
import { type UnitSystem } from "@/types";
import Button from "@/components/ui/Button";
/**
 * Props for the TemperatureUnitSwitch component.
 */
export interface TemperatureUnitSwitchProps {
  value: UnitSystem;
  onChange: (unit: UnitSystem) => void;
}
/**
 * TemperatureUnitSwitch
 *
 * A toggle to switch between metric (°C) and imperial (°F) temperature units.
 * Fetches and updates the unit system via context.
 *
 * @returns JSX.Element
 */
const TemperatureUnitSwitch: React.FC<TemperatureUnitSwitchProps> = ({
  value,
  onChange,
}) => (
  <Button
    value={value === "metric" ? "View in °F" : "View in °C"}
    role="switch"
    ariaLabel="Switch temperature unit"
    onClick={() => {
      onChange(value === "metric" ? "imperial" : "metric");
    }}
  />
);

export default TemperatureUnitSwitch;
