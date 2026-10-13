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

/**
 * Chiều cao CỐ ĐỊNH của vùng bảng, tính theo chiều cao cửa sổ:
 *   100dvh - 570px
 * 570px = phần phía trên bảng (thanh header, tiêu đề trang, 3 thẻ thống kê,
 * tiêu đề + ô tìm kiếm của card ≈ 470px) + thanh phân trang và khoảng đệm đáy (≈ 100px).
 * Tối thiểu 168px (hàng tiêu đề + 2 dòng), tối đa 620px (≈ 10 dòng).
 * Nếu bạn rút gọn phần phía trên (ví dụ thu nhỏ thẻ thống kê) thì giảm 570px
 * tương ứng để bảng hiện được nhiều dòng hơn.
 */
const BODY_HEIGHT = "h-[clamp(168px,calc(100dvh_-_520px),620px)]";

const actionBtn =
  "flex size-8 items-center justify-center rounded-lg border border-white/[0.08] text-white/50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F96F5]";

const th =
  "sticky top-0 z-10 bg-[#141416] px-4 py-3 text-xs font-medium text-white/45 shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]";

export default function SkillTable({
  skills,
  isLoading,
  isError,
  onRetry,
  onView,
  onEdit,
  onDelete,
}: SkillTableProps) {
  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <div className="space-y-2 p-4">
        {Array.from({ length: DEFAULT_PAGE_SIZE }, (_, index) => (
          <div
            key={index}
            className="h-12 animate-pulse rounded-lg bg-white/[0.04]"
          />
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex h-full flex-col items-center justify-center px-5 text-center">
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
  } else {
    content = (
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr>
            <th className={th}>Kỹ năng</th>
            <th className={th}>Danh mục</th>
            <th className={`${th} text-center`}>Thứ tự</th>
            <th className={`${th} text-right`}>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {skills.map((skill) => (
            <tr
              key={skill.id}
              className="border-b border-white/[0.05] transition last:border-0 hover:bg-white/[0.025]"
            >
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.04]">
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      className="size-full object-contain p-1"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium leading-5">
                      {skill.name}
                    </p>
                    <p
                      title={skill.id}
                      className="max-w-[260px] truncate text-[11px] leading-4 text-white/30"
                    >
                      {skill.id}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-2.5">
                <CategoryBadge category={skill.category} />
              </td>

              <td className="px-4 py-2.5 text-center">
                <span className="inline-flex size-7 items-center justify-center rounded-md bg-white/[0.05] text-sm text-white/70">
                  {skill.displayOrder}
                </span>
              </td>

              <td className="px-4 py-2.5">
                <div className="flex justify-end gap-1.5">
                  <button
                    type="button"
                    title="Xem chi tiết"
                    aria-label={`Xem chi tiết ${skill.name}`}
                    onClick={() => onView(skill)}
                    className={`${actionBtn} hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400`}
                  >
                    <Eye size={15} />
                  </button>

                  <button
                    type="button"
                    title="Chỉnh sửa kỹ năng"
                    aria-label={`Chỉnh sửa ${skill.name}`}
                    onClick={() => onEdit(skill)}
                    className={`${actionBtn} hover:border-[#7F96F5]/30 hover:bg-[#7F96F5]/10 hover:text-[#AAB9FF]`}
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    title="Xóa kỹ năng"
                    aria-label={`Xóa ${skill.name}`}
                    onClick={() => onDelete(skill)}
                    className={`${actionBtn} hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400`}
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
                className="px-5 py-12 text-center text-sm text-white/40"
              >
                Không tìm thấy kỹ năng phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  return (
    // Khung luôn cao bằng nhau ở mọi trạng thái (đang tải, lỗi, 5 / 10 / 20 / tất cả dòng).
    // Dòng nhiều hơn thì cuộn bên trong khung, thanh phân trang không bị đẩy đi.
    <div
      className={`${BODY_HEIGHT} overflow-auto overscroll-contain [scrollbar-gutter:stable]`}
    >
      {content}
    </div>
  );
}