import { prisma } from "#database/prisma.js";
import { orderPair } from "#utils/pairKey.js";

export const friendsRepository = {
  findPendingRequestBetween(userAId, userBId) {
    return prisma.friendRequest.findFirst({
      where: {
        status: "PENDING",
        OR: [
          { senderId: userAId, receiverId: userBId },
          { senderId: userBId, receiverId: userAId },
        ],
      },
    });
  },

  createRequest(senderId, receiverId) {
    return prisma.friendRequest.create({
      data: { senderId, receiverId },
    });
  },

  findRequestById(requestId) {
    return prisma.friendRequest.findUnique({ where: { id: requestId } });
  },

  updateRequestStatus(requestId, status) {
    return prisma.friendRequest.update({ where: { id: requestId }, data: { status } });
  },

  deleteRequest(requestId) {
    return prisma.friendRequest.delete({ where: { id: requestId } });
  },

  listIncomingPending(userId) {
    return prisma.friendRequest.findMany({
      where: { receiverId: userId, status: "PENDING" },
      include: { sender: true },
      orderBy: { createdAt: "desc" },
    });
  },

  listOutgoingPending(userId) {
    return prisma.friendRequest.findMany({
      where: { senderId: userId, status: "PENDING" },
      include: { receiver: true },
      orderBy: { createdAt: "desc" },
    });
  },

  findFriendship(userOneId, userTwoId) {
    const [userAId, userBId] = orderPair(userOneId, userTwoId);
    return prisma.friendship.findUnique({ where: { userAId_userBId: { userAId, userBId } } });
  },

  createFriendship(userOneId, userTwoId) {
    const [userAId, userBId] = orderPair(userOneId, userTwoId);
    return prisma.friendship.create({ data: { userAId, userBId } });
  },

  deleteFriendship(userOneId, userTwoId) {
    const [userAId, userBId] = orderPair(userOneId, userTwoId);
    return prisma.friendship.delete({ where: { userAId_userBId: { userAId, userBId } } });
  },

  listFriendships(userId) {
    return prisma.friendship.findMany({
      where: { OR: [{ userAId: userId }, { userBId: userId }] },
      include: { userA: true, userB: true },
      orderBy: { createdAt: "desc" },
    });
  },

  // All friendships + pending requests touching any of `userIds`, from
  // `userId`'s perspective — used to build a status map in one query
  // instead of N+1 lookups per discovery result.
  listFriendshipsInvolving(userId, userIds) {
    return prisma.friendship.findMany({
      where: {
        OR: [
          { userAId: userId, userBId: { in: userIds } },
          { userBId: userId, userAId: { in: userIds } },
        ],
      },
    });
  },

  listPendingRequestsInvolving(userId, userIds) {
    return prisma.friendRequest.findMany({
      where: {
        status: "PENDING",
        OR: [
          { senderId: userId, receiverId: { in: userIds } },
          { receiverId: userId, senderId: { in: userIds } },
        ],
      },
    });
  },
};
