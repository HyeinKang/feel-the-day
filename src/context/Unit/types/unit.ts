export type UnitSystem = "metric" | "imperial";
export type TemperatureUnit = "°C" | "°F";
export type WindSpeedUnit = "mps" | "mph"; // meters/sec or miles/hour

export interface UnitContextType {
  unitSystem: UnitSystem;
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  setUnitSystem: (unitSystem: "metric" | "imperial") => void;
}
