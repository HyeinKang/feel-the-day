import React from "react";
import { type UnitSystem } from "@/types";
import Button from "@/components/ui/Button";

interface TemperatureUnitSwitchProps {
  value: UnitSystem;
  onChange: (unit: UnitSystem) => void;
}

export const TemperatureUnitSwitch: React.FC<TemperatureUnitSwitchProps> = ({
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
