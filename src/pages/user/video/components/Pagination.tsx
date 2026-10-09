import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  isDark: boolean;
  /** 1-based index of the first / last item shown on this page. */
  from: number;
  to: number;
  /** Items matching the current filters. */
  total: number;
  /** All items in the library (used for the "filtered from" hint). */
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

  return (
    <div
      className={`flex shrink-0 flex-col gap-3 border-t px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-5 ${
        isDark
          ? "border-black text-slate-400"
          : "border-slate-200 text-slate-600"
      }`}
    >
      <p>
        Showing {from}–{to} of {total}
        {total !== libraryTotal && ` (filtered from ${libraryTotal})`}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={arrowClass}
        >
          <ChevronLeft size={16} />
        </button>

        <span className="px-2 tabular-nums">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={arrowClass}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
