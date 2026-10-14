import React from "react";
import { FileText, Plus, RefreshCw } from "lucide-react";

import {
  useCreateCurriculum,
  useDeleteCurriculum,
  useGetAllCurriculum,
  useUpdateCurriculum
} from "../../../hooks/useCurriculum";
import type {
  CreateCurriculumProps,
  CurriculumTypes,
  UpdateCurriculumProps
} from "../../../services/curriculum/CurriculumTypes";
import Button from "../../../components/ui/Button";

import CurriculumStats from "./components/CurriculumStats";
import CurriculumToolbar from "./components/CurriculumToolbar";
import CurriculumTable from "./components/CurriculumTable";
import CurriculumDetailModal from "./components/CurriculumDetailModal";
import FormCreateCurriculum from "./FormCreateCurriculum/FormCreateCurriculum";
import { Notifications } from "../../../components/ui/Notification";
import { Alert, Snackbar } from "@mui/material";
import FormUpdateCurriculum from "./FormUpdateCurriculum/FormUpdateCurriculum";

export default function CurriculumPage(): React.ReactElement {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [primaryFilter, setPrimaryFilter] = React.useState("all");
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [notification, setNotification] = React.useState<Notifications>({
    open: false,
    message: "",
    severity: "error"
  });
  const [isUpdateOpen, setIsUpdateOpen] = React.useState(false);
  const [updateCurriculum, setUpdateCurriculum] =
    React.useState<CurriculumTypes | null>(null);

  const [updateTitle, setUpdateTitle] = React.useState("");
  const [updateFileUrl, setUpdateFileUrl] = React.useState<File | null>(null);
  const [updateDisplayOrder, setUpdateDisplayOrder] = React.useState(0);
  const [updateIsPrimary, setUpdateIsPrimary] = React.useState(false);

  const updateMutation = useUpdateCurriculum();
  const [title, setTitle] = React.useState("");
  const [fileUrl, setFileUrl] = React.useState<File | null>(null);
  const [displayOrder, setDisplayOrder] = React.useState(0);
  const [isPrimary, setIsPrimary] = React.useState(false);
  const createCurriculum = useCreateCurriculum();
  const [selectedCurriculum, setSelectedCurriculum] =
    React.useState<CurriculumTypes | null>(null);
  const deleteMutation = useDeleteCurriculum();
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    refetch
  } = useGetAllCurriculum();

  const curriculums = React.useMemo<CurriculumTypes[]>(() => {
    if (response === undefined || response === null) {
      return [];
    }

    const data: CurriculumTypes[] = response.data;

    if (Array.isArray(data)) {
      return data as CurriculumTypes[];
    }

    return [];
  }, [response]);

  const handleOpenUpdate = (curriculum: CurriculumTypes): void => {
    setUpdateCurriculum(curriculum);
    setUpdateTitle(curriculum.title);
    setUpdateFileUrl(null);
    setUpdateDisplayOrder(curriculum.displayOrder);
    setUpdateIsPrimary(curriculum.isPrimary);
    setIsUpdateOpen(true);
  };

  const handleCloseUpdate = (): void => {
    if (updateMutation.isPending) {
      return;
    }

    setIsUpdateOpen(false);
    setUpdateCurriculum(null);
    setUpdateTitle("");
    setUpdateFileUrl(null);
    setUpdateDisplayOrder(0);
    setUpdateIsPrimary(false);
  };

  const handleUpdateCurriculum = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    if (updateCurriculum === null || updateTitle.trim() === "") {
      return;
    }

    const payload: UpdateCurriculumProps = {
      title: updateTitle.trim(),
      fileUrl: updateFileUrl,
      displayOrder: updateDisplayOrder,
      isPrimary: updateIsPrimary
    };

    updateMutation.mutate(
      {
        id: updateCurriculum.id,
        data: payload
      },
      {
        onSuccess: () => {
          setNotification({
            open: true,
            message: "Cập nhật CV thành công",
            severity: "success"
          });

          setIsUpdateOpen(false);
          setUpdateCurriculum(null);
          setUpdateTitle("");
          setUpdateFileUrl(null);
          setUpdateDisplayOrder(0);
          setUpdateIsPrimary(false);
        }
      }
    );
  };

  const handleDeleteCurriculum = (curriculum: CurriculumTypes): void => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa CV "${curriculum.title}" không?`
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(curriculum.id, {
      onSuccess: () => {
        setNotification({
          open: true,
          message: "Xóa CV thành công",
          severity: "success"
        });
      },
      onError: () => {
        setNotification({
          open: true,
          message: "Xóa CV thất bại",
          severity: "error"
        });
      }
    });
  };

  const filteredCurriculums = React.useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return curriculums.filter((curriculum) => {
      const matchesSearch = curriculum.title.toLowerCase().includes(keyword);

      const matchesPrimary =
        primaryFilter === "all" ||
        (primaryFilter === "primary" && curriculum.isPrimary) ||
        (primaryFilter === "secondary" && !curriculum.isPrimary);

      return matchesSearch && matchesPrimary;
    });
  }, [curriculums, searchTerm, primaryFilter]);

  const primaryCount = React.useMemo(() => {
    return curriculums.filter((curriculum) => curriculum.isPrimary).length;
  }, [curriculums]);

  const handleOpenFile = (fileUrl: string): void => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownloadFile = (curriculum: CurriculumTypes): void => {
    const link = document.createElement("a");

    link.href = curriculum.fileUrl;
    link.download = `${curriculum.title}.pdf`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefresh = (): void => {
    void refetch();
  };

  const handleCloseModal = (): void => {
    setSelectedCurriculum(null);
  };

  const handleCloseCreate = (): void => {
    if (createCurriculum.isPending) {
      return;
    }

    setIsCreateOpen(false);
    setTitle("");
    setFileUrl(null);
    setDisplayOrder(0);
    setIsPrimary(false);
  };

  const handleCreateCurriculum = (): void => {
    if (title.trim() === "" || fileUrl === null) {
      return;
    }

    const payload: CreateCurriculumProps = {
      title: title.trim(),
      fileUrl,
      displayOrder,
      isPrimary
    };

    createCurriculum.mutate(payload, {
      onSuccess: () => {
        setNotification({
          open: true,
          message: "Tạo CV Thành Công",
          severity: "success"
        });
        setIsCreateOpen(false);
        setTitle("");
        setFileUrl(null);
        setDisplayOrder(0);
        setIsPrimary(false);
      }
    });
  };

  const closeNotification = (): void => {
    setNotification((prev) => ({
      ...prev,
      open: false
    }));
  };

  return (
    <div className="flex h-dvh flex-col gap-4 overflow-hidden bg-[#0B0B0D] px-4 pb-20 pt-5 text-gray-100 sm:px-6 sm:pb-5 xl:px-8">
      {/* Page header */}
      <header className="flex shrink-0 flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-300 sm:flex">
            <FileText size={24} />
          </div>

          <div className="min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-gray-500"
            >
              <span>Quản lý nội dung</span>
              <span aria-hidden>/</span>
              <span className="text-indigo-300">Curriculum</span>
            </nav>

            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              Quản lý CV
            </h1>

            <p className="mt-0.5 truncate text-sm text-gray-400">
              Tài liệu hồ sơ, thứ tự hiển thị và CV chính.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleRefresh}
            disabled={isFetching}
          >
            <RefreshCw
              size={16}
              className={`mr-2 ${isFetching ? "animate-spin" : ""}`}
            />
            Làm mới
          </Button>

          <Button type="button" onClick={() => setIsCreateOpen(true)}>
            <Plus size={16} className="mr-2" />
            Thêm CV
          </Button>
        </div>
      </header>

      {/* Statistics */}
      <div className="shrink-0">
        <CurriculumStats
          total={curriculums.length}
          primaryCount={primaryCount}
          filteredCount={filteredCurriculums.length}
        />
      </div>

      {/* Curriculum list: chiếm toàn bộ phần còn lại */}
      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111114] shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]">
        <div className="flex shrink-0 flex-col gap-3 border-b border-white/[0.08] px-5 py-3.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">Danh sách CV</h2>

            <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs tabular-nums text-gray-400">
              {filteredCurriculums.length === curriculums.length
                ? curriculums.length
                : `${filteredCurriculums.length} / ${curriculums.length}`}
            </span>
          </div>

          <CurriculumToolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            primaryFilter={primaryFilter}
            setPrimaryFilter={setPrimaryFilter}
          />
        </div>

        <CurriculumTable
          curriculums={filteredCurriculums}
          total={curriculums.length}
          isLoading={isLoading}
          isError={isError}
          onRetry={handleRefresh}
          onSelectCurriculum={setSelectedCurriculum}
          onOpenFile={handleOpenFile}
          onDownloadFile={handleDownloadFile}
          onUpdateCurriculum={handleOpenUpdate}
          onDeleteCurriculum={handleDeleteCurriculum}
        />
      </section>

      {/* Curriculum detail modal */}
      <CurriculumDetailModal
        curriculum={selectedCurriculum}
        onClose={handleCloseModal}
        onOpenFile={handleOpenFile}
        onDownloadFile={handleDownloadFile}
      />

      {isCreateOpen && (
        <FormCreateCurriculum
          title={title}
          setTitle={setTitle}
          fileUrl={fileUrl}
          setFileUrl={setFileUrl}
          displayOrder={displayOrder}
          setDisplayOrder={setDisplayOrder}
          isPrimary={isPrimary}
          setIsPrimary={setIsPrimary}
          onSubmit={handleCreateCurriculum}
          isPending={createCurriculum.isPending}
          onClose={handleCloseCreate}
        />
      )}

      {isUpdateOpen && updateCurriculum !== null && (
        <FormUpdateCurriculum
          curriculum={updateCurriculum}
          title={updateTitle}
          setTitle={setUpdateTitle}
          fileUrl={updateFileUrl}
          setFileUrl={setUpdateFileUrl}
          displayOrder={updateDisplayOrder}
          setDisplayOrder={setUpdateDisplayOrder}
          isPrimary={updateIsPrimary}
          setIsPrimary={setUpdateIsPrimary}
          isPending={updateMutation.isPending}
          onClose={handleCloseUpdate}
          onSubmit={handleUpdateCurriculum}
        />
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={closeNotification}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Alert
          onClose={closeNotification}
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