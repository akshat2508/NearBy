import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function LocationPrompt({ onEnable, loading, error }) {
  return (
    <Card className="mx-auto max-w-md text-center">
      <p className="font-display text-lg font-semibold text-ink-950">Share your location</p>
      <p className="mt-2 text-sm text-ink-600">
        Nearby uses your location to find people close to you. Nothing is shared until you
        turn this on.
      </p>
      <Button onClick={onEnable} disabled={loading} className="mt-5">
        {loading ? "Locating…" : "Enable location"}
      </Button>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </Card>
  );
}
