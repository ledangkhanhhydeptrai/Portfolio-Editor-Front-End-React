import React from "react";

interface BulkActionBarProps {
  isDark: boolean;
  selectedCount: number;
  onDelete: () => void;
  onClear: () => void;
}

const BulkActionBar: React.FC<BulkActionBarProps> = ({
  isDark,
  selectedCount,
  onDelete,
  onClear
}) => (
  <div
    className={`flex shrink-0 flex-wrap items-center gap-2 border-b px-4 py-3 sm:px-5 ${
      isDark ? "border-black bg-indigo-950/40" : "border-indigo-100 bg-indigo-50"
    }`}
  >
    <p
      className={`mr-2 text-sm font-medium ${
        isDark ? "text-indigo-200" : "text-indigo-900"
      }`}
    >
      {selectedCount} selected
    </p>

    <button
      type="button"
      onClick={onDelete}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium ring-1 transition ${
        isDark
          ? "bg-slate-900 text-red-400 ring-black hover:bg-red-950/40"
          : "bg-white text-red-600 ring-slate-200 hover:bg-red-50"
      }`}
    >
      Delete
    </button>

    <button
      type="button"
      onClick={onClear}
      className={`ml-auto rounded-lg px-3 py-1.5 text-sm ${
        isDark
          ? "text-indigo-300 hover:bg-indigo-950"
          : "text-indigo-700 hover:bg-indigo-100"
      }`}
    >
      Clear selection
    </button>
  </div>
);

export default BulkActionBar;