import { RefreshCw, Plus, Layers3 } from "lucide-react";

interface SkillHeaderProps {
  isFetching: boolean;
  onRefresh: () => void;
  onCreate: () => void;
}

export default function SkillHeader({
  isFetching,
  onRefresh,
  onCreate
}: SkillHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div className="mb-3 flex items-center gap-2 text-sm text-[#7F96F5]">
          <Layers3 size={16} />
          <span>PORTFOLIO MANAGEMENT</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Quản lý kỹ năng</h1>

        <p className="mt-2 text-sm text-white/45">
          Quản lý danh sách kỹ năng hiển thị trên portfolio.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRefresh}
          disabled={isFetching}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm transition hover:bg-white/[0.05] disabled:opacity-50"
        >
          <RefreshCw size={15} className={isFetching ? "animate-spin" : ""} />
          Làm mới
        </button>

        <button
          type="button"
          onClick={onCreate}
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#7F96F5] px-4 text-sm font-semibold text-[#0B0B0D] transition hover:opacity-90"
        >
          <Plus size={16} />
          Thêm kỹ năng
        </button>
      </div>
    </div>
  );
}
