export default function Spinner({ className = "h-6 w-6" }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`${className} animate-spin rounded-full border-2 border-surface-200 border-t-ink-950`}
    />
  );
}
