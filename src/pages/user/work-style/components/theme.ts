import { useMemo } from "react";
import { useTheme } from "../../../../contexts/ThemeContext";

/** Toàn bộ class phụ thuộc theme, gom một chỗ để các component con dùng chung. */
export interface WorkStyleTheme {
  isDark: boolean;
  page: string;
  card: string;
  muted: string;
  strong: string;
  divider: string;
  thead: string;
  rowHover: string;
  track: string;
  input: string;
  ghostBtn: string;
  /** Vòng focus chuẩn cho các nút nhỏ (không dùng ring-offset để khỏi lòi viền trắng ở dark mode). */
  focusRing: string;
  /** Nền cho chip hiển thị mã/ID dạng monospace. */
  codeChip: string;
}

type ThemeTokens = Omit<WorkStyleTheme, "isDark">;

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F96F5]";

const DARK_TOKENS: ThemeTokens = {
  page: "bg-[#0B0B0D] text-[#F0EFEA]",
  card: "border-white/10 bg-[#151518]",
  muted: "text-gray-400",
  strong: "text-white",
  divider: "border-white/[0.07]",
  thead: "bg-white/[0.03] text-gray-400",
  rowHover: "hover:bg-white/[0.03]",
  track: "bg-white/10",
  input: "border-white/10 bg-[#0B0B0D] text-white placeholder:text-gray-500",
  ghostBtn: "text-gray-400 hover:bg-white/10 hover:text-white",
  focusRing: FOCUS_RING,
  codeChip: "bg-white/5 ring-1 ring-inset ring-white/5",
};

const LIGHT_TOKENS: ThemeTokens = {
  page: "bg-gray-50 text-gray-900",
  card: "border-gray-200 bg-white shadow-sm",
  muted: "text-gray-500",
  strong: "text-gray-900",
  divider: "border-gray-100",
  thead: "bg-gray-50 text-gray-500",
  rowHover: "hover:bg-[#7F96F5]/[0.04]",
  track: "bg-gray-100",
  input: "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400",
  // gray-500 thay cho gray-400 để icon đủ tương phản trên nền trắng
  ghostBtn: "text-gray-500 hover:bg-gray-100 hover:text-gray-800",
  focusRing: FOCUS_RING,
  codeChip: "bg-gray-100 ring-1 ring-inset ring-gray-200/70",
};

export function useWorkStyleTheme(): WorkStyleTheme {
  const { theme } = useTheme();
  const isDark: boolean = theme === "dark";

  return useMemo<WorkStyleTheme>(
    () => ({ isDark, ...(isDark ? DARK_TOKENS : LIGHT_TOKENS) }),
    [isDark],
  );
}