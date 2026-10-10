import type { WorkStyleTheme } from "./theme";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50";

export const primaryBtn = `${base} bg-[#7F96F5] text-white hover:bg-[#6B83E8] focus-visible:ring-[#7F96F5]`;

export const dangerBtn = `${base} bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500`;

export const secondaryBtn = (t: WorkStyleTheme) =>
  `${base} border focus-visible:ring-[#7F96F5] ${
    t.isDark
      ? "border-white/10 text-gray-200 hover:bg-white/5"
      : "border-gray-200 text-gray-700 hover:bg-gray-50"
  }`;