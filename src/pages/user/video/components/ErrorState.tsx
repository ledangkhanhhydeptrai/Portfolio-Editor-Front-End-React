import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => (
  <div
    role="alert"
    className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center"
  >
    <div className="mb-3 rounded-xl bg-red-50 p-3.5">
      <AlertCircle size={24} className="text-red-500" />
    </div>

    <p className="font-medium text-slate-900">
      Không thể tải danh sách video
    </p>

    <p className="mt-1 max-w-xs text-sm text-slate-600">
      Vui lòng kiểm tra kết nối mạng và thử lại.
    </p>

    <button
      type="button"
      onClick={onRetry}
      className="mt-5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
    >
      Thử lại
    </button>
  </div>
);

export default ErrorState;
