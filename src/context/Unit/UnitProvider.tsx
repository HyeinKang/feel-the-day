import React, { useEffect, useState } from "react";
import {
  type UnitSystem,
  type TemperatureUnit,
  type WindSpeedUnit,
} from "@/types";
import { UnitContext } from "./";

const UNIT_SYSTEM_KEY = "unitSystem";

export const UnitProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [unitSystem, setUnitSystemState] = useState<UnitSystem>("metric");
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("°C");
  const [windSpeedUnit, setWindSpeedUnit] = useState<WindSpeedUnit>("mps");

  const setUnitSystem = (unit: UnitSystem) => {
    setUnitSystemState(unit);
    localStorage.setItem(UNIT_SYSTEM_KEY, unit);
  };

  useEffect(() => {
    const savedUnitSystem = localStorage.getItem(
      UNIT_SYSTEM_KEY,
    ) as UnitSystem | null;
    if (savedUnitSystem === "metric" || savedUnitSystem === "imperial") {
      setUnitSystemState(savedUnitSystem);
    }
  }, []);

  useEffect(() => {
    if (unitSystem === "metric") {
      setTemperatureUnit("°C");
      setWindSpeedUnit("mps");
    } else {
      setTemperatureUnit("°F");
      setWindSpeedUnit("mph");
    }
  }, [unitSystem]);

  return (
    <UnitContext.Provider
      value={{
        unitSystem,
        setUnitSystem,
        temperatureUnit,
        windSpeedUnit,
      }}
    >
      {children}
    </UnitContext.Provider>
  );
};
