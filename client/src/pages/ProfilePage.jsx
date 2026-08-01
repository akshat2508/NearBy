import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useUpdateVisibility } from "@/hooks/useDiscovery";

export default function ProfilePage() {
  const { data: currentUser, isLoading } = useCurrentUser();
  const updateProfile = useUpdateProfile();
  const updateVisibility = useUpdateVisibility();
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (currentUser) setBio(currentUser.bio ?? "");
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateProfile.mutate({ bio });
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Card className="flex items-center gap-4">
        <img
          src={currentUser.avatarUrl}
          alt={currentUser.fullName}
          className="h-16 w-16 rounded-full border border-surface-200 object-cover"
        />
        <div>
          <p className="text-lg font-semibold text-ink-950">{currentUser.fullName}</p>
          <p className="text-sm text-ink-600">{currentUser.email}</p>
        </div>
      </Card>

      <Card>
        <p className="font-display text-base font-semibold text-ink-950">About you</p>
        <form onSubmit={handleSubmit} className="mt-3 space-y-3">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={280}
            rows={4}
            placeholder="Tell nearby people a little about yourself…"
            className="w-full resize-none rounded-xl border border-surface-200 bg-surface-0 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-ink-400">{bio.length}/280</p>
            <Button type="submit" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </form>
      </Card>

      <Card className="flex items-center justify-between">
        <div>
          <p className="font-medium text-ink-950">Discoverable to nearby people</p>
          <p className="text-sm text-ink-600">
            Turn this off to hide from Discover without losing your location.
          </p>
        </div>
        <button
          role="switch"
          aria-checked={currentUser.isDiscoverable}
          onClick={() => updateVisibility.mutate(!currentUser.isDiscoverable)}
          className={`h-6 w-11 rounded-full transition-colors ${
            currentUser.isDiscoverable ? "bg-ink-950" : "bg-surface-200"
          }`}
        >
          <span
            className={`block h-5 w-5 translate-y-0.5 rounded-full bg-white transition-transform ${
              currentUser.isDiscoverable ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </Card>
    </div>
  );
}
