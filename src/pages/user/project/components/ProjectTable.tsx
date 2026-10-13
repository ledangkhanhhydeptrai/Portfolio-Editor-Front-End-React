import {
  AlertCircle,
  Code2,
  ExternalLink,
  Eye,
  FolderKanban,
  Image as ImageIcon,
  LoaderCircle,
  Pencil,
  Star,
  Trash2
} from "lucide-react";
import type { ProjectProps } from "../../../../services/project/ProjectTypes";
import ProjectCategoryBadge from "./ProjectCategoryBadge";

interface ProjectTableProps {
  projects: ProjectProps[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onView: (project: ProjectProps) => void;
  onEdit: (project: ProjectProps) => void;
  onDelete: (project: ProjectProps) => void;
}

const th =
  "sticky top-0 z-10 bg-[#121216] px-4 py-3 text-xs font-medium text-white/45 shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]";

const actionBtn =
  "flex size-8 items-center justify-center rounded-lg border border-white/[0.08] text-white/50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F96F5]";

export default function ProjectTable({
  projects,
  isLoading,
  isError,
  onRetry,
  onView,
  onEdit,
  onDelete
}: ProjectTableProps) {
  if (isLoading) {
    return (
      <div className="flex h-full min-h-72 flex-col items-center justify-center gap-3">
        <LoaderCircle size={30} className="animate-spin text-[#7F96F5]" />
        <p className="text-sm text-gray-400">Đang tải danh sách dự án...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full min-h-72 flex-col items-center justify-center gap-3 px-4 text-center">
        <AlertCircle size={32} className="text-red-400" />
        <h3 className="font-semibold">Không thể tải dự án</h3>
        <p className="text-sm text-gray-500">
          Vui lòng kiểm tra kết nối và thử lại.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-[#7F96F5] px-4 py-2 text-sm font-semibold text-[#0B0B0D]"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex h-full min-h-72 flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-gray-500">
          <FolderKanban size={25} />
        </div>
        <h3 className="font-semibold">Không tìm thấy dự án</h3>
        <p className="mt-2 max-w-sm text-sm text-gray-500">
          Thử thay đổi từ khóa hoặc bộ lọc để tìm dự án phù hợp.
        </p>
      </div>
    );
  }

  return (
    <table className="w-full min-w-[960px] border-collapse text-left">
      <thead>
        <tr>
          <th className={th}>Dự án</th>
          <th className={th}>Danh mục</th>
          <th className={th}>Trạng thái</th>
          <th className={`${th} text-center`}>Thứ tự</th>
          <th className={th}>Liên kết</th>
          <th className={`${th} text-right`}>Thao tác</th>
        </tr>
      </thead>

      <tbody>
        {projects.map((project) => {
          const hasDemo =
            project.demoUrl !== null && project.demoUrl.trim() !== "";
          const hasGithub =
            project.githubUrl !== null &&
            project.githubUrl.startsWith("https://github.com/");

          return (
            <tr
              key={project.id}
              className="border-b border-white/[0.05] transition last:border-0 hover:bg-white/[0.025]"
            >
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-[#19191F]">
                    {project.thumbnailUrl ? (
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={18} className="text-gray-600" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p
                      className="max-w-[340px] truncate text-sm font-medium leading-5 text-white"
                      title={project.title}
                    >
                      {project.title}
                    </p>
                    <p
                      className="max-w-[340px] truncate text-xs leading-4 text-gray-500"
                      title={project.description}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-2.5">
                <ProjectCategoryBadge category={project.category} />
              </td>

              <td className="px-4 py-2.5">
                {project.featured ? (
                  <span className="inline-flex items-center gap-1 rounded-md border border-amber-300/20 bg-amber-400/10 px-2 py-0.5 text-xs font-medium text-amber-300">
                    <Star size={11} fill="currentColor" />
                    Featured
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">Thường</span>
                )}
              </td>

              <td className="px-4 py-2.5 text-center">
                <span className="inline-flex size-7 items-center justify-center rounded-md bg-white/[0.05] text-sm text-white/70">
                  {project.displayOrder}
                </span>
              </td>

              <td className="px-4 py-2.5">
                {hasDemo || hasGithub ? (
                  <div className="flex items-center gap-1.5">
                    {hasDemo && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-[#7F96F5]/10 px-2.5 py-1.5 text-xs font-medium text-[#9EAEFF] transition hover:bg-[#7F96F5]/20"
                      >
                        <ExternalLink size={13} />
                        Demo
                      </a>
                    )}
                    {hasGithub && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-white/[0.06]"
                      >
                        <Code2 size={13} />
                        GitHub
                      </a>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-gray-600">—</span>
                )}
              </td>

              <td className="px-4 py-2.5">
                <div className="flex justify-end gap-1.5">
                  <button
                    type="button"
                    title="Xem chi tiết"
                    aria-label={`Xem chi tiết ${project.title}`}
                    onClick={() => onView(project)}
                    className={`${actionBtn} hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400`}
                  >
                    <Eye size={15} />
                  </button>

                  <button
                    type="button"
                    title="Chỉnh sửa"
                    aria-label={`Chỉnh sửa ${project.title}`}
                    onClick={() => onEdit(project)}
                    className={`${actionBtn} hover:border-[#7F96F5]/30 hover:bg-[#7F96F5]/10 hover:text-[#AAB9FF]`}
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    title="Xóa dự án"
                    aria-label={`Xóa ${project.title}`}
                    onClick={() => onDelete(project)}
                    className={`${actionBtn} hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
