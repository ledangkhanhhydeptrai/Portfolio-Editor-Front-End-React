import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  isDark: boolean;
  from: number;
  to: number;
  total: number;
  libraryTotal: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  isDark,
  from,
  to,
  total,
  libraryTotal,
  currentPage,
  totalPages,
  onPageChange
}) => {
  const arrowClass = `rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-40 ${
    isDark
      ? "hover:bg-slate-800 disabled:hover:bg-transparent"
      : "hover:bg-slate-100 disabled:hover:bg-transparent"
  }`;

  const handlePrevious = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div
      className={`flex shrink-0 flex-col gap-3 border-t px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-5 ${
        isDark
          ? "border-black text-slate-400"
          : "border-slate-200 text-slate-600"
      }`}
    >
      <p>
        Hiển thị {from}–{to} trong tổng số {total}
        {total !== libraryTotal &&
          ` (đã lọc từ ${libraryTotal} video)`}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentPage <= 1 || total === 0}
          aria-label="Trang trước"
          className={arrowClass}
        >
          <ChevronLeft size={16} />
        </button>

        <span className="px-2 tabular-nums">
          Trang {total === 0 ? 0 : currentPage} / {totalPages}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage >= totalPages || total === 0}
          aria-label="Trang tiếp theo"
          className={arrowClass}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;