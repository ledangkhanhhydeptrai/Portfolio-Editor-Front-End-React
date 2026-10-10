import React from "react";
import { AlertCircle, LoaderCircle, Save, X } from "lucide-react";
import { Alert, Snackbar } from "@mui/material";

import {
  VideoEnum,
  VideoProps
} from "../../../../../services/video/VideoTypes";
import { UpdateVideoProps } from "../../../../../hooks/useVideo";
import Input from "../../../../../components/ui/Input";
import Textarea from "../../../../../components/ui/Textarea";
import Select, { SelectOption } from "../../../../../components/ui/Select";
import { Notifications } from "../../../../../components/ui/Notification";
import { formatCategory } from "../../../../../utils/formatDate";

interface VideoUpdateModalProps {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
  video: VideoProps;
  onUpdated?: () => void;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

interface SectionProps {
  title: string;
  description?: string;
  isDark: boolean;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  isDark,
  children
}) => (
  <section
    className={`rounded-2xl border p-4 ${
      isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"
    }`}
  >
    <header className="mb-3">
      <h3
        className={`text-sm font-semibold ${
          isDark ? "text-slate-100" : "text-slate-800"
        }`}
      >
        {title}
      </h3>

      {description && (
        <p
          className={`mt-0.5 text-xs ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {description}
        </p>
      )}
    </header>

    <div className="space-y-3">{children}</div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const VideoUpdateModal: React.FC<VideoUpdateModalProps> = ({
  open,
  onClose,
  isDark,
  video,
  onUpdated
}) => {
  const [title, setTitle] = React.useState<string>(video.title);
  const [description, setDescription] = React.useState<string>(
    video.description
  );
  const [category, setCategory] = React.useState<VideoEnum>(video.category);
  const [year, setYear] = React.useState<number>(video.year);
  const [displayOrder, setDisplayOrder] = React.useState<number>(
    video.displayOrder
  );

  const { mutate, isPending, isError, reset } = UpdateVideoProps(video.id);

  const [notification, setNotification] = React.useState<Notifications>({
    open: false,
    message: "",
    severity: "error"
  });

  const categories = Object.entries(VideoEnum).filter(([key]) =>
    Number.isNaN(Number(key))
  );

  const yearInvalid = year < 1900 || year > 2100;
  const orderInvalid = displayOrder < 0;

  const isValid = title.trim().length > 0 && !yearInvalid && !orderInvalid;

  const isDirty =
    title.trim() !== video.title ||
    description.trim() !== (video.description ?? "") ||
    String(category) !== String(video.category) ||
    year !== video.year ||
    displayOrder !== video.displayOrder;

  const mutedClass = isDark ? "text-slate-400" : "text-slate-500";

  React.useEffect(() => {
    if (!open) {
      return;
    }

    setTitle(video.title);
    setDescription(video.description);
    setCategory(video.category);
    setYear(video.year);
    setDisplayOrder(video.displayOrder);
    setNotification({
      open: false,
      message: "",
      severity: "error"
    });
    reset();
  }, [open, video, reset]);

  const handleClose = (): void => {
    if (isPending) {
      return;
    }

    onClose();
  };

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && !isPending) {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, isPending, onClose]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    mutate(
      {
        title: title.trim(),
        description: description.trim(),
        category,
        year,
        displayOrder
      },
      {
        onSuccess: () => {
          setNotification({
            open: true,
            message: "Cập nhật video thành công",
            severity: "success"
          });

          if (onUpdated) {
            onUpdated();
          }

          window.setTimeout(() => {
            onClose();
          }, 1000);
        },
        onError: () => {
          setNotification({
            open: true,
            message: "Cập nhật video thất bại",
            severity: "error"
          });
        }
      }
    );
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="update-video-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel */}
          <div
            className={`relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-3xl border shadow-2xl ${
              isDark
                ? "border-white/10 bg-[#141722] text-slate-100"
                : "border-slate-200 bg-slate-50 text-slate-900"
            }`}
          >
            {/* Header */}
            <header
              className={`flex items-center justify-between gap-4 border-b px-6 py-3 sm:px-8 ${
                isDark ? "border-white/10" : "border-slate-200 bg-white"
              }`}
            >
              <div className="min-w-0">
                <h2
                  id="update-video-title"
                  className="text-xl font-bold tracking-tight sm:text-2xl"
                >
                  Cập nhật video
                </h2>
                <p
                  className={`mt-0.5 truncate font-mono text-xs ${mutedClass}`}
                >
                  ID: {video.id}
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                aria-label="Đóng"
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 ${
                  isDark
                    ? "text-slate-400 hover:bg-white/5 hover:text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                <X size={20} />
              </button>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 sm:px-8 sm:py-5">
              <form
                id="update-video-form"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-4">
                  <Section
                    title="Thông tin video"
                    description="Chỉnh sửa thông tin và thứ tự hiển thị."
                    isDark={isDark}
                  >
                    <div>
                      <Input
                        id="update-video-title-input"
                        label="Tiêu đề"
                        type="text"
                        value={title}
                        onChange={(event) =>
                          setTitle(event.currentTarget.value)
                        }
                        placeholder="Nhập tiêu đề video"
                        maxLength={200}
                        required
                        disabled={isPending}
                      />

                      <p className={`mt-1 text-right text-xs ${mutedClass}`}>
                        {title.length}/200
                      </p>
                    </div>

                    <Textarea
                      id="update-video-description"
                      label="Mô tả"
                      value={description}
                      onChange={(event) =>
                        setDescription(event.currentTarget.value)
                      }
                      placeholder="Mô tả nội dung video..."
                      rows={3}
                      maxLength={1000}
                      disabled={isPending}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <Select
                        id="update-video-category"
                        label="Danh mục"
                        value={String(category)}
                        disabled={isPending}
                        onChange={(event) =>
                          setCategory(event.currentTarget.value as VideoEnum)
                        }
                        options={categories.map(
                          ([value]): SelectOption => ({
                            value: String(value),
                            label: formatCategory(value as VideoEnum)
                          })
                        )}
                      />
                      <Input
                        id="update-video-year"
                        label="Năm thực hiện"
                        type="number"
                        min={1900}
                        max={2100}
                        required
                        value={year}
                        disabled={isPending}
                        onChange={(event) =>
                          setYear(
                            event.currentTarget.value === ""
                              ? 0
                              : Number(event.currentTarget.value)
                          )
                        }
                      />

                      <Input
                        id="update-video-order"
                        label="Thứ tự hiển thị"
                        type="number"
                        min={0}
                        value={displayOrder}
                        disabled={isPending}
                        onChange={(event) =>
                          setDisplayOrder(
                            event.currentTarget.value === ""
                              ? 0
                              : Number(event.currentTarget.value)
                          )
                        }
                      />
                    </div>

                    {yearInvalid && (
                      <p className="text-xs text-red-500">
                        Năm phải nằm trong khoảng 1900–2100.
                      </p>
                    )}

                    {orderInvalid && (
                      <p className="text-xs text-red-500">
                        Thứ tự hiển thị không được nhỏ hơn 0.
                      </p>
                    )}
                  </Section>

                  {isError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500"
                    >
                      <AlertCircle size={18} className="mt-0.5 shrink-0" />
                      <p>Cập nhật video thất bại. Vui lòng thử lại.</p>
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Footer */}
            <footer
              className={`flex items-center justify-between gap-3 border-t px-6 py-3 sm:px-8 ${
                isDark ? "border-white/10" : "border-slate-200 bg-white"
              }`}
            >
              <p
                className={`flex items-center gap-2 text-xs ${
                  isDirty ? "text-amber-500" : mutedClass
                }`}
                aria-live="polite"
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full ${
                    isDirty ? "bg-amber-500" : "bg-slate-400/60"
                  }`}
                />
                {isDirty ? "Có thay đổi chưa lưu" : "Chưa có thay đổi"}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isPending}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 ${
                    isDark
                      ? "border-white/10 text-slate-300 hover:bg-white/5"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  form="update-video-form"
                  disabled={isPending || !isValid || !isDirty}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                >
                  {isPending ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {isPending ? "Đang cập nhật..." : "Lưu thay đổi"}
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() =>
          setNotification((previous) => ({
            ...previous,
            open: false
          }))
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Alert
          onClose={() =>
            setNotification((previous) => ({
              ...previous,
              open: false
            }))
          }
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
    </>
  );
};

export default VideoUpdateModal;
