import { haversineDistanceKm } from "#algorithms/distance.js";

const RECENCY_HALF_LIFE_HOURS = 12;

function recencyScore(lastActiveAt) {
  if (!lastActiveAt) return 0;
  const hoursSinceActive = (Date.now() - new Date(lastActiveAt).getTime()) / 36e5;
  // Exponential decay: fully-active users score close to 1, users who
  // haven't been seen in a while decay toward 0 without ever excluding them.
  return Math.pow(0.5, hoursSinceActive / RECENCY_HALF_LIFE_HOURS);
}

// Nearby ranking = mostly distance (closer wins) with a secondary boost
// for people who have been active recently, so two users equidistant
// away don't feel arbitrarily ordered.
function rankScore(distanceKm) {
  return 1 / (1 + distanceKm);
}

// Attaches distanceKm to each candidate and returns them sorted by
// composite score, descending (best match first).
export function rankNearbyUsers(currentUser, candidates) {
  return candidates
    .map((candidate) => {
      const distanceKm = haversineDistanceKm(
        currentUser.latitude,
        currentUser.longitude,
        candidate.latitude,
        candidate.longitude
      );
      const score = rankScore(distanceKm) * 0.85 + recencyScore(candidate.lastActiveAt) * 0.15;
      return { ...candidate, distanceKm, score };
    })
    .sort((a, b) => b.score - a.score);
}
