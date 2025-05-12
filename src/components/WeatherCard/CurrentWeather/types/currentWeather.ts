export interface CurrentWeatherType {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  currentTemp: number;
  feelsLike: number;
  details: { key: "wind_speed" | "humidity" | "uvi"; value: number }[];
  iconUrl: string;
  today: {
    temp: {
      max: number;
      min: number;
    };
  };
}
