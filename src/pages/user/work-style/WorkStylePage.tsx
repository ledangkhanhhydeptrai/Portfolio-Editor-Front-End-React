import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWorkStyle } from "../../../hooks/useWorkStyle";
import {

  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  StatCards,
  Toolbar,
  WorkStyleCardList,
  WorkStyleTable,
  useWorkStyleTheme,

} from "./components";
import type { WorkStyleProps } from "../../../services/work-style/WorkStyleTypes";
import { RowActionHandlers, WorkStyleFormValues } from "./components/types";
import DetailModal from "./components/DetailModal";
import EditModal from "./components/EditModal";
import DeleteDialog from "./components/DeleteDialog";

const PAGE_SIZE = 3;

const WorkStylePage: React.FC = () => {
  const t = useWorkStyleTheme();
  const { data, isLoading, isError, refetch } = useWorkStyle();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const [viewing, setViewing] = React.useState<WorkStyleProps | null>(null);
  const [editing, setEditing] = React.useState<WorkStyleProps | null>(null);
  const [deleting, setDeleting] = React.useState<WorkStyleProps | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [editError, setEditError] = React.useState<string | null>(null);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);

  const workStyles: WorkStyleProps[] = React.useMemo(() => {
    const items = data && data.data ? data.data : [];

    return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [data]);

  const keyword = searchTerm.trim();

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
    const pages: number[] = [];

    for (let page = 1; page <= totalPages; page += 1) {
      pages.push(page);
    }

    return pages;
  }, [totalPages]);

  const actions: RowActionHandlers = {
    onView: setViewing,
    onEdit: (item) => {
      setEditError(null);
      setEditing(item);
    },
    onDelete: (item) => {
      setDeleteError(null);
      setDeleting(item);
    },
  };

  // Đổi _values thành values khi gắn API cập nhật.
  const handleUpdate = async (_values: WorkStyleFormValues) => {
    if (!editing) return;

    setIsSaving(true);
    setEditError(null);
    try {
      // TODO: gọi API cập nhật, ví dụ: await updateWorkStyle(editing.id, values);
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
      // TODO: gọi API xóa, ví dụ: await deleteWorkStyle(deleting.id);
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
                <button
                  type="button"
                  aria-label="Trang trước"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className={`inline-flex h-8 items-center gap-1 rounded-lg border px-2 text-xs transition disabled:cursor-not-allowed disabled:opacity-40 ${
                    t.divider
                  }`}
                >
                  <ChevronLeft size={15} />
                  <span>Trước</span>
                </button>

                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    type="button"
                    aria-label={`Trang ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 min-w-8 rounded-lg border px-2 text-xs font-medium transition ${
                      currentPage === page
                        ? "border-[#7F96F5] bg-[#7F96F5] text-white"
                        : `${t.divider} hover:border-[#7F96F5]`
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  aria-label="Trang sau"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className={`inline-flex h-8 items-center gap-1 rounded-lg border px-2 text-xs transition disabled:cursor-not-allowed disabled:opacity-40 ${
                    t.divider
                  }`}
                >
                  <span>Sau</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      <DetailModal
        t={t}
        item={viewing}
        onClose={() => setViewing(null)}
        onEdit={(item) => {
          setViewing(null);
          actions.onEdit(item);
        }}
      />

      <EditModal
        t={t}
        item={editing}
        isSaving={isSaving}
        error={editError}
        onClose={() => setEditing(null)}
        onSubmit={handleUpdate}
      />

      <DeleteDialog
        t={t}
        item={deleting}
        isDeleting={isDeleting}
        error={deleteError}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default WorkStylePage;