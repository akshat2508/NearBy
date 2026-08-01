import { verifyToken } from "@clerk/backend";
import { env } from "#config/env.js";
import { usersService } from "#modules/users/users.service.js";
import { chatService } from "#modules/chat/chat.service.js";
import { chatRepository } from "#modules/chat/chat.repository.js";
import { serializeMessage } from "#modules/chat/chat.serializer.js";
import { setIO, conversationRoom } from "#sockets/ioRegistry.js";

// Socket.io has no concept of Clerk sessions on its own, so every
// connection is authenticated by hand: the client sends its Clerk
// session token in the handshake, we verify it the same way Clerk's own
// middleware would, then resolve it to our app user exactly like the
// REST layer does via attachAppUser.
async function authenticateSocket(socket, next) {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) throw new Error("Missing auth token");

    const payload = await verifyToken(token, { secretKey: env.clerkSecretKey });
    const user = await usersService.getOrSyncCurrentUser(payload.sub);

    socket.appUser = user;
    next();
  } catch (err) {
    next(new Error("Unauthorized"));
  }
}

export function registerSockets(io) {
  setIO(io);
  io.use(authenticateSocket);

  io.on("connection", async (socket) => {
    const { appUser } = socket;

    // Join a room per existing conversation so messages sent by either
    // side reach this socket without the client having to subscribe
    // conversation-by-conversation on load.
    const conversations = await chatRepository.listConversationsForUser(appUser.id);
    conversations.forEach((conversation) => socket.join(conversationRoom(conversation.id)));

    socket.on("conversation:join", (conversationId) => {
      socket.join(conversationRoom(conversationId));
    });

    socket.on("message:send", async ({ conversationId, content }, ack) => {
      try {
        const message = await chatService.sendMessage(appUser.id, conversationId, content);
        const serialized = serializeMessage(message);

        io.to(conversationRoom(conversationId)).emit("message:new", serialized);
        ack?.({ ok: true, message: serialized });
      } catch (err) {
        ack?.({ ok: false, error: err.message });
      }
    });
  });
}
