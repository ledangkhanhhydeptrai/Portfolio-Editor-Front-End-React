
import React from "react";
import {
  FileText,
  ExternalLink,
  Download,
  X
} from "lucide-react";

import type { CurriculumTypes } from "../../../../services/curriculum/CurriculumTypes";
import Button from "../../../../components/ui/Button";

interface CurriculumDetailModalProps {
  curriculum: CurriculumTypes | null;
  onClose: () => void;
  onOpenFile: (fileUrl: string) => void;
  onDownloadFile: (curriculum: CurriculumTypes) => void;
}

export default function CurriculumDetailModal({
  curriculum,
  onClose,
  onOpenFile,
  onDownloadFile
}: CurriculumDetailModalProps) {
  React.useEffect(() => {
    if (curriculum === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [curriculum, onClose]);

  if (curriculum === null) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="curriculum-detail-title"
        className="relative my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151519] shadow-2xl"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.08] p-5 sm:p-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="shrink-0 rounded-xl border border-indigo-400/20 bg-indigo-400/10 p-3 text-indigo-300">
              <FileText size={22} />
            </div>

            <div className="min-w-0">
              <h2
                id="curriculum-detail-title"
                className="font-semibold text-gray-100"
              >
                Chi tiết CV
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Thông tin tài liệu hồ sơ
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng chi tiết CV"
            className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
            <p className="text-xs text-gray-500">Tên CV</p>

            <p className="mt-2 break-words text-sm font-medium text-gray-100">
              {curriculum.title}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
            <p className="text-xs text-gray-500">ID</p>

            <p className="mt-2 break-all text-sm leading-6 text-gray-300">
              {curriculum.id}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
              <p className="text-xs text-gray-500">
                Thứ tự hiển thị
              </p>

              <p className="mt-2 text-lg font-semibold text-gray-100">
                {curriculum.displayOrder}
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
              <p className="text-xs text-gray-500">Trạng thái</p>

              {curriculum.isPrimary ? (
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-300">
                  <span className="text-sm">★</span>
                  CV chính
                </span>
              ) : (
                <span className="mt-2 inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-gray-400">
                  CV phụ
                </span>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
            <p className="text-xs text-gray-500">Đường dẫn file</p>

            <a
              href={curriculum.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block break-all text-xs leading-5 text-indigo-300 transition hover:text-indigo-200"
            >
              {curriculum.fileUrl}
            </a>
          </div>

          <div className="rounded-xl border border-indigo-400/15 bg-indigo-400/[0.04] p-4">
            <div className="flex items-start gap-3">
              <FileText
                size={18}
                className="mt-0.5 shrink-0 text-indigo-300"
              />

              <div>
                <p className="text-sm font-medium text-gray-200">
                  Tài liệu CV
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Mở file PDF để xem nội dung đầy đủ hoặc tải tài liệu về máy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-white/[0.08] bg-[#151519] p-5 sm:flex-row sm:justify-end sm:p-6">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Đóng
          </Button>

          <Button
            type="button"
            onClick={() => {
              onOpenFile(curriculum.fileUrl);
            }}
          >
            <ExternalLink size={16} className="mr-2" />
            Xem CV
          </Button>

          <Button
            type="button"
            onClick={() => {
              onDownloadFile(curriculum);
            }}
          >
            <Download size={16} className="mr-2" />
            Tải xuống
          </Button>
        </div>
      </div>
    </div>
  );
}
