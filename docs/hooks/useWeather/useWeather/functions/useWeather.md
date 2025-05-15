[**Feel the Day v0.0.0**](../../../../README.md)

***

[Feel the Day](../../../../README.md) / [hooks/useWeather/useWeather](../README.md) / useWeather

# Function: useWeather()

> **useWeather**(`coordinates`, `unitSystem`): [`UseWeatherReturn`](../../types/interfaces/UseWeatherReturn.md)

Defined in: [hooks/useWeather/useWeather.ts:53](https://github.com/HyeinKang/feel-the-day/blob/6b0d3fb3bda5bce2accd42bfbaa4c5a46f07891e/src/hooks/useWeather/useWeather.ts#L53)

useWeather

Fetches and provides current, past, and overview weather data.

## Parameters

### coordinates

User's location coordinates

`null` | [`Coordinates`](../../../../types/coordinates/interfaces/Coordinates.md)

### unitSystem

[`UnitSystem`](../../../../types/unit/type-aliases/UnitSystem.md)

'metric' or 'imperial'

## Returns

[`UseWeatherReturn`](../../types/interfaces/UseWeatherReturn.md)

Weather data objects and loading/error states
