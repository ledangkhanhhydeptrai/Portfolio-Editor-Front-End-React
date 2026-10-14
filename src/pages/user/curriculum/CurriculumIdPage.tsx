import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Hash,
  RefreshCw,
  Star
} from "lucide-react";

import { useGetCurriculumById } from "../../../hooks/useCurriculum";
import type { CurriculumTypes } from "../../../services/curriculum/CurriculumTypes";
import Button from "../../../components/ui/Button";

type CopyField = "id" | "url" | null;

const CARD = "rounded-2xl border border-white/[0.08] bg-[#111114]";

interface StateMessageProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

function StateMessage({
  icon,
  title,
  description,
  action
}: StateMessageProps): React.ReactElement {
  return (
    <div className={`${CARD} flex flex-1 items-center justify-center p-8`}>
      <div className="max-w-sm text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
          {icon}
        </div>

        <h2 className="mt-4 text-base font-semibold text-gray-100">{title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
          {description}
        </p>

        {action !== undefined && <div className="mt-5">{action}</div>}
      </div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  children: React.ReactNode;
  onCopy?: () => void;
  copied?: boolean;
}

function InfoRow({
  label,
  children,
  onCopy,
  copied = false
}: InfoRowProps): React.ReactElement {
  return (
    <div className="py-3.5 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-gray-500">{label}</p>

        {onCopy !== undefined && (
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-gray-500 transition hover:bg-white/[0.06] hover:text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" />
                Đã chép
              </>
            ) : (
              <>
                <Copy size={12} />
                Sao chép
              </>
            )}
          </button>
        )}
      </div>

      <div className="mt-1.5 text-sm text-gray-200">{children}</div>
    </div>
  );
}

