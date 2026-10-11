import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  CreateWorkStyle,
  DeleteWorkStyle,
  UpdateWorkStyle,
  useWorkStyle
} from "../../../hooks/useWorkStyle";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  StatCards,
  Toolbar,
  WorkStyleCardList,
  WorkStyleTable,
  useWorkStyleTheme
} from "./components";
import type { WorkStyleProps } from "../../../services/work-style/WorkStyleTypes";
import { RowActionHandlers, WorkStyleFormValues } from "./components/types";
// import DetailModal from "./components/DetailModal";
import EditModal from "./components/EditModal";
import DeleteDialog from "./components/DeleteDialog";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import CreateWorkStyleModal from "./create-work-style/CreateWorkStyleModal";
import { Notifications } from "../../../components/ui/Notification";
import { Alert, Snackbar } from "@mui/material";

const PAGE_SIZE = 3;

const WorkStylePage: React.FC = () => {
  const t = useWorkStyleTheme();
  const { data, isLoading, isError, refetch } = useWorkStyle();
  const { mutateAsync, isPending, reset } = CreateWorkStyle();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [notification, setNotification] = React.useState<Notifications>({
    open: false,
    message: "",
    severity: "error"
  });
  const { mutateAsync: deleteWorkStyle, isPending: isDeletingWorkStyle } =
    DeleteWorkStyle();
  // const [viewing, setViewing] = React.useState<WorkStyleProps | null>(null);
  const [editing, setEditing] = React.useState<WorkStyleProps | null>(null);
  const [deleting, setDeleting] = React.useState<WorkStyleProps | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [editError, setEditError] = React.useState<string | null>(null);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const workStyles: WorkStyleProps[] = React.useMemo(() => {
    const items = data && data.data ? data.data : [];
    return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [data]);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [createDisplayOrder, setCreateDisplayOrder] = React.useState(1);
  const [createTitle, setCreateTitle] = React.useState("");
  const [createDescription, setCreateDescription] = React.useState("");
  const [createError, setCreateError] = React.useState<string | null>(null);
  const keyword = searchTerm.trim();
  const { mutateAsync: updateWorkStyle, isPending: isUpdating } =
    UpdateWorkStyle(editing ? editing.id : "");
  const filteredWorkStyles = React.useMemo(() => {
    const lower = keyword.toLowerCase();

    if (!lower) {
      return workStyles;
    }

    return workStyles.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.description.toLowerCase().includes(lower) ||
        item.id.toLowerCase().includes(lower)
    );
  }, [workStyles, keyword]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredWorkStyles.length / PAGE_SIZE)
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const paginatedWorkStyles = React.useMemo(
    () => filteredWorkStyles.slice(startIndex, startIndex + PAGE_SIZE),
    [filteredWorkStyles, startIndex]
  );

  const hasRows = !isLoading && !isError && filteredWorkStyles.length > 0;

  const pageNumbers = React.useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [totalPages]);

  const actions: RowActionHandlers = {
    onView: (item) => {
      navigate(`/work-styles/${item.id}`);
    },
    onEdit: (item) => {
      setEditError(null);
      setEditing(item);
    },
    onDelete: (item) => {
      setDeleteError(null);
      setDeleting(item);
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateError(null);

    try {
      await mutateAsync({
        displayOrder: createDisplayOrder,
        title: createTitle.trim(),
        description: createDescription.trim()
      });
      setNotification({
        open: true,
        message: "Tạo phong cách làm việc thành công",
        severity: "success"
      });
      await refetch();

      setIsCreateOpen(false);
      setCreateTitle("");
      setCreateDescription("");
      setCreateDisplayOrder(workStyles.length + 2);
      reset();
    } catch {
      setCreateError("Không thể tạo Work Style. Vui lòng thử lại.");
    }
  };
  // Đổi _values thành values khi gắn API cập nhật.
  const handleUpdate = async (values: WorkStyleFormValues) => {
    if (!editing) return;

    setIsSaving(true);
    setEditError(null);

    try {
      await updateWorkStyle({
        displayOrder: values.displayOrder,
        title: values.title.trim(),
        description: values.description.trim()
      });

      setNotification({
        open: true,
        message: "Cập nhật phong cách làm việc thành công",
        severity: "success"
      });

      await refetch();
      setEditing(null);
    } catch {
      setEditError("Không thể lưu thay đổi. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteWorkStyle(deleting.id);

      setNotification({
        open: true,
        message: "Xóa phong cách làm việc thành công",
        severity: "success"
      });

      await refetch();
      setDeleting(null);
    } catch {
      setDeleteError("Không thể xóa. Vui lòng thử lại.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`flex min-h-[calc(100vh-5rem)] flex-col p-4 lg:p-6 ${t.page}`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4">
        <PageHeader
          t={t}
          isLoading={isLoading}
          onRefresh={() => void refetch()}
          onCreate={() => {
            reset();
            setCreateError(null);
            setCreateDisplayOrder(workStyles.length + 1);
            setCreateTitle("");
            setCreateDescription("");
            setIsCreateOpen(true);
          }}
        />

        <StatCards
          t={t}
          total={workStyles.length}
          matched={filteredWorkStyles.length}
          isSearching={keyword !== ""}
        />

        <section
          className={`flex flex-1 flex-col overflow-hidden rounded-2xl border ${t.card}`}
        >
          <Toolbar
            t={t}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {isLoading ? (
            <LoadingState t={t} />
          ) : isError ? (
            <ErrorState t={t} onRetry={() => void refetch()} />
          ) : filteredWorkStyles.length === 0 ? (
            <EmptyState
              t={t}
              isSearching={keyword !== ""}
              onClearSearch={() => setSearchTerm("")}
            />
          ) : (
            <>
              <WorkStyleTable
                t={t}
                items={paginatedWorkStyles}
                keyword={keyword}
                actions={actions}
                startIndex={startIndex}
              />

              <WorkStyleCardList
                t={t}
                items={paginatedWorkStyles}
                keyword={keyword}
                actions={actions}
              />
            </>
          )}

          {hasRows && (
            <div
              className={`flex flex-col gap-3 border-t px-5 py-3 sm:flex-row sm:items-center sm:justify-between ${t.muted} ${t.divider}`}
            >
              <p className="text-xs">
                Hiển thị {startIndex + 1} -{" "}
                {Math.min(startIndex + PAGE_SIZE, filteredWorkStyles.length)} /{" "}
                {filteredWorkStyles.length} bản ghi
              </p>

              <div className="flex flex-wrap items-center gap-1">
                {/* Trang trước */}
                <Button
                  type="button"
                  variant="secondary"
                  ariaLabel="Trang trước"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className={`!h-8 !gap-1 !rounded-lg !px-2 !py-0 !text-xs ${t.divider}`}
                >
                  <ChevronLeft size={15} />
                  <span>Trước</span>
                </Button>

                {/* Số trang */}
                {pageNumbers.map((page) => (
                  <Button
                    key={page}
                    type="button"
                    ariaLabel={`Trang ${page}`}
                    disabled={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                    className={`!h-8 !min-w-8 !rounded-lg !px-2 !py-0 !text-xs !font-medium ${
                      currentPage === page
                        ? "border-[#7F96F5] bg-[#7F96F5] text-white hover:bg-[#7F96F5]"
                        : `${t.divider} hover:border-[#7F96F5]`
                    }`}
                  >
                    {page}
                  </Button>
                ))}

                {/* Trang sau */}
                <Button
                  type="button"
                  variant="secondary"
                  ariaLabel="Trang sau"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className={`!h-8 !gap-1 !rounded-lg !px-2 !py-0 !text-xs ${t.divider}`}
                >
                  <span>Sau</span>
                  <ChevronRight size={15} />
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* <DetailModal
        t={t}
        item={viewing}
        onClose={() => setViewing(null)}
        onEdit={(item) => {
          setViewing(null);
          actions.onEdit(item);
        }}
      /> */}

      <EditModal
        t={t}
        item={editing}
        isSaving={isSaving || isUpdating}
        error={editError}
        onClose={() => setEditing(null)}
        onSubmit={handleUpdate}
      />
      <CreateWorkStyleModal
        open={isCreateOpen}
        displayOrder={createDisplayOrder}
        setDisplayOrder={setCreateDisplayOrder}
        title={createTitle}
        setTitle={setCreateTitle}
        description={createDescription}
        setDescription={setCreateDescription}
        isSaving={isPending}
        error={createError}
        onClose={() => {
          if (!isPending) {
            setIsCreateOpen(false);
            setCreateError(null);
            reset();
          }
        }}
        onSubmit={handleCreate}
      />
      <DeleteDialog
        t={t}
        item={deleting}
        isDeleting={isDeleting || isDeletingWorkStyle}
        error={deleteError}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
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
};

export default WorkStylePage;
