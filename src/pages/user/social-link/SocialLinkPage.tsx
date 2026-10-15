import React from "react";
import {
  useCreateSocialLink,
  useDeleteSocialLink,
  useSocialLink,
  useUpdateSocialLink
} from "../../../hooks/useSocialLink";
import { useTheme } from "../../../contexts/ThemeContext";
import type { SocialLinkProps } from "../../../services/social-link/SocialLinkTypes";
import type { Notifications } from "../../../components/ui/Notification";
import { SocialLinkStats } from "./components/SocialLinkStats";
import { SocialLinkEmptyState } from "./components/SocialLinkEmptyState";
import { SocialLinkTable } from "./components/SocialLinkTable";
import { SocialLinkCardList } from "./components/SocialLinkCardList";
import {
  SocialLinkDeleteDialog,
  SocialLinkDetailDialog
} from "./components/SocialLinkDialogs";
import FormCreate from "./components/FormCreate";
import FormUpdate from "./components/UpdateFormSocialLink";
import { SocialLinkHeader } from "./components/SocialLinkHeader";
import { SocialLinkToolbar } from "./components/SocialLinkToolbar";

import { SocialLinkPagination } from "./components/SocialLinkPagination";
import { SocialLinkNotification } from "./components/SocialLinkNotification";
import { SocialLinkListSkeleton } from "./components/SocialLinklistskeleton";
import { SocialLinkErrorState } from "./components/SocialLinkerrorstate";
import { useNavigate } from "react-router-dom";

type DialogState =
  | { type: "create" }
  | { type: "view"; item: SocialLinkProps }
  | { type: "edit"; item: SocialLinkProps }
  | { type: "delete"; item: SocialLinkProps }
  | null;

const PAGE_SIZE = 4;

