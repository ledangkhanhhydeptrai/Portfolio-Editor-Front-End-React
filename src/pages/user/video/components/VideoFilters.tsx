import React from "react";
import { LayoutGrid, List, Search } from "lucide-react";

import { sortLabels } from "../constants";
import type { SortKey, ViewMode } from "../types";
import { formatCategory } from "../../../../utils/formatDate";
import { VideoEnum } from "../../../../services/video/VideoTypes";

// Chỉnh lại đường dẫn theo dự án của bạn.
import Input from "../../../../components/ui/Input";
import Select from "../../../../components/ui/Select";
import Button from "../../../../components/ui/Button";

type CategoryFilterValue = VideoEnum | "OTHER";

interface VideoFiltersProps {
  isDark: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  /** Giá trị danh mục gốc, không bao gồm "Tất cả". */
  categories: VideoEnum[];
  categoryFilter: CategoryFilterValue;
  onCategoryChange: (value: CategoryFilterValue) => void;
  sortKey: SortKey;
  onSortChange: (value: SortKey) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const viewModes = [
  { mode: "table", label: "Dạng bảng", Icon: List },
  { mode: "grid", label: "Dạng lưới", Icon: LayoutGrid }
] as const;

const VideoFilters: React.FC<VideoFiltersProps> = ({
  isDark,
  searchTerm,
  onSearchChange,
  categories,
  categoryFilter,
  onCategoryChange,
  sortKey,
  onSortChange,
  viewMode,
  onViewModeChange
}) => {
  const categoryOptions = [
    { value: "ALL", label: "Tất cả danh mục" },
    ...categories.map((category) => ({
      value: String(category),
      label: formatCategory(category)
    })),
    { value: "OTHER", label: "Danh mục khác" }
  ];

  const sortOptions = (Object.keys(sortLabels) as SortKey[]).map((key) => ({
    value: key,
    label: sortLabels[key]
  }));

  return (
    <div
      className={`flex shrink-0 flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:px-5 ${
        isDark ? "border-black" : "border-slate-200"
      }`}
    >
      <Input
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Tìm theo tiêu đề hoặc mô tả..."
        aria-label="Tìm kiếm video"
        className="sm:w-72"
        icon={<Search size={17} />}
      />

      <Select
        value={String(categoryFilter)}
        onChange={(event) => {
          const value = event.target.value;

          if (value === "ALL") {
            onCategoryChange("ALL" as CategoryFilterValue);
            return;
          }

          if (value === "OTHER") {
            onCategoryChange("OTHER");
            return;
          }

          const category = categories.find((item) => String(item) === value);

          if (category !== undefined) {
            onCategoryChange(category);
          }
        }}
        options={categoryOptions}
        aria-label="Lọc theo danh mục"
        className="sm:min-w-44"
      />

      <Select
        value={sortKey}
        onChange={(event) => {
          const value = event.target.value;

          if (Object.prototype.hasOwnProperty.call(sortLabels, value)) {
            onSortChange(value as SortKey);
          }
        }}
        options={sortOptions}
        aria-label="Sắp xếp video"
        className="sm:min-w-44 sm:ml-auto"
      />

      <div
        className={`hidden shrink-0 rounded-lg border p-0.5 sm:flex ${
          isDark ? "border-black" : "border-slate-200"
        }`}
        role="group"
        aria-label="Chế độ hiển thị"
      >
        {viewModes.map(({ mode, label, Icon }) => (
          <Button
            key={mode}
            type="button"
            variant="secondary"
            onClick={() => onViewModeChange(mode)}
            ariaLabel={label}
            className={`rounded-md !px-2 !py-1.5 !shadow-none !duration-150 !active:scale-100 ${
              viewMode === mode
                ? "!border-indigo-600 !bg-indigo-600 !text-white hover:!bg-indigo-500"
                : isDark
                  ? "!border-transparent !bg-transparent !text-slate-400 hover:!bg-slate-800 hover:!text-white"
                  : "!border-transparent !bg-transparent !text-slate-600 hover:!bg-slate-100 hover:!text-slate-900"
            }`}
          >
            <Icon size={16} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default VideoFilters;
