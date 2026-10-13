import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_SIZE_OPTIONS } from "./ProjectConstants";

interface ProjectPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  rangeStart: number;
  rangeEnd: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const navBtn =
  "flex size-8 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-30";

export default function ProjectPagination({
  currentPage,
  totalPages,
  totalItems,
  rangeStart,
  rangeEnd,
  pageSize,
  onPageChange,
  onPageSizeChange
}: ProjectPaginationProps) {
  const showAll = pageSize === 0;

  return (
    <div className="flex shrink-0 flex-col gap-3 border-t border-white/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
        <span>
          Hiển thị{" "}
          <span className="font-semibold text-gray-300">
            {rangeStart}-{rangeEnd}
          </span>{" "}
          trong{" "}
          <span className="font-semibold text-gray-300">{totalItems}</span> dự
          án
        </span>

        <select
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="h-8 rounded-lg border border-white/10 bg-[#0B0B0D] px-2 text-xs text-gray-300 outline-none focus:border-[#7F96F5]/60"
          aria-label="Số dự án mỗi trang"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size === 0 ? "Tất cả" : `${size} / trang`}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage <= 1 || showAll}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className={navBtn}
          aria-label="Trang trước"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="min-w-24 text-center text-xs text-gray-400">
          Trang {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          disabled={currentPage >= totalPages || showAll}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className={navBtn}
          aria-label="Trang tiếp theo"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
