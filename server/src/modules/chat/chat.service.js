import { chatRepository } from "#modules/chat/chat.repository.js";
import { friendsRepository } from "#modules/friends/friends.repository.js";
import { httpError } from "#utils/httpError.js";

async function assertFriends(userOneId, userTwoId) {
  const friendship = await friendsRepository.findFriendship(userOneId, userTwoId);
  if (!friendship) throw httpError(403, "You can only message friends");
}

async function assertParticipant(userId, conversationId) {
  const conversation = await chatRepository.findConversationById(conversationId);
  if (!conversation || (conversation.userAId !== userId && conversation.userBId !== userId)) {
    throw httpError(404, "Conversation not found");
  }
  return conversation;
}

export const chatService = {
  async getOrCreateConversation(userId, friendId) {
    await assertFriends(userId, friendId);

    const existing = await chatRepository.findConversation(userId, friendId);
    if (existing) return existing;

    return chatRepository.createConversation(userId, friendId);
  },

  async listConversations(userId) {
    const conversations = await chatRepository.listConversationsForUser(userId);
    return conversations.map((conversation) => {
      const otherUser = conversation.userAId === userId ? conversation.userB : conversation.userA;
      const [lastMessage] = conversation.messages;
      return {
        id: conversation.id,
        otherUser,
        lastMessage: lastMessage ?? null,
        lastMessageAt: conversation.lastMessageAt,
      };
    });
  },

  async listMessages(userId, conversationId, pagination) {
    await assertParticipant(userId, conversationId);
    const messages = await chatRepository.listMessages(conversationId, pagination);
    return messages.reverse();
  },

  async sendMessage(userId, conversationId, content) {
    await assertParticipant(userId, conversationId);
    const message = await chatRepository.createMessage({
      conversationId,
      senderId: userId,
      content,
    });
    await chatRepository.touchLastMessageAt(conversationId, message.createdAt);
    return message;
  },
};
