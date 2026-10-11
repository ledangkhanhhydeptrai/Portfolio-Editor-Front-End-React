import { Globe, Plus, RefreshCw } from "lucide-react";
import { focusRing } from "./SocialLinkShared";

interface SocialLinkHeaderProps {
  isDark: boolean;
  isLoading: boolean;
  onCreate: () => void;
  onRefresh: () => void;
}

export function SocialLinkHeader({
  isDark,
  isLoading,
  onCreate,
  onRefresh
}: SocialLinkHeaderProps) {
  return (
    <header className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 ring-1 ring-inset ring-indigo-500/20">
          <Globe size={22} />
        </div>

        <div>
          <p className="text-xs text-zinc-500">
            Quản lý nội dung <span className="mx-1">/</span> Link liên hệ
          </p>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
            Link liên hệ
          </h1>

          <p className="mt-0.5 text-sm text-zinc-500">
            Các nền tảng mạng xã hội hiển thị trên portfolio.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onCreate}
          className={`inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3.5 text-xs font-medium text-white transition hover:bg-indigo-500 ${focusRing}`}
        >
          <Plus size={15} />
          Tạo liên kết
        </button>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className={`inline-flex h-9 items-center justify-center gap-2 rounded-xl px-3.5 text-xs font-medium ring-1 ring-inset transition disabled:cursor-not-allowed disabled:opacity-50 ${focusRing} ${
            isDark
              ? "bg-white/[0.04] text-zinc-200 ring-white/10 hover:bg-white/[0.08]"
              : "bg-white text-zinc-700 ring-zinc-200 hover:bg-zinc-50"
          }`}
        >
          <RefreshCw
            size={14}
            className={
              isLoading ? "text-indigo-500 motion-safe:animate-spin" : ""
            }
          />
          Làm mới
        </button>
      </div>
    </header>
  );
}
