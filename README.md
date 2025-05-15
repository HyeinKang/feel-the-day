# 🌤️ Feel the Day

[🌐 Live Demo](https://feel-the-day.vercel.app/)

> **A weather app that helps you *feel the day* — comparing today’s temperature with yesterday’s to guide daily decisions intuitively.**

We make weather-based decisions every day — but numbers alone don’t always help.  
**Feel the Day** grounds weather in your personal experience:  
You know how yesterday felt — now you can sense today.

---

## 📋 Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Component & API Docs](#component--api-docs)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [License & Author](#license)

---

## ✨ Key Features

- 🔁 **Daily Weather Comparison**  
  Instantly sense how Yesterday → Today → Tomorrow → Day After Tomorrow evolve.
- 📆 **Hourly Weather Forecast**  
  Today’s weather broken down hour-by-hour, adjusted to your timezone.
- 🌡️ **Actual vs. Feels Like Temperatures**  
  Understand how the weather *truly* feels, not just numbers.
- 📍 **Interactive Location Search & Detection**  
  Mapbox Reverse Geocoding API integrated for automatic or manual search.
- 🎹 **Keyboard Shortcuts**  
  - Press `/` to focus the search bar
  - Press `ESC` to close panels
- 🎨 **Minimal, Accessible Design**  
  Light/dark mode, keyboard navigation, semantic HTML.
- ⚙️ **User Preferences (Unit System)**  
  Seamlessly switch between Metric and Imperial — preferences saved automatically.
- 🔄 **Live Data Refresh**  
  Weather auto-refreshes every minute.

---

## ⚙️ Tech Stack

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **APIs**: OpenWeather OneCall, Mapbox Reverse Geocoding
- **Testing**: Vitest + React Testing Library

---

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/HyeinKang/feel-the-day.git
cd feel-the-day
touch .env
npm install
npm run dev
```

**Note:**  
Remember to set up your API keys (OpenWeather, Mapbox) in `.env`.

---

## 🗂️ Project Structure

```plaintext
/src
 ├─ api/           # OpenWeather and Mapbox API wrappers
 ├─ components/    # UI components (Button, WeatherCard, etc.)
 ├─ contexts/       # React Context providers (Theme, Unit, Coordinates)
 ├─ hooks/         # Custom hooks (useWeather, useMapbox helpers)
 ├─ pages/         # Main pages (Main.tsx)
 ├─ types/         # Global TypeScript types and API models
 ├─ utils/         # Small utility functions (formatting, error handling)
 └─ assets/        # Images, styles, and screenshots
```

---

## 📚 Component & API Docs

All components, context providers, hooks, and utilities are documented automatically using TypeDoc.

- 📦 Source code organized into `/components`, `/contexts`, `/hooks`, `/utils`, and `/types`.
- 📄 Full auto-generated documentation available inside the `/docs` folder.

### Quick Overview

| Area | Folder | Example |
|:---|:---|:---|
| 🧩 UI Components | `src/components/` | `Button`, `DarkModeSwitch`, `WeatherCard` |
| 🌐 API Helpers | `src/api/` | `fetchWeatherByCoordinates`, `reverseGeocode` |
| 📦 Context Providers | `src/contexts/` | `ThemeProvider`, `UnitProvider`, `CoordinatesProvider` |
| 🪝 Custom Hooks | `src/hooks/` | `useWeather`, `useTheme`, `useCoordinates` |
| 🧹 Utilities | `src/utils/` | `handleApiError` |

### 📖 How to View Docs

- Open the `/docs` folder locally
- Or run a local static server:

```bash
npx serve ./docs
```

and visit `http://localhost:3000`.
Or simply visit [GitHub Page](https://hyeinkang.github.io/feel-the-day).

---

## 🧪 Testing Overview

- 🧩 **Context Providers** (CoordinatesProvider): Initialization, Success Path, Error Path, Reset
- 🎛 **Component Unit Tests** (DarkModeSwitch): Render Variants, Click Behavior
- ⏲ **Timer Utilities** (scheduleNextMinuteFetch): Periodic Fetching & Cleanup
- 🔗 **Integration Tests** (ThemeProvider + DarkModeSwitch): DOM Attribute Sync, LocalStorage Persistence

---

## 🛣️ Roadmap

- 📈 Add a Graph for Weather Trends
- 🌐 Multi-Language Support
- 🌍 Save Favorite Locations
- 👚 Outfit Recommendations Based on Weather
- ⚙️ Enable SSR (Server-Side Rendering)

---

## 📜 License & Author

MIT License © [Hyein Kang](https://github.com/HyeinKang)
