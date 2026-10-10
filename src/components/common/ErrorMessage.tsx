import React from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";

import { useTheme } from "../../contexts/ThemeContext";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  /** compact: thanh báo lỗi một dòng, dùng trong form / card */
  compact?: boolean;
  className?: string;
}

export default function ErrorMessage({
  title = "Something went wrong",
  message = "Please try again in a moment.",
  onRetry,
  retryLabel = "Try again",
  compact = false,
  className = ""
}: ErrorMessageProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (compact) {
    return (
      <div
        role="alert"
        className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm ${
          isDark
            ? "border-rose-500/20 bg-rose-500/10 text-rose-300"
            : "border-rose-200 bg-rose-50 text-rose-700"
        } ${className}`}
      >
        <TriangleAlert size={16} className="shrink-0" />
        <p className="min-w-0 flex-1">{message}</p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="shrink-0 rounded-md font-medium underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            {retryLabel}
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div
      role="alert"
      className={`mx-auto w-full max-w-md rounded-2xl border p-8 text-center shadow-sm ${
        isDark ? "border-white/10 bg-slate-900/60" : "border-slate-200 bg-white"
      } ${className}`}
    >
      <span
        className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${
          isDark ? "bg-rose-500/10 text-rose-400" : "bg-rose-50 text-rose-500"
        }`}
      >
        <TriangleAlert size={26} />
      </span>

      <h3
        className={`text-lg font-semibold ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-2 text-sm leading-6 ${
          isDark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {message}
      </p>

      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className={`mt-6 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            isDark
              ? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          <RotateCcw size={16} />
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}
