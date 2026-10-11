import React from "react";
import { Search, Link2 } from "lucide-react";
import { focusRing } from "./SocialLinkShared";

interface SocialLinkEmptyStateProps {
  isFiltering: boolean;
  isDark: boolean;
  onClearFilter?: () => void;
}

export const SocialLinkEmptyState: React.FC<SocialLinkEmptyStateProps> = ({
  isFiltering,
  isDark,
  onClearFilter
}) => (
  <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-inset ${
        isDark
          ? "bg-white/[0.04] text-zinc-400 ring-white/10"
          : "bg-zinc-50 text-zinc-500 ring-zinc-200"
      }`}
    >
      {isFiltering ? <Search size={24} /> : <Link2 size={24} />}
    </div>

    <h3 className="mt-5 text-base font-semibold">
      {isFiltering ? "Không tìm thấy kết quả" : "Chưa có liên kết nào"}
    </h3>

    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-zinc-500">
      {isFiltering
        ? "Không có nền tảng hoặc URL nào khớp với từ khóa. Hãy thử từ khóa khác hoặc xóa bộ lọc."
        : "Hệ thống chưa có liên kết mạng xã hội nào được cấu hình."}
    </p>

    {isFiltering && onClearFilter && (
      <button
        type="button"
        onClick={onClearFilter}
        className={`mt-5 rounded-lg px-3.5 py-2 text-xs font-medium transition ${focusRing} ${
          isDark
            ? "bg-white/[0.06] text-zinc-200 hover:bg-white/10"
            : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
        }`}
      >
        Xóa bộ lọc
      </button>
    )}
  </div>
);