# 🌤️ Feel the Day

**🚀 A weather app that helps you _feel the day_ by comparing today’s temperature to yesterday’s.**
Instead of just number, it gives you an intuitive sense of how the day feels — so you can decide what to wear without overthinking.

We make weather-based decisions every day — but numbers alone don’t help us decide what to wear.
“Feel the Day” closes that gap by grounding weather in personal experience. You know what yesterday felt like — now you can use that to sense today.

> You remember how yesterday felt — now you know how today compares.

---

## ✨ Key Features

- 🔁 **Daily Weather Comparison**
  Instantly compare Yesterday → Today → Tomorrow → Day After Tomorrow to sense the temperature trend across days.

- 📆 **Weather Trend Forecast**
  See today’s weather broken down hour-by-hour, adjusted to your local timezone.

- 🌡️ **Actual vs. Feels Like Temperatures**
  Understand the _real_ feel of the weather, not just the raw numbers.

- 📍 **Interactive Location Detection and Reverse Geocoding**
  Detects your location automatically or lets you manually search/move the map, then uses Mapbox Reverse Geocoding API to display a readable city/country.

- 🎹 **Keyboard Navigation and Shortcuts**
    - Press `/` to instantly focus on the search input.
    - Press `ESC` to close weather details or cancel searches quickly.

- 🎨 **Clean, Minimal Interface**
  Designed for instant clarity — no clutter, just feel-based weather insights.

- ♿ **Accessibility First**
  Dark/light mode toggle, full keyboard navigation, and semantic HTML for screen readers.

- ⚙️ **User Preferences**
  Switch easily between Metric(Celsius, mps) and Imperial(Fahrenheit, mph) — settings are saved automatically (Local Storage).

- 🔄 **Automatic Refresh**
  Weather data refreshes every minute for live and reliable insights.

---

## 🛠️ Tech Stack

- **Frontend**: React / TypeScript
- **API**: OpenWeatherMap (OneCall, Geocoding, Timemachine), Mapbox Reverse Geocode API (for location display)
- **Styling**: Tailwind
- **Build**: Vite

---

## 📦 Getting Started

```bash
git clone https://github.com/HyeinKang/feel-the-day.git
cd feel-the-day
touch .env
npm install
npm run dev
```

---

## 🛠️ Future Expansions

- 📈 Add a Graph for Weather Trends
- 🌐 Multi-language support
- 🌍 Save favorite locations
- 👚 Clothing recommendations based on temperature shifts
- ✅ Add unit and integration tests
- ⚙️ Apply SSR

---

## ✨ Contributor
- **Hyein Kang (@HyeinKang)**
