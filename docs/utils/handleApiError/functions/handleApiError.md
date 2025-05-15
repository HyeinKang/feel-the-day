[**Feel the Day v0.0.0**](../../../README.md)

***

[Feel the Day](../../../README.md) / [utils/handleApiError](../README.md) / handleApiError

# Function: handleApiError()

> **handleApiError**(`error`): `Error` \| `"cancel"`

Defined in: [utils/handleApiError.ts:8](https://github.com/HyeinKang/feel-the-day/blob/8289c79f2741a9407fd7ce6a81056ae02e4eeed7/src/utils/handleApiError.ts#L8)

Centralized error handler for API-related catches.
- Throws cancellation separately
- Returns a clean Error instance otherwise

## Parameters

### error

`unknown`

## Returns

`Error` \| `"cancel"`
