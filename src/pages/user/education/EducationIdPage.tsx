import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  GraduationCap,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  CircleDashed,
  Copy,
  Check
} from "lucide-react";
import { useGetEducationById } from "../../../hooks/useEducation";
import { EducationProps } from "../../../services/education/EducationTypes";

const PAGE_HEIGHT = "lg:h-[calc(100dvh-64px)]";

const panel = "rounded-2xl border border-white/[0.07] bg-[#0E1015]";

const ghostBtn =
  "inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-gray-300 transition hover:bg-white/[0.09] disabled:cursor-not-allowed disabled:opacity-50";

const EducationIdPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetEducationById(id || "");

  const education: EducationProps | null = data && data.data ? data.data : null;

  const currentYear = new Date().getFullYear();
  const isCompleted = education !== null && education.endYear <= currentYear;

  const goBack = () => navigate(-1);

  const renderBody = () => {
    if (!id) {
      return (
        <StateView
          icon={<AlertCircle size={26} />}
          title="Thiếu mã học vấn"
          description="Không tìm thấy ID học vấn trên đường dẫn."
          action={
            <button type="button" onClick={goBack} className={ghostBtn}>
              <ArrowLeft size={16} />
              Quay lại
            </button>
          }
        />
      );
    }

    if (isLoading) {
      return (
        <StateView
          icon={<RefreshCw size={26} className="animate-spin" />}
          title="Đang tải thông tin học vấn"
          description="Vui lòng chờ trong giây lát."
        />
      );
    }

    if (isError) {
      return (
        <StateView
          icon={<AlertCircle size={26} />}
          title="Không thể tải thông tin học vấn"
          description={
            error instanceof Error
              ? error.message
              : "Đã xảy ra lỗi khi tải dữ liệu."
          }
          action={
            <button
              type="button"
              onClick={() => refetch()}
              className={ghostBtn}
            >
              <RefreshCw size={16} />
              Thử lại
            </button>
          }
        />
      );
    }

    if (education === null) {
      return (
        <StateView
          icon={<GraduationCap size={26} />}
          title="Không tìm thấy học vấn"
          description="Thông tin học vấn này không tồn tại hoặc không có dữ liệu."
          action={
            <button type="button" onClick={goBack} className={ghostBtn}>
              <ArrowLeft size={16} />
              Quay lại danh sách
            </button>
          }
        />
      );
    }

    const duration = Math.max(education.endYear - education.startYear, 0);
    const span = Math.max(education.endYear - education.startYear, 1);
    const progress = Math.min(
      100,
      Math.max(0, ((currentYear - education.startYear) / span) * 100)
    );
    const description = (education.description ?? "").trim();

    return (
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-1">
        {/* ── Left: identity + description ── */}
        <div className="flex min-h-0 min-w-0 flex-col gap-4 lg:col-span-8">
          {/* Identity */}
          <section
            className={`${panel} relative shrink-0 overflow-hidden p-6 sm:p-8`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-400/[0.07] blur-3xl"
            />

            <div className="relative">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <StatusBadge isCompleted={isCompleted} />
                <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-gray-400">
                  {education.startYear} – {education.endYear}
                </span>
              </div>

              <h2 className="break-words text-2xl font-semibold leading-tight tracking-tight text-gray-50 sm:text-4xl">
                {education.schoolName}
              </h2>

              <p className="mt-3 break-words text-base text-teal-200/90 sm:text-lg">
                {education.degree}
              </p>

              <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-sm text-gray-300">
                <BookOpen size={16} className="shrink-0 text-teal-300" />
                <span className="truncate">{education.major}</span>
              </div>
            </div>
          </section>

          {/* Description: fills the remaining height, scrolls inside only if very long */}
          <section
            className={`${panel} flex min-h-[180px] flex-1 flex-col overflow-hidden p-6 sm:p-7`}
          >
            <h3 className="mb-3 shrink-0 text-sm font-semibold text-gray-200">
              Mô tả quá trình học tập
            </h3>

            <div className="edu-scroll min-h-0 flex-1 overflow-y-auto pr-2">
              <p
                className={`whitespace-pre-wrap break-words text-[15px] leading-7 ${
                  description ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {description || "Chưa có mô tả cho quá trình học tập này."}
              </p>
            </div>
          </section>
        </div>

        {/* ── Right: timeline + record info ── */}
        <div className="flex min-h-0 min-w-0 flex-col gap-4 lg:col-span-4">
          <section className={`${panel} shrink-0 p-6`}>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500">Tổng thời gian</p>
                <p className="mt-1 text-4xl font-semibold tracking-tight text-gray-50">
                  {duration}
                  <span className="ml-1.5 text-base font-normal text-gray-400">
                    năm
                  </span>
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="relative h-1.5 rounded-full bg-white/[0.08]">
                <div
                  className={`h-full rounded-full ${
                    isCompleted ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                  style={{ width: `${isCompleted ? 100 : progress}%` }}
                />
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <div>
                  <p className="text-xs text-gray-500">Bắt đầu</p>
                  <p className="mt-0.5 font-medium text-gray-200">
                    {education.startYear}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {isCompleted ? "Kết thúc" : "Dự kiến kết thúc"}
                  </p>
                  <p className="mt-0.5 font-medium text-gray-200">
                    {education.endYear}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className={`${panel} flex min-h-0 flex-1 flex-col p-6`}>
            <h3 className="mb-4 shrink-0 text-sm font-semibold text-gray-200">
              Thông tin bản ghi
            </h3>

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
              <CopyRow label="ID học vấn" value={education.id} />
              <InfoRow
                label="Thứ tự hiển thị"
                value={String(education.displayOrder)}
              />
              <InfoRow label="Trường học" value={education.schoolName} />
              <InfoRow label="Chuyên ngành" value={education.major} />
            </div>
          </section>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex w-full flex-col bg-[#08090C] text-[#ECECF1] antialiased lg:overflow-hidden ${PAGE_HEIGHT}`}
    >
      {/* Thin dark scrollbar, only visible if description is very long */}
      <style>{`
        .edu-scroll::-webkit-scrollbar{width:6px}
        .edu-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:9999px}
        .edu-scroll{scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.12) transparent}
      `}</style>

      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-4 p-4 sm:p-5">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              aria-label="Quay lại"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-gray-300 transition hover:bg-white/[0.09]"
            >
              <ArrowLeft size={18} />
            </button>

            <h1 className="text-lg font-semibold sm:text-xl">
              Chi tiết học vấn
            </h1>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className={ghostBtn}
          >
            <RefreshCw size={15} className={isFetching ? "animate-spin" : ""} />
            Làm mới
          </button>
        </header>

        {renderBody()}
      </div>
    </div>
  );
};

/* ───────────── Sub components ───────────── */

interface StateViewProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

function StateView({ icon, title, description, action }: StateViewProps) {
  return (
    <div
      className={`${panel} flex min-h-[300px] flex-1 flex-col items-center justify-center p-8 text-center`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03] text-gray-400">
        {icon}
      </div>
      <h2 className="text-base font-semibold text-gray-200">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

function StatusBadge({ isCompleted }: { isCompleted: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${
        isCompleted
          ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
          : "border-amber-400/25 bg-amber-400/10 text-amber-300"
      }`}
    >
      {isCompleted ? <CheckCircle2 size={13} /> : <CircleDashed size={13} />}
      {isCompleted ? "Hoàn thành" : "Đang học"}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/[0.05] pb-3 last:border-0 last:pb-0">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 break-words text-sm text-gray-200">{value}</p>
    </div>
  );
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <div className="border-b border-white/[0.05] pb-3">
      <p className="text-xs text-gray-500">{label}</p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <p className="min-w-0 break-all text-sm text-gray-200">{value}</p>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Sao chép ID"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 text-gray-400 transition hover:bg-white/[0.08] hover:text-gray-200"
        >
          {copied ? (
            <Check size={14} className="text-emerald-300" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>
    </div>
  );
}

export default EducationIdPage;