export default function CurriculumIdPage(): React.ReactElement {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [copiedField, setCopiedField] = React.useState<CopyField>(null);

  const {
    data: response,
    isLoading,
    isError,
    refetch
  } = useGetCurriculumById(id === undefined ? "" : id);

  const curriculum = React.useMemo<CurriculumTypes | null>(() => {
    if (response === undefined) {
      return null;
    }

    // Hỗ trợ API trả về trực tiếp một CV hoặc bọc trong data.
    const result: unknown = response.data;

    if (
      typeof result === "object" &&
      result !== null &&
      "id" in result &&
      "title" in result &&
      "fileUrl" in result &&
      "displayOrder" in result &&
      "isPrimary" in result
    ) {
      return result as CurriculumTypes;
    }

    return null;
  }, [response]);

  const handleOpenFile = (): void => {
    if (curriculum === null) {
      return;
    }

    window.open(curriculum.fileUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownloadFile = (): void => {
    if (curriculum === null) {
      return;
    }

    const link = document.createElement("a");

    link.href = curriculum.fileUrl;
    link.download = `${curriculum.title}.pdf`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = (field: Exclude<CopyField, null>, value: string): void => {
    void navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1600);
    });
  };

  const backButton = (
    <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
      <ArrowLeft size={16} className="mr-2" />
      Quay lại
    </Button>
  );

  /* ---------- ID không hợp lệ ---------- */
  if (id === undefined || id.trim() === "") {
    return (
      <div className="flex h-full min-h-0 flex-col bg-[#0B0B0D] p-4 text-gray-100 sm:p-6">
        <StateMessage
          icon={<AlertCircle size={26} className="text-red-400" />}
          title="ID CV không hợp lệ"
          description="Không tìm thấy ID CV trong đường dẫn. Hãy quay lại danh sách và chọn lại CV."
          action={backButton}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto bg-[#0B0B0D] p-4 text-gray-100 sm:p-6 lg:overflow-hidden">
      {/* Header */}
      <header className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-gray-500"
          >
            <span>Quản lý nội dung</span>
            <span aria-hidden>/</span>
            <span>Curriculum</span>
            <span aria-hidden>/</span>
            <span className="text-indigo-300">Chi tiết</span>
          </nav>

          <h1 className="mt-1.5 truncate text-xl font-bold tracking-tight sm:text-2xl">
            {curriculum !== null ? curriculum.title : "Chi tiết CV"}
          </h1>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          {backButton}

          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              void refetch();
            }}
          >
            <RefreshCw size={16} className="mr-2" />
            Làm mới
          </Button>
        </div>
      </header>

      {/* Loading */}
      {isLoading && (
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className={`${CARD} animate-pulse space-y-4 p-5`}>
            <div className="h-5 w-1/2 rounded bg-white/[0.06]" />
            <div className="h-16 rounded-xl bg-white/[0.04]" />
            <div className="h-16 rounded-xl bg-white/[0.04]" />
            <div className="h-16 rounded-xl bg-white/[0.04]" />
          </div>

          <div
            className={`${CARD} flex min-h-[320px] items-center justify-center`}
          >
            <div className="text-center">
              <RefreshCw
                size={26}
                className="mx-auto animate-spin text-indigo-400"
              />
              <p className="mt-3 text-sm text-gray-400">
                Đang tải thông tin CV...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {!isLoading && isError && (
        <StateMessage
          icon={<AlertCircle size={26} className="text-red-400" />}
          title="Không thể tải thông tin CV"
          description="Đã xảy ra lỗi khi lấy dữ liệu. Kiểm tra kết nối rồi thử lại."
          action={
            <Button
              type="button"
              onClick={() => {
                void refetch();
              }}
            >
              <RefreshCw size={16} className="mr-2" />
              Thử lại
            </Button>
          }
        />
      )}

      {/* Not found */}
      {!isLoading && !isError && curriculum === null && (
        <StateMessage
          icon={<FileText size={26} className="text-gray-500" />}
          title="Không tìm thấy CV"
          description="CV không tồn tại hoặc dữ liệu API không đúng định dạng mong đợi."
          action={backButton}
        />
      )}

      {/* Details */}
      {!isLoading && !isError && curriculum !== null && (
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
          {/* Cột trái: thông tin */}
          <aside className={`${CARD} flex min-h-0 flex-col overflow-hidden`}>
            <div className="flex items-start gap-3 border-b border-white/[0.08] p-5">
              <div className="rounded-xl bg-indigo-400/10 p-2.5 text-indigo-300">
                <FileText size={20} />
              </div>

              <div className="min-w-0">
                <h2 className="break-words font-semibold leading-snug text-gray-100">
                  {curriculum.title}
                </h2>

                <span
                  className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                    curriculum.isPrimary
                      ? "border-amber-400/25 bg-amber-400/10 text-amber-300"
                      : "border-white/10 bg-white/[0.03] text-gray-400"
                  }`}
                >
                  <Star
                    size={12}
                    className={curriculum.isPrimary ? "fill-amber-300" : ""}
                  />
                  {curriculum.isPrimary ? "CV chính" : "CV phụ"}
                </span>
              </div>
            </div>

            <div className="min-h-0 flex-1 divide-y divide-white/[0.06] overflow-y-auto p-5">
              <InfoRow
                label="ID tài liệu"
                onCopy={() => handleCopy("id", String(curriculum.id))}
                copied={copiedField === "id"}
              >
                <span className="break-all font-mono text-xs text-gray-300">
                  {curriculum.id}
                </span>
              </InfoRow>

              <InfoRow label="Thứ tự hiển thị">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Hash size={14} className="text-emerald-300" />
                  {curriculum.displayOrder}
                </span>
              </InfoRow>

              <InfoRow
                label="Đường dẫn file"
                onCopy={() => handleCopy("url", curriculum.fileUrl)}
                copied={copiedField === "url"}
              >
                <a
                  href={curriculum.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="line-clamp-3 break-all text-xs text-indigo-300 transition hover:text-indigo-200"
                >
                  {curriculum.fileUrl}
                </a>
              </InfoRow>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-white/[0.08] p-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleDownloadFile}
              >
                <Download size={16} className="mr-2" />
                Tải CV
              </Button>

              <Button type="button" onClick={handleOpenFile}>
                <ExternalLink size={16} className="mr-2" />
                Mở file
              </Button>
            </div>
          </aside>

          {/* Cột phải: xem trước */}
          <section
            className={`${CARD} flex min-h-[480px] flex-col overflow-hidden lg:min-h-0`}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] px-5 py-3">
              <h2 className="text-sm font-semibold text-gray-100">Xem trước</h2>

              <button
                type="button"
                onClick={handleOpenFile}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-gray-400 transition hover:bg-white/[0.06] hover:text-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
              >
                <ExternalLink size={13} />
                Mở tab mới
              </button>
            </div>

            <div className="relative min-h-0 flex-1 bg-[#18181C]">
              {/* Hiện phía sau iframe; nếu trình duyệt chặn nhúng thì người dùng vẫn thấy hướng dẫn */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <FileText size={28} className="text-gray-600" />
                <p className="mt-3 text-sm text-gray-400">
                  Không hiển thị được bản xem trước?
                </p>
                <button
                  type="button"
                  onClick={handleOpenFile}
                  className="mt-1 text-sm text-indigo-300 hover:text-indigo-200"
                >
                  Mở file trong tab mới
                </button>
              </div>

              <iframe
                key={curriculum.fileUrl}
                src={curriculum.fileUrl}
                title={`Xem trước ${curriculum.title}`}
                className="relative h-full w-full border-0 bg-white"
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}