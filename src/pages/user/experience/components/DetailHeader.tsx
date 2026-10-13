import {
  ArrowLeft,
  BriefcaseBusiness,
  RefreshCw,
  Pencil,
} from "lucide-react";

interface DetailHeaderProps {
  isFetching: boolean;
  onBack: () => void;
  onRefresh: () => void;
  onUpdate: () => void;
}

export function DetailHeader({
  isFetching,
  onBack,
  onRefresh,
  onUpdate,
}: DetailHeaderProps) {
  return (
    <header className="flex shrink-0 flex-col justify-between gap-2 sm:flex-row sm:items-center">
      <div>
        <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#8B9FF8]">
          <BriefcaseBusiness size={13} />
          <span>HỒ SƠ NGHỀ NGHIỆP</span>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Chi tiết kinh nghiệm
        </h1>

        <p className="text-sm text-gray-400">
          Xem thông tin chi tiết về quá trình làm việc và vị trí công tác.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#16171E] px-4 text-sm font-medium text-gray-200 transition hover:border-white/20 hover:bg-[#1E1F29]"
        >
          <ArrowLeft size={15} />
          Quay lại
        </button>

        <button
          type="button"
          onClick={onUpdate}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#8B9FF8] px-4 text-sm font-semibold text-[#0B0B0D] transition hover:bg-[#A2B1FF]"
        >
          <Pencil size={15} />
          Cập nhật
        </button>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isFetching}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#16171E] px-4 text-sm font-medium text-gray-200 transition hover:border-white/20 hover:bg-[#1E1F29] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={`text-[#8B9FF8] ${
              isFetching ? "animate-spin" : ""
            }`}
          />
          {isFetching ? "Đang đồng bộ..." : "Làm mới"}
        </button>
      </div>
    </header>
  );
}