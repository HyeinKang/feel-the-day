import React from "react";
import { type Theme } from "@/types";
import Button from "@/components/ui/Button";

interface DarkModeSwitchProps {
  value: Theme;
  onChange: (theme: Theme) => void;
}

const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({ value, onChange }) => (
  <Button
    value={value === "light" ? "View in Dark" : "View in Light"}
    role="switch"
    ariaLabel="Switch Dark/Light mode"
    onClick={() => {
      onChange(value === "light" ? "dark" : "light");
    }}
  />
);

export default DarkModeSwitch;
