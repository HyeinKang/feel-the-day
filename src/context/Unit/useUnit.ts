import { useContext } from "react";
import { UnitContext, type UnitContextType } from "./";
/**
 * useUnit
 *
 * Custom hook to consume the UnitContext easily.
 *
 * @returns {UnitContextValue} Current unit system and setter
 * @throws {Error} If used outside of UnitProvider
 */
export const useUnit = (): UnitContextType => {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error("useUnit must be used within a UnitProvider");
  }
  return context;
};
