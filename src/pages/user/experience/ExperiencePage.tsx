import React from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  Search,
  RefreshCw,
  Clock3,
  Building2,
  CircleCheck,
  AlertCircle,
  X,
  Layers,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useGetAllExperience } from "../../../hooks/useExperience";
import { ExperienceProps } from "../../../services/experience/ExperienceTypes";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 0];
const DEFAULT_PAGE_SIZE = 5;

/**
 * Trang cố định cao = 100dvh - chiều cao header của layout (80px).
 * Bảng cuộn bên trong khung, thanh phân trang luôn nằm đáy màn hình
 * và giao diện không đổi khi đổi số dòng mỗi trang.
 * Nếu header layout của bạn cao khác 80px thì sửa số này.
 */
const PAGE_HEIGHT = "lg:h-[calc(100dvh-80px)]";

const fieldClass =
  "h-9 rounded-lg border border-white/10 bg-[#090A0D] px-3 text-sm text-gray-200 outline-none transition focus:border-[#8B9FF8]";

const th =
  "sticky top-0 z-10 bg-[#12131A] px-4 py-2.5 text-xs font-medium text-gray-400 shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]";

const navBtn =
  "flex size-8 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-30";

const formatDate = (date: string | null): string => {
  if (date === null || date === "") {
    return "Hiện tại";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(parsedDate);
};

interface StatCardProps {
  label: string;
  value: number;
  valueClass?: string;
  iconClass: string;
  icon: React.ReactNode;
}

function StatCard({ label, value, valueClass, iconClass, icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#12131A] px-4 py-3">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${iconClass}`}
      >
        {icon}
      </div>

      <p className="min-w-0 flex-1 truncate text-sm text-gray-400">{label}</p>

      <p
        className={`text-2xl font-bold tracking-tight ${valueClass ?? "text-white"}`}
      >
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ isCurrent, short }: { isCurrent: boolean; short?: boolean }) {
  if (isCurrent) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
        {short ? "Đang làm" : "Đang làm việc"}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-gray-400">
      {short ? "Kết thúc" : "Đã kết thúc"}
    </span>
  );
}

