import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  FileText,
  Hash,
  ListOrdered,
  RefreshCw,
  AlertCircle,
  Copy,
  Check,
  ChevronRight
} from "lucide-react";
import { useWorkStyleById } from "../../../hooks/useWorkStyle";
import { useWorkStyleTheme } from "./components";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

// Suy ra trực tiếp từ hook/theme nên luôn khớp với kiểu thật trong dự án.
type WorkStyleTheme = ReturnType<typeof useWorkStyleTheme>;
type WorkStyleQueryData = ReturnType<typeof useWorkStyleById>["data"];
type WorkStyle = NonNullable<NonNullable<WorkStyleQueryData>["data"]>;

type StateTone = "neutral" | "error";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

interface SkeletonProps {
  className?: string;
}

interface LoadingStateProps {
  t: WorkStyleTheme;
}

interface StateCardProps {
  t: WorkStyleTheme;
  icon: React.ReactNode;
  title: string;
  text: string;
  tone?: StateTone;
  action?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const COPY_RESET_MS = 2000;

const focusRing: string =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F96F5] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

const primaryBtn: string = `inline-flex items-center justify-center gap-2 rounded-xl bg-[#7F96F5] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#7F96F5]/25 transition hover:bg-[#6B83E8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`;

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

function Skeleton({ className = "" }: SkeletonProps): React.JSX.Element {
  return (
    <div
      className={`motion-safe:animate-pulse rounded-lg bg-[#7F96F5]/10 ${className}`}
    />
  );
}

function LoadingState({ t }: LoadingStateProps): React.JSX.Element {
  return (
    <div
      className="grid gap-5 lg:grid-cols-[1fr_320px]"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Đang tải phong cách làm việc...</span>

      <section className={`rounded-3xl border p-6 sm:p-9 ${t.card}`}>
        <Skeleton className="h-14 w-14 rounded-2xl" />
        <Skeleton className="mt-8 h-9 w-3/4" />
        <Skeleton className="mt-6 h-4 w-full" />
        <Skeleton className="mt-3 h-4 w-11/12" />
        <Skeleton className="mt-3 h-4 w-2/3" />
      </section>

      <section className={`rounded-3xl border p-6 ${t.card}`}>
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="mt-6 h-12 w-full" />
        <Skeleton className="mt-4 h-12 w-full" />
        <Skeleton className="mt-4 h-12 w-full" />
      </section>
    </div>
  );
}

