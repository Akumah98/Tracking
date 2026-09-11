export function generateCurvedArc(
  start: [number, number],
  end: [number, number],
  numPoints: number = 40
): [number, number][] {
  const [lat1, lng1] = start;
  const [lat2, lng2] = end;

  const midLat = (lat1 + lat2) / 2;
  const midLng = (lng1 + lng2) / 2;

  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;
  const dist = Math.sqrt(dLat * dLat + dLng * dLng);

  // Dynamically adjust curvature:
  // - Short distances (city-to-city, dist < 8): subtle gentle curve (0.04)
  // - Long haul (continental/transoceanic, dist >= 8): aviation arc (0.14)
  const arcFactor = dist < 8 ? 0.04 : 0.14;

  const normalLat = -dLng / (dist || 1);
  const normalLng = dLat / (dist || 1);

  const curvature = dist * arcFactor;
  const ctrlLat = midLat + Math.abs(normalLat * curvature) * (lat1 >= 0 ? 1 : -1);
  const ctrlLng = midLng + normalLng * curvature * 0.4;

  const points: [number, number][] = [];

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const invT = 1 - t;

    const lat = invT * invT * lat1 + 2 * invT * t * ctrlLat + t * t * lat2;
    const lng = invT * invT * lng1 + 2 * invT * t * ctrlLng + t * t * lng2;

    points.push([lat, lng]);
  }

  return points;
}
