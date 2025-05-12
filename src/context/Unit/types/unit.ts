import {
  type UnitSystem,
  type TemperatureUnit,
  type WindSpeedUnit,
} from "@/types";

export interface UnitContextType {
  unitSystem: UnitSystem;
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  setUnitSystem: (unitSystem: UnitSystem) => void;
}
