import React from "react";
import { Clapperboard, Code2, FolderKanban, Star } from "lucide-react";

interface ProjectStatsProps {
  total: number;
  development: number;
  video: number;
  featured: number;
}

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <article className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#121216] px-4 py-3 transition hover:border-white/[0.15]">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#7F96F5]/15 bg-[#7F96F5]/10 text-[#91A4FF]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-gray-300">
          {title}
        </p>
        <p className="truncate text-xs text-gray-500">
          {description}
        </p>
      </div>

      <p className="text-2xl font-bold tracking-tight text-white">
        {value}
      </p>
    </article>
  );
}

export default function ProjectStats({
  total,
  development,
  video,
  featured
}: ProjectStatsProps) {
  return (
    <section className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Tổng dự án"
        value={total}
        description="Tất cả dự án đã lưu"
        icon={<FolderKanban size={19} />}
      />
      <StatCard
        title="Phát triển phần mềm"
        value={development}
        description="Dự án development"
        icon={<Code2 size={19} />}
      />
      <StatCard
        title="Dựng video"
        value={video}
        description="Sản phẩm video editing"
        icon={<Clapperboard size={19} />}
      />
      <StatCard
        title="Dự án nổi bật"
        value={featured}
        description="Được đánh dấu featured"
        icon={<Star size={19} />}
      />
    </section>
  );
}
