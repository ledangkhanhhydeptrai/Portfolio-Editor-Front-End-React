import { ArrowUpDown, Search, X } from "lucide-react";
import type { SkillEnum } from "../../../../services/skill/SkillTypes";
import type { FeaturedFilter, SortOrder } from "./ProjectConstants";

interface ProjectToolbarProps {
  totalItems: number;
  search: string;
  onSearchChange: (value: string) => void;
  category: SkillEnum | "ALL";
  onCategoryChange: (value: SkillEnum | "ALL") => void;
  featured: FeaturedFilter;
  onFeaturedChange: (value: FeaturedFilter) => void;
  sortOrder: SortOrder;
  onToggleSort: () => void;
  onReset: () => void;
}

const fieldClass =
  "h-10 rounded-lg border border-white/10 bg-[#0B0B0D] px-3 text-sm text-gray-300 outline-none transition focus:border-[#7F96F5]";

export default function ProjectToolbar({
  totalItems,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  featured,
  onFeaturedChange,
  sortOrder,
  onToggleSort,
  onReset
}: ProjectToolbarProps) {
  return (
    <div className="flex shrink-0 flex-col gap-3 border-b border-white/[0.08] p-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-lg font-semibold leading-6">Danh sách dự án</h2>
          <p className="text-sm text-gray-500">
            Tìm kiếm và quản lý thông tin dự án.
          </p>
        </div>

        <span className="w-fit rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-gray-400">
          {totalItems} kết quả
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:w-auto">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Tìm tên hoặc mô tả..."
            aria-label="Tìm dự án"
            className={`${fieldClass} w-full pl-9 pr-3 placeholder:text-gray-600 sm:w-56`}
          />
        </div>

        <select
          value={category}
          onChange={(event) =>
            onCategoryChange(event.target.value as SkillEnum | "ALL")
          }
          aria-label="Lọc theo danh mục"
          className={fieldClass}
        >
          <option value="ALL">Tất cả danh mục</option>
          <option value="DEVELOPMENT">Phát triển phần mềm</option>
          <option value="VIDEO_EDITING">Dựng video</option>
        </select>

        <select
          value={featured}
          onChange={(event) =>
            onFeaturedChange(event.target.value as FeaturedFilter)
          }
          aria-label="Lọc theo trạng thái"
          className={fieldClass}
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="FEATURED">Dự án nổi bật</option>
          <option value="NORMAL">Dự án thường</option>
        </select>

        <button
          type="button"
          onClick={onToggleSort}
          className={`${fieldClass} inline-flex items-center justify-center gap-2 hover:border-[#7F96F5]/50`}
        >
          <ArrowUpDown size={15} />
          Thứ tự hiển thị: {sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2.5 text-xs text-gray-500 transition hover:text-[#7F96F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F96F5]"
        >
          <X size={14} />
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
}
