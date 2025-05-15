[**Feel the Day v0.0.0**](../../../../README.md)

***

[Feel the Day](../../../../README.md) / [hooks/useWeather/types](../README.md) / UseWeatherReturn

# Interface: UseWeatherReturn

Defined in: [hooks/useWeather/types.ts:7](https://github.com/HyeinKang/feel-the-day/blob/6b0d3fb3bda5bce2accd42bfbaa4c5a46f07891e/src/hooks/useWeather/types.ts#L7)

## Properties

### error

> **error**: `null` \| `Error`

Defined in: [hooks/useWeather/types.ts:14](https://github.com/HyeinKang/feel-the-day/blob/6b0d3fb3bda5bce2accd42bfbaa4c5a46f07891e/src/hooks/useWeather/types.ts#L14)

***

### fetchAllWeather()

> **fetchAllWeather**: (`showLoading?`) => `Promise`\<`void`\>

Defined in: [hooks/useWeather/types.ts:8](https://github.com/HyeinKang/feel-the-day/blob/6b0d3fb3bda5bce2accd42bfbaa4c5a46f07891e/src/hooks/useWeather/types.ts#L8)

#### Parameters

##### showLoading?

`boolean`

#### Returns

`Promise`\<`void`\>

***

### isLoading

> **isLoading**: `boolean`

Defined in: [hooks/useWeather/types.ts:12](https://github.com/HyeinKang/feel-the-day/blob/6b0d3fb3bda5bce2accd42bfbaa4c5a46f07891e/src/hooks/useWeather/types.ts#L12)

***

### isOverviewLoading

> **isOverviewLoading**: `boolean`

Defined in: [hooks/useWeather/types.ts:13](https://github.com/HyeinKang/feel-the-day/blob/6b0d3fb3bda5bce2accd42bfbaa4c5a46f07891e/src/hooks/useWeather/types.ts#L13)

***

### overviewData

> **overviewData**: `null` \| [`OverviewResponse`](../../../../types/api/openWeather/overview/interfaces/OverviewResponse.md)

Defined in: [hooks/useWeather/types.ts:10](https://github.com/HyeinKang/feel-the-day/blob/6b0d3fb3bda5bce2accd42bfbaa4c5a46f07891e/src/hooks/useWeather/types.ts#L10)

***

### weatherData

> **weatherData**: `null` \| [`OneCallWeatherResponse`](../../../../types/api/openWeather/oneCall/interfaces/OneCallWeatherResponse.md)

Defined in: [hooks/useWeather/types.ts:9](https://github.com/HyeinKang/feel-the-day/blob/6b0d3fb3bda5bce2accd42bfbaa4c5a46f07891e/src/hooks/useWeather/types.ts#L9)

***

### yesterdayWeatherData

> **yesterdayWeatherData**: `null` \| [`TimemachineResponse`](../../../../types/api/openWeather/timemachine/interfaces/TimemachineResponse.md)

Defined in: [hooks/useWeather/types.ts:11](https://github.com/HyeinKang/feel-the-day/blob/6b0d3fb3bda5bce2accd42bfbaa4c5a46f07891e/src/hooks/useWeather/types.ts#L11)
