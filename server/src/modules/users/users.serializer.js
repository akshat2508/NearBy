// Shape returned for the signed-in user themselves — includes fields
// only they should see (email, location, discoverability).
export function serializeSelf(user) {
  return {
    id: user.id,
    clerkId: user.clerkId,
    email: user.email,
    fullName: user.fullName,
    avatarUrl: user.avatarUrl,
    bio: user.bio,
    isDiscoverable: user.isDiscoverable,
    latitude: user.latitude,
    longitude: user.longitude,
    lastActiveAt: user.lastActiveAt,
  };
}

// Shape returned when one user is looking at another (discovery, friends,
// chat) — no email, no raw coordinates, no clerk id.
export function serializePublicUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    avatarUrl: user.avatarUrl,
    bio: user.bio,
    lastActiveAt: user.lastActiveAt,
  };
}
