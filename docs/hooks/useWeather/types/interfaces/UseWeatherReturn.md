[**Feel the Day v0.0.0**](../../../../README.md)

***

[Feel the Day](../../../../README.md) / [hooks/useWeather/types](../README.md) / UseWeatherReturn

# Interface: UseWeatherReturn

Defined in: hooks/useWeather/types.ts:7

## Properties

### error

> **error**: `null` \| `Error`

Defined in: hooks/useWeather/types.ts:14

***

### fetchAllWeather()

> **fetchAllWeather**: (`showLoading?`) => `Promise`\<`void`\>

Defined in: hooks/useWeather/types.ts:8

#### Parameters

##### showLoading?

`boolean`

#### Returns

`Promise`\<`void`\>

***

### isLoading

> **isLoading**: `boolean`

Defined in: hooks/useWeather/types.ts:12

***

### isOverviewLoading

> **isOverviewLoading**: `boolean`

Defined in: hooks/useWeather/types.ts:13

***

### overviewData

> **overviewData**: `null` \| [`OverviewResponse`](../../../../types/api/openWeather/overview/interfaces/OverviewResponse.md)

Defined in: hooks/useWeather/types.ts:10

***

### weatherData

> **weatherData**: `null` \| [`OneCallWeatherResponse`](../../../../types/api/openWeather/oneCall/interfaces/OneCallWeatherResponse.md)

Defined in: hooks/useWeather/types.ts:9

***

### yesterdayWeatherData

> **yesterdayWeatherData**: `null` \| [`TimemachineResponse`](../../../../types/api/openWeather/timemachine/interfaces/TimemachineResponse.md)

Defined in: hooks/useWeather/types.ts:11
