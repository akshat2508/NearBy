import { discoveryService } from "#modules/discovery/discovery.service.js";
import {
  updateLocationSchema,
  nearbyQuerySchema,
  visibilitySchema,
} from "#modules/discovery/discovery.validation.js";
import { serializeSelf } from "#modules/users/users.serializer.js";

export const discoveryController = {
  async updateLocation(req, res) {
    const data = updateLocationSchema.parse(req.body);
    const updated = await discoveryService.updateLocation(req.user.id, data);
    res.json(serializeSelf(updated));
  },

  async updateVisibility(req, res) {
    const { isDiscoverable } = visibilitySchema.parse(req.body);
    const updated = await discoveryService.setVisibility(req.user.id, isDiscoverable);
    res.json(serializeSelf(updated));
  },

  async listNearby(req, res) {
    const { radiusKm } = nearbyQuerySchema.parse(req.query);
    const nearby = await discoveryService.findNearby(req.user.id, radiusKm);
    res.json(nearby);
  },
};