function StateCard({
  t,
  icon,
  title,
  text,
  tone = "neutral",
  action
}: StateCardProps): React.JSX.Element {
  const iconTone: string =
    tone === "error"
      ? "bg-red-500/10 text-red-500 ring-red-500/20"
      : "bg-[#7F96F5]/10 text-[#7F96F5] ring-[#7F96F5]/20";

  return (
    <section
      className={`flex min-h-80 flex-col items-center justify-center gap-4 rounded-3xl border p-8 text-center ${t.card}`}
      role={tone === "error" ? "alert" : undefined}
    >
      <div className={`rounded-2xl p-4 ring-8 ${iconTone}`}>{icon}</div>
      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className={`mx-auto max-w-sm text-sm leading-6 ${t.muted}`}>
          {text}
        </p>
      </div>
      {action}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function WorkStyleByIdPage(): React.JSX.Element {
  const params = useParams<RouteParams>();
  const id: string = params.id ?? "";

  const t: WorkStyleTheme = useWorkStyleTheme();
  const { data, isLoading, isError, refetch } = useWorkStyleById(id);

  const [copied, setCopied] = React.useState<boolean>(false);
  const resetTimerRef = React.useRef<number | null>(null);

  const workStyle: WorkStyle | null = data?.data ?? null;

  // Dọn timer khi unmount để tránh setState trên component đã gỡ.
  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopyId = async (): Promise<void> => {
    if (!workStyle) {
      return;
    }

    try {
      await navigator.clipboard.writeText(String(workStyle.id));
      setCopied(true);

      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(() => {
        setCopied(false);
        resetTimerRef.current = null;
      }, COPY_RESET_MS);
    } catch {
      setCopied(false);
    }
  };

  const orderLabel: string = workStyle
    ? Number.isFinite(Number(workStyle.displayOrder))
      ? String(workStyle.displayOrder).padStart(2, "0")
      : String(workStyle.displayOrder)
    : "";

  return (
    <div
      className={`relative min-h-screen overflow-hidden p-4 lg:p-8 ${t.page}`}
    >
      {/* Nền trang trí nhẹ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-[#7F96F5]/10 blur-3xl"
      />

      <div className="relative space-y-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className={`flex flex-wrap items-center gap-1.5 text-sm ${t.muted}`}
        >
          <Link
            to="/work-styles"
            className={`rounded-md transition hover:text-[#7F96F5] ${focusRing}`}
          >
            Quản lý phong cách làm việc
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span className={`font-medium ${t.strong}`} aria-current="page">
            Chi tiết
          </span>
        </nav>

        {/* Header */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Chi tiết phong cách làm việc
            </h1>
            <p className={`mt-2 text-sm ${t.muted}`}>
              Xem thông tin chi tiết của bản ghi trong hệ thống.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/work-styles"
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:border-[#7F96F5] hover:text-[#7F96F5] ${t.divider} ${focusRing}`}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Quay lại
            </Link>

            <button
              type="button"
              onClick={() => void refetch()}
              disabled={isLoading}
              className={primaryBtn}
            >
              <RefreshCw
                size={16}
                aria-hidden="true"
                className={isLoading ? "motion-safe:animate-spin" : ""}
              />
              Làm mới
            </button>
          </div>
        </header>

        {/* Loading */}
        {isLoading && <LoadingState t={t} />}

        {/* Error */}
        {!isLoading && isError && (
          <StateCard
            t={t}
            tone="error"
            icon={<AlertCircle size={30} aria-hidden="true" />}
            title="Không thể tải thông tin"
            text="Đã xảy ra lỗi khi lấy phong cách làm việc. Kiểm tra kết nối rồi thử lại."
            action={
              <button
                type="button"
                onClick={() => void refetch()}
                className={primaryBtn}
              >
                <RefreshCw size={16} aria-hidden="true" />
                Thử lại
              </button>
            }
          />
        )}

        {/* Detail */}
        {!isLoading && !isError && workStyle && (
          <div className="grid items-start gap-5 lg:grid-cols-[1fr_320px]">
            {/* Hero: nội dung chính */}
            <section
              className={`relative overflow-hidden rounded-3xl border ${t.card}`}
            >
              {/* Vạch nhấn bên trái */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#7F96F5] to-[#7F96F5]/10"
              />

              {/* Số thứ tự khổng lồ làm điểm nhấn */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-8 select-none text-[10rem] font-black leading-none tracking-tighter text-[#7F96F5]/10 sm:text-[13rem]"
              >
                {orderLabel}
              </span>

              <div className="relative p-6 pl-8 sm:p-10 sm:pl-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7F96F5]/15 text-[#7F96F5] ring-8 ring-[#7F96F5]/5">
                  <BriefcaseBusiness size={26} aria-hidden="true" />
                </div>

                <p className={`mt-7 text-sm font-medium ${t.muted}`}>
                  Phong cách làm việc · Thứ tự #{workStyle.displayOrder}
                </p>

                <h2 className="mt-2 max-w-2xl break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  {workStyle.title}
                </h2>

                <div className="mt-6 h-px w-16 bg-[#7F96F5]/40" />

                <p
                  className={`mt-6 max-w-2xl whitespace-pre-wrap break-words text-base leading-8 ${t.muted}`}
                >
                  {workStyle.description}
                </p>
              </div>
            </section>

            {/* Sidebar: thông tin bản ghi */}
            <aside className={`overflow-hidden rounded-3xl border ${t.card}`}>
              <div className={`border-b p-5 ${t.divider}`}>
                <h2 className="font-semibold">Thông tin bản ghi</h2>
                <p className={`mt-1 text-xs leading-5 ${t.muted}`}>
                  Dữ liệu được trả về từ hệ thống.
                </p>
              </div>

              <dl className="divide-y divide-inherit">
                {/* ID */}
                <div className={`p-5 ${t.divider}`}>
                  <dt
                    className={`flex items-center gap-2 text-xs font-medium ${t.muted}`}
                  >
                    <Hash size={14} aria-hidden="true" />
                    Mã định danh
                  </dt>
                  <dd className="mt-2.5 space-y-3">
                    <code className="block break-all rounded-lg bg-[#7F96F5]/5 px-3 py-2 text-xs leading-5 ring-1 ring-inset ring-[#7F96F5]/15">
                      {workStyle.id}
                    </code>

                    <button
                      type="button"
                      onClick={() => void handleCopyId()}
                      aria-label="Sao chép mã định danh"
                      className={`inline-flex w-full items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition ${focusRing} ${
                        copied
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
                          : `${t.divider} hover:border-[#7F96F5] hover:text-[#7F96F5]`
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check size={14} aria-hidden="true" />
                          Đã sao chép
                        </>
                      ) : (
                        <>
                          <Copy size={14} aria-hidden="true" />
                          Sao chép ID
                        </>
                      )}
                    </button>
                    <span className="sr-only" role="status" aria-live="polite">
                      {copied ? "Đã sao chép mã định danh" : ""}
                    </span>
                  </dd>
                </div>

                {/* Tên */}
                <div className={`p-5 ${t.divider}`}>
                  <dt
                    className={`flex items-center gap-2 text-xs font-medium ${t.muted}`}
                  >
                    <BriefcaseBusiness size={14} aria-hidden="true" />
                    Tên phong cách
                  </dt>
                  <dd className="mt-2 break-words text-sm font-semibold">
                    {workStyle.title}
                  </dd>
                </div>

                {/* Mô tả */}
                <div className={`p-5 ${t.divider}`}>
                  <dt
                    className={`flex items-center gap-2 text-xs font-medium ${t.muted}`}
                  >
                    <FileText size={14} aria-hidden="true" />
                    Mô tả
                  </dt>
                  <dd
                    className={`mt-2 line-clamp-4 whitespace-pre-wrap break-words text-sm leading-6 ${t.muted}`}
                    title={workStyle.description}
                  >
                    {workStyle.description}
                  </dd>
                </div>

                {/* Thứ tự */}
                <div className={`p-5 ${t.divider}`}>
                  <dt
                    className={`flex items-center gap-2 text-xs font-medium ${t.muted}`}
                  >
                    <ListOrdered size={14} aria-hidden="true" />
                    Thứ tự hiển thị
                  </dt>
                  <dd className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#7F96F5]">
                      {workStyle.displayOrder}
                    </span>
                    <span className={`text-xs ${t.muted}`}>
                      vị trí trong danh sách
                    </span>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && !workStyle && (
          <StateCard
            t={t}
            icon={<FileText size={30} aria-hidden="true" />}
            title="Không tìm thấy phong cách làm việc"
            text="Không có dữ liệu cho mã định danh này. Bản ghi có thể đã bị xóa."
            action={
              <Link to="/work-styles" className={primaryBtn}>
                <ArrowLeft size={16} aria-hidden="true" />
                Quay lại danh sách
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}
