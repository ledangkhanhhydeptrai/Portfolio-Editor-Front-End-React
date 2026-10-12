import { Pencil, Trash2, Eye } from "lucide-react";
import { SkillProps } from "../../../../services/skill/SkillTypes";
import CategoryBadge from "./CategoryBadge";
import { DEFAULT_PAGE_SIZE } from "./skillConstants";

interface SkillTableProps {
  skills: SkillProps[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onView: (skill: SkillProps) => void;
  onEdit: (skill: SkillProps) => void;
  onDelete: (skill: SkillProps) => void;
}

export default function SkillTable({
  skills,
  isLoading,
  isError,
  onRetry,
  onView,
  onEdit,
  onDelete
}: SkillTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3 p-5">
        {Array.from({ length: DEFAULT_PAGE_SIZE }, (_, index) => (
          <div
            key={index}
            className="h-14 animate-pulse rounded-lg bg-white/[0.04]"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-center">
        <p className="text-sm text-red-400">Không thể tải danh sách kỹ năng.</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 text-sm text-[#AAB9FF] hover:underline"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/[0.08] bg-white/[0.02] text-xs uppercase tracking-wider text-white/40">
            <th className="px-5 py-4 font-medium">Kỹ năng</th>
            <th className="px-5 py-4 font-medium">Danh mục</th>
            <th className="px-5 py-4 text-center font-medium">Thứ tự</th>
            <th className="px-5 py-4 text-right font-medium">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {skills.map((skill) => (
            <tr
              key={skill.id}
              className="border-b border-white/[0.05] transition last:border-0 hover:bg-white/[0.025]"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04]">
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      className="size-full object-contain p-1.5"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <p className="font-medium">{skill.name}</p>
                    <p className="mt-1 max-w-[300px] truncate text-xs text-white/30">
                      {skill.id}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4">
                <CategoryBadge category={skill.category} />
              </td>

              <td className="px-5 py-4 text-center">
                <span className="inline-flex size-8 items-center justify-center rounded-lg bg-white/[0.05] text-sm text-white/70">
                  {skill.displayOrder}
                </span>
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    title="Xem chi tiết"
                    onClick={() => onView(skill)}
                    className="flex size-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/50 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400"
                  >
                    <Eye size={15} />
                  </button>

                  <button
                    type="button"
                    title="Chỉnh sửa kỹ năng"
                    onClick={() => onEdit(skill)}
                    className="flex size-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/50 transition hover:border-[#7F96F5]/30 hover:bg-[#7F96F5]/10 hover:text-[#AAB9FF]"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    title="Xóa kỹ năng"
                    onClick={() => onDelete(skill)}
                    className="flex size-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/50 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {skills.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-5 py-14 text-center text-sm text-white/40"
              >
                Không tìm thấy kỹ năng phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
