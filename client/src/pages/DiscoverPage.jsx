import { useState } from "react";

import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useBrowserLocation } from "@/hooks/useBrowserLocation";
import {
  useNearbyUsers,
  useUpdateLocation,
} from "@/hooks/useDiscovery";
import {
  useAcceptFriendRequest,
  useFriendRequests,
  useSendFriendRequest,
} from "@/hooks/useFriends";

import LocationPrompt from "@/features/discovery/components/LocationPrompt";
import RadiusSelect from "@/features/discovery/components/RadiusSelect";
import NearbyUserCard from "@/features/discovery/components/NearbyUserCard";
import NearbyMap from "@/features/discovery/components/NearbyMap";

import {
  Compass,
  Users,
  MapPin,
} from "lucide-react";

export default function DiscoverPage() {
  const [radiusKm, setRadiusKm] = useState(5);

  const { data: currentUser, isLoading: isLoadingUser } =
    useCurrentUser();

  const {
    requestLocation,
    status: locationStatus,
  } = useBrowserLocation();

  const updateLocation = useUpdateLocation();

  const { data: requests } = useFriendRequests();

  const hasLocation = Boolean(
    currentUser?.latitude &&
      currentUser?.longitude
  );

  const {
    data: nearbyUsers,
    isLoading: isLoadingNearby,
    error: nearbyError,
  } = useNearbyUsers(radiusKm, {
    enabled: hasLocation,
  });

  const sendRequest = useSendFriendRequest();
  const acceptRequest =
    useAcceptFriendRequest();

  async function handleEnableLocation() {
    const { latitude, longitude } =
      await requestLocation();

    updateLocation.mutate({
      latitude,
      longitude,
      isDiscoverable: true,
    });
  }

  function handleAction(user) {
    if (user.friendStatus === "pending_received") {
      const incomingRequest =
        requests?.incoming.find(
          (r) => r.user.id === user.id
        );

      if (incomingRequest) {
        acceptRequest.mutate(
          incomingRequest.id
        );
      }

      return;
    }

    if (user.friendStatus === "none") {
      sendRequest.mutate(user.id);
    }
  }

  if (isLoadingUser) {
    return (
      <div className="flex h-72 items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!hasLocation) {
    return (
      <LocationPrompt
        onEnable={handleEnableLocation}
        loading={
          locationStatus === "loading" ||
          updateLocation.isPending
        }
        error={
          locationStatus === "error"
            ? "We couldn't get your location. Check permissions and try again."
            : null
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Hero */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700">
            <Compass size={16} />
            Discover Nearby
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-950">
            People around you
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-ink-600">
            Find people nearby based on your current
            location and start meaningful
            conversations with those who share your
            interests.
          </p>
        </div>

        <RadiusSelect
          value={radiusKm}
          onChange={setRadiusKm}
        />
      </div>

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-3">

        <Card className="p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-ink-600">
                Nearby Users
              </p>

              <p className="mt-2 text-3xl font-semibold text-ink-950">
                {nearbyUsers?.length ?? 0}
              </p>
            </div>

            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700">
              <Users size={22} />
            </div>

          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-ink-600">
                Search Radius
              </p>

              <p className="mt-2 text-3xl font-semibold text-ink-950">
                {radiusKm} km
              </p>
            </div>

            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700">
              <MapPin size={22} />
            </div>

          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-ink-600">
                Status
              </p>

              <p className="mt-2 font-medium text-green-600">
                Discoverable
              </p>
            </div>

            <div className="h-3 w-3 rounded-full bg-green-500" />

          </div>
        </Card>

      </div>

      {/* Map */}

      <NearbyMap
        center={{
          latitude: currentUser.latitude,
          longitude: currentUser.longitude,
        }}
        users={nearbyUsers ?? []}
      />

      {/* Nearby Users */}

      <section className="space-y-5">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-950">
              Nearby People
            </h2>

            <p className="mt-1 text-sm text-ink-600">
              Connect with people around your
              current location.
            </p>
          </div>

          <span className="rounded-full bg-surface-100 px-3 py-1 text-sm font-medium text-ink-600">
            {nearbyUsers?.length ?? 0} Results
          </span>

        </div>

        {isLoadingNearby ? (
          <div className="flex h-52 items-center justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        ) : nearbyError ? (
          <Card className="py-12 text-center">
            <p className="font-medium text-ink-950">
              Unable to load nearby users
            </p>

            <p className="mt-2 text-sm text-ink-600">
              Please try again in a few
              moments.
            </p>
          </Card>
        ) : nearbyUsers?.length === 0 ? (
          <Card className="py-12 text-center">
            <p className="font-medium text-ink-950">
              Nobody nearby yet
            </p>

            <p className="mt-2 text-sm text-ink-600">
              Try increasing your discovery
              radius to meet more people.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {nearbyUsers.map((user) => (
              <NearbyUserCard
                key={user.id}
                user={user}
                onAction={handleAction}
                actionPending={
                  sendRequest.isPending ||
                  acceptRequest.isPending
                }
              />
            ))}
          </div>
        )}

      </section>

    </div>
  );
}