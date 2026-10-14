import { CalendarDays, School, Pencil, Trash2 } from "lucide-react";
import type { EducationTableProps } from "../../../../services/education/EducationTypes";
import { useNavigate } from "react-router-dom";

export default function EducationTable({
  items,
  currentYear,
  onEdit,
  onDelete
}: EducationTableProps) {
  const navigate = useNavigate();

  return (
    <div className="hidden overflow-auto md:block">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/[0.07] bg-[#12131A]">
            <th className="px-4 py-3 text-xs font-medium text-gray-400">
              Trường học
            </th>
            <th className="px-4 py-3 text-xs font-medium text-gray-400">
              Bằng cấp
            </th>
            <th className="px-4 py-3 text-xs font-medium text-gray-400">
              Chuyên ngành
            </th>
            <th className="px-4 py-3 text-xs font-medium text-gray-400">
              Thời gian
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">
              Trạng thái
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/[0.05]">
          {items.map((education) => {
            const isCompleted = education.endYear <= currentYear;

            return (
              <tr
                key={education.id}
                className="cursor-pointer transition-colors hover:bg-white/[0.025]"
                onClick={() => navigate(`/educations/${education.id}`)}
              >
                <td className="px-4 py-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-400/[0.08]">
                      <School size={19} className="text-indigo-300" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium text-gray-200">
                        {education.schoolName}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Thứ tự hiển thị: {education.displayOrder}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="max-w-[240px] px-4 py-4 align-middle">
                  <p className="text-sm leading-5 text-gray-300">
                    {education.degree}
                  </p>
                </td>

                <td className="px-4 py-4 align-middle">
                  <span className="inline-flex rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-gray-300">
                    {education.major}
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-4 align-middle">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <CalendarDays size={15} className="text-gray-500" />
                    {education.startYear} – {education.endYear}
                  </div>
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-right align-middle">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${
                      isCompleted
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                        : "border-amber-400/20 bg-amber-400/10 text-amber-300"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isCompleted ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                    {isCompleted ? "Hoàn thành" : "Đang học"}
                  </span>
                </td>

                <td className="px-4 py-4 text-right align-middle">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Sửa học vấn ${education.schoolName}`}
                      title="Chỉnh sửa học vấn"
                      onClick={(event) => {
                        event.stopPropagation();
                        onEdit(education);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/20 bg-indigo-400/[0.08] px-3 py-2 text-xs font-medium text-indigo-300 transition-colors hover:bg-indigo-400/[0.16]"
                    >
                      <Pencil size={14} />
                      Sửa
                    </button>

                    <button
                      type="button"
                      aria-label={`Xóa học vấn ${education.schoolName}`}
                      title="Xóa học vấn"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDelete(education);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-400/[0.08] px-3 py-2 text-xs font-medium text-red-300 transition-colors hover:bg-red-400/[0.16]"
                    >
                      <Trash2 size={14} />
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
