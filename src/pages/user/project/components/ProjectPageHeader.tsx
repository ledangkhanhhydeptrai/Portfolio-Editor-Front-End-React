import { FolderKanban, Plus, RefreshCw } from "lucide-react";

interface ProjectPageHeaderProps {
  isFetching: boolean;
  onRefresh: () => void;
  onCreate: () => void;
}

export default function ProjectPageHeader({
  isFetching,
  onRefresh,
  onCreate
}: ProjectPageHeaderProps) {
  return (
    <header className="flex shrink-0 flex-col justify-between gap-3 md:flex-row md:items-center">
      <div>
        <div className="mb-1 flex items-center gap-2 text-xs font-medium text-[#7F96F5]">
          <FolderKanban size={14} />
          <span>QUẢN LÝ NỘI DUNG</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Quản lý dự án
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-gray-400">
          Quản lý dự án phát triển phần mềm và sản phẩm video trên portfolio của
          bạn.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onRefresh}
          disabled={isFetching}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-gray-300 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
          Làm mới
        </button>

        <button
          type="button"
          onClick={onCreate}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#7F96F5] px-4 text-sm font-semibold text-[#0B0B0D] transition hover:bg-[#96A8FF]"
        >
          <Plus size={17} />
          Thêm dự án
        </button>
      </div>
    </header>
  );
}
