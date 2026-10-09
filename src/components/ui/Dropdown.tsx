import React, { useEffect, useRef, useState } from "react";

export interface DropdownItem {
  label: string;
  onSelect: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
  separatorBefore?: boolean;
}

export interface DropdownProps {
  label: string;
  items: DropdownItem[];
  align?: "start" | "end";
}

export default function Dropdown({
  label,
  items,
  align = "start"
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) =>
      !root.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    root.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const move = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const els = Array.from(
      root.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []
    );
    const i = els.indexOf(document.activeElement as HTMLElement);
    els[
      (i + (e.key === "ArrowDown" ? 1 : -1) + els.length) % els.length
    ]?.focus();
  };

  return (
    <div ref={root} className="relative inline-block font-body">
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border-[1.5px] border-line bg-surface px-4 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {label}
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          onKeyDown={move}
          className={`absolute top-[calc(100%+8px)] z-50 min-w-[200px] rounded-xl border border-line bg-surface p-1.5 shadow-card motion-safe:animate-pop ${
            align === "end"
              ? "right-0 origin-top-right"
              : "left-0 origin-top-left"
          }`}
        >
          {items.map((item) => (
            <React.Fragment key={item.label}>
              {item.separatorBefore && (
                <div role="separator" className="mx-1 my-1.5 h-px bg-line" />
              )}
              <button
                role="menuitem"
                onClick={() => {
                  item.onSelect();
                  setOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[0.9375rem] outline-none ${
                  item.danger
                    ? "text-danger hover:bg-danger-soft focus-visible:bg-danger-soft"
                    : "text-ink hover:bg-accent-soft hover:text-accent focus-visible:bg-accent-soft focus-visible:text-accent"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
