import { prisma } from "#database/prisma.js";
import { orderPair } from "#utils/pairKey.js";

export const chatRepository = {
  findConversation(userOneId, userTwoId) {
    const [userAId, userBId] = orderPair(userOneId, userTwoId);
    return prisma.conversation.findUnique({ where: { userAId_userBId: { userAId, userBId } } });
  },

  createConversation(userOneId, userTwoId) {
    const [userAId, userBId] = orderPair(userOneId, userTwoId);
    return prisma.conversation.create({ data: { userAId, userBId } });
  },

  listConversationsForUser(userId) {
    return prisma.conversation.findMany({
      where: { OR: [{ userAId: userId }, { userBId: userId }] },
      include: {
        userA: true,
        userB: true,
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
      },
      orderBy: [{ lastMessageAt: "desc" }, { createdAt: "desc" }],
    });
  },

  findConversationById(conversationId) {
    return prisma.conversation.findUnique({ where: { id: conversationId } });
  },

  listMessages(conversationId, { cursor, limit }) {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "desc" },
      take: limit,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    });
  },

  createMessage({ conversationId, senderId, content }) {
    return prisma.message.create({
      data: { conversationId, senderId, content },
      include: { sender: true },
    });
  },

  touchLastMessageAt(conversationId, when) {
    return prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: when },
    });
  },
};
