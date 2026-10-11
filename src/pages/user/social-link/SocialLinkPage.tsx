import React from "react";
import { Search, Globe, RefreshCw, AlertCircle, X, Plus } from "lucide-react";
import {
  useCreateSocialLink,
  useSocialLink
} from "../../../hooks/useSocialLink";
import { useTheme } from "../../../contexts/ThemeContext";
import type { SocialLinkProps } from "../../../services/social-link/SocialLinkTypes";
import { SocialLinkStats } from "./components/SocialLinkStats";
import { SocialLinkEmptyState } from "./components/SocialLinkEmptyState";
import { SocialLinkTable } from "./components/SocialLinkTable";
import { SocialLinkCardList } from "./components/SocialLinkCardList";
import { focusRing } from "./components/SocialLinkShared";
import {
  SocialLinkDetailDialog,
  SocialLinkFormDialog,
  SocialLinkDeleteDialog
} from "./components/SocialLinkDialogs";
import FormCreate from "./components/FormCreate";
import { Alert, Snackbar } from "@mui/material";
import { Notifications } from "../../../components/ui/Notification";

type DialogState =
  | { type: "create" }
  | { type: "view"; item: SocialLinkProps }
  | { type: "edit"; item: SocialLinkProps }
  | { type: "delete"; item: SocialLinkProps }
  | null;

