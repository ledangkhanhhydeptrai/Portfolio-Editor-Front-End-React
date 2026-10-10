import React from "react";
import { Search, X } from "lucide-react";
import type { WorkStyleTheme } from "./theme";

interface ToolbarProps {
  t: WorkStyleTheme;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ t, searchTerm, onSearchChange }) => (
  <div
    className={`flex flex-col justify-between gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:px-5 ${t.divider}`}
  >
    <div>
      <h2 className="text-sm font-semibold">Danh sách phong cách làm việc</h2>
      <p className={`text-xs ${t.muted}`}>
        Xem và tra cứu các bản ghi hiện có.
      </p>
    </div>

    <div className="relative w-full sm:max-w-xs">
      <Search
        size={16}
        className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${t.muted}`}
      />
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Tìm theo tên, mô tả, ID..."
        aria-label="Tìm phong cách làm việc"
        className={`w-full rounded-lg border py-2 pl-9 pr-9 text-sm outline-none transition focus:border-[#7F96F5] focus:ring-2 focus:ring-[#7F96F5]/20 ${t.input}`}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          aria-label="Xóa từ khóa"
          className={`absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 transition ${t.ghostBtn}`}
        >
          <X size={14} />
        </button>
      )}
    </div>
  </div>
);

export default Toolbar;
