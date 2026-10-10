import React from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileVideo,
  Image as ImageIcon,
  LoaderCircle,
  Trash2,
  Upload,
  UploadCloud,
  X
} from "lucide-react";

import { VideoEnum } from "../../../../../services/video/VideoTypes";
import { CreateVideoProps } from "../../../../../hooks/useVideo";
import Input from "../../../../../components/ui/Input";
import Textarea from "../../../../../components/ui/Textarea";
import Select, { SelectOption } from "../../../../../components/ui/Select";
import { Notifications } from "../../../../../components/ui/Notification";
import { Alert, Snackbar } from "@mui/material";

interface VideoCreateModalProps {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const formatFileSize = (bytes: number): string => {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

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

interface FileDropzoneProps {
  kind: "video" | "image";
  label: string;
  required?: boolean;
  title: string;
  hint: string;
  accept: string;
  file: File | null;
  preview?: string;
  disabled?: boolean;
  isDark: boolean;
  onSelect: (file: File) => void;
  onClear: () => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  kind,
  label,
  required,
  title,
  hint,
  accept,
  file,
  preview,
  disabled,
  isDark,
  onSelect,
  onClear
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState<boolean>(false);

  const isVideo = kind === "video";
  const Icon = isVideo ? FileVideo : ImageIcon;
  const accentText = isVideo ? "text-indigo-500" : "text-purple-500";
  const accentBg = isVideo ? "bg-indigo-500/10" : "bg-purple-500/10";

  const acceptFile = (candidate: File | undefined): void => {
    if (!candidate) {
      return;
    }

    if (!candidate.type.startsWith(isVideo ? "video/" : "image/")) {
      return;
    }

    onSelect(candidate);
  };

  const handleClear = (): void => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onClear();
  };

  return (
    <div>
      <span
        className={`mb-1.5 block text-sm font-medium ${
          isDark ? "text-slate-200" : "text-slate-700"
        }`}
      >
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => {
          acceptFile(event.currentTarget.files?.[0]);
          // Cho phép chọn lại cùng một tệp sau khi xóa
          event.currentTarget.value = "";
        }}
      />

      {file ? (
        <div
          className={`overflow-hidden rounded-xl border ${
            isDark
              ? "border-emerald-500/30 bg-emerald-500/5"
              : "border-emerald-200 bg-emerald-50/60"
          }`}
        >
          {!isVideo && preview && (
            <img
              src={preview}
              alt="Xem trước thumbnail"
              className="h-36 w-full object-cover"
            />
          )}

          <div className="flex items-center gap-3 p-3">
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${accentBg} ${accentText}`}
            >
              <Icon size={20} />
            </span>

            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-sm font-medium ${
                  isDark ? "text-slate-100" : "text-slate-800"
                }`}
                title={file.name}
              >
                {file.name}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-emerald-600">
                <CheckCircle2 size={13} />
                {formatFileSize(file.size)} · Đã sẵn sàng tải lên
              </p>
            </div>

            <button
              type="button"
              disabled={disabled}
              onClick={handleClear}
              aria-label={`Xóa ${isVideo ? "tệp video" : "thumbnail"}`}
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50 ${
                isDark
                  ? "text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                  : "text-slate-500 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) {
              setDragging(true);
            }
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            if (!disabled) {
              acceptFile(event.dataTransfer.files?.[0]);
            }
          }}
          className={`flex w-full items-center gap-4 rounded-xl border-2 border-dashed px-4 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 ${
            dragging
              ? "border-indigo-500 bg-indigo-500/10"
              : isDark
                ? "border-white/15 hover:border-indigo-500/70 hover:bg-indigo-500/5"
                : "border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/60"
          }`}
        >
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${accentBg} ${accentText}`}
          >
            {dragging ? <UploadCloud size={22} /> : <Icon size={22} />}
          </span>

          <span className="min-w-0">
            <span
              className={`block text-sm font-medium ${
                isDark ? "text-slate-100" : "text-slate-800"
              }`}
            >
              {dragging ? "Thả tệp vào đây" : title}
            </span>

            <span
              className={`mt-0.5 block text-xs ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {hint}
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const VideoCreateModal: React.FC<VideoCreateModalProps> = ({
  open,
  onClose,
  isDark
}) => {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [category, setCategory] = React.useState<VideoEnum>(VideoEnum.OTHER);
  const [year, setYear] = React.useState<number>(new Date().getFullYear());
  const [displayOrder, setDisplayOrder] = React.useState<number>(0);
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = React.useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = React.useState<string>("");

  const { mutate, isPending, isError, reset } = CreateVideoProps();
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
  const isValid =
    !!title.trim() &&
    !!videoFile &&
    !!thumbnailFile &&
    !yearInvalid &&
    !orderInvalid;

  const mutedClass = isDark ? "text-slate-400" : "text-slate-500";

  React.useEffect(() => {
    if (!thumbnailFile) {
      setThumbnailPreview("");
      return;
    }

    const url = URL.createObjectURL(thumbnailFile);
    setThumbnailPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [thumbnailFile]);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    reset();
  }, [open, reset]);

