export function getGeoBox(latitude, longitude, distance) {
  const radius = 3963.189; // Earth's radius in miles
  const lat = (Math.PI / 180.0) * latitude;
  const lon = (Math.PI / 180.0) * longitude;
  const halfSide = distance / 2;

  // Calculate the northmost latitude and southmost latitude
  const latMin = lat - halfSide / radius;
  const latMax = lat + halfSide / radius;

  // Calculate the eastmost longitude and westmost longitude
  const lonDelta = Math.asin(Math.sin(halfSide / radius) / Math.cos(lat));
  const lonWest = lon - lonDelta;
  const lonEast = lon + lonDelta;

  // Convert back to degrees
  const latMinDeg = (latMin * 180.0) / Math.PI;
  const lonWestDeg = (lonWest * 180.0) / Math.PI;
  const latMaxDeg = (latMax * 180.0) / Math.PI;
  const lonEastDeg = (lonEast * 180.0) / Math.PI;

  return [latMaxDeg, lonWestDeg, latMinDeg, lonEastDeg];
}
