import { prisma } from "#database/prisma.js";

export const usersRepository = {
  findByClerkId(clerkId) {
    return prisma.user.findUnique({ where: { clerkId } });
  },

  findById(id) {
    return prisma.user.findUnique({ where: { id } });
  },

  findManyByIds(ids) {
    return prisma.user.findMany({ where: { id: { in: ids } } });
  },

  upsertByClerkId(data) {
    return prisma.user.upsert({
      where: { clerkId: data.clerkId },
      update: {
        email: data.email,
        fullName: data.fullName ?? null,
        avatarUrl: data.avatarUrl ?? null,
      },
      create: data,
    });
  },

  updateProfile(id, data) {
    return prisma.user.update({ where: { id }, data });
  },

  updateLocation(id, data) {
    return prisma.user.update({ where: { id }, data });
  },

  updateDiscoverability(id, isDiscoverable) {
    return prisma.user.update({ where: { id }, data: { isDiscoverable } });
  },
};
