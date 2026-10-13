import React from "react";

interface ProjectInfoRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

export default function ProjectInfoRow({
  icon,
  label,
  children
}: ProjectInfoRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-[#9EAEFF]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-gray-200">
          {children}
        </p>
      </div>
    </div>
  );
}
