import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_SIZE_OPTIONS } from "../constants";

const navBtn =
  "flex size-8 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-30";

interface ExperiencePaginationProps {
  rangeStart: number;
  rangeEnd: number;
  totalItems: number;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
  currentPage: number;
  totalPages: number;
  showAll: boolean;
  onPageChange: (page: number) => void;
}

export function ExperiencePagination({
  rangeStart,
  rangeEnd,
  totalItems,
  pageSize,
  onPageSizeChange,
  currentPage,
  totalPages,
  showAll,
  onPageChange
}: ExperiencePaginationProps) {
  return (
    <div className="flex shrink-0 flex-col gap-3 border-t border-white/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
        <span>
          Hiển thị{" "}
          <span className="font-semibold text-gray-200">
            {rangeStart}-{rangeEnd}
          </span>{" "}
          trong{" "}
          <span className="font-semibold text-gray-200">{totalItems}</span> kinh
          nghiệm
        </span>

        <select
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          aria-label="Số dòng mỗi trang"
          className="h-8 rounded-lg border border-white/10 bg-[#090A0D] px-2 text-xs text-gray-200 outline-none focus:border-[#8B9FF8]"
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
