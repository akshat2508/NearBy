import { usersService } from "#modules/users/users.service.js";
import { updateProfileSchema } from "#modules/users/users.validation.js";
import { serializeSelf } from "#modules/users/users.serializer.js";

export const usersController = {
  getCurrentUser(req, res) {
    res.json(serializeSelf(req.user));
  },

  async updateCurrentUser(req, res) {
    const data = updateProfileSchema.parse(req.body);
    const updated = await usersService.updateProfile(req.user.id, data);
    res.json(serializeSelf(updated));
  },
};
