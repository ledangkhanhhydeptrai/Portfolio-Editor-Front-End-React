import { useTheme } from "../../../../contexts/ThemeContext";

/** Gom toàn bộ class phụ thuộc theme vào một chỗ để các component con dùng chung. */
export function useWorkStyleTheme() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return {
    isDark,
    page: isDark ? "bg-[#0B0B0D] text-[#F0EFEA]" : "bg-gray-50 text-gray-900",
    card: isDark
      ? "border-white/10 bg-[#151518]"
      : "border-gray-200 bg-white shadow-sm",
    muted: isDark ? "text-gray-400" : "text-gray-500",
    strong: isDark ? "text-white" : "text-gray-900",
    divider: isDark ? "border-white/[0.07]" : "border-gray-100",
    thead: isDark
      ? "bg-white/[0.03] text-gray-400"
      : "bg-gray-50 text-gray-500",
    rowHover: isDark ? "hover:bg-white/[0.03]" : "hover:bg-[#7F96F5]/[0.04]",
    track: isDark ? "bg-white/10" : "bg-gray-100",
    input: isDark
      ? "border-white/10 bg-[#0B0B0D] text-white placeholder:text-gray-500"
      : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400",
    ghostBtn: isDark
      ? "text-gray-400 hover:bg-white/10 hover:text-white"
      : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
  };
}

export type WorkStyleTheme = ReturnType<typeof useWorkStyleTheme>;
