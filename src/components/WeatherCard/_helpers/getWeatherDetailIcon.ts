import {
  Droplet,
  DropletOff,
  Droplets,
  Sun,
  SunDim,
  SunMedium,
  Wind,
} from "lucide-react";

interface IconMapEntry {
  default: React.ElementType;
  low?: React.ElementType;
  medium?: React.ElementType;
  high?: React.ElementType;
  iconAlt: string;
}

const iconMap: Record<string, IconMapEntry> = {
  wind_speed: {
    default: Wind,
    iconAlt: "Wind speed",
  },
  humidity: {
    default: Droplets,
    low: DropletOff,
    medium: Droplet,
    high: Droplets,
    iconAlt: "Humidity",
  },
  uvi: {
    default: Sun,
    low: SunDim,
    medium: SunMedium,
    high: Sun,
    iconAlt: "UV index",
  },
};

export function getWeatherDetailIcon(key: string, value: number) {
  const entry = iconMap[key];
  let IconComponent = entry.default;

  if (value < 30 && entry.low) {
    IconComponent = entry.low;
  } else if (value >= 30 && value < 70 && entry.medium) {
    IconComponent = entry.medium;
  } else if (value >= 70 && entry.high) {
    IconComponent = entry.high;
  }

  return {
    IconComponent,
    alt: entry.iconAlt,
  };
}
