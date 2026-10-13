import {
  AlertCircle,
  ArrowLeft,
  BriefcaseBusiness,
  RefreshCw
} from "lucide-react";

const box =
  "flex min-h-64 flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-[#12131A] px-5 text-center";

export function LoadingState() {
  return (
    <div className={box}>
      <RefreshCw size={28} className="animate-spin text-[#8B9FF8]" />
      <p className="text-sm text-gray-400">Đang tải thông tin kinh nghiệm...</p>
    </div>
  );
}

export function ErrorState({
  error,
  onRetry
}: {
  error: unknown;
  onRetry: () => void;
}) {
  return (
    <div className={box}>
      <div className="rounded-xl bg-red-400/10 p-3 text-red-400">
        <AlertCircle size={26} />
      </div>
      <h2 className="text-sm font-semibold text-white">
        Không thể tải thông tin kinh nghiệm
      </h2>
      <p className="max-w-md text-xs text-gray-400">
        {error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Đã xảy ra lỗi khi kết nối máy chủ."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-[#8B9FF8] px-4 py-2 text-sm font-semibold text-[#090A0D] transition hover:bg-[#A1B0FF]"
      >
        Thử lại
      </button>
    </div>
  );
}

export function EmptyState({ onBack }: { onBack: () => void }) {
  return (
    <div className={box}>
      <div className="rounded-xl bg-white/[0.04] p-3 text-gray-500">
        <BriefcaseBusiness size={28} />
      </div>
      <h2 className="text-sm font-semibold text-white">
        Không tìm thấy kinh nghiệm
      </h2>
      <p className="text-xs text-gray-400">
        Bản ghi không tồn tại hoặc đã bị xóa.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/[0.05]"
      >
        Quay lại danh sách
      </button>
    </div>
  );
}

export function MissingIdState({ onBack }: { onBack: () => void }) {
  return (
    <div className={box}>
      <AlertCircle size={32} className="text-red-400" />
      <h2 className="text-sm font-semibold text-white">
        Không tìm thấy mã kinh nghiệm
      </h2>
      <p className="text-xs text-gray-400">Vui lòng kiểm tra lại đường dẫn.</p>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-xl bg-[#8B9FF8] px-4 py-2 text-sm font-semibold text-[#090A0D] transition hover:bg-[#A1B0FF]"
      >
        <ArrowLeft size={15} />
        Quay lại
      </button>
    </div>
  );
}
