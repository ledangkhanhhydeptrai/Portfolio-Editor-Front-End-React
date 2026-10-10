import React from "react";
import { Inbox, type LucideIcon } from "lucide-react";

import { useTheme } from "../../contexts/ThemeContext";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  /** Cách nhanh: truyền nhãn + handler để có nút hành động */
  actionLabel?: string;
  onAction?: () => void;
  /** Hoặc tự truyền node tuỳ ý (ví dụ <Link>) */
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description,
  actionLabel,
  onAction,
  action,
  className = ""
}: EmptyStateProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-14 text-center ${
        isDark ? "border-white/15 bg-slate-900/40" : "border-slate-300 bg-white"
      } ${className}`}
    >
      <span
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${
          isDark ? "bg-white/5 text-slate-400" : "bg-slate-100 text-slate-500"
        }`}
      >
        <Icon size={26} strokeWidth={1.6} />
      </span>

      <h3
        className={`text-base font-semibold ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h3>

      {description ? (
        <p
          className={`mt-1.5 max-w-sm text-sm leading-6 ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {description}
        </p>
      ) : null}

      {action ? (
        <div className="mt-6">{action}</div>
      ) : actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-600/30 transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
