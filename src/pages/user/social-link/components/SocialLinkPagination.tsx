import { focusRing } from "./SocialLinkShared";

interface SocialLinkPaginationProps {
  isDark: boolean;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function SocialLinkPagination({
  isDark,
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange
}: SocialLinkPaginationProps) {
  const divider = isDark ? "border-white/[0.07]" : "border-zinc-100";

  const pageBtn = (active: boolean) =>
    `h-8 min-w-8 rounded-lg px-2 text-xs font-medium transition ${focusRing} ${
      active
        ? "bg-indigo-600 text-white"
        : isDark
          ? "text-zinc-300 hover:bg-white/[0.06]"
          : "text-zinc-600 hover:bg-zinc-100"
    }`;

  const navBtn = `h-8 rounded-lg px-3 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${focusRing} ${
    isDark
      ? "text-zinc-300 hover:bg-white/[0.06]"
      : "text-zinc-600 hover:bg-zinc-100"
  }`;

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      className={`mt-auto flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 ${divider}`}
    >
      <p className="text-xs text-zinc-500">
        {totalItems === 0
          ? "Không có liên kết"
          : `Hiển thị ${from}–${to} / ${totalItems} liên kết`}
      </p>

      <nav
        aria-label="Phân trang"
        className="flex items-center justify-center gap-1"
      >
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={navBtn}
        >
          Trước
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={pageBtn(currentPage === page)}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={navBtn}
        >
          Sau
        </button>
      </nav>
    </div>
  );
}
