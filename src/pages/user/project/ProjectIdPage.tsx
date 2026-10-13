import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  CalendarDays,
  Star,
  FolderKanban,
  Video,
  Code2,
  Image as ImageIcon
} from "lucide-react";
import { useGetProjectById } from "../../../hooks/useProject";
import type { ProjectProps } from "../../../services/project/ProjectTypes";
import ProjectInfoRow from "./components/ProjectInfoRow";
import {
  ProjectErrorState,
  ProjectLoadingState,
  ProjectNotFoundState
} from "./components/ProjectDetailStates";

/**
 * Trang cố định cao = 100dvh - chiều cao header của layout (80px) để không bị che ở đáy.
 * Phần mô tả và cột phải tự cuộn bên trong nếu nội dung dài.
 * Nếu header layout của bạn cao khác 80px thì sửa số này.
 */
const PAGE_HEIGHT = "lg:h-[calc(100dvh-80px)]";

export default function ProjectIdPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetProjectById(
    id === undefined ? "" : id
  );

  const project: ProjectProps | null = React.useMemo(() => {
    if (data === undefined || data.data === null) {
      return null;
    }

    return data.data;
  }, [data]);

  if (isLoading) return <ProjectLoadingState />;
  if (isError) return <ProjectErrorState />;
  if (project === null) return <ProjectNotFoundState />;

  const isVideoEditing = project.category === "VIDEO_EDITING";
  const hasDemoUrl =
    project.demoUrl !== null && project.demoUrl.trim().length > 0;
  const hasValidGithubUrl =
    project.githubUrl !== null &&
    project.githubUrl.startsWith("https://github.com/");

  return (
    // Không dùng min-h-screen: layout ngoài đã có header nên trang sẽ cao hơn khung nhìn.
    <div
      className={`flex flex-col bg-[#0B0B0D] px-4 py-5 text-white sm:px-6 lg:px-10 ${PAGE_HEIGHT}`}
    >
      <div className="flex min-h-0 w-full flex-1 flex-col gap-4">
        {/* Thanh trên: quay lại + badge */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Quay lại danh sách dự án
          </Link>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                isVideoEditing
                  ? "border-purple-400/20 bg-purple-400/10 text-purple-300"
                  : "border-blue-400/20 bg-blue-400/10 text-blue-300"
              }`}
            >
              {isVideoEditing ? <Video size={14} /> : <Code2 size={14} />}
              {isVideoEditing ? "Video Editing" : "Development"}
            </span>

            {project.featured && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1.5 text-xs font-medium text-yellow-300">
                <Star size={14} />
                Featured
              </span>
            )}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
          {/* ===== Trái: ảnh + mô tả ===== */}
          <div className="flex min-h-0 flex-col gap-4">
            <div className="shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#121216]">
              {project.thumbnailUrl.trim().length > 0 ? (
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="aspect-video w-full object-cover lg:aspect-auto lg:h-[clamp(180px,38dvh,300px)]"
                />
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 text-gray-500 lg:aspect-auto lg:h-[clamp(180px,38dvh,300px)]">
                  <ImageIcon size={40} />
                  <span className="text-sm">Chưa có ảnh đại diện</span>
                </div>
              )}
            </div>

            <section className="flex flex-col rounded-2xl border border-white/10 bg-[#121216] p-5 lg:min-h-0 lg:flex-1">
              <div className="mb-3 flex shrink-0 items-center gap-2">
                <div className="rounded-lg bg-[#7F96F5]/10 p-2">
                  <FolderKanban size={18} className="text-[#7F96F5]" />
                </div>
                <h2 className="text-base font-semibold">Mô tả dự án</h2>
              </div>

              <p className="whitespace-pre-line text-sm leading-7 text-gray-400 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
                {project.description.trim().length > 0
                  ? project.description
                  : "Chưa có mô tả cho dự án này."}
              </p>
            </section>
          </div>

          {/* ===== Phải: thông tin dự án ===== */}
          <div className="flex min-h-0 flex-col gap-4 lg:overflow-y-auto">
            <section className="shrink-0 rounded-2xl border border-white/10 bg-[#121216] p-5 sm:p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7F96F5]">
                Project Details
              </p>

              <h1 className="break-words text-2xl font-bold leading-tight">
                {project.title}
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                {isVideoEditing
                  ? "Dự án sản xuất và biên tập video."
                  : "Dự án phát triển phần mềm."}
              </p>

              <div className="my-4 border-t border-white/10" />

              <div className="space-y-3.5">
                <ProjectInfoRow
                  icon={<FolderKanban size={17} />}
                  label="Danh mục"
                >
                  {isVideoEditing ? "Video Editing" : "Development"}
                </ProjectInfoRow>

                <ProjectInfoRow
                  icon={<CalendarDays size={17} />}
                  label="Thứ tự hiển thị"
                >
                  {project.displayOrder}
                </ProjectInfoRow>

                <ProjectInfoRow
                  icon={<Star size={17} />}
                  label="Trạng thái nổi bật"
                >
                  {project.featured ? "Featured Project" : "Normal Project"}
                </ProjectInfoRow>
              </div>

              <div className="mt-5 space-y-2.5">
                {hasDemoUrl && (
                  <a
                    href={project.demoUrl as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#7F96F5] px-4 text-sm font-semibold text-[#0B0B0D] transition hover:bg-[#91A5FF]"
                  >
                    <ExternalLink size={17} />
                    {isVideoEditing ? "Xem video" : "Xem bản demo"}
                  </a>
                )}

                {hasValidGithubUrl && (
                  <a
                    href={project.githubUrl as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-gray-200 transition hover:bg-white/[0.07]"
                  >
                    <Code2 size={17} />
                    Xem source code
                    <ExternalLink size={14} className="text-gray-500" />
                  </a>
                )}

                {!hasDemoUrl && !hasValidGithubUrl && (
                  <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm text-gray-500">
                    Chưa có liên kết cho dự án này.
                  </p>
                )}
              </div>
            </section>

            {/* Project ID */}
            <section className="shrink-0 rounded-2xl border border-white/10 bg-[#121216] p-4">
              <p className="text-xs text-gray-500">Project ID</p>
              <p className="mt-1.5 break-all font-mono text-xs leading-5 text-gray-400">
                {project.id}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}