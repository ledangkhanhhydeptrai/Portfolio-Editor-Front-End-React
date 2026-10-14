import React from "react";
import { Search, X } from "lucide-react";

interface CurriculumToolbarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  primaryFilter: string;
  setPrimaryFilter: (value: string) => void;
}

export default function CurriculumToolbar({
  searchTerm,
  setSearchTerm,
  primaryFilter,
  setPrimaryFilter
}: CurriculumToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          placeholder="Tìm theo tên CV..."
          className="h-10 w-full rounded-xl border border-white/10 bg-[#0B0B0D] pl-9 pr-9 text-sm text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-indigo-400/50 sm:w-64"
        />

        {searchTerm.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
            }}
            aria-label="Xóa từ khóa tìm kiếm"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-200"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <select
        value={primaryFilter}
        onChange={(event) => {
          setPrimaryFilter(event.target.value);
        }}
        className="h-10 rounded-xl border border-white/10 bg-[#0B0B0D] px-3 text-sm text-gray-300 outline-none focus:border-indigo-400/50"
        aria-label="Lọc theo trạng thái CV"
      >
        <option value="all">Tất cả CV</option>
        <option value="primary">CV chính</option>
        <option value="secondary">CV phụ</option>
      </select>
    </div>
  );
}
