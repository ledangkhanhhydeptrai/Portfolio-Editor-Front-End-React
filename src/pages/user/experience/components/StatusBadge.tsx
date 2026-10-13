interface StatusBadgeProps {
  isCurrent: boolean;
  short?: boolean;
}

export function StatusBadge({ isCurrent, short }: StatusBadgeProps) {
  if (isCurrent) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
        {short ? "Đang làm" : "Đang làm việc"}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-gray-400">
      {short ? "Kết thúc" : "Đã kết thúc"}
    </span>
  );
}
