import { Code2, Video, Layers3 } from "lucide-react";

interface SkillSummaryProps {
  total: number;
  developmentCount: number;
  videoCount: number;
  drivingCount: number;
}

export default function SkillSummary({
  total,
  developmentCount,
  videoCount,
  drivingCount
}: SkillSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-white/[0.08] bg-[#121216] p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/50">Tổng kỹ năng</span>
          <Layers3 size={19} className="text-[#7F96F5]" />
        </div>
        <p className="mt-3 text-3xl font-bold">{total}</p>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-[#121216] p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/50">Development</span>
          <Code2 size={19} className="text-blue-400" />
        </div>
        <p className="mt-3 text-3xl font-bold">{developmentCount}</p>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-[#121216] p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/50">Video Editing</span>
          <Video size={19} className="text-purple-400" />
        </div>
        <p className="mt-3 text-3xl font-bold">{videoCount}</p>
        <p className="mt-1 text-xs text-white/35">Driving: {drivingCount}</p>
      </div>
    </div>
  );
}
