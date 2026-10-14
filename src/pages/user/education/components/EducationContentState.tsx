import { AlertCircle, GraduationCap, RefreshCw } from "lucide-react";
import { EducationContentStateProps } from "../../../../services/education/EducationTypes";

export default function EducationContentState({
  type,
  error,
  searchTerm,
  onRetry
}: EducationContentStateProps) {
  if (type === "loading") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-gray-400">
        <RefreshCw size={24} className="animate-spin text-indigo-300" />
        <p className="text-sm">Đang tải danh sách học vấn...</p>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center">
        <AlertCircle size={30} className="text-red-400" />

        <p className="font-medium text-gray-200">
          Không thể tải danh sách học vấn
        </p>

        <p className="max-w-md text-sm text-gray-500">
          {error instanceof Error
            ? error.message
            : "Đã xảy ra lỗi khi tải dữ liệu."}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-white/[0.06]"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
        <GraduationCap size={27} className="text-gray-500" />
      </div>

      <p className="font-medium text-gray-300">
        {searchTerm.trim().length > 0
          ? "Không tìm thấy kết quả"
          : "Chưa có thông tin học vấn"}
      </p>

      <p className="text-sm text-gray-500">
        {searchTerm.trim().length > 0
          ? "Thử tìm kiếm bằng từ khóa khác."
          : "Thông tin học vấn sẽ xuất hiện tại đây khi có dữ liệu."}
      </p>
    </div>
  );
}
