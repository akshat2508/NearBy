import { useState } from "react";
import { Paperclip, Smile, SendHorizonal } from "lucide-react";
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
    <div className="border-t border-surface-200 bg-white px-6 py-5">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 rounded-2xl border border-surface-200 bg-surface-50 p-2 shadow-sm"
      >
        {/* Attachment (UI Ready) */}
        <button
          type="button"
          disabled
          className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-500 transition-colors hover:bg-white hover:text-brand-700 disabled:cursor-default"
        >
          <Paperclip size={18} />
        </button>

        {/* Message */}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a message..."
          disabled={disabled}
          className="
            flex-1
            bg-transparent
            px-2
            py-2
            text-sm
            text-ink-950
            placeholder:text-ink-500
            outline-none
          "
        />

        {/* Emoji (UI Ready) */}
        <button
          type="button"
          disabled
          className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-500 transition-colors hover:bg-white hover:text-brand-700 disabled:cursor-default"
        >
          <Smile size={18} />
        </button>

        {/* Send */}
        <Button
          type="submit"
          disabled={disabled || !value.trim()}
          className="min-w-[110px]"
        >
          <SendHorizonal size={17} />
          Send
        </Button>
      </form>
    </div>
  );
}