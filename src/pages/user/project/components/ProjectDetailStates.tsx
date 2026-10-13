import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  FolderKanban,
  LoaderCircle
} from "lucide-react";

const LIST_PATH = "/projects";

const backLinkClass =
  "mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7F96F5] px-4 py-2.5 text-sm font-semibold text-[#0B0B0D] transition hover:bg-[#91A5FF]";

export function ProjectLoadingState() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-gray-400">
      <div className="flex flex-col items-center gap-3">
        <LoaderCircle size={32} className="animate-spin text-[#7F96F5]" />
        <p className="text-sm">Đang tải thông tin dự án...</p>
      </div>
    </div>
  );
}

export function ProjectErrorState() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="max-w-md rounded-2xl border border-red-500/20 bg-[#121216] p-8 text-center">
        <AlertCircle size={36} className="mx-auto mb-4 text-red-400" />
        <h2 className="text-lg font-semibold text-white">
          Không thể tải dự án
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Đã xảy ra lỗi khi lấy thông tin dự án. Vui lòng thử lại.
        </p>
        <Link to={LIST_PATH} className={backLinkClass}>
          <ArrowLeft size={16} />
          Quay lại danh sách
        </Link>
      </div>
    </div>
  );
}

export function ProjectNotFoundState() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="max-w-md rounded-2xl border border-white/10 bg-[#121216] p-8 text-center">
        <FolderKanban size={36} className="mx-auto mb-4 text-gray-500" />
        <h2 className="text-lg font-semibold text-white">
          Không tìm thấy dự án
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Dự án không tồn tại hoặc đã bị xóa.
        </p>
        <Link to={LIST_PATH} className={backLinkClass}>
          <ArrowLeft size={16} />
          Quay lại danh sách
        </Link>
      </div>
    </div>
  );
}
