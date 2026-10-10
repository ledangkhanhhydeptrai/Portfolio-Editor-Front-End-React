import React from "react";

import { useTheme } from "../../contexts/ThemeContext";

interface AppLogoProps {
  name?: string;
  subtitle?: string;
  /** Chỉ hiện ô logo (dùng khi sidebar thu gọn) */
  collapsed?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: {
    mark: "h-8 w-8 rounded-lg text-sm",
    name: "text-sm",
    sub: "text-[11px]"
  },
  md: {
    mark: "h-10 w-10 rounded-xl text-base",
    name: "text-sm",
    sub: "text-xs"
  },
  lg: {
    mark: "h-12 w-12 rounded-2xl text-lg",
    name: "text-base",
    sub: "text-xs"
  }
} as const;

export default function AppLogo({
  name = "Portfolio",
  subtitle,
  collapsed = false,
  size = "md",
  className = ""
}: AppLogoProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const s = SIZES[size];

  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      title={collapsed ? name : undefined}
    >
      <span
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-center bg-indigo-600 font-bold text-white shadow-sm shadow-indigo-600/30 ring-1 ring-inset ring-white/20 ${s.mark}`}
      >
        {name.charAt(0).toUpperCase()}
      </span>

      {!collapsed && (
        <div className="min-w-0 leading-tight">
          <p
            className={`truncate font-semibold ${s.name} ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {name}
          </p>
          {subtitle ? (
            <p
              className={`truncate ${s.sub} ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
