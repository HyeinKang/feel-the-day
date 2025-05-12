interface GeocodingFeature {
  place_type: string[];
  text: string;
}

export interface GeocodingResponse {
  features: GeocodingFeature[];
}
