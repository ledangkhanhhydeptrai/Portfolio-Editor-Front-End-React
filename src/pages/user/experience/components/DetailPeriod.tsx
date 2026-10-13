import { CircleCheck, CircleX, Clock3, Hourglass } from "lucide-react";
import type { ExperienceProps } from "../../../../services/experience/ExperienceTypes";
import { formatDate, getDuration } from "../utils";

export function DetailPeriod({ experience }: { experience: ExperienceProps }) {
  const duration = getDuration(
    experience.startDate,
    experience.endDate,
    experience.isCurrent
  );

  return (
    <section className="shrink-0 rounded-xl border border-white/[0.08] bg-[#12131A]">
      <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3">
        <Clock3 size={16} className="text-[#8B9FF8]" />
        <h3 className="text-sm font-semibold text-white">Thời gian công tác</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="rounded-lg border border-white/[0.06] bg-[#090A0D] px-3 py-2.5">
          <p className="text-xs text-gray-500">Bắt đầu</p>
          <p className="mt-1 text-sm font-semibold text-white">
            {formatDate(experience.startDate)}
          </p>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-[#090A0D] px-3 py-2.5">
          <p className="text-xs text-gray-500">Kết thúc</p>
          <p
            className={`mt-1 text-sm font-semibold ${
              experience.isCurrent ? "text-emerald-400" : "text-white"
            }`}
          >
            {experience.isCurrent ? "Hiện tại" : formatDate(experience.endDate)}
          </p>
        </div>

        <div className="col-span-2 flex items-center gap-3 rounded-lg border border-white/[0.06] bg-[#090A0D] px-3 py-2.5">
          <div className="rounded-lg bg-violet-500/10 p-2 text-violet-400">
            <Hourglass size={16} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Tổng thời gian</p>
            <p className="mt-0.5 text-sm font-semibold text-white">{duration}</p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 border-t border-white/[0.08] px-4 py-3">
        <div
          className={`mt-0.5 rounded-lg p-1.5 ${
            experience.isCurrent
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-white/[0.04] text-gray-400"
          }`}
        >
          {experience.isCurrent ? <CircleCheck size={15} /> : <CircleX size={15} />}
        </div>
        <div>
          <p className="text-xs font-medium text-gray-200">Trạng thái công việc</p>
          <p className="mt-0.5 text-xs leading-5 text-gray-400">
            {experience.isCurrent
              ? "Bạn hiện đang làm việc tại vị trí này."
              : "Quá trình công tác tại vị trí này đã kết thúc."}
          </p>
        </div>
      </div>
    </section>
  );
}