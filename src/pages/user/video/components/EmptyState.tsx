import React from "react";
import { Plus, Video } from "lucide-react";

interface EmptyStateProps {
  /** True khi thư viện không có video nào. */
  isLibraryEmpty: boolean;
  hasActiveFilters: boolean;
  onCreate: () => void;
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  isLibraryEmpty,
  hasActiveFilters,
  onCreate,
  onClearFilters
}) => (
  <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
    <div className="mb-3 rounded-xl bg-slate-100 p-3.5">
      <Video size={24} className="text-slate-400" />
    </div>

    <p className="font-medium text-slate-900">
      {isLibraryEmpty
        ? "Chưa có video nào"
        : "Không tìm thấy video phù hợp"}
    </p>

    <p className="mt-1 max-w-xs text-sm text-slate-600">
      {isLibraryEmpty
        ? "Thêm video đầu tiên để hiển thị trên trang portfolio của bạn."
        : "Hãy thử từ khóa khác hoặc xóa bộ lọc để xem tất cả video."}
    </p>

    {isLibraryEmpty ? (
      <button
        type="button"
        onClick={onCreate}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        <Plus size={16} />
        Thêm video
      </button>
    ) : (
      hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Xóa bộ lọc
        </button>
      )
    )}
  </div>
);

export default EmptyState;
