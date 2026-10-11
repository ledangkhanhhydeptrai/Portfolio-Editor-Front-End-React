import React from "react";
import { Link2, ListFilter } from "lucide-react";

interface SocialLinkStatsProps {
  totalCount: number;
  filteredCount: number;
  isLoading: boolean;
  isDark: boolean;
}

export const SocialLinkStats: React.FC<SocialLinkStatsProps> = ({
  totalCount,
  filteredCount,
  isLoading,
  isDark
}) => {
  const ratio =
    totalCount > 0 ? Math.round((filteredCount / totalCount) * 100) : 0;

  const value = (n: number) =>
    isLoading ? (
      <span className="inline-block h-6 w-8 rounded-md bg-current opacity-10 motion-safe:animate-pulse" />
    ) : (
      n
    );

  return (
    <div
      className={`grid grid-cols-2 divide-x overflow-hidden rounded-2xl border ${
        isDark
          ? "divide-white/[0.07] border-white/[0.07] bg-zinc-900/60"
          : "divide-zinc-200/80 border-zinc-200/80 bg-white shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
          <Link2 size={18} />
        </div>
        <p className="min-w-0 flex-1 truncate text-sm text-zinc-500">
          Tổng số liên kết
        </p>
        <p className="text-2xl font-semibold tracking-tight tabular-nums">
          {value(totalCount)}
        </p>
      </div>

      <div className="relative flex items-center gap-3 px-4 py-3 sm:px-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
          <ListFilter size={18} />
        </div>
        <p className="min-w-0 flex-1 truncate text-sm text-zinc-500">
          Đang hiển thị
        </p>
        <p className="text-2xl font-semibold tracking-tight tabular-nums">
          {value(filteredCount)}
        </p>

        {/* Tỷ lệ khớp bộ lọc: thanh mảnh ở đáy ô */}
        <div
          className={`absolute inset-x-0 bottom-0 h-0.5 ${
            isDark ? "bg-white/10" : "bg-zinc-100"
          }`}
          role="progressbar"
          aria-valuenow={isLoading ? 0 : ratio}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tỷ lệ kết quả khớp bộ lọc"
        >
          <div
            className="h-full bg-sky-500 transition-[width] duration-500"
            style={{ width: `${isLoading ? 0 : ratio}%` }}
          />
        </div>
      </div>
    </div>
  );
};
