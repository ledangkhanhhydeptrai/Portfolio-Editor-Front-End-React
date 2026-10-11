import React from "react";
import {
  BriefcaseBusiness,
  RefreshCw,
  Plus,
} from "lucide-react";
import type { WorkStyleTheme } from "./theme";

interface PageHeaderProps {
  t: WorkStyleTheme;
  isLoading: boolean;
  onRefresh: () => void;
  onCreate: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  t,
  isLoading,
  onRefresh,
  onCreate,
}) => (
  <header className="flex items-center justify-between gap-4">
    <div className="flex min-w-0 items-center gap-3.5">
      <div className="hidden rounded-xl bg-gradient-to-br from-[#7F96F5] to-[#5C73D9] p-2.5 text-white shadow-lg shadow-[#7F96F5]/25 sm:block">
        <BriefcaseBusiness size={22} />
      </div>

      <div className="min-w-0">
        <nav
          aria-label="Breadcrumb"
          className={`flex items-center gap-1.5 text-xs ${t.muted}`}
        >
          <span>Quản lý nội dung</span>
          <span aria-hidden="true">/</span>
          <span className={t.strong}>Phong cách làm việc</span>
        </nav>

        <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
          Quản lý phong cách làm việc
        </h1>

        <p className={`hidden text-xs sm:block ${t.muted}`}>
          Quản lý danh sách phong cách làm việc trong hệ thống.
        </p>
      </div>
    </div>

    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7F96F5] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#6C83E8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F96F5] focus-visible:ring-offset-2"
      >
        <Plus size={16} />
        <span className="hidden sm:inline">Tạo phong cách làm việc</span>
        <span className="sm:hidden">Tạo mới</span>
      </button>

      <button
        type="button"
        onClick={onRefresh}
        disabled={isLoading}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#7F96F5]/30 bg-[#7F96F5]/10 px-3.5 py-2 text-sm font-medium text-[#7F96F5] transition hover:bg-[#7F96F5]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F96F5] disabled:opacity-50"
      >
        <RefreshCw
          size={16}
          className={
            isLoading
              ? "animate-spin motion-reduce:animate-none"
              : ""
          }
        />
        <span>Làm mới</span>
      </button>
    </div>
  </header>
);

export default PageHeader;
