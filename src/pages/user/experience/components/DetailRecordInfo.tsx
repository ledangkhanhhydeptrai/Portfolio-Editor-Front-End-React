import { Hash } from "lucide-react";
import type { ExperienceProps } from "../../../../services/experience/ExperienceTypes";

export function DetailRecordInfo({
  experience
}: {
  experience: ExperienceProps;
}) {
  return (
    <section className="shrink-0 rounded-xl border border-white/[0.08] bg-[#12131A]">
      <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3">
        <Hash size={16} className="text-[#8B9FF8]" />
        <h3 className="text-sm font-semibold text-white">Thông tin bản ghi</h3>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div>
          <p className="text-xs text-gray-500">Experience ID</p>
          <p className="mt-1 break-all rounded-lg border border-white/[0.06] bg-[#090A0D] px-3 py-2 font-mono text-xs text-gray-300">
            {experience.id}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Thứ tự hiển thị</p>
          <p className="mt-1 inline-flex rounded-lg border border-white/[0.06] bg-[#090A0D] px-3 py-2 text-xs font-medium text-gray-300">
            #{experience.displayOrder}
          </p>
        </div>
      </div>
    </section>
  );
}
