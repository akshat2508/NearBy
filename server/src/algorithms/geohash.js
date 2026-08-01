// Self-contained geohash implementation (encode / decode / neighbors).
// No external dependency — this is the algorithm the discovery module
// is built around, so it lives here rather than behind a library.

const BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";
const BASE32_INDEX = Object.fromEntries([...BASE32].map((c, i) => [c, i]));

// Precision (string length) this app stores on every discoverable user.
// 8 chars ~= 19m x 19m cells — fine enough that prefix-matching at any
// coarser precision below is still accurate.
export const GEOHASH_STORE_PRECISION = 8;

export function encodeGeohash(latitude, longitude, precision = GEOHASH_STORE_PRECISION) {
  let latRange = [-90, 90];
  let lonRange = [-180, 180];
  let hash = "";
  let bit = 0;
  let bitsInChar = 0;
  let charIndex = 0;
  let isEvenBit = true;

  while (hash.length < precision) {
    if (isEvenBit) {
      const mid = (lonRange[0] + lonRange[1]) / 2;
      if (longitude >= mid) {
        charIndex = (charIndex << 1) + 1;
        lonRange[0] = mid;
      } else {
        charIndex = charIndex << 1;
        lonRange[1] = mid;
      }
    } else {
      const mid = (latRange[0] + latRange[1]) / 2;
      if (latitude >= mid) {
        charIndex = (charIndex << 1) + 1;
        latRange[0] = mid;
      } else {
        charIndex = charIndex << 1;
        latRange[1] = mid;
      }
    }

    isEvenBit = !isEvenBit;

    if (bitsInChar < 4) {
      bitsInChar += 1;
    } else {
      hash += BASE32[charIndex];
      bitsInChar = 0;
      charIndex = 0;
    }
    bit += 1;
  }

  return hash;
}

export function decodeGeohashBounds(geohash) {
  let latRange = [-90, 90];
  let lonRange = [-180, 180];
  let isEvenBit = true;

  for (const char of geohash) {
    const charIndex = BASE32_INDEX[char];
    if (charIndex === undefined) continue;

    for (let bit = 4; bit >= 0; bit -= 1) {
      const bitValue = (charIndex >> bit) & 1;
      if (isEvenBit) {
        const mid = (lonRange[0] + lonRange[1]) / 2;
        if (bitValue === 1) lonRange[0] = mid;
        else lonRange[1] = mid;
      } else {
        const mid = (latRange[0] + latRange[1]) / 2;
        if (bitValue === 1) latRange[0] = mid;
        else latRange[1] = mid;
      }
      isEvenBit = !isEvenBit;
    }
  }

  return {
    minLat: latRange[0],
    maxLat: latRange[1],
    minLon: lonRange[0],
    maxLon: lonRange[1],
  };
}

function centerOf(geohash) {
  const { minLat, maxLat, minLon, maxLon } = decodeGeohashBounds(geohash);
  return { lat: (minLat + maxLat) / 2, lon: (minLon + maxLon) / 2 };
}

// Returns the geohash of the cell adjacent to `geohash` in one of the 8
// compass directions, at the same precision.
function neighborInDirection(geohash, dLat, dLon) {
  const { minLat, maxLat, minLon, maxLon } = decodeGeohashBounds(geohash);
  const latStep = maxLat - minLat;
  const lonStep = maxLon - minLon;
  const { lat, lon } = centerOf(geohash);

  let nextLat = lat + dLat * latStep;
  let nextLon = lon + dLon * lonStep;

  // Clamp so we never encode an out-of-range coordinate near the poles
  // or the antimeridian.
  nextLat = Math.max(-90, Math.min(90, nextLat));
  if (nextLon > 180) nextLon -= 360;
  if (nextLon < -180) nextLon += 360;

  return encodeGeohash(nextLat, nextLon, geohash.length);
}

// The 8 cells surrounding `geohash`, keyed by compass direction.
export function getNeighbors(geohash) {
  return {
    n: neighborInDirection(geohash, 1, 0),
    ne: neighborInDirection(geohash, 1, 1),
    e: neighborInDirection(geohash, 0, 1),
    se: neighborInDirection(geohash, -1, 1),
    s: neighborInDirection(geohash, -1, 0),
    sw: neighborInDirection(geohash, -1, -1),
    w: neighborInDirection(geohash, 0, -1),
    nw: neighborInDirection(geohash, 1, -1),
  };
}

// Approximate width in km of a geohash cell at a given precision, used
// to pick the coarsest precision whose cell is still >= the requested
// search radius (so a 3x3 grid of cells fully covers the search circle).
const CELL_WIDTH_KM_BY_PRECISION = {
  1: 5000,
  2: 1250,
  3: 156,
  4: 39.1,
  5: 4.89,
  6: 1.22,
  7: 0.153,
  8: 0.0382,
};

export function pickPrecisionForRadiusKm(radiusKm) {
  const precisions = Object.keys(CELL_WIDTH_KM_BY_PRECISION)
    .map(Number)
    .sort((a, b) => a - b);

  let chosen = precisions[0];
  for (const precision of precisions) {
    if (CELL_WIDTH_KM_BY_PRECISION[precision] >= radiusKm) {
      chosen = precision;
    }
  }
  return Math.min(chosen, GEOHASH_STORE_PRECISION);
}
