import { AlertCircle } from "lucide-react";
import { focusRing } from "./SocialLinkShared";

interface SocialLinkErrorStateProps {
  onRetry: () => void;
}

export function SocialLinkErrorState({ onRetry }: SocialLinkErrorStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 ring-1 ring-inset ring-red-500/20">
        <AlertCircle size={24} />
      </div>

      <h3 className="mt-5 text-base font-semibold">Không tải được danh sách</h3>

      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-zinc-500">
        Đã có lỗi khi lấy dữ liệu. Kiểm tra kết nối mạng rồi thử lại.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className={`mt-5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-indigo-500 ${focusRing}`}
      >
        Thử lại
      </button>
    </div>
  );
}
