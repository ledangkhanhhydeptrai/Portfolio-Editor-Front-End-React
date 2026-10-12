import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_SIZE_OPTIONS } from "./skillConstants";

interface SkillPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  totalAll: number;
  rangeStart: number;
  rangeEnd: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");

  pages.push(total);
  return pages;
}

export default function SkillPagination({
  currentPage,
  totalPages,
  totalItems,
  totalAll,
  rangeStart,
  rangeEnd,
  pageSize,
  onPageChange,
  onPageSizeChange
}: SkillPaginationProps) {
  const showAll = pageSize === 0;

  return (
    <div className="flex flex-col gap-4 border-t border-white/[0.08] px-5 py-4 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <span>
          Hiển thị {rangeStart}–{rangeEnd} / {totalItems} kỹ năng
          {totalItems !== totalAll && ` (tổng ${totalAll})`}
        </span>

        <label className="flex items-center gap-2">
          <span>Số dòng</span>
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="h-8 rounded-lg border border-white/10 bg-[#18181D] px-2 text-xs text-white/75 outline-none focus:border-[#7F96F5]/60"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size === 0 ? "Tất cả" : size}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!showAll && totalPages > 1 && (
        <nav className="flex items-center gap-1.5" aria-label="Phân trang">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Trang trước"
            className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-white/60 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={15} />
          </button>

          {getPageNumbers(currentPage, totalPages).map((item, index) =>
            item === "..." ? (
              <span
                key={`dots-${index}`}
                className="flex size-8 items-center justify-center text-white/30"
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={item === currentPage ? "page" : undefined}
                className={`flex size-8 items-center justify-center rounded-lg border text-xs font-medium transition ${
                  item === currentPage
                    ? "border-[#7F96F5] bg-[#7F96F5] text-[#0B0B0D]"
                    : "border-white/10 text-white/60 hover:bg-white/[0.05]"
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Trang sau"
            className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-white/60 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={15} />
          </button>
        </nav>
      )}
    </div>
  );
}
