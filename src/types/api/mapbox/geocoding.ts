/**
 * Represents a single feature result returned by the Mapbox Geocoding API.
 */
export interface GeocodingFeature {
  place_type: string[];
  text: string;
}

export interface GeocodingResponse {
  features: GeocodingFeature[];
}
