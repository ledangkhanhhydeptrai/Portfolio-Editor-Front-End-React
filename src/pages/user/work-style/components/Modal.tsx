import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { WorkStyleTheme } from "./theme";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  t: WorkStyleTheme;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Đang xử lý: chặn đóng bằng Esc, click nền và nút X. */
  busy?: boolean;
  maxWidth?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  t,
  title,
  description,
  children,
  footer,
  busy = false,
  maxWidth = "max-w-lg",
}) => {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();

  // Dùng ref để effect không chạy lại (và không cướp focus) mỗi lần render.
  const onCloseRef = React.useRef(onClose);
  const busyRef = React.useRef(busy);
  onCloseRef.current = onClose;
  busyRef.current = busy;

  React.useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busyRef.current) {
        onCloseRef.current();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`flex max-h-[90vh] w-full flex-col rounded-2xl border shadow-2xl outline-none ${maxWidth} ${t.card} ${t.isDark ? "text-[#F0EFEA]" : "text-gray-900"}`}
      >
        <div className={`flex items-start justify-between gap-4 border-b px-5 py-4 ${t.divider}`}>
          <div>
            <h2 id={titleId} className="text-base font-semibold">
              {title}
            </h2>
            {description && (
              <p className={`mt-0.5 text-sm ${t.muted}`}>{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            aria-label="Đóng"
            className={`rounded-lg p-1.5 transition disabled:opacity-50 ${t.ghostBtn}`}
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5">{children}</div>

        {footer && (
          <div className={`flex justify-end gap-2 border-t px-5 py-3.5 ${t.divider}`}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;