import { useState } from "react";
import Button from "@/components/ui/Button";

export default function MessageInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 border-t border-surface-200 p-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a message…"
        disabled={disabled}
        className="flex-1 rounded-xl border border-surface-200 bg-surface-0 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
      />
      <Button type="submit" disabled={disabled || !value.trim()}>
        Send
      </Button>
    </form>
  );
}
