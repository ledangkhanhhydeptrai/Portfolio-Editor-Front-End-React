import React from "react";
import { CircleAlert, RefreshCw } from "lucide-react";

export const ProfileLoading: React.FC = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="flex items-center gap-3 text-sm text-gray-500">
      <RefreshCw size={20} className="animate-spin" />
      Đang tải thông tin profile...
    </div>
  </div>
);

export const ProfileError: React.FC<{ onRetry: () => void }> = ({
  onRetry
}) => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
    <CircleAlert size={36} className="text-red-500" />
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
      Không thể tải profile
    </h2>
    <p className="text-center text-sm text-gray-500">
      Đã xảy ra lỗi khi lấy thông tin. Hãy thử lại.
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
    >
      <RefreshCw size={15} />
      Thử lại
    </button>
  </div>
);
