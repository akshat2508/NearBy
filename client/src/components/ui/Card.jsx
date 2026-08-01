import { cn } from "@/utils/cn";

export default function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-surface-200 bg-surface-0 p-6 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
