import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Pencil,
  Shield,
  Eye,
  EyeOff,
  BadgeCheck,
} from "lucide-react";

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
    if (currentUser) {
      setBio(currentUser.bio ?? "");
    }
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="flex h-72 items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateProfile.mutate({ bio });
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Hero */}

      <Card className="overflow-hidden p-0">
        <div className="h-32 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500" />

        <div className="relative px-8 pb-8">

          <div className="-mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div className="flex items-end gap-5">

              <div className="relative">

                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-lg"
                />

                <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-2 border-white bg-green-500" />

              </div>

              <div>

                <div className="flex items-center gap-2">

                  <h1 className="font-display text-3xl font-semibold text-ink-950">
                    {currentUser.fullName}
                  </h1>

                  <BadgeCheck
                    size={20}
                    className="text-brand-700"
                  />

                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-ink-600">
                  <Mail size={15} />
                  {currentUser.email}
                </div>

              </div>

            </div>

            <div className="rounded-2xl bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
              Profile
            </div>

          </div>

        </div>
      </Card>

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-3">

        <Card>

          <p className="text-sm text-ink-600">
            Profile Status
          </p>

          <p className="mt-3 text-lg font-semibold text-green-600">
            Complete
          </p>

        </Card>

        <Card>

          <p className="text-sm text-ink-600">
            Bio Length
          </p>

          <p className="mt-3 text-lg font-semibold text-ink-950">
            {bio.length}/280
          </p>

        </Card>

        <Card>

          <p className="text-sm text-ink-600">
            Visibility
          </p>

          <p className="mt-3 text-lg font-semibold text-ink-950">
            {currentUser.isDiscoverable
              ? "Visible"
              : "Hidden"}
          </p>

        </Card>

      </div>

      {/* About */}

      <Card>

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
            <Pencil size={18} />
          </div>

          <div>

            <h2 className="font-display text-lg font-semibold text-ink-950">
              About You
            </h2>

            <p className="text-sm text-ink-600">
              Tell nearby people a little about yourself.
            </p>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          <textarea
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
            rows={6}
            maxLength={280}
            placeholder="Share your interests, hobbies, profession or anything you'd like nearby people to know..."
            className="
              w-full
              resize-none
              rounded-2xl
              border
              border-surface-200
              bg-surface-50
              px-5
              py-4
              text-sm
              leading-7
              outline-none
              transition-all
              focus:border-brand-200
              focus:ring-2
              focus:ring-brand-100
            "
          />

          <div className="flex items-center justify-between">

            <span className="text-sm text-ink-500">
              {bio.length} / 280 characters
            </span>

            <Button
              type="submit"
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>

          </div>

        </form>

      </Card>

      {/* Privacy */}

      <Card>

        <div className="flex items-start justify-between gap-6">

          <div className="flex gap-4">

            <div className="rounded-xl bg-brand-50 p-3 text-brand-700">

              <Shield size={18} />

            </div>

            <div>

              <h2 className="font-display text-lg font-semibold text-ink-950">
                Discovery Visibility
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-ink-600">
                Control whether nearby users can
                discover your profile. Turning this
                off won't remove your saved location.
              </p>

            </div>

          </div>

          <button
            role="switch"
            aria-checked={currentUser.isDiscoverable}
            onClick={() =>
              updateVisibility.mutate(
                !currentUser.isDiscoverable
              )
            }
            className={`relative h-7 w-14 rounded-full transition-all duration-200 ${
              currentUser.isDiscoverable
                ? "bg-brand-700"
                : "bg-surface-200"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
                currentUser.isDiscoverable
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>

        </div>

        <div className="mt-6 rounded-2xl bg-surface-50 p-4">

          <div className="flex items-center gap-3">

            {currentUser.isDiscoverable ? (
              <Eye
                size={18}
                className="text-green-600"
              />
            ) : (
              <EyeOff
                size={18}
                className="text-ink-500"
              />
            )}

            <span className="text-sm text-ink-700">

              {currentUser.isDiscoverable
                ? "Your profile is currently visible to nearby users."
                : "Your profile is hidden from Discover."}

            </span>

          </div>

        </div>

      </Card>

    </div>
  );
}