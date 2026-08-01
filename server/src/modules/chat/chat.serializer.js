import { serializePublicUser } from "#modules/users/users.serializer.js";

export function serializeMessage(message) {
  return {
    id: message.id,
    conversationId: message.conversationId,
    content: message.content,
    createdAt: message.createdAt,
    sender: message.sender ? serializePublicUser(message.sender) : { id: message.senderId },
  };
}

export function serializeConversation(conversation) {
  return {
    id: conversation.id,
    otherUser: serializePublicUser(conversation.otherUser),
    lastMessage: conversation.lastMessage ? serializeMessage(conversation.lastMessage) : null,
    lastMessageAt: conversation.lastMessageAt,
  };
}
