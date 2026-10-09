import React from "react";
import { LayoutGrid, List } from "lucide-react";
import type { StatusFilter, ViewMode } from "../types";

interface VideoTabsProps {
  isDark: boolean;
  statusFilter: StatusFilter;
  counts: Record<StatusFilter, number>;
  onStatusChange: (status: StatusFilter) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const tabs: StatusFilter[] = ["All", "Published", "Draft"];

const viewModes = [
  { mode: "table", label: "Table view", Icon: List },
  { mode: "grid", label: "Grid view", Icon: LayoutGrid }
] as const;

/** Status tabs on the left, table/grid toggle on the right. */
const VideoTabs: React.FC<VideoTabsProps> = ({
  isDark,
  statusFilter,
  counts,
  onStatusChange,
  viewMode,
  onViewModeChange
}) => (
  <div
    className={`flex shrink-0 items-center justify-between gap-4 border-b px-4 sm:px-5 ${
      isDark ? "border-black" : "border-slate-200"
    }`}
  >
    <div className="-mb-px flex gap-5 overflow-x-auto" role="tablist">
      {tabs.map((tab) => {
        const active = statusFilter === tab;

        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onStatusChange(tab)}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 py-3.5 text-sm font-medium transition-colors ${
              active
                ? "border-indigo-600 text-indigo-700"
                : isDark
                  ? "border-transparent text-slate-400 hover:text-white"
                  : "border-transparent text-slate-600 hover:text-slate-800"
            }`}
          >
            {tab === "Draft" ? "Drafts" : tab}
            <span
              className={`rounded-full px-1.5 py-0.5 text-xs tabular-nums ${
                active
                  ? isDark
                    ? "bg-indigo-950 text-indigo-300"
                    : "bg-indigo-50 text-indigo-700"
                  : isDark
                    ? "bg-slate-800 text-slate-300"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {counts[tab]}
            </span>
          </button>
        );
      })}
    </div>

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

export default VideoTabs;
