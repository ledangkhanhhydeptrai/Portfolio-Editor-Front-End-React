import { Building2, CalendarDays } from "lucide-react";
import { ExperienceProps } from "../../../../services/experience/ExperienceTypes";
import { formatDate } from "../utils";
import { StatusBadge } from "./StatusBadge";

interface ExperienceCardListProps {
  items: ExperienceProps[];
}

export function ExperienceCardList({ items }: ExperienceCardListProps) {
  return (
    <div className="divide-y divide-white/[0.06] p-2 md:hidden">
      {items.map((experience) => (
        <div key={experience.id} className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#8B9FF8]">
                <Building2 size={17} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {experience.companyName}
                </h3>
                <p className="text-xs font-medium text-[#8B9FF8]">
                  {experience.position}
                </p>
              </div>
            </div>

            <StatusBadge isCurrent={experience.isCurrent} short />
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
            <CalendarDays size={12} />
            <span>{formatDate(experience.startDate)} — </span>
            <span
              className={
                experience.isCurrent ? "font-medium text-emerald-400" : ""
              }
            >
              {experience.isCurrent
                ? "Hiện tại"
                : formatDate(experience.endDate)}
            </span>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-gray-300">
            {experience.description}
          </p>
        </div>
      ))}
    </div>
  );
}
