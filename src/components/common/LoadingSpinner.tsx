import React from "react";

import { useTheme } from "../../contexts/ThemeContext";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  /** Nhãn hiển thị bên dưới vòng quay (cũng dùng cho screen reader) */
  label?: string;
  /** Căn giữa trong một vùng cao ~ 16rem (dùng cho trang / card) */
  centered?: boolean;
  /** Phủ toàn màn hình */
  fullScreen?: boolean;
  className?: string;
}

const SIZES = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-12 w-12 border-4"
} as const;

export default function LoadingSpinner({
  size = "md",
  label = "Loading...",
  centered = false,
  fullScreen = false,
  className = ""
}: LoadingSpinnerProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const showLabel = size !== "sm" && label;

  const spinner = (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`animate-spin rounded-full border-indigo-500/20 border-t-indigo-500 ${SIZES[size]}`}
      />
      {showLabel ? (
        <span
          className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
        >
          {label}
        </span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isDark ? "bg-slate-950/80" : "bg-white/80"
        } backdrop-blur-sm`}
      >
        {spinner}
      </div>
    );
  }

  if (centered) {
    return (
      <div className="flex min-h-[16rem] w-full items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}
