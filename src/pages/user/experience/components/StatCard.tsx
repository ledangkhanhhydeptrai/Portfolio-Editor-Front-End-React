import React from "react";

interface StatCardProps {
  label: string;
  value: number;
  valueClass?: string;
  iconClass: string;
  icon: React.ReactNode;
}

export function StatCard({
  label,
  value,
  valueClass,
  iconClass,
  icon
}: StatCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#12131A] px-4 py-3">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${iconClass}`}
      >
        {icon}
      </div>

      <p className="min-w-0 flex-1 truncate text-sm text-gray-400">{label}</p>

      <p
        className={`text-2xl font-bold tracking-tight ${valueClass ?? "text-white"}`}
      >
        {value}
      </p>
    </div>
  );
}
