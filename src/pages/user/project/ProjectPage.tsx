import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProject,
  useDeleteProject,
  useGetAllProject,
  useUpdateProject
} from "../../../hooks/useProject";
import type { ProjectProps } from "../../../services/project/ProjectTypes";
import type { SkillEnum } from "../../../services/skill/SkillTypes";
import ProjectPageHeader from "./components/ProjectPageHeader";
import ProjectStats from "./components/ProjectStats";
import ProjectToolbar from "./components/ProjectToolBar";
import ProjectTable from "./components/ProjectTable";
import ProjectPagination from "./components/ProjectPagination";
import {
  DEFAULT_PAGE_SIZE,
  type FeaturedFilter,
  type SortOrder
} from "./components/ProjectConstants";
import FormCreateProjectFile from "./FormCreateProject/FormCreateProject";
import Button from "../../../components/ui/Button";
import { Plus } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import { Notifications } from "../../../components/ui/Notification";
import { Alert, Snackbar } from "@mui/material";
import FormUpdateProjectFile from "./FormUpdateProject/FormUpdateProject";

/**
 * Trang cố định cao = 100dvh - chiều cao header của layout (80px).
 * Bảng cuộn bên trong khung, thanh phân trang luôn nằm đáy màn hình
 * và giao diện không đổi khi đổi số dự án mỗi trang.
 * Nếu header layout của bạn cao khác 80px thì sửa số này.
 */
const PAGE_HEIGHT = "lg:h-[calc(100dvh-80px)]";

