import { BookOpen, GraduationCap, CalendarDays } from "lucide-react";
import { EducationStatsProps } from "../../../../services/education/EducationTypes";

const cardClass = "rounded-xl border border-white/[0.07] bg-[#111218]";

export default function EducationStats({
  totalEducation,
  completedEducation,
  studyingEducation
}: EducationStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className={`${cardClass} p-4`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Tổng học vấn</p>
            <p className="mt-2 text-2xl font-semibold">{totalEducation}</p>
            <p className="mt-1 text-xs text-gray-500">Bản ghi học vấn</p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10">
            <BookOpen size={21} className="text-indigo-300" />
          </div>
        </div>
      </div>

      <div className={`${cardClass} p-4`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Đã hoàn thành</p>
            <p className="mt-2 text-2xl font-semibold">{completedEducation}</p>
            <p className="mt-1 text-xs text-gray-500">
              Đã kết thúc chương trình
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">
            <GraduationCap size={21} className="text-emerald-300" />
          </div>
        </div>
      </div>

      <div className={`${cardClass} p-4`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Đang học / Sắp tới</p>
            <p className="mt-2 text-2xl font-semibold">{studyingEducation}</p>
            <p className="mt-1 text-xs text-gray-500">Chưa đến năm kết thúc</p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10">
            <CalendarDays size={21} className="text-amber-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
