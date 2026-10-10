import React from "react";
import { AlertCircle, Inbox, SearchX } from "lucide-react";
import type { WorkStyleTheme } from "./theme";

export const LoadingState: React.FC<{ t: WorkStyleTheme }> = ({ t }) => (
  <div role="status" aria-label="Đang tải danh sách" className="p-5 sm:p-6">
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex animate-pulse items-center gap-4 motion-reduce:animate-none"
        >
          <div className={`h-10 w-10 shrink-0 rounded-xl ${t.track}`} />
          <div className="flex-1 space-y-2">
            <div className={`h-3.5 w-1/3 rounded ${t.track}`} />
            <div className={`h-3 w-2/3 rounded ${t.track}`} />
          </div>
          <div className={`hidden h-6 w-14 rounded-lg sm:block ${t.track}`} />
        </div>
      ))}
    </div>
    <span className="sr-only">Đang tải danh sách...</span>
  </div>
);

export const ErrorState: React.FC<{
  t: WorkStyleTheme;
  onRetry: () => void;
}> = ({ t, onRetry }) => (
  <div className="flex min-h-56 flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
    <div className="rounded-full bg-red-500/10 p-4 text-red-500">
      <AlertCircle size={30} />
    </div>
    <p className="font-semibold">Không thể tải dữ liệu</p>
    <p className={`text-sm ${t.muted}`}>Vui lòng thử tải lại danh sách.</p>
    <button
      type="button"
      onClick={onRetry}
      className="rounded-xl bg-[#7F96F5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6B83E8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F96F5] focus-visible:ring-offset-2"
    >
      Thử lại
    </button>
  </div>
);

export const EmptyState: React.FC<{
  t: WorkStyleTheme;
  isSearching: boolean;
  onClearSearch: () => void;
}> = ({ t, isSearching, onClearSearch }) => (
  <div className="flex min-h-56 flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
    <div className={`rounded-full p-4 ${t.track} ${t.muted}`}>
      {isSearching ? <SearchX size={30} /> : <Inbox size={30} />}
    </div>
    <p className="font-semibold">
      {isSearching ? "Không tìm thấy kết quả" : "Chưa có phong cách làm việc"}
    </p>
    <p className={`text-sm ${t.muted}`}>
      {isSearching
        ? "Thử tìm kiếm bằng từ khóa khác."
        : "Danh sách hiện chưa có bản ghi nào."}
    </p>
    {isSearching && (
      <button
        type="button"
        onClick={onClearSearch}
        className="rounded-xl border border-[#7F96F5]/30 px-4 py-2 text-sm font-medium text-[#7F96F5] transition hover:bg-[#7F96F5]/10"
      >
        Xóa từ khóa
      </button>
    )}
  </div>
);
