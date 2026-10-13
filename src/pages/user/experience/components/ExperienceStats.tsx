import { Building2, CircleCheck, Layers } from "lucide-react";
import { StatCard } from "./StatCard";

interface ExperienceStatsProps {
  total: number;
  currentCount: number;
  companyCount: number;
}

export function ExperienceStats({
  total,
  currentCount,
  companyCount
}: ExperienceStatsProps) {
  return (
    <section className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-3">
      <StatCard
        label="Tổng kinh nghiệm"
        value={total}
        iconClass="border-indigo-500/20 bg-indigo-500/10 text-[#8B9FF8]"
        icon={<Layers size={18} />}
      />
      <StatCard
        label="Đang làm việc"
        value={currentCount}
        valueClass="text-emerald-400"
        iconClass="border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
        icon={<CircleCheck size={18} />}
      />
      <StatCard
        label="Doanh nghiệp / Công ty"
        value={companyCount}
        iconClass="border-violet-400/20 bg-violet-400/10 text-violet-400"
        icon={<Building2 size={18} />}
      />
    </section>
  );
}