  const clearForm = (): void => {
    setTitle("");
    setDescription("");
    setCategory(VideoEnum.OTHER);
    setYear(new Date().getFullYear());
    setDisplayOrder(0);
    setVideoFile(null);
    setThumbnailFile(null);
    setThumbnailPreview("");
    reset();
  };

  const handleClose = React.useCallback((): void => {
    if (isPending) {
      return;
    }

    onClose();
  }, [isPending, onClose]);

  // Đóng bằng phím Esc + khóa cuộn trang nền khi modal mở
  React.useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!isValid || !videoFile || !thumbnailFile) {
      return;
    }

    mutate(
      {
        title: title.trim(),
        description: description.trim(),
        category,
        displayOrder,
        year,
        videoFile,
        thumbnailFile
      },
      {
        onSuccess: () => {
          setNotification({
            open: true,
            message: "Create Video Successfully",
            severity: "success"
          });
          setTimeout(() => {
            clearForm();
            onClose();
          }, 1500);
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
          aria-labelledby="create-video-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel */}
          <div
            className={`relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl border shadow-2xl ${
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
              <h2
                id="create-video-title"
                className="text-xl font-bold tracking-tight sm:text-2xl"
              >
                Tạo video mới
              </h2>

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
                id="create-video-form"
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 lg:grid-cols-5"
              >
                {/* Cột trái: tệp tải lên */}
                <div className="lg:col-span-2">
                  <Section
                    title="Tệp tải lên"
                    description="Kéo thả hoặc nhấn để chọn tệp."
                    isDark={isDark}
                  >
                    <FileDropzone
                      kind="video"
                      label="Tệp video"
                      required
                      title="Chọn tệp video"
                      hint="MP4, MOV, WebM..."
                      accept="video/*"
                      file={videoFile}
                      disabled={isPending}
                      isDark={isDark}
                      onSelect={setVideoFile}
                      onClear={() => setVideoFile(null)}
                    />

                    <FileDropzone
                      kind="image"
                      label="Thumbnail"
                      required
                      title="Chọn ảnh thumbnail"
                      hint="PNG, JPG..."
                      accept="image/*"
                      file={thumbnailFile}
                      preview={thumbnailPreview}
                      disabled={isPending}
                      isDark={isDark}
                      onSelect={setThumbnailFile}
                      onClear={() => setThumbnailFile(null)}
                    />
                  </Section>
                </div>

                {/* Cột phải: thông tin */}
                <div className="space-y-5 lg:col-span-3">
                  <Section
                    title="Thông tin video"
                    description="Số thứ tự nhỏ hơn sẽ hiển thị trước trong thư viện."
                    isDark={isDark}
                  >
                    <div>
                      <Input
                        id="video-title"
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

                    <div>
                      <Textarea
                        id="video-description"
                        label="Mô tả"
                        value={description}
                        onChange={(event) =>
                          setDescription(event.currentTarget.value)
                        }
                        placeholder="Mô tả ngắn về nội dung video..."
                        rows={3}
                        maxLength={1000}
                        disabled={isPending}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <Select
                        id="video-category"
                        label="Danh mục"
                        value={String(category)}
                        disabled={isPending}
                        onChange={(event) =>
                          setCategory(event.currentTarget.value as VideoEnum)
                        }
                        options={categories.map(
                          ([key, value]): SelectOption => ({
                            value: String(value),
                            label: key
                              .replace(/_/g, " ")
                              .toLowerCase()
                              .replace(/\b\w/g, (char) => char.toUpperCase())
                          })
                        )}
                      />

                      <Input
                        id="video-year"
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
                        id="video-order"
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
                        Năm phải nằm trong khoảng 1900 – 2100.
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
                      <p>
                        Tạo video thất bại. Vui lòng kiểm tra dữ liệu và thử
                        lại.
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Footer */}
            <footer
              className={`flex items-center justify-end gap-3 border-t px-6 py-3 sm:px-8 ${
                isDark ? "border-white/10" : "border-slate-200 bg-white"
              }`}
            >
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
                form="create-video-form"
                disabled={isPending || !isValid}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                {isPending ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                {isPending ? "Đang tạo..." : "Tạo video"}
              </button>
            </footer>
          </div>
        </div>
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
    </>
  );
};

export default VideoCreateModal;
