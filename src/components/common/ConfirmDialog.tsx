import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CircleHelp, Loader2, TriangleAlert } from "lucide-react";

import { useTheme } from "../../contexts/ThemeContext";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  /** danger: hành động phá huỷ (xoá...) – primary: xác nhận thông thường */
  variant?: "danger" | "primary";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Esc để đóng, khoá cuộn nền, focus vào nút an toàn (Cancel)
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) onCancel();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    cancelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, isLoading, onCancel]);

  if (!open || typeof document === "undefined") return null;

  const isDanger = variant === "danger";

  const iconClass = isDanger
    ? isDark
      ? "bg-rose-500/10 text-rose-400"
      : "bg-rose-50 text-rose-600"
    : isDark
      ? "bg-indigo-500/10 text-indigo-400"
      : "bg-indigo-50 text-indigo-600";

  const confirmClass = isDanger
    ? "bg-rose-600 shadow-rose-600/30 hover:bg-rose-500 focus-visible:ring-rose-500"
    : "bg-indigo-600 shadow-indigo-600/30 hover:bg-indigo-500 focus-visible:ring-indigo-500";

  const cancelClass = isDark
    ? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={() => !isLoading && onCancel()}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby={description ? "confirm-dialog-desc" : undefined}
        className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
          isDark
            ? "border-white/10 bg-slate-900 shadow-black/50"
            : "border-slate-200 bg-white shadow-slate-400/30"
        }`}
      >
        <div className="flex items-start gap-4">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
          >
            {isDanger ? <TriangleAlert size={22} /> : <CircleHelp size={22} />}
          </span>

          <div className="min-w-0 pt-0.5">
            <h2
              id="confirm-dialog-title"
              className={`text-base font-semibold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {title}
            </h2>
            {description ? (
              <div
                id="confirm-dialog-desc"
                className={`mt-1.5 text-sm leading-6 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {description}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 ${cancelClass}`}
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-70 ${confirmClass}`}
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
