import React, { useEffect, useState } from "react";
import {
  UnitContext,
  type TemperatureUnit,
  type WindSpeedUnit,
} from "@/context/Unit";

export const UnitProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("°C");
  const [windSpeedUnit, setWindSpeedUnit] = useState<WindSpeedUnit>("mps");

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
