import React from "react";
import { Search, X } from "lucide-react";
import { focusRing } from "./SocialLinkShared";

interface SocialLinkToolbarProps {
  isDark: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function SocialLinkToolbar({
  isDark,
  searchTerm,
  onSearchChange
}: SocialLinkToolbarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const hasKeyword = Boolean(searchTerm.trim());
  const divider = isDark ? "border-white/[0.07]" : "border-zinc-100";

  // Phím tắt "/" để focus vào ô tìm kiếm
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      className={`flex shrink-0 flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 ${divider}`}
    >
      <div>
        <h2 className="text-sm font-semibold">Danh sách liên kết</h2>

        <p className="text-xs text-zinc-500">Sắp xếp theo thứ tự hiển thị</p>
      </div>

      <div className="relative w-full sm:max-w-xs">
        <Search
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onSearchChange("");
            }
          }}
          aria-label="Tìm kiếm liên kết"
          placeholder="Tìm nền tảng hoặc URL"
          className={`h-9 w-full rounded-xl pl-9 pr-9 text-sm outline-none ring-1 ring-inset transition focus:ring-2 focus:ring-indigo-500/70 ${
            isDark
              ? "bg-black/30 text-zinc-100 ring-white/10 placeholder:text-zinc-500"
              : "bg-zinc-50 text-zinc-900 ring-zinc-200 placeholder:text-zinc-400"
          }`}
        />

        {hasKeyword ? (
          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              inputRef.current?.focus();
            }}
            aria-label="Xóa từ khóa"
            className={`absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-200 ${focusRing}`}
          >
            <X size={14} />
          </button>
        ) : (
          <kbd
            className={`pointer-events-none absolute right-2.5 top-1/2 hidden h-5 -translate-y-1/2 items-center rounded px-1.5 font-sans text-[11px] text-zinc-500 ring-1 ring-inset sm:inline-flex ${
              isDark ? "ring-white/10" : "ring-zinc-200"
            }`}
          >
            /
          </kbd>
        )}
      </div>
    </div>
  );
}
