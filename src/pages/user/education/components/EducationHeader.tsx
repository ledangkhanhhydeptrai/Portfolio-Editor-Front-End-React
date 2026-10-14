import { GraduationCap, RefreshCw } from "lucide-react";
import { EducationHeaderProps } from "../../../../services/education/EducationTypes";

export default function EducationHeader({
  isFetching,
  onRefresh
}: EducationHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10">
          <GraduationCap size={23} className="text-indigo-300" />
        </div>

        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Quản lý học vấn
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Theo dõi thông tin trường học, bằng cấp và quá trình học tập.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={isFetching}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
        Làm mới
      </button>
    </div>
  );
}
