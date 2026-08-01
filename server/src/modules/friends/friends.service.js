import { friendsRepository } from "#modules/friends/friends.repository.js";
import { usersRepository } from "#modules/users/users.repository.js";
import { httpError } from "#utils/httpError.js";

export const friendsService = {
  async sendRequest(senderId, receiverId) {
    if (senderId === receiverId) {
      throw httpError(400, "You can't send yourself a friend request");
    }

    const receiver = await usersRepository.findById(receiverId);
    if (!receiver) throw httpError(404, "User not found");

    const existingFriendship = await friendsRepository.findFriendship(senderId, receiverId);
    if (existingFriendship) throw httpError(409, "You're already friends");

    const pending = await friendsRepository.findPendingRequestBetween(senderId, receiverId);
    if (pending) {
      // If the other person already sent us a request, sending one back
      // is a natural "accept" rather than a duplicate — no need to make
      // the user find the right button in the requests tab.
      if (pending.senderId === receiverId) {
        return this.acceptRequest(senderId, pending.id);
      }
      throw httpError(409, "Friend request already pending");
    }

    return friendsRepository.createRequest(senderId, receiverId);
  },

  async listRequests(userId) {
    const [incoming, outgoing] = await Promise.all([
      friendsRepository.listIncomingPending(userId),
      friendsRepository.listOutgoingPending(userId),
    ]);
    return { incoming, outgoing };
  },

  async acceptRequest(userId, requestId) {
    const request = await friendsRepository.findRequestById(requestId);
    if (!request || request.receiverId !== userId || request.status !== "PENDING") {
      throw httpError(404, "Friend request not found");
    }

    await friendsRepository.updateRequestStatus(requestId, "ACCEPTED");
    return friendsRepository.createFriendship(request.senderId, request.receiverId);
  },

  async rejectRequest(userId, requestId) {
    const request = await friendsRepository.findRequestById(requestId);
    if (!request || request.receiverId !== userId || request.status !== "PENDING") {
      throw httpError(404, "Friend request not found");
    }

    // Delete rather than mark REJECTED so either side can send a fresh
    // request later without hitting the unique constraint.
    await friendsRepository.deleteRequest(requestId);
    return { ok: true };
  },

  async listFriends(userId) {
    const friendships = await friendsRepository.listFriendships(userId);
    return friendships.map((f) => (f.userAId === userId ? f.userB : f.userA));
  },

  async removeFriend(userId, otherUserId) {
    const friendship = await friendsRepository.findFriendship(userId, otherUserId);
    if (!friendship) throw httpError(404, "Not friends with this user");
    await friendsRepository.deleteFriendship(userId, otherUserId);
    return { ok: true };
  },

  // Builds { [otherUserId]: "friends" | "pending_sent" | "pending_received" | "none" }
  // for a batch of candidate ids, relative to userId. Used by discovery so
  // each nearby card can render the right action.
  async getStatusMap(userId, candidateIds) {
    if (candidateIds.length === 0) return {};

    const [friendships, pendingRequests] = await Promise.all([
      friendsRepository.listFriendshipsInvolving(userId, candidateIds),
      friendsRepository.listPendingRequestsInvolving(userId, candidateIds),
    ]);

    const statusMap = Object.fromEntries(candidateIds.map((id) => [id, "none"]));

    for (const friendship of friendships) {
      const otherId = friendship.userAId === userId ? friendship.userBId : friendship.userAId;
      statusMap[otherId] = "friends";
    }

    for (const request of pendingRequests) {
      const otherId = request.senderId === userId ? request.receiverId : request.senderId;
      if (statusMap[otherId] === "friends") continue;
      statusMap[otherId] = request.senderId === userId ? "pending_sent" : "pending_received";
    }

    return statusMap;
  },
};
