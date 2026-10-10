import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer
}: ModalProps) {
  const titleId = useId();
  const dialog = useRef<HTMLDivElement>(null);

  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialog.current?.focus();

    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] grid place-items-center bg-[#0a0f1c]/55 p-5 backdrop-blur-md motion-safe:animate-fade"
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="flex max-h-[calc(100dvh-40px)] w-full max-w-[480px] flex-col gap-4 overflow-auto rounded-[20px] border border-line bg-surface p-6 font-body text-ink shadow-card focus:outline-none motion-safe:animate-rise"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="m-0 font-display text-2xl font-bold tracking-tight"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full text-muted hover:bg-surface2 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>
        <div className="text-[0.9375rem] leading-relaxed text-muted">
          {children}
        </div>
        {footer && (
          <div className="flex flex-wrap justify-end gap-2.5">{footer}</div>
        )}
      </div>
    </div>,
    document.body
  );
}
