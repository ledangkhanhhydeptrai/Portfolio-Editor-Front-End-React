import { Search, ArrowUpDown } from "lucide-react";
import { SkillEnum } from "../../../../services/skill/SkillTypes";

interface SkillToolbarProps {
  resultCount: number;
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: SkillEnum) => void;
  sortOrder: "asc" | "desc";
  onToggleSort: () => void;
}

export default function SkillToolbar({
  resultCount,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onToggleSort
}: SkillToolbarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-lg font-semibold">Danh sách kỹ năng</h2>
        <p className="mt-1 text-sm text-white/40">{resultCount} kết quả</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative sm:w-64">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35"
          />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Tìm tên kỹ năng..."
            className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-9 pr-3 text-sm outline-none placeholder:text-white/30 focus:border-[#7F96F5]/60"
          />
        </div>

        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as SkillEnum)}
          className="h-10 rounded-xl border border-white/10 bg-[#18181D] px-3 text-sm text-white/75 outline-none focus:border-[#7F96F5]/60"
        >
          <option value="ALL">Tất cả danh mục</option>
          <option value="DEVELOPMENT">Development</option>
          <option value="VIDEO_EDITING">Video Editing</option>
          <option value="DRIVING">Driving</option>
        </select>

        <button
          type="button"
          onClick={onToggleSort}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 text-sm hover:bg-white/[0.05]"
        >
          <ArrowUpDown size={15} />
          Thứ tự {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>
    </div>
  );
}
