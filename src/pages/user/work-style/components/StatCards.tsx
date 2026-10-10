import React from "react";
import { BriefcaseBusiness, Search } from "lucide-react";
import type { WorkStyleTheme } from "./theme";

interface StatCardsProps {
  t: WorkStyleTheme;
  total: number;
  matched: number;
  isSearching: boolean;
}

const StatCards: React.FC<StatCardsProps> = ({ t, total, matched }) => {
  const percent = total === 0 ? 0 : Math.round((matched / total) * 100);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div
        className={`relative flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 ${t.card}`}
      >
        <div className="absolute inset-y-0 left-0 w-1 bg-[#7F96F5]" />
        <div className="rounded-lg bg-[#7F96F5]/15 p-2.5 text-[#7F96F5]">
          <BriefcaseBusiness size={20} />
        </div>
        <div className="min-w-0">
          <p className={`truncate text-xs ${t.muted}`}>Tổng phong cách làm việc</p>
          <p className="text-xl font-bold leading-tight tabular-nums">{total}</p>
        </div>
      </div>

      <div
        className={`relative flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 ${t.card}`}
      >
        <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500" />
        <div className="rounded-lg bg-emerald-500/10 p-2.5 text-emerald-500">
          <Search size={20} />
        </div>
        <div className="min-w-0">
          <p className={`truncate text-xs ${t.muted}`}>Kết quả tìm kiếm</p>
          <p className="text-xl font-bold leading-tight tabular-nums">{matched}</p>
        </div>
        <div className={`absolute inset-x-0 bottom-0 h-0.5 ${t.track}`}>
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatCards;