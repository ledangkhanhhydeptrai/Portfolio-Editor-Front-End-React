import React from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import { sortLabels } from "../constants";

import type { SortKey, ViewMode } from "../types";
import { formatCategory } from "../../../../utils/formatDate";
import { VideoEnum } from "../../../../services/video/VideoTypes";

type CategoryFilterValue = VideoEnum | "OTHER";

interface VideoFiltersProps {
  isDark: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  /** Raw category values, without "All". */
  categories: VideoEnum[];
  categoryFilter: CategoryFilterValue;
  onCategoryChange: (value: CategoryFilterValue) => void;
  sortKey: SortKey;
  onSortChange: (value: SortKey) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const controlClass =
  "rounded-lg border border-slate-200 bg-white py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

const viewModes = [
  { mode: "table", label: "Table view", Icon: List },
  { mode: "grid", label: "Grid view", Icon: LayoutGrid }
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
}) => (
  <div
    className={`flex shrink-0 flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:px-5 ${
      isDark ? "border-black" : "border-slate-200"
    }`}
  >
    <div className="relative sm:w-72">
      <Search
        size={17}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by title or description"
        aria-label="Search videos"
        className={`${controlClass} w-full pl-9 pr-3`}
      />
    </div>

    <select
      value={categoryFilter}
      onChange={(event) => {
        const value = event.target.value;

        if (value === "OTHER") {
          onCategoryChange("OTHER");
          return;
        }

        const category = categories.find((item) => String(item) === value);

        if (category !== undefined) {
          onCategoryChange(category);
        }
      }}
      aria-label="Filter by category"
      className={`${controlClass} px-3`}
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {formatCategory(category)}
        </option>
      ))}
    </select>

    <select
      value={sortKey}
      onChange={(event) => onSortChange(event.target.value as SortKey)}
      aria-label="Sort videos"
      className={`${controlClass} px-3 sm:ml-auto`}
    >
      {(Object.keys(sortLabels) as SortKey[]).map((key) => (
        <option key={key} value={key}>
          {sortLabels[key]}
        </option>
      ))}
    </select>

    <div
      className={`hidden shrink-0 rounded-lg border p-0.5 sm:flex ${
        isDark ? "border-black" : "border-slate-200"
      }`}
      role="group"
      aria-label="View mode"
    >
      {viewModes.map(({ mode, label, Icon }) => (
        <button
          key={mode}
          type="button"
          onClick={() => onViewModeChange(mode)}
          aria-label={label}
          aria-pressed={viewMode === mode}
          title={label}
          className={`rounded-md p-1.5 transition ${
            viewMode === mode
              ? "bg-indigo-600 text-white"
              : isDark
                ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  </div>
);

export default VideoFilters;
