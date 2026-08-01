import { friendsService } from "#modules/friends/friends.service.js";
import { sendRequestSchema } from "#modules/friends/friends.validation.js";
import { serializePublicUser } from "#modules/users/users.serializer.js";

export const friendsController = {
  async sendRequest(req, res) {
    const { receiverId } = sendRequestSchema.parse(req.body);
    const result = await friendsService.sendRequest(req.user.id, receiverId);
    res.status(201).json(result);
  },

  async listRequests(req, res) {
    const { incoming, outgoing } = await friendsService.listRequests(req.user.id);
    res.json({
      incoming: incoming.map((r) => ({
        id: r.id,
        createdAt: r.createdAt,
        user: serializePublicUser(r.sender),
      })),
      outgoing: outgoing.map((r) => ({
        id: r.id,
        createdAt: r.createdAt,
        user: serializePublicUser(r.receiver),
      })),
    });
  },

  async acceptRequest(req, res) {
    const friendship = await friendsService.acceptRequest(req.user.id, req.params.requestId);
    res.json(friendship);
  },

  async rejectRequest(req, res) {
    const result = await friendsService.rejectRequest(req.user.id, req.params.requestId);
    res.json(result);
  },

  async listFriends(req, res) {
    const friends = await friendsService.listFriends(req.user.id);
    res.json(friends.map(serializePublicUser));
  },

  async removeFriend(req, res) {
    const result = await friendsService.removeFriend(req.user.id, req.params.userId);
    res.json(result);
  },
};