export default function ProjectPage() {
  const { data, isLoading, isError, refetch, isFetching } = useGetAllProject();
  const deleteProjectMutation = useDeleteProject();
  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState<SkillEnum | "ALL">(
    "ALL"
  );
  const [notification, setNotification] = React.useState<Notifications>({
    open: false,
    message: "",
    severity: "error"
  });
  const [editingProject, setEditingProject] =
    React.useState<ProjectProps | null>(null);

  const updateProjectMutation = useUpdateProject(
    editingProject === null ? "" : editingProject.id
  );
  const [filterFeatured, setFilterFeatured] =
    React.useState<FeaturedFilter>("ALL");
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("asc");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);
  const projects = React.useMemo<ProjectProps[]>(() => {
    if (data === undefined || !Array.isArray(data.data)) {
      return [];
    }

    return data.data;
  }, [data]);

  const createProjectMutation = useCreateProject();

  const [isCreateOpen, setIsCreateOpen] = React.useState(false);

  const [createCategory, setCreateCategory] = React.useState<SkillEnum>(
    "DEVELOPMENT" as SkillEnum
  );
  const [createTitle, setCreateTitle] = React.useState("");
  const [createDescription, setCreateDescription] = React.useState("");
  const [createDisplayOrder, setCreateDisplayOrder] = React.useState(0);
  const [createFeatured, setCreateFeatured] = React.useState(false);
  const [createDemoUrl, setCreateDemoUrl] = React.useState("");
  const [createGithubUrl, setCreateGithubUrl] = React.useState("");
  const [createThumbnailUrl, setCreateThumbnailUrl] =
    React.useState<File | null>(null);

  const [createError, setCreateError] = React.useState("");
  const handleOpenUpdate = (project: ProjectProps) => {
    setEditingProject(project);

    setCreateCategory(project.category as SkillEnum);
    setCreateTitle(project.title);
    setCreateDescription(project.description);
    setCreateDisplayOrder(project.displayOrder);
    setCreateFeatured(project.featured);
    setCreateDemoUrl(project.demoUrl === null ? "" : project.demoUrl);
    setCreateGithubUrl(project.githubUrl === null ? "" : project.githubUrl);
    setCreateThumbnailUrl(null);
    setCreateError("");
  };
  const resetCreateForm = () => {
    setCreateCategory("DEVELOPMENT" as SkillEnum);
    setCreateTitle("");
    setCreateDescription("");
    setCreateDisplayOrder(0);
    setCreateFeatured(false);
    setCreateDemoUrl("");
    setCreateGithubUrl("");
    setCreateThumbnailUrl(null);
    setCreateError("");
  };



  const handleCreateProject = async () => {
    try {
      setCreateError("");

      if (createThumbnailUrl === null) {
        setCreateError("Vui lòng chọn ảnh thumbnail.");
        return;
      }

      await createProjectMutation.mutateAsync({
        category: createCategory,
        demoUrl: createDemoUrl,
        description: createDescription,
        displayOrder: createDisplayOrder,
        featured: createFeatured,
        githubUrl: createGithubUrl,
        thumbnailUrl: createThumbnailUrl,
        title: createTitle
      });
      setNotification({
        open: true,
        message: "Tạo dự án thành công",
        severity: "success"
      });
      setIsCreateOpen(false);
      resetCreateForm();

      setCreateTitle("");
      setCreateDescription("");
      setCreateCategory("DEVELOPMENT" as SkillEnum);
      setCreateDisplayOrder(0);
      setCreateFeatured(false);
      setCreateDemoUrl("");
      setCreateGithubUrl("");
      setCreateError("");
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : String(error));
    }
  };
  const handleCloseProjectModal = () => {
  setIsCreateOpen(false);
  setEditingProject(null);
  resetCreateForm();
};
  const handleUpdateProject = async () => {
    if (editingProject === null) {
      return;
    }

    try {
      setCreateError("");

      await updateProjectMutation.mutateAsync({
        category: createCategory,
        demoUrl: createDemoUrl,
        description: createDescription,
        displayOrder: createDisplayOrder,
        featured: createFeatured,
        githubUrl: createGithubUrl,
        thumbnailUrl: createThumbnailUrl,
        title: createTitle
      });

      setNotification({
        open: true,
        message: "Cập nhật dự án thành công",
        severity: "success"
      });

      setEditingProject(null);
      resetCreateForm();
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : String(error));
    }
  };
  const filteredProjects = React.useMemo<ProjectProps[]>(() => {
    const keyword = search.trim().toLowerCase();

    return projects
      .filter((project) => {
        const matchesSearch =
          project.title.toLowerCase().includes(keyword) ||
          project.description.toLowerCase().includes(keyword);

        const matchesCategory =
          filterCategory === "ALL" || project.category === filterCategory;

        const matchesFeatured =
          filterFeatured === "ALL" ||
          (filterFeatured === "FEATURED" && project.featured) ||
          (filterFeatured === "NORMAL" && !project.featured);

        return matchesSearch && matchesCategory && matchesFeatured;
      })
      .sort((a, b) => {
        const difference = a.displayOrder - b.displayOrder;

        if (difference === 0) {
          return a.title.localeCompare(b.title);
        }

        return sortOrder === "asc" ? difference : -difference;
      });
  }, [projects, search, filterCategory, filterFeatured, sortOrder]);

  const showAll = pageSize === 0;
  const totalItems = filteredProjects.length;
  const totalPages = showAll
    ? 1
    : Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);

  const visibleProjects = React.useMemo<ProjectProps[]>(() => {
    if (showAll) {
      return filteredProjects;
    }

    const startIndex = (currentPage - 1) * pageSize;

    return filteredProjects.slice(startIndex, startIndex + pageSize);
  }, [filteredProjects, showAll, currentPage, pageSize]);

  const featuredCount = projects.filter((project) => project.featured).length;
  const developmentCount = projects.filter(
    (project) => project.category === "DEVELOPMENT"
  ).length;
  const videoCount = projects.filter(
    (project) => project.category === "VIDEO_EDITING"
  ).length;

  const rangeStart =
    totalItems === 0 ? 0 : showAll ? 1 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = showAll
    ? totalItems
    : Math.min(currentPage * pageSize, totalItems);

  React.useEffect(() => {
    setPage(1);
  }, [search, filterCategory, filterFeatured, pageSize, sortOrder]);

  const handleResetFilters = () => {
    setSearch("");
    setFilterCategory("ALL");
    setFilterFeatured("ALL");
    setSortOrder("asc");
    setPage(1);
  };
  const handleDeleteProject = async (project: ProjectProps) => {
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa dự án "${project.title}" không?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProjectMutation.mutateAsync(project.id);

      setNotification({
        open: true,
        message: "Xóa dự án thành công",
        severity: "success"
      });
    } catch (error) {
      setNotification({
        open: true,
        message: error instanceof Error ? error.message : "Xóa dự án thất bại",
        severity: "error"
      });
    }
  };
  return (
    // Không dùng min-h-screen: layout ngoài đã có header nên trang sẽ cao hơn khung nhìn.
    <div
      className={`flex flex-col bg-[#0B0B0D] px-4 py-5 text-[#F0EFEA] sm:px-6 lg:px-8 ${PAGE_HEIGHT}`}
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col gap-4">
        <ProjectPageHeader
          isFetching={isFetching}
          onRefresh={() => refetch()}
          onCreate={() => setIsCreateOpen(true)}
        />

        <ProjectStats
          total={projects.length}
          development={developmentCount}
          video={videoCount}
          featured={featuredCount}
        />

        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121216]">
          <ProjectToolbar
            totalItems={totalItems}
            search={search}
            onSearchChange={setSearch}
            category={filterCategory}
            onCategoryChange={setFilterCategory}
            featured={filterFeatured}
            onFeaturedChange={setFilterFeatured}
            sortOrder={sortOrder}
            onToggleSort={() =>
              setSortOrder((current) => (current === "asc" ? "desc" : "asc"))
            }
            onReset={handleResetFilters}
          />

          {/* Vùng bảng: luôn chiếm hết chỗ còn lại, cuộn bên trong, tiêu đề cột dính phía trên */}
          <div className="min-h-72 flex-1 overflow-auto overscroll-contain [scrollbar-gutter:stable] lg:min-h-0">
            <ProjectTable
              projects={visibleProjects}
              isLoading={isLoading}
              isError={isError}
              onRetry={() => refetch()}
              onView={(project) => navigate(`/projects/${project.id}`)}
              onEdit={handleOpenUpdate}
              onDelete={handleDeleteProject}
            />
          </div>

          {!isLoading && !isError && totalItems > 0 && (
            <ProjectPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </section>
      </div>

    <Modal
  open={isCreateOpen || editingProject !== null}
  onClose={handleCloseProjectModal}
  title={editingProject === null ? "Tạo dự án mới" : "Cập nhật dự án"}
  size="xl"
  footer={
    <>
      <Button
        type="button"
        variant="secondary"
        onClick={handleCloseProjectModal}
        disabled={
          createProjectMutation.isPending ||
          updateProjectMutation.isPending
        }
      >
        Hủy
      </Button>

      <Button
        type="button"
        onClick={
          editingProject === null
            ? handleCreateProject
            : handleUpdateProject
        }
        isLoading={
          createProjectMutation.isPending ||
          updateProjectMutation.isPending
        }
      >
        <Plus size={16} />
        {editingProject === null ? "Tạo dự án" : "Lưu thay đổi"}
      </Button>
    </>
  }
>
  <div className="space-y-4">
    {createError.length > 0 && (
      <div
        role="alert"
        className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
      >
        {createError}
      </div>
    )}

    {editingProject === null ? (
      <FormCreateProjectFile
        category={createCategory}
        setCategory={setCreateCategory}
        title={createTitle}
        setTitle={setCreateTitle}
        description={createDescription}
        setDescription={setCreateDescription}
        displayOrder={createDisplayOrder}
        setDisplayOrder={setCreateDisplayOrder}
        featured={createFeatured}
        setFeatured={setCreateFeatured}
        demoUrl={createDemoUrl}
        setDemoUrl={setCreateDemoUrl}
        githubUrl={createGithubUrl}
        setGithubUrl={setCreateGithubUrl}
        thumbnailUrl={createThumbnailUrl}
        setThumbnailUrl={setCreateThumbnailUrl}
        onSubmit={handleCreateProject}
      />
    ) : (
      <FormUpdateProjectFile
        category={createCategory}
        setCategory={setCreateCategory}
        title={createTitle}
        setTitle={setCreateTitle}
        description={createDescription}
        setDescription={setCreateDescription}
        displayOrder={createDisplayOrder}
        setDisplayOrder={setCreateDisplayOrder}
        featured={createFeatured}
        setFeatured={setCreateFeatured}
        demoUrl={createDemoUrl}
        setDemoUrl={setCreateDemoUrl}
        githubUrl={createGithubUrl}
        setGithubUrl={setCreateGithubUrl}
        thumbnailUrl={createThumbnailUrl}
        setThumbnailUrl={setCreateThumbnailUrl}
        onSubmit={handleUpdateProject}
      />
    )}
  </div>
</Modal>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => {
          setNotification((prev) => ({
            ...prev,
            open: false
          }));
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Alert
          onClose={() => {
            setNotification((prev) => ({
              ...prev,
              open: false
            }));
          }}
          severity={notification.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "12px",
            fontSize: "14px"
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
