import { chatService } from "#modules/chat/chat.service.js";
import {
  createConversationSchema,
  sendMessageSchema,
  listMessagesQuerySchema,
} from "#modules/chat/chat.validation.js";
import { serializeConversation, serializeMessage } from "#modules/chat/chat.serializer.js";
import { getIO, conversationRoom } from "#sockets/ioRegistry.js";

export const chatController = {
  async listConversations(req, res) {
    const conversations = await chatService.listConversations(req.user.id);
    res.json(conversations.map(serializeConversation));
  },

  async createConversation(req, res) {
    const { friendId } = createConversationSchema.parse(req.body);
    const conversation = await chatService.getOrCreateConversation(req.user.id, friendId);
    res.status(201).json(conversation);
  },

  async listMessages(req, res) {
    const pagination = listMessagesQuerySchema.parse(req.query);
    const messages = await chatService.listMessages(req.user.id, req.params.conversationId, pagination);
    res.json(messages.map(serializeMessage));
  },

  async sendMessage(req, res) {
    const { content } = sendMessageSchema.parse(req.body);
    const message = await chatService.sendMessage(req.user.id, req.params.conversationId, content);
    const serialized = serializeMessage(message);

    getIO()?.to(conversationRoom(req.params.conversationId)).emit("message:new", serialized);

    res.status(201).json(serialized);
  },
};
