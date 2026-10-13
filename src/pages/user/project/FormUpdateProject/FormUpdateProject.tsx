import React from "react";
import {
  Code2,
  Image as ImageIcon,
  Link2,
  Star,
  Upload,
  X
} from "lucide-react";

import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import Select from "../../../../components/ui/Select";
import Textarea from "../../../../components/ui/Textarea";

import type { FormCreateProject } from "../../../../services/project/ProjectTypes";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_THUMBNAIL_MB = 5;

const CATEGORY_OPTIONS = [
  { value: "DEVELOPMENT", label: "Development" },
  { value: "VIDEO_EDITING", label: "Video Editing" }
];

const card = "rounded-2xl border border-line bg-surface p-4 sm:p-5";

function SectionHeader({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-base font-bold leading-6 text-ink">{title}</h2>
      <p className="text-xs text-muted">{description}</p>
    </div>
  );
}

export default function FormUpdateProjectFile({
  category,
  demoUrl,
  description,
  displayOrder,
  featured,
  githubUrl,
  setCategory,
  setDemoUrl,
  setDescription,
  setDisplayOrder,
  setFeatured,
  setGithubUrl,
  setThumbnailUrl,
  setTitle,
  thumbnailUrl,
  title
}: FormCreateProject) {
  const thumbnailInputId = React.useId();

  const [thumbnailError, setThumbnailError] = React.useState("");
  const [isDragging, setIsDragging] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  // Tạo và giải phóng object URL đúng cách để hiện ảnh xem trước
  React.useEffect(() => {
    if (!(thumbnailUrl instanceof File)) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(thumbnailUrl);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [thumbnailUrl]);

  const acceptThumbnail = (selectedFile: File): boolean => {
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setThumbnailError("Chỉ hỗ trợ ảnh JPG, PNG hoặc WEBP.");
      return false;
    }

    if (selectedFile.size > MAX_THUMBNAIL_MB * 1024 * 1024) {
      setThumbnailError("Kích thước ảnh không được vượt quá 5 MB.");
      return false;
    }

    setThumbnailError("");
    setThumbnailUrl(selectedFile);
    return true;
  };

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files === null || files.length === 0) {
      return;
    }

    const accepted = acceptThumbnail(files[0]);

    if (!accepted) {
      event.target.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const dropped = event.dataTransfer.files;

    if (dropped.length > 0) {
      acceptThumbnail(dropped[0]);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnailUrl(null);
    setThumbnailError("");
  };

  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
      {/* ===== Trái: thông tin dự án ===== */}
      <section className={`${card} lg:h-full`}>
        <SectionHeader
          title="Thông tin dự án"
          description="Cung cấp thông tin cơ bản cho dự án của bạn."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Tên dự án"
            placeholder="Ví dụ: Portfolio Website"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="sm:col-span-2"
          />

          <Select
            label="Danh mục"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as typeof category)
            }
            options={CATEGORY_OPTIONS}
          />

          <Input
            label="Thứ tự hiển thị"
            type="number"
            min={0}
            value={String(displayOrder)}
            onChange={(event) => setDisplayOrder(Number(event.target.value))}
          />

          <Textarea
            label="Mô tả dự án"
            placeholder="Mô tả mục tiêu, tính năng và điểm nổi bật của dự án..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            required
            className="sm:col-span-2"
          />
        </div>

        {/* Featured: công tắc bật/tắt */}
        <label className="mt-4 flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-line px-4 py-3 transition hover:border-accent/40">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-accent/10 p-2 text-accent">
              <Star size={17} />
            </div>

            <div>
              <p className="text-sm font-semibold text-ink">Dự án nổi bật</p>
              <p className="text-xs text-muted">
                Ưu tiên hiển thị dự án trong portfolio.
              </p>
            </div>
          </div>

          <span className="relative inline-flex h-6 w-11 shrink-0">
            <input
              type="checkbox"
              role="switch"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
              className="peer sr-only"
            />
            <span className="absolute inset-0 rounded-full border border-line bg-surface2 transition peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2" />
            <span className="absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
          </span>
        </label>
      </section>

      {/* ===== Phải: liên kết + thumbnail ===== */}
      <div className="flex flex-col gap-4">
        <section className={card}>
          <SectionHeader
            title="Liên kết dự án"
            description="Thêm đường dẫn demo và mã nguồn nếu có."
          />

          <div className="space-y-4">
            <Input
              label="Demo URL"
              type="url"
              placeholder="https://example.com"
              value={demoUrl}
              onChange={(event) => setDemoUrl(event.target.value)}
              icon={<Link2 size={17} />}
            />

            <Input
              label="GitHub URL"
              type="url"
              placeholder="https://github.com/username/repository"
              value={githubUrl}
              onChange={(event) => setGithubUrl(event.target.value)}
              icon={<Code2 size={17} />}
            />
          </div>
        </section>

        <section className={`${card} flex flex-1 flex-col`}>
          <SectionHeader
            title="Thumbnail dự án"
            description={`Chọn ảnh đại diện cho project. Dung lượng tối đa ${MAX_THUMBNAIL_MB} MB.`}
          />

          <input
            id={thumbnailInputId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleThumbnailChange}
            className="sr-only"
          />

          {thumbnailUrl instanceof File ? (
            <div className="flex flex-1 items-center gap-4 rounded-xl border border-line p-3">
              <div className="flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface2">
                {previewUrl !== null ? (
                  <img
                    src={previewUrl}
                    alt="Thumbnail đã chọn"
                    className="size-full object-cover"
                  />
                ) : (
                  <ImageIcon size={28} className="text-muted" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">
                  {thumbnailUrl.name}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {(thumbnailUrl.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <Button
                type="button"
                variant="danger"
                onClick={handleRemoveThumbnail}
                className="px-3"
                ariaLabel="Xóa thumbnail"
              >
                <X size={16} />
                Xóa ảnh
              </Button>
            </div>
          ) : (
            <label
              htmlFor={thumbnailInputId}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={[
                "flex min-h-24 flex-1 cursor-pointer items-center justify-center gap-4 rounded-xl border border-dashed p-4 text-left transition",
                "focus-within:ring-2 focus-within:ring-accent",
                isDragging
                  ? "border-accent bg-accent/10"
                  : "border-line hover:border-accent/50 hover:bg-surface2"
              ].join(" ")}
            >
              <div className="rounded-xl bg-accent/10 p-3 text-accent">
                <Upload size={22} />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  {isDragging
                    ? "Thả ảnh vào đây"
                    : "Nhấn để chọn hoặc kéo thả thumbnail"}
                </p>
                <p className="mt-1 text-xs text-muted">JPG, PNG hoặc WEBP</p>
              </div>
            </label>
          )}

          {thumbnailError.length > 0 && (
            <p role="alert" className="mt-2 text-sm text-danger">
              {thumbnailError}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
