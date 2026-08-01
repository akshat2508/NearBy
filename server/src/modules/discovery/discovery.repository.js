import { prisma } from "#database/prisma.js";

export const discoveryRepository = {
  findDiscoverableByGeohashPrefixes(prefixes, excludeUserId) {
    return prisma.user.findMany({
      where: {
        id: { not: excludeUserId },
        isDiscoverable: true,
        latitude: { not: null },
        longitude: { not: null },
        OR: prefixes.map((prefix) => ({ geohash: { startsWith: prefix } })),
      },
    });
  },
};
