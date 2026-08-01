const OPTIONS = [1, 5, 10, 25, 50];

export default function RadiusSelect({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink-600">
      Radius
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-lg border border-surface-200 bg-surface-0 px-2 py-1.5 text-sm text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
      >
        {OPTIONS.map((km) => (
          <option key={km} value={km}>
            {km} km
          </option>
        ))}
      </select>
    </label>
  );
}
