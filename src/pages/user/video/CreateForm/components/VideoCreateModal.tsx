import React from "react";
import {
  AlertCircle,
  FileVideo,
  Image as ImageIcon,
  LoaderCircle,
  Upload,
  X
} from "lucide-react";

import { VideoEnum } from "../../../../../services/video/VideoTypes";
import { CreateVideoProps } from "../../../../../hooks/useVideo";
import Modal from "../../../../../components/ui/Modal";
import Input from "../../../../../components/ui/Input";
import Textarea from "../../../../../components/ui/Textarea";
import Select, { SelectOption } from "../../../../../components/ui/Select";
import Button from "../../../../../components/ui/Button";

interface VideoCreateModalProps {
  open: boolean;
  onClose: () => void;
  isDark: boolean;
}

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

  const videoInputRef = React.useRef<HTMLInputElement>(null);
  const thumbnailInputRef = React.useRef<HTMLInputElement>(null);

  const { mutate, isPending, isError, reset } = CreateVideoProps();

  const categories = Object.entries(VideoEnum).filter(([key]) =>
    Number.isNaN(Number(key))
  );

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

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }

    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }

    reset();
  };

  const handleClose = (): void => {
    if (isPending) {
      return;
    }

    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (
      !videoFile ||
      !thumbnailFile ||
      !title.trim() ||
      year < 1900 ||
      year > 2100 ||
      displayOrder < 0
    ) {
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
          clearForm();
          onClose();
        }
      }
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Tạo video mới"
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition disabled:opacity-50 ${
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
            disabled={
              isPending ||
              !title.trim() ||
              !videoFile ||
              !thumbnailFile ||
              year < 1900 ||
              year > 2100 ||
              displayOrder < 0
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Upload size={16} />
            )}
            {isPending ? "Đang tạo..." : "Tạo video"}
          </button>
        </>
      }
    >
      <form
        id="create-video-form"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Title */}
        <Input
          id="video-title"
          label="Tiêu đề"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          placeholder="Nhập tiêu đề video"
          maxLength={200}
          required
          hint="Nhập tiêu đề video (bắt buộc)."
        />

        {/* Description */}
        <Textarea
          id="video-description"
          label="Mô tả"
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
          placeholder="Mô tả ngắn về video..."
          rows={3}
          maxLength={1000}
          hint="Mô tả ngắn về nội dung video."
        />

        {/* Category and year */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
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
          </div>

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
        </div>

        {/* Display order */}
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

        {/* Video file */}
        <div>
          <label
            className={`mb-1 block text-sm font-medium ${
              isDark ? "text-slate-200" : "text-slate-700"
            }`}
          >
            Tệp video <span className="text-red-500">*</span>
          </label>

          <div className="hidden">
            <Input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              disabled={isPending}
              onChange={(event) => {
                const files = event.currentTarget.files;

                if (files && files.length > 0) {
                  setVideoFile(files[0]);
                }
              }}
            />
          </div>

          {videoFile ? (
            <div
              className={`flex items-center gap-3 rounded-xl border p-3 ${
                isDark
                  ? "border-white/10 bg-[#11131b]"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <FileVideo size={22} className="shrink-0 text-indigo-500" />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{videoFile.name}</p>
                <p className={`mt-1 text-xs ${mutedClass}`}>
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>

              <Button
                type="button"
                variant="danger"
                disabled={isPending}
                onClick={() => {
                  setVideoFile(null);

                  if (videoInputRef.current) {
                    videoInputRef.current.value = "";
                  }
                }}
                className="rounded-lg p-2"
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="secondary"
              disabled={isPending}
              onClick={() => {
                if (videoInputRef.current) {
                  videoInputRef.current.click();
                }
              }}
              className={`flex w-full items-center gap-3 rounded-xl border border-dashed p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
                isDark
                  ? "border-white/15 hover:border-indigo-500 hover:bg-indigo-500/5"
                  : "border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/50"
              }`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-500/10 text-indigo-500">
                <FileVideo size={21} />
              </span>

              <span>
                <span className="block text-sm font-medium">
                  Chọn tệp video
                </span>

                <span className={`mt-1 block text-xs ${mutedClass}`}>
                  Nhấn để duyệt tệp từ máy tính
                </span>
              </span>
            </Button>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label
            className={`mb-1 block text-sm font-medium ${
              isDark ? "text-slate-200" : "text-slate-700"
            }`}
          >
            Thumbnail <span className="text-red-500">*</span>
          </label>

          <Input
            ref={thumbnailInputRef}
            type="file"
            accept="image/*"
            disabled={isPending}
            className="hidden"
            onChange={(event) => {
              const files = event.currentTarget.files;

              if (files && files.length > 0) {
                setThumbnailFile(files[0]);
              }
            }}
          />

          {thumbnailPreview ? (
            <div
              className={`flex items-center gap-3 rounded-xl border p-3 ${
                isDark
                  ? "border-white/10 bg-[#11131b]"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="h-16 w-24 shrink-0 rounded-lg object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {thumbnailFile ? thumbnailFile.name : ""}
                </p>
                <p className={`mt-1 text-xs ${mutedClass}`}>
                  Ảnh đại diện video
                </p>
              </div>

              <Button
                type="button"
                variant="danger"
                disabled={isPending}
                onClick={() => {
                  setThumbnailFile(null);

                  if (thumbnailInputRef.current) {
                    thumbnailInputRef.current.value = "";
                  }
                }}
                className="rounded-lg p-2"
                ariaLabel="Xóa thumbnail"
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="secondary"
              disabled={isPending}
              onClick={() => {
                if (thumbnailInputRef.current) {
                  thumbnailInputRef.current.click();
                }
              }}
              className={`!justify-start flex w-full items-center gap-3 rounded-xl border border-dashed p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
                isDark
                  ? "border-white/15 hover:border-indigo-500 hover:bg-indigo-500/5"
                  : "border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/50"
              }`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-500/10 text-purple-500">
                <ImageIcon size={21} />
              </span>

              <span>
                <span className="block text-sm font-medium">
                  Chọn ảnh thumbnail
                </span>

                <span className={`mt-1 block text-xs ${mutedClass}`}>
                  PNG, JPG hoặc định dạng ảnh được hỗ trợ
                </span>
              </span>
            </Button>
          )}
        </div>

        {/* Error */}
        {isError && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>Tạo video thất bại. Vui lòng kiểm tra dữ liệu và thử lại.</p>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default VideoCreateModal;