export default function SocialLinkPage() {
  const { data, isLoading, isError, refetch } = useSocialLink();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [searchTerm, setSearchTerm] = React.useState("");
  const [dialog, setDialog] = React.useState<DialogState>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [editingItem, setEditingItem] = React.useState<SocialLinkProps | null>(
    null
  );

  // Form state
  const [platform, setPlatform] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [displayOrder, setDisplayOrder] = React.useState(1);
  const [iconUrl, setIconUrl] = React.useState<File | null>(null);
  const [createError, setCreateError] = React.useState("");

  const [notification, setNotification] = React.useState<Notifications>({
    open: false,
    message: "",
    severity: "error"
  });

  const { mutateAsync, isPending } = useCreateSocialLink();
  const updateMutation = useUpdateSocialLink(editingItem ? editingItem.id : "");
  const deleteMutation = useDeleteSocialLink();
  const navigate = useNavigate();

  const openView = (item: SocialLinkProps) => {
    navigate(`/social-links/${item.id}`);
  };
  const resetForm = React.useCallback(() => {
    setPlatform("");
    setUrl("");
    setDisplayOrder(1);
    setIconUrl(null);
    setCreateError("");
  }, []);

  const closeDialog = React.useCallback(() => {
    setDialog(null);
    setEditingItem(null);
    resetForm();
  }, [resetForm]);

  const closeNotification = () =>
    setNotification((prev) => ({ ...prev, open: false }));

  const socialLinks: SocialLinkProps[] = React.useMemo(() => {
    const items = data && data.data ? data.data : [];

    return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [data]);

  const filteredLinks = React.useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) {
      return socialLinks;
    }

    return socialLinks.filter(
      (item) =>
        item.platform.toLowerCase().includes(keyword) ||
        item.url.toLowerCase().includes(keyword)
    );
  }, [socialLinks, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredLinks.length / PAGE_SIZE));

  const paginatedLinks = React.useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return filteredLinks.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredLinks, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const hasKeyword = Boolean(searchTerm.trim());

  const handleOpenUpdate = (item: SocialLinkProps) => {
    setEditingItem(item);
    setPlatform(item.platform);
    setUrl(item.url);
    setDisplayOrder(item.displayOrder);
    setIconUrl(null);
    setCreateError("");
    setDialog({ type: "edit", item });
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteMutation.mutateAsync(id);

      setNotification({
        open: true,
        message: "Xóa liên kết thành công",
        severity: "success"
      });

      closeDialog();
      await refetch();
    } catch (error: unknown) {
      setNotification({
        open: true,
        message:
          error instanceof Error
            ? error.message
            : "Xóa liên kết thất bại. Vui lòng thử lại.",
        severity: "error"
      });
    }
  };

  const handleCreate = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setCreateError("");

    if (!platform.trim()) {
      setCreateError("Vui lòng nhập tên nền tảng.");
      return;
    }

    if (!url.trim()) {
      setCreateError("Vui lòng nhập đường dẫn.");
      return;
    }

    if (!Number.isInteger(displayOrder) || displayOrder < 1) {
      setCreateError("Thứ tự phải là số nguyên lớn hơn hoặc bằng 1.");
      return;
    }

    try {
      await mutateAsync({
        platform: platform.trim(),
        displayOrder,
        iconUrl,
        url: url.trim()
      });

      setNotification({
        open: true,
        message: "Tạo Liên Kết Thành Công",
        severity: "success"
      });
      closeDialog();
      await refetch();
    } catch {
      setCreateError("Tạo liên kết thất bại. Vui lòng thử lại.");
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingItem) {
      setCreateError("Không tìm thấy liên kết cần cập nhật.");
      return;
    }

    try {
      await updateMutation.mutateAsync({
        platform: platform.trim(),
        url: url.trim(),
        displayOrder,
        iconUrl
      });

      setNotification({
        open: true,
        message: "Cập nhật liên Kết Thành Công",
        severity: "success"
      });
      closeDialog();
      await refetch();
    } catch (error: unknown) {
      setCreateError(
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Cập nhật liên kết thất bại."
      );
    }
  };

  const openDelete = (item: SocialLinkProps) =>
    setDialog({ type: "delete", item });

  const formProps = {
    platform,
    setPlatform,
    url,
    setUrl,
    displayOrder,
    setDisplayOrder,
    iconUrl,
    setIconUrl,
    error: createError
  };

  return (
    <div
      className={`h-[calc(100vh-3.25rem)] overflow-y-auto p-1 transition-colors duration-200 ${
        isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col gap-4">
        <SocialLinkHeader
          isDark={isDark}
          isLoading={isLoading}
          onCreate={() => setDialog({ type: "create" })}
          onRefresh={() => void refetch()}
        />

        <div className="shrink-0">
          <SocialLinkStats
            totalCount={socialLinks.length}
            filteredCount={filteredLinks.length}
            isLoading={isLoading}
            isDark={isDark}
          />
        </div>

        <section
          className={`flex min-h-[24rem] flex-1 flex-col overflow-clip rounded-2xl border ${
            isDark
              ? "border-white/[0.07] bg-zinc-900/60"
              : "border-zinc-200/80 bg-white shadow-sm"
          }`}
        >
          <SocialLinkToolbar
            isDark={isDark}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {isLoading ? (
            <SocialLinkListSkeleton isDark={isDark} />
          ) : isError ? (
            <SocialLinkErrorState onRetry={() => void refetch()} />
          ) : paginatedLinks.length === 0 ? (
            <div className="flex flex-1 flex-col justify-center">
              <SocialLinkEmptyState
                isFiltering={hasKeyword}
                isDark={isDark}
                onClearFilter={() => setSearchTerm("")}
              />
            </div>
          ) : (
            <div className="flex flex-1 flex-col">
              <div>
                <SocialLinkTable
                  items={paginatedLinks}
                  isDark={isDark}
                  onView={openView}
                  onEdit={handleOpenUpdate}
                  onDelete={openDelete}
                />

                <SocialLinkCardList
                  items={paginatedLinks}
                  isDark={isDark}
                  onView={openView}
                  onEdit={handleOpenUpdate}
                  onDelete={openDelete}
                />
              </div>

              <SocialLinkPagination
                isDark={isDark}
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={PAGE_SIZE}
                totalItems={filteredLinks.length}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </section>
      </div>

      {/* Popup tạo mới */}
      {dialog?.type === "create" && (
        <FormCreate
          {...formProps}
          onSubmit={handleCreate}
          onClose={closeDialog}
          open={true}
          isSaving={isPending}
        />
      )}

      {/* Popup xem chi tiết */}
      {dialog?.type === "view" && (
        <SocialLinkDetailDialog
          item={dialog.item}
          isDark={isDark}
          onClose={closeDialog}
          onEdit={() => handleOpenUpdate(dialog.item)}
          onDelete={() => openDelete(dialog.item)}
        />
      )}

      {/* Popup cập nhật */}
      {dialog?.type === "edit" && (
        <FormUpdate
          {...formProps}
          open={Boolean(editingItem)}
          onClose={closeDialog}
          onSubmit={handleUpdate}
          isSaving={updateMutation.isPending}
        />
      )}

      {/* Popup xác nhận xóa */}
      {dialog?.type === "delete" && (
        <SocialLinkDeleteDialog
          item={dialog.item}
          isDark={isDark}
          onClose={closeDialog}
          onConfirm={() => handleDelete(dialog.item.id)}
        />
      )}

      <SocialLinkNotification
        notification={notification}
        onClose={closeNotification}
      />
    </div>
  );
}
