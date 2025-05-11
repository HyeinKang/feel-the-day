interface GeocodingFeature {
  place_type: string[];
  text: string;
}

interface GeocodingResponse {
  features: GeocodingFeature[];
}

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<string | null> {
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng.toString()},${lat.toString()}.json?access_token=${accessToken}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to reverse geocode");
  }

  const data = (await res.json()) as GeocodingResponse;

  const place = data.features.find(
    (feature) =>
      feature.place_type.includes("place") ||
      feature.place_type.includes("locality") ||
      feature.place_type.includes("region"),
  );

  return place ? place.text : null;
}
