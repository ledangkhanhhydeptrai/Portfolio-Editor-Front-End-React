import { CalendarDays, Search, X } from "lucide-react";
import { fieldClass } from "../constants";

interface ExperienceListHeaderProps {
  shownCount: number;
  totalCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export function ExperienceListHeader({
  shownCount,
  totalCount,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange
}: ExperienceListHeaderProps) {
  return (
    <div className="flex shrink-0 flex-col gap-3 border-b border-white/[0.08] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-base font-semibold leading-6 text-white">
            Danh sách chi tiết
          </h2>
          <p className="text-xs text-gray-400">
            Hiển thị {shownCount} trên tổng số {totalCount} bản ghi
          </p>
        </div>

        <span className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-gray-300 xl:inline-flex">
          <CalendarDays size={12} className="text-[#8B9FF8]" />
          Thứ tự hiển thị
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative sm:w-80">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Tìm vị trí, công ty hoặc từ khóa..."
            aria-label="Tìm kinh nghiệm"
            className={`${fieldClass} w-full pl-9 pr-9 placeholder:text-gray-500`}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Xóa từ khóa"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
          aria-label="Lọc theo trạng thái"
          className={`${fieldClass} cursor-pointer`}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="current">Đang làm việc</option>
          <option value="past">Đã kết thúc</option>
        </select>
      </div>
    </div>
  );
}