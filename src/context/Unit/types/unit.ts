export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "mps" | "mph"; // meters/sec or miles/hour

export interface UnitContextType {
  unitSystem: "metric" | "imperial";
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  setUnitSystem: (unitSystem: "metric" | "imperial") => void;
}
