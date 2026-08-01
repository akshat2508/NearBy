// Tiny singleton so REST controllers (which don't have direct access to
// the Socket.io server instance) can still broadcast events created via
// HTTP — e.g. a message sent through the REST fallback still reaches the
// recipient's open socket connection in real time.
let ioInstance = null;

export function setIO(io) {
  ioInstance = io;
}

export function getIO() {
  return ioInstance;
}

export function conversationRoom(conversationId) {
  return `conversation:${conversationId}`;
}
