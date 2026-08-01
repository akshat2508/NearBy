import { encodeGeohash, getNeighbors, pickPrecisionForRadiusKm } from "#algorithms/geohash.js";
import { rankNearbyUsers } from "#algorithms/ranking.js";
import { discoveryRepository } from "#modules/discovery/discovery.repository.js";
import { usersRepository } from "#modules/users/users.repository.js";
import { friendsService } from "#modules/friends/friends.service.js";
import { httpError } from "#utils/httpError.js";

export const discoveryService = {
  async updateLocation(userId, { latitude, longitude, isDiscoverable }) {
    const geohash = encodeGeohash(latitude, longitude);
    return usersRepository.updateLocation(userId, {
      latitude,
      longitude,
      geohash,
      lastActiveAt: new Date(),
      ...(isDiscoverable !== undefined ? { isDiscoverable } : {}),
    });
  },

  async setVisibility(userId, isDiscoverable) {
    return usersRepository.updateDiscoverability(userId, isDiscoverable);
  },

  async findNearby(userId, radiusKm) {
    const currentUser = await usersRepository.findById(userId);
    if (!currentUser?.latitude || !currentUser?.longitude) {
      throw httpError(400, "Share your location before browsing nearby people");
    }

    const precision = pickPrecisionForRadiusKm(radiusKm);
    const cellHash = encodeGeohash(currentUser.latitude, currentUser.longitude, precision);
    const searchPrefixes = [cellHash, ...Object.values(getNeighbors(cellHash))];

    const candidates = await discoveryRepository.findDiscoverableByGeohashPrefixes(
      searchPrefixes,
      userId
    );

    const ranked = rankNearbyUsers(currentUser, candidates).filter(
      (candidate) => candidate.distanceKm <= radiusKm
    );

    const statusMap = await friendsService.getStatusMap(userId, ranked.map((u) => u.id));

    return ranked.map((candidate) => ({
      id: candidate.id,
      fullName: candidate.fullName,
      avatarUrl: candidate.avatarUrl,
      bio: candidate.bio,
      latitude: candidate.latitude,
      longitude: candidate.longitude,
      distanceKm: Math.round(candidate.distanceKm * 10) / 10,
      lastActiveAt: candidate.lastActiveAt,
      friendStatus: statusMap[candidate.id] ?? "none",
    }));
  },
};
