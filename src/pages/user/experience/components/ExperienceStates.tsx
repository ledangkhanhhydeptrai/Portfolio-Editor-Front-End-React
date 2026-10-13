import { AlertCircle, BriefcaseBusiness, RefreshCw } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex h-full min-h-64 items-center justify-center gap-2">
      <RefreshCw size={24} className="animate-spin text-[#8B9FF8]" />
      <p className="text-sm font-medium text-gray-400">Đang tải danh sách...</p>
    </div>
  );
}

interface ErrorStateProps {
  error: unknown;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex h-full min-h-64 flex-col items-center justify-center gap-2 px-4 text-center">
      <AlertCircle size={28} className="text-red-400" />
      <p className="text-sm font-semibold text-white">
        Không thể tải danh sách kinh nghiệm
      </p>
      <p className="max-w-md text-xs text-gray-400">
        {error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi khi kết nối máy chủ. Vui lòng thử lại sau."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-1 rounded-lg bg-[#8B9FF8] px-4 py-1.5 text-sm font-semibold text-[#090A0D]"
      >
        Tải lại
      </button>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="flex h-full min-h-64 flex-col items-center justify-center gap-2 px-4 text-center">
      <div className="flex size-11 items-center justify-center rounded-xl bg-white/[0.03] text-gray-500">
        <BriefcaseBusiness size={20} />
      </div>
      <p className="text-sm font-medium text-white">
        Không tìm thấy kinh nghiệm phù hợp
      </p>
      <p className="text-xs text-gray-400">
        Hãy thử làm mới bộ lọc hoặc nhập từ khóa tìm kiếm khác.
      </p>
    </div>
  );
}
