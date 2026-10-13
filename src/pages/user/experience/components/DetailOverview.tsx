import { Building2, CalendarDays, CircleX } from "lucide-react";
import type { ExperienceProps } from "../../../../services/experience/ExperienceTypes";
import { formatDate } from "../utils";

export function DetailOverview({
  experience
}: {
  experience: ExperienceProps;
}) {
  return (
    <section className="shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#12131A]">
      <div className="h-1 bg-gradient-to-r from-[#8B9FF8] via-indigo-400 to-violet-500" />

      <div className="flex items-start gap-4 p-4 sm:p-5">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-[#8B9FF8]">
          <Building2 size={26} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-[#8B9FF8]">
              {experience.position}
            </span>

            {experience.isCurrent ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                Đang làm việc
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-gray-400">
                <CircleX size={12} />
                Đã kết thúc
              </span>
            )}
          </div>

          <h2 className="mt-2 break-words text-xl font-bold leading-7 text-white sm:text-2xl">
            {experience.companyName}
          </h2>

          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-gray-400">
            <CalendarDays size={14} className="shrink-0 text-[#8B9FF8]" />
            <span>{formatDate(experience.startDate)}</span>
            <span className="text-gray-600">—</span>
            <span
              className={
                experience.isCurrent ? "font-medium text-emerald-400" : ""
              }
            >
              {experience.isCurrent
                ? "Hiện tại"
                : formatDate(experience.endDate)}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
