import React from "react";
import { type UnitSystem } from "@/types";

interface TemperatureUnitSwitchProps {
  value: UnitSystem;
  onChange: (unit: UnitSystem) => void;
}

export const TemperatureUnitSwitch: React.FC<TemperatureUnitSwitchProps> = ({
  value,
  onChange,
}) => {
  return (
    <button
      type="button"
      className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      onClick={() => {
        onChange(value === "metric" ? "imperial" : "metric");
      }}
    >
      {value === "metric" ? "View in °F" : "View in °C"}
    </button>
  );
};