export default function SocialLinkPage() {
  const { data, isLoading, isError, refetch } = useSocialLink();
  const { theme } = useTheme();

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [dialog, setDialog] = React.useState<DialogState>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const pageSize = 4;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isDark = theme === "dark";
  const closeDialog = React.useCallback(() => {
    setDialog(null);
    setPlatform("");
    setUrl("");
    setDisplayOrder(1);
    setIconUrl(null);
    setCreateError("");
  }, []);
  const [platform, setPlatform] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [displayOrder, setDisplayOrder] = React.useState(1);
  const [iconUrl, setIconUrl] = React.useState<File | null>(null);
  const [createError, setCreateError] = React.useState("");
  const { mutateAsync, isPending } = useCreateSocialLink();
  const socialLinks: SocialLinkProps[] = React.useMemo(() => {
    const items = data && data.data ? data.data : [];

    return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [data]);
  const [notification, setNotification] = React.useState<Notifications>({
    open: false,
    message: "",
    severity: "error"
  });
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
  const totalPages = Math.max(1, Math.ceil(filteredLinks.length / pageSize));

  const paginatedLinks = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    return filteredLinks.slice(startIndex, startIndex + pageSize);
  }, [filteredLinks, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

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
      setPlatform("");
      setUrl("");
      setDisplayOrder(1);
      setIconUrl(null);
      setDialog(null);

      await refetch();
    } catch {
      setCreateError("Tạo liên kết thất bại. Vui lòng thử lại.");
    }
  };
  const handleUpdate = async (
    id: string,
    values: Parameters<
      React.ComponentProps<typeof SocialLinkFormDialog>["onSubmit"]
    >[0]
  ) => {
    // TODO: Thay bằng mutation cập nhật Social Link thực tế.
    console.log("Update Social Link:", id, values);

    throw new Error("Chưa kết nối API cập nhật.");
  };

  const handleDelete = async (id: string) => {
    // TODO: Thay bằng mutation xóa Social Link thực tế.
    console.log("Delete Social Link:", id);

    throw new Error("Chưa kết nối API xóa.");
  };

  const hasKeyword = Boolean(searchTerm.trim());

  const divider = isDark ? "border-white/[0.07]" : "border-zinc-100";

  const pageBtn = (active: boolean) =>
    `h-8 min-w-8 rounded-lg px-2 text-xs font-medium transition ${focusRing} ${
      active
        ? "bg-indigo-600 text-white"
        : isDark
          ? "text-zinc-300 hover:bg-white/[0.06]"
          : "text-zinc-600 hover:bg-zinc-100"
    }`;

  const navBtn = `h-8 rounded-lg px-3 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${focusRing} ${
    isDark
      ? "text-zinc-300 hover:bg-white/[0.06]"
      : "text-zinc-600 hover:bg-zinc-100"
  }`;

  return (
    <div
      className={`h-[calc(100vh-3.25rem)] overflow-y-auto p-1 transition-colors duration-200 ${
        isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col gap-4">
        {/* Header */}
        <header className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 ring-1 ring-inset ring-indigo-500/20">
              <Globe size={22} />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Quản lý nội dung <span className="mx-1">/</span> Link liên hệ
              </p>

              <h1 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                Link liên hệ{" "}
              </h1>

              <p className="mt-0.5 text-sm text-zinc-500">
                Các nền tảng mạng xã hội hiển thị trên portfolio.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setDialog({ type: "create" })}
              className={`inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3.5 text-xs font-medium text-white transition hover:bg-indigo-500 ${focusRing}`}
            >
              <Plus size={15} />
              Tạo liên kết
            </button>

            <button
              type="button"
              onClick={() => void refetch()}
              disabled={isLoading}
              className={`inline-flex h-9 items-center justify-center gap-2 rounded-xl px-3.5 text-xs font-medium ring-1 ring-inset transition disabled:cursor-not-allowed disabled:opacity-50 ${focusRing} ${
                isDark
                  ? "bg-white/[0.04] text-zinc-200 ring-white/10 hover:bg-white/[0.08]"
                  : "bg-white text-zinc-700 ring-zinc-200 hover:bg-zinc-50"
              }`}
            >
              <RefreshCw
                size={14}
                className={
                  isLoading ? "text-indigo-500 motion-safe:animate-spin" : ""
                }
              />
              Làm mới
            </button>
          </div>
        </header>

        {/* Thống kê */}
        <div className="shrink-0">
          <SocialLinkStats
            totalCount={socialLinks.length}
            filteredCount={filteredLinks.length}
            isLoading={isLoading}
            isDark={isDark}
          />
        </div>

        {/* Danh sách */}
        <section
          className={`flex min-h-[24rem] flex-1 flex-col overflow-clip rounded-2xl border ${
            isDark
              ? "border-white/[0.07] bg-zinc-900/60"
              : "border-zinc-200/80 bg-white shadow-sm"
          }`}
        >
          {/* Thanh công cụ */}
          <div
            className={`flex shrink-0 flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 ${divider}`}
          >
            <div>
              <h2 className="text-sm font-semibold">Danh sách liên kết</h2>

              <p className="text-xs text-zinc-500">
                Sắp xếp theo thứ tự hiển thị
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchTerm("");
                  }
                }}
                aria-label="Tìm kiếm liên kết"
                placeholder="Tìm nền tảng hoặc URL"
                className={`h-9 w-full rounded-xl pl-9 pr-9 text-sm outline-none ring-1 ring-inset transition focus:ring-2 focus:ring-indigo-500/70 ${
                  isDark
                    ? "bg-black/30 text-zinc-100 ring-white/10 placeholder:text-zinc-500"
                    : "bg-zinc-50 text-zinc-900 ring-zinc-200 placeholder:text-zinc-400"
                }`}
              />

              {hasKeyword ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Xóa từ khóa"
                  className={`absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-200 ${focusRing}`}
                >
                  <X size={14} />
                </button>
              ) : (
                <kbd
                  className={`pointer-events-none absolute right-2.5 top-1/2 hidden h-5 -translate-y-1/2 items-center rounded px-1.5 font-sans text-[11px] text-zinc-500 ring-1 ring-inset sm:inline-flex ${
                    isDark ? "ring-white/10" : "ring-zinc-200"
                  }`}
                >
                  /
                </kbd>
              )}
            </div>
          </div>

          {/* Trạng thái dữ liệu */}
          {isLoading ? (
            <div
              className={`divide-y ${
                isDark ? "divide-white/[0.05]" : "divide-zinc-100"
              }`}
              aria-busy="true"
              aria-label="Đang tải danh sách"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 px-4 py-4 sm:px-6 motion-safe:animate-pulse"
                >
                  <div
                    className={`h-10 w-10 rounded-xl ${
                      isDark ? "bg-white/[0.06]" : "bg-zinc-100"
                    }`}
                  />

                  <div className="flex-1 space-y-2">
                    <div
                      className={`h-3 w-28 rounded ${
                        isDark ? "bg-white/[0.08]" : "bg-zinc-200"
                      }`}
                    />

                    <div
                      className={`h-2.5 w-44 rounded ${
                        isDark ? "bg-white/[0.05]" : "bg-zinc-100"
                      }`}
                    />
                  </div>

                  <div
                    className={`hidden h-6 w-6 rounded-md sm:block ${
                      isDark ? "bg-white/[0.06]" : "bg-zinc-100"
                    }`}
                  />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 ring-1 ring-inset ring-red-500/20">
                <AlertCircle size={24} />
              </div>

              <h3 className="mt-5 text-base font-semibold">
                Không tải được danh sách
              </h3>

              <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-zinc-500">
                Đã có lỗi khi lấy dữ liệu. Kiểm tra kết nối mạng rồi thử lại.
              </p>

              <button
                type="button"
                onClick={() => void refetch()}
                className={`mt-5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-indigo-500 ${focusRing}`}
              >
                Thử lại
              </button>
            </div>
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
                  onView={(item) => setDialog({ type: "view", item })}
                  onEdit={(item) => setDialog({ type: "edit", item })}
                  onDelete={(item) => setDialog({ type: "delete", item })}
                />

                <SocialLinkCardList
                  items={paginatedLinks}
                  isDark={isDark}
                  onView={(item) => setDialog({ type: "view", item })}
                  onEdit={(item) => setDialog({ type: "edit", item })}
                  onDelete={(item) => setDialog({ type: "delete", item })}
                />
              </div>

              <div
                className={`mt-auto flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 ${divider}`}
              >
                <p className="text-xs text-zinc-500">
                  {filteredLinks.length === 0
                    ? "Không có liên kết"
                    : `Hiển thị ${(currentPage - 1) * pageSize + 1}–${Math.min(
                        currentPage * pageSize,
                        filteredLinks.length
                      )} / ${filteredLinks.length} liên kết`}
                </p>

                <nav
                  aria-label="Phân trang"
                  className="flex items-center justify-center gap-1"
                >
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => page - 1)}
                    disabled={currentPage === 1}
                    className={navBtn}
                  >
                    Trước
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      aria-current={currentPage === page ? "page" : undefined}
                      className={pageBtn(currentPage === page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => page + 1)}
                    disabled={currentPage === totalPages}
                    className={navBtn}
                  >
                    Sau
                  </button>
                </nav>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Popup tạo mới */}
      {dialog?.type === "create" && (
        <FormCreate
          platform={platform}
          setPlatform={setPlatform}
          url={url}
          setUrl={setUrl}
          displayOrder={displayOrder}
          setDisplayOrder={setDisplayOrder}
          iconUrl={iconUrl}
          setIconUrl={setIconUrl}
          onSubmit={handleCreate}
          onClose={closeDialog}
          open={true}
          error={createError}
          isSaving={isPending}
        />
      )}

      {/* Popup xem chi tiết */}
      {dialog?.type === "view" && (
        <SocialLinkDetailDialog
          item={dialog.item}
          isDark={isDark}
          onClose={closeDialog}
          onEdit={() =>
            setDialog({
              type: "edit",
              item: dialog.item
            })
          }
          onDelete={() =>
            setDialog({
              type: "delete",
              item: dialog.item
            })
          }
        />
      )}

      {/* Popup cập nhật */}
      {dialog?.type === "edit" && (
        <SocialLinkFormDialog
          item={dialog.item}
          isDark={isDark}
          onClose={closeDialog}
          onSubmit={(values) => handleUpdate(dialog.item.id, values)}
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
