import React from "react";
import { FileText, Star, Search } from "lucide-react";

interface CurriculumStatsProps {
  total: number;
  primaryCount: number;
  filteredCount: number;
}

export default function CurriculumStats({
  total,
  primaryCount,
  filteredCount
}: CurriculumStatsProps) {
  const stats = [
    {
      label: "Tổng số CV",
      value: total,
      description: "Tài liệu trong hệ thống",
      icon: FileText,
      color: "indigo"
    },
    {
      label: "CV chính",
      value: primaryCount,
      description: "Hồ sơ được đánh dấu chính",
      icon: Star,
      color: "amber"
    },
    {
      label: "Kết quả hiển thị",
      value: filteredCount,
      description: "CV sau khi áp dụng bộ lọc",
      icon: Search,
      color: "emerald"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        const iconClass =
          stat.color === "indigo"
            ? "border-indigo-400/20 bg-indigo-400/10 text-indigo-300"
            : stat.color === "amber"
              ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
              : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/[0.08] bg-[#111114] p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="mt-3 text-3xl font-bold tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-gray-500">{stat.description}</p>
              </div>

              <div className={`rounded-xl border p-3 ${iconClass}`}>
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
