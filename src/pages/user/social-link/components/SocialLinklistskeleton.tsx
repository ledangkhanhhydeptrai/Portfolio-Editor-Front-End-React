interface SocialLinkListSkeletonProps {
  isDark: boolean;
  rows?: number;
}

export function SocialLinkListSkeleton({
  isDark,
  rows = 4
}: SocialLinkListSkeletonProps) {
  return (
    <div
      className={`divide-y ${
        isDark ? "divide-white/[0.05]" : "divide-zinc-100"
      }`}
      aria-busy="true"
      aria-label="Đang tải danh sách"
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3.5 px-4 py-4 sm:px-6 motion-safe:animate-pulse"
        >
          <div
            className={`h-10 w-10 rounded-xl ${
              isDark ? "bg-white/[0.06]" : "bg-zinc-100"
            }`}
          />

          <div className="flex-1 space-y-2">
            <div
              className={`h-3 w-28 rounded ${
                isDark ? "bg-white/[0.08]" : "bg-zinc-200"
              }`}
            />

            <div
              className={`h-2.5 w-44 rounded ${
                isDark ? "bg-white/[0.05]" : "bg-zinc-100"
              }`}
            />
          </div>

          <div
            className={`hidden h-6 w-6 rounded-md sm:block ${
              isDark ? "bg-white/[0.06]" : "bg-zinc-100"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
