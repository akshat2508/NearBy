import { useState } from "react";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useBrowserLocation } from "@/hooks/useBrowserLocation";
import { useNearbyUsers, useUpdateLocation } from "@/hooks/useDiscovery";
import { useAcceptFriendRequest, useFriendRequests, useSendFriendRequest } from "@/hooks/useFriends";
import LocationPrompt from "@/features/discovery/components/LocationPrompt";
import RadiusSelect from "@/features/discovery/components/RadiusSelect";
import NearbyUserCard from "@/features/discovery/components/NearbyUserCard";
import NearbyMap from "@/features/discovery/components/NearbyMap";

export default function DiscoverPage() {
  const [radiusKm, setRadiusKm] = useState(5);
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();
  const { requestLocation, status: locationStatus } = useBrowserLocation();
  const updateLocation = useUpdateLocation();
  const { data: requests } = useFriendRequests();

  const hasLocation = Boolean(currentUser?.latitude && currentUser?.longitude);

  const {
    data: nearbyUsers,
    isLoading: isLoadingNearby,
    error: nearbyError,
  } = useNearbyUsers(radiusKm, { enabled: hasLocation });

  const sendRequest = useSendFriendRequest();
  const acceptRequest = useAcceptFriendRequest();

  async function handleEnableLocation() {
    const { latitude, longitude } = await requestLocation();
    updateLocation.mutate({ latitude, longitude, isDiscoverable: true });
  }

  function handleAction(user) {
    if (user.friendStatus === "pending_received") {
      const incomingRequest = requests?.incoming.find((r) => r.user.id === user.id);
      if (incomingRequest) acceptRequest.mutate(incomingRequest.id);
      return;
    }
    if (user.friendStatus === "none") {
      sendRequest.mutate(user.id);
    }
  }

  if (isLoadingUser) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!hasLocation) {
    return (
      <LocationPrompt
        onEnable={handleEnableLocation}
        loading={locationStatus === "loading" || updateLocation.isPending}
        error={locationStatus === "error" ? "We couldn't get your location. Check permissions and try again." : null}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-ink-950">Discover</h1>
        <RadiusSelect value={radiusKm} onChange={setRadiusKm} />
      </div>

      <NearbyMap
        center={{ latitude: currentUser.latitude, longitude: currentUser.longitude }}
        users={nearbyUsers ?? []}
      />

      {isLoadingNearby ? (
        <div className="flex h-32 items-center justify-center">
          <Spinner />
        </div>
      ) : nearbyError ? (
        <Card className="text-center text-sm text-ink-600">
          Couldn't load nearby people right now.
        </Card>
      ) : nearbyUsers?.length === 0 ? (
        <Card className="text-center text-sm text-ink-600">
          No one's nearby within {radiusKm} km yet. Try a wider radius.
        </Card>
      ) : (
        <div className="space-y-3">
          {nearbyUsers.map((user) => (
            <NearbyUserCard
              key={user.id}
              user={user}
              onAction={handleAction}
              actionPending={sendRequest.isPending || acceptRequest.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}