const ExperiencePage: React.FC = () => {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetAllExperience();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);

  const experiences: ExperienceProps[] = React.useMemo(() => {
    if (!data || !Array.isArray(data.data)) {
      return [];
    }

    return [...data.data].sort(
      (first, second) => first.displayOrder - second.displayOrder
    );
  }, [data]);

  const filteredExperiences = React.useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return experiences.filter((experience) => {
      const matchesSearch =
        experience.companyName.toLowerCase().includes(keyword) ||
        experience.position.toLowerCase().includes(keyword) ||
        experience.description.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "current" && experience.isCurrent) ||
        (statusFilter === "past" && !experience.isCurrent);

      return matchesSearch && matchesStatus;
    });
  }, [experiences, searchTerm, statusFilter]);

  const showAll = pageSize === 0;
  const totalItems = filteredExperiences.length;
  const totalPages = showAll
    ? 1
    : Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedExperiences = React.useMemo(() => {
    if (showAll) {
      return filteredExperiences;
    }

    const startIndex = (currentPage - 1) * pageSize;

    return filteredExperiences.slice(startIndex, startIndex + pageSize);
  }, [filteredExperiences, showAll, currentPage, pageSize]);

  const rangeStart =
    totalItems === 0 ? 0 : showAll ? 1 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = showAll
    ? totalItems
    : Math.min(currentPage * pageSize, totalItems);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  const currentCount = experiences.filter(
    (experience) => experience.isCurrent
  ).length;

  const companyCount = new Set(
    experiences.map((experience) => experience.companyName)
  ).size;

  return (
    // Không dùng min-h-[calc(100vh-64px)]: header thực tế cao hơn nên đáy trang bị cắt.
    <div
      className={`flex w-full flex-col bg-[#090A0D] text-[#ECECF1] antialiased ${PAGE_HEIGHT}`}
    >
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-3 p-4 sm:p-5">
        {/* Header */}
        <header className="flex shrink-0 flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#8B9FF8]">
              <BriefcaseBusiness size={13} />
              <span>HỒ SƠ NGHỀ NGHIỆP</span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Kinh nghiệm làm việc
            </h1>
            <p className="text-sm text-gray-400">
              Quản lý lịch sử công tác, dự án và kinh nghiệm chuyên môn của bạn.
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#16171E] px-4 text-sm font-medium text-gray-200 transition hover:border-white/20 hover:bg-[#1E1F29] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={`text-[#8B9FF8] ${isFetching ? "animate-spin" : ""}`}
            />
            <span>{isFetching ? "Đang đồng bộ..." : "Làm mới dữ liệu"}</span>
          </button>
        </header>

        {/* Statistics */}
        <section className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            label="Tổng kinh nghiệm"
            value={experiences.length}
            iconClass="border-indigo-500/20 bg-indigo-500/10 text-[#8B9FF8]"
            icon={<Layers size={18} />}
          />
          <StatCard
            label="Đang làm việc"
            value={currentCount}
            valueClass="text-emerald-400"
            iconClass="border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
            icon={<CircleCheck size={18} />}
          />
          <StatCard
            label="Doanh nghiệp / Công ty"
            value={companyCount}
            iconClass="border-violet-400/20 bg-violet-400/10 text-violet-400"
            icon={<Building2 size={18} />}
          />
        </section>

        {/* Danh sách: tiêu đề + tìm kiếm / lọc - bảng (cuộn) - phân trang */}
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#12131A]">
          <div className="flex shrink-0 flex-col gap-3 border-b border-white/[0.08] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-base font-semibold leading-6 text-white">
                  Danh sách chi tiết
                </h2>
                <p className="text-xs text-gray-400">
                  Hiển thị {paginatedExperiences.length} trên tổng số{" "}
                  {experiences.length} bản ghi
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
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Tìm vị trí, công ty hoặc từ khóa..."
                  aria-label="Tìm kinh nghiệm"
                  className={`${fieldClass} w-full pl-9 pr-9 placeholder:text-gray-500`}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    aria-label="Xóa từ khóa"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <select
                value={statusFilter}
                onChange={(event) => handleStatusChange(event.target.value)}
                aria-label="Lọc theo trạng thái"
                className={`${fieldClass} cursor-pointer`}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="current">Đang làm việc</option>
                <option value="past">Đã kết thúc</option>
              </select>
            </div>
          </div>

          {/* Vùng nội dung: chiếm hết chỗ còn lại, cuộn bên trong */}
          <div className="min-h-64 flex-1 overflow-auto overscroll-contain [scrollbar-gutter:stable] lg:min-h-0">
            {isLoading ? (
              <div className="flex h-full min-h-64 items-center justify-center gap-2">
                <RefreshCw size={24} className="animate-spin text-[#8B9FF8]" />
                <p className="text-sm font-medium text-gray-400">
                  Đang tải danh sách...
                </p>
              </div>
            ) : isError ? (
              <div className="flex h-full min-h-64 flex-col items-center justify-center gap-2 px-4 text-center">
                <AlertCircle size={28} className="text-red-400" />
                <p className="text-sm font-semibold text-white">
                  Không thể tải danh sách kinh nghiệm
                </p>
                <p className="max-w-md text-xs text-gray-400">
                  {error instanceof Error
                    ? error.message
                    : "Đã xảy ra lỗi khi kết nối máy chủ. Vui lòng thử lại sau."}
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-1 rounded-lg bg-[#8B9FF8] px-4 py-1.5 text-sm font-semibold text-[#090A0D]"
                >
                  Tải lại
                </button>
              </div>
            ) : paginatedExperiences.length === 0 ? (
              <div className="flex h-full min-h-64 flex-col items-center justify-center gap-2 px-4 text-center">
                <div className="flex size-11 items-center justify-center rounded-xl bg-white/[0.03] text-gray-500">
                  <BriefcaseBusiness size={20} />
                </div>
                <p className="text-sm font-medium text-white">
                  Không tìm thấy kinh nghiệm phù hợp
                </p>
                <p className="text-xs text-gray-400">
                  Hãy thử làm mới bộ lọc hoặc nhập từ khóa tìm kiếm khác.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop: bảng */}
                <table className="hidden w-full min-w-[850px] border-collapse text-left md:table">
                  <thead>
                    <tr>
                      <th className={th}>Công ty & Vị trí</th>
                      <th className={th}>Thời gian công tác</th>
                      <th className={th}>Mô tả công việc</th>
                      <th className={`${th} text-right`}>Trạng thái</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/[0.05]">
                    {paginatedExperiences.map((experience) => (
                      <tr
                        key={experience.id}
                        className="transition-colors hover:bg-white/[0.02]"
                      >
                        <td className="px-4 py-2.5 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#8B9FF8]">
                              <Building2 size={17} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold leading-5 text-white">
                                {experience.companyName}
                              </p>
                              <p className="text-xs font-medium leading-4 text-[#8B9FF8]">
                                {experience.position}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-2.5 align-middle">
                          <div className="inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-[#090A0D]/60 px-2 py-1 text-xs text-gray-300">
                            <Clock3 size={12} className="text-gray-400" />
                            <span>{formatDate(experience.startDate)}</span>
                            <span className="text-gray-600">—</span>
                            <span
                              className={
                                experience.isCurrent
                                  ? "font-medium text-emerald-400"
                                  : ""
                              }
                            >
                              {experience.isCurrent
                                ? "Hiện tại"
                                : formatDate(experience.endDate)}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-2.5 align-middle">
                          <p
                            title={experience.description}
                            className="max-w-[420px] truncate text-xs text-gray-300"
                          >
                            {experience.description}
                          </p>
                        </td>

                        <td className="whitespace-nowrap px-4 py-2.5 text-right align-middle">
                          <StatusBadge isCurrent={experience.isCurrent} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile: thẻ */}
                <div className="divide-y divide-white/[0.06] p-2 md:hidden">
                  {paginatedExperiences.map((experience) => (
                    <div key={experience.id} className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#8B9FF8]">
                            <Building2 size={17} />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-white">
                              {experience.companyName}
                            </h3>
                            <p className="text-xs font-medium text-[#8B9FF8]">
                              {experience.position}
                            </p>
                          </div>
                        </div>

                        <StatusBadge isCurrent={experience.isCurrent} short />
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                        <CalendarDays size={12} />
                        <span>{formatDate(experience.startDate)} — </span>
                        <span
                          className={
                            experience.isCurrent
                              ? "font-medium text-emerald-400"
                              : ""
                          }
                        >
                          {experience.isCurrent
                            ? "Hiện tại"
                            : formatDate(experience.endDate)}
                        </span>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-gray-300">
                        {experience.description}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Phân trang: ghim ở đáy khung */}
          {!isLoading && !isError && totalItems > 0 && (
            <div className="flex shrink-0 flex-col gap-3 border-t border-white/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                <span>
                  Hiển thị{" "}
                  <span className="font-semibold text-gray-200">
                    {rangeStart}-{rangeEnd}
                  </span>{" "}
                  trong{" "}
                  <span className="font-semibold text-gray-200">
                    {totalItems}
                  </span>{" "}
                  kinh nghiệm
                </span>

                <select
                  value={pageSize}
                  onChange={(event) =>
                    handlePageSizeChange(Number(event.target.value))
                  }
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
                  onClick={() => setPage(Math.max(1, currentPage - 1))}
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
                  onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                  className={navBtn}
                  aria-label="Trang tiếp theo"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ExperiencePage;