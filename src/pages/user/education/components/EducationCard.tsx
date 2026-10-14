import { ArrowUpRight, CalendarDays, School, Pencil } from "lucide-react";
import type { EducationCardProps } from "../../../../services/education/EducationTypes";

export default function EducationCard({
  education,
  currentYear,
  onEdit
}: EducationCardProps) {
  const isCompleted = education.endYear <= currentYear;

  return (
    <article className="rounded-xl border border-white/[0.07] bg-[#0C0D12] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10">
          <School size={21} className="text-indigo-300" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-200">
            {education.schoolName}
          </h3>

          <p className="mt-1 text-sm text-gray-400">{education.degree}</p>
        </div>

        <ArrowUpRight size={17} className="shrink-0 text-gray-600" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-md border border-white/[0.08] px-2.5 py-1 text-xs text-gray-300">
          {education.major}
        </span>

        <span
          className={`rounded-full border px-2.5 py-1 text-xs ${
            isCompleted
              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
              : "border-amber-400/20 bg-amber-400/10 text-amber-300"
          }`}
        >
          {isCompleted ? "Hoàn thành" : "Đang học"}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-3 text-sm text-gray-400">
        <CalendarDays size={15} />
        <span>
          {education.startYear} – {education.endYear}
        </span>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => onEdit(education)}
          className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/20 bg-indigo-400/[0.08] px-3 py-2 text-sm font-medium text-indigo-300 transition-colors hover:bg-indigo-400/[0.16]"
        >
          <Pencil size={15} />
          Chỉnh sửa
        </button>
      </div>
    </article>
  );
}
