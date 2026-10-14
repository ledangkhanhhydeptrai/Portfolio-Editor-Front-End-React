import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Pencil,
  RefreshCw,
  Star,
  Trash2
} from "lucide-react";

import type { CurriculumTypes } from "../../../../services/curriculum/CurriculumTypes";
import Button from "../../../../components/ui/Button";

interface CurriculumTableProps {
  curriculums: CurriculumTypes[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onSelectCurriculum: (curriculum: CurriculumTypes) => void;
  onOpenFile: (fileUrl: string) => void;
  onDownloadFile: (curriculum: CurriculumTypes) => void;
  onUpdateCurriculum: (curriculum: CurriculumTypes) => void;
  onDeleteCurriculum: (curriculum: CurriculumTypes) => void;
}

// Phải khớp với class h-12 / h-16 bên dưới để tính số dòng chính xác
const HEADER_HEIGHT = 48;
const ROW_HEIGHT = 64;
const MIN_ROWS = 3;

type Tone = "neutral" | "violet" | "indigo" | "emerald" | "amber" | "red";

const TONE_CLASS: Record<Tone, string> = {
  neutral: "hover:bg-white/[0.07] hover:text-gray-100",
  violet: "hover:bg-violet-400/10 hover:text-violet-300",
  indigo: "hover:bg-indigo-400/10 hover:text-indigo-300",
  emerald: "hover:bg-emerald-400/10 hover:text-emerald-300",
  amber: "hover:bg-amber-400/10 hover:text-amber-300",
  red: "hover:bg-red-400/10 hover:text-red-300"
};

interface IconButtonProps {
  label: string;
  tone?: Tone;
  onClick: () => void;
  children: React.ReactNode;
}

function IconButton({
  label,
  tone = "neutral",
  onClick,
  children
}: IconButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 ${TONE_CLASS[tone]}`}
    >
      {children}
    </button>
  );
}

/** Lấy tên file từ URL để hiển thị phía dưới tiêu đề. */
function getFileName(fileUrl: string): string {
  try {
    const { pathname } = new URL(fileUrl);
    const last = pathname.split("/").filter(Boolean).pop();

    return last === undefined ? "Tài liệu PDF" : decodeURIComponent(last);
  } catch {
    return "Tài liệu PDF";
  }
}

/** Tạo danh sách số trang gọn: 1 … 4 5 6 … 12 */
function getPageItems(current: number, total: number): (number | "gap")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: (number | "gap")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) {
    items.push("gap");
  }

  for (let value = start; value <= end; value += 1) {
    items.push(value);
  }

  if (end < total - 1) {
    items.push("gap");
  }

  items.push(total);

  return items;
}

export default function CurriculumTable({
  curriculums,
  total,
  isLoading,
  isError,
  onRetry,
  onSelectCurriculum,
  onOpenFile,
  onDownloadFile,
  onUpdateCurriculum,
  onDeleteCurriculum
}: CurriculumTableProps): React.ReactElement {
  const navigate = useNavigate();
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = React.useState(6);
  const [page, setPage] = React.useState(1);

  // Tự tính số dòng vừa khít chiều cao còn lại -> không cần scroll
  React.useLayoutEffect(() => {
    const element = bodyRef.current;

    if (element === null) {
      return;
    }

    const calculate = (): void => {
      const available = element.clientHeight - HEADER_HEIGHT;
      const rows = Math.max(MIN_ROWS, Math.floor(available / ROW_HEIGHT));

      setPageSize(rows);
    };

    calculate();

    const observer = new ResizeObserver(calculate);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Đổi bộ lọc / dữ liệu -> về trang 1
  React.useEffect(() => {
    setPage(1);
  }, [curriculums.length]);

  const totalPages = Math.max(1, Math.ceil(curriculums.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  const pagedCurriculums = React.useMemo(
    () => curriculums.slice(startIndex, startIndex + pageSize),
    [curriculums, startIndex, pageSize]
  );

  const pageItems = React.useMemo(
    () => getPageItems(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const renderState = (): React.ReactNode => {
    if (isLoading) {
      return (
        <div aria-busy="true" aria-live="polite">
          <div className="h-12 border-b border-white/[0.08] bg-white/[0.02]" />

          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className="flex h-16 animate-pulse items-center gap-3 border-b border-white/[0.06] px-6"
            >
              <div className="h-10 w-10 rounded-xl bg-white/[0.06]" />

              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/3 rounded bg-white/[0.06]" />
                <div className="h-2.5 w-1/5 rounded bg-white/[0.04]" />
              </div>

              <div className="h-6 w-20 rounded-full bg-white/[0.05]" />
            </div>
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-400/10">
            <AlertCircle size={26} className="text-red-400" />
          </div>

          <p className="mt-4 font-medium text-gray-100">
            Không thể tải danh sách CV
          </p>
          <p className="mb-5 mt-1.5 text-sm text-gray-500">
            Kiểm tra kết nối rồi thử lại.
          </p>

          <Button type="button" variant="secondary" onClick={onRetry}>
            <RefreshCw size={15} className="mr-2" />
            Thử lại
          </Button>
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
          <FileText size={26} className="text-gray-500" />
        </div>

        <p className="mt-4 font-medium text-gray-100">
          {total === 0 ? "Chưa có CV nào" : "Không tìm thấy CV phù hợp"}
        </p>
        <p className="mt-1.5 text-sm text-gray-500">
          {total === 0
            ? "Thêm CV đầu tiên để nó xuất hiện trong danh sách này."
            : "Thử đổi từ khóa hoặc bỏ bớt bộ lọc."}
        </p>
      </div>
    );
  };

  const hasData = !isLoading && !isError && curriculums.length > 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Vùng bảng: chiếm hết chiều cao còn lại, không scroll dọc */}
      <div
        ref={bodyRef}
        className="min-h-0 flex-1 overflow-y-hidden overflow-x-auto"
      >
        {hasData ? (
          <table className="w-full min-w-[820px] table-fixed text-left">
            <colgroup>
              <col />
              <col className="w-28" />
              <col className="w-36" />
              <col className="w-60" />
            </colgroup>

            <thead>
              <tr className="h-12 border-b border-white/[0.08] bg-white/[0.02] text-xs text-gray-500">
                <th className="px-6 font-medium">Tài liệu</th>
                <th className="px-6 font-medium">Thứ tự</th>
                <th className="px-6 font-medium">Trạng thái</th>
                <th className="px-6 text-right font-medium">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.06]">
              {pagedCurriculums.map((curriculum) => (
                <tr
                  key={curriculum.id}
                  className="group h-16 transition-colors hover:bg-white/[0.03]"
                >
                  <td className="relative px-6">
                    {/* Vạch nhấn cho CV chính */}
                    {curriculum.isPrimary && (
                      <span
                        aria-hidden
                        className="absolute inset-y-3 left-0 w-0.5 rounded-r bg-amber-400"
                      />
                    )}

                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          curriculum.isPrimary
                            ? "bg-amber-400/10 text-amber-300"
                            : "bg-indigo-400/10 text-indigo-300"
                        }`}
                      >
                        <FileText size={20} />
                      </div>

                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectCurriculum(curriculum);
                          }}
                          className="block w-full truncate text-left text-sm font-semibold text-gray-100 transition hover:text-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
                        >
                          {curriculum.title}
                        </button>

                        <p className="mt-0.5 truncate text-xs text-gray-500">
                          {getFileName(curriculum.fileUrl)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6">
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-white/[0.05] px-2 text-sm tabular-nums text-gray-300">
                      {curriculum.displayOrder}
                    </span>
                  </td>

                  <td className="px-6">
                    {curriculum.isPrimary ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-300">
                        <Star size={12} className="fill-amber-300" />
                        CV chính
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 py-1 text-xs text-gray-400">
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 rounded-full bg-gray-500"
                        />
                        CV phụ
                      </span>
                    )}
                  </td>

                  <td className="px-6">
                    <div className="flex items-center justify-end gap-0.5">
                      <IconButton
                        label={`Xem chi tiết ${curriculum.title}`}
                        tone="violet"
                        onClick={() => {
                          navigate(`/curriculum/${curriculum.id}`);
                        }}
                      >
                        <Eye size={16} />
                      </IconButton>

                      <IconButton
                        label={`Mở file ${curriculum.title}`}
                        tone="indigo"
                        onClick={() => {
                          onOpenFile(curriculum.fileUrl);
                        }}
                      >
                        <ExternalLink size={16} />
                      </IconButton>

                      <IconButton
                        label={`Tải ${curriculum.title}`}
                        tone="emerald"
                        onClick={() => {
                          onDownloadFile(curriculum);
                        }}
                      >
                        <Download size={16} />
                      </IconButton>

                      <span
                        aria-hidden
                        className="mx-1.5 h-4 w-px bg-white/[0.1]"
                      />

                      <IconButton
                        label={`Cập nhật ${curriculum.title}`}
                        tone="amber"
                        onClick={() => {
                          onUpdateCurriculum(curriculum);
                        }}
                      >
                        <Pencil size={16} />
                      </IconButton>

                      <IconButton
                        label={`Xóa ${curriculum.title}`}
                        tone="red"
                        onClick={() => {
                          onDeleteCurriculum(curriculum);
                        }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          renderState()
        )}
      </div>

      {/* Footer + phân trang: luôn ghim ở đáy, không bị che */}
      {hasData && (
        <div className="flex shrink-0 flex-col gap-2 border-t border-white/[0.08] px-6 py-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Hiển thị{" "}
            <span className="font-medium text-gray-300">
              {startIndex + 1}–{startIndex + pagedCurriculums.length}
            </span>{" "}
            trên{" "}
            <span className="font-medium text-gray-300">
              {curriculums.length}
            </span>{" "}
            CV
            {curriculums.length !== total && <span> (tổng {total})</span>}
          </p>

          <nav aria-label="Phân trang" className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => {
                setPage(currentPage - 1);
              }}
              aria-label="Trang trước"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/[0.06] hover:text-gray-100 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={16} />
            </button>

            {pageItems.map((item, index) =>
              item === "gap" ? (
                <span
                  key={`gap-${index}`}
                  aria-hidden
                  className="w-6 text-center text-gray-600"
                >
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setPage(item);
                  }}
                  aria-label={`Trang ${item}`}
                  aria-current={item === currentPage ? "page" : undefined}
                  className={`h-8 min-w-8 rounded-lg px-2 text-sm tabular-nums transition ${
                    item === currentPage
                      ? "bg-indigo-400/15 font-semibold text-indigo-300"
                      : "text-gray-400 hover:bg-white/[0.06] hover:text-gray-100"
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => {
                setPage(currentPage + 1);
              }}
              aria-label="Trang sau"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/[0.06] hover:text-gray-100 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent"
            >
              <ChevronRight size={16} />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}