import { FileText } from "lucide-react";
import type { ExperienceProps } from "../../../../services/experience/ExperienceTypes";

export function DetailDescription({
  experience
}: {
  experience: ExperienceProps;
}) {
  return (
    <section className="flex min-h-48 flex-1 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#12131A] lg:min-h-0">
      <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.08] px-4 py-3">
        <FileText size={16} className="text-[#8B9FF8]" />
        <h3 className="text-sm font-semibold text-white">Mô tả công việc</h3>
      </div>

      {/* Mô tả dài sẽ cuộn bên trong khung, không làm trang bị tràn */}
      <div className="flex-1 overflow-auto overscroll-contain p-4 [scrollbar-gutter:stable] lg:min-h-0">
        <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-300">
          {experience.description || "Chưa có mô tả công việc."}
        </p>
      </div>
    </section>
  );
}
