import React, { useEffect, useRef, useState } from "react";
import {
  Globe,
  Link2,
  ImagePlus,
  Save,
  RotateCcw,
  RefreshCw,
  Trash2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import type { CreateSocialLinkProps } from "../../../../services/social-link/SocialLinkTypes";
import { useTheme } from "../../../../contexts/ThemeContext";
import { getHostname, focusRing } from "./SocialLinkShared";
import Modal from "../../../../components/ui/Modal";

const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];
const MAX_SIZE = 5 * 1024 * 1024;

const validateIconFile = (file: File): string => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Vui lòng chọn ảnh PNG, JPG, WEBP, SVG hoặc GIF.";
  }
  if (file.size > MAX_SIZE) {
    return "Dung lượng ảnh không được vượt quá 5 MB.";
  }
  return "";
};

const isHttpUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

type FieldErrors = Partial<Record<"platform" | "url" | "displayOrder", string>>;

export default function FormCreate({
  displayOrder,
  setDisplayOrder,
  iconUrl,
  setIconUrl,
  onSubmit,
  platform,
  setPlatform,
  setUrl,
  url,
  onClose,
  open,
  error,
  isSaving,
}: CreateSocialLinkProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (!iconUrl) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(iconUrl);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [iconUrl]);

  /* ----------------------------- Tokens ----------------------------- */
  const labelClass = "mb-1.5 block text-sm font-medium";

  const inputClass = (hasError?: boolean) =>
    `h-11 w-full rounded-xl text-sm outline-none ring-1 ring-inset transition focus:ring-2 disabled:opacity-60 ${
      hasError
        ? "ring-red-500/60 focus:ring-red-500"
        : isDark
          ? "ring-white/10 focus:ring-indigo-500/70"
          : "ring-zinc-200 focus:ring-indigo-500/70"
    } ${
      isDark
        ? "bg-black/30 text-zinc-100 placeholder:text-zinc-500"
        : "bg-zinc-50 text-zinc-900 placeholder:text-zinc-400"
    }`;

  const secondaryBtn = `inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${focusRing} ${
    isDark
      ? "bg-white/[0.06] text-zinc-200 hover:bg-white/10"
      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
  }`;

  const fieldError = (message?: string) =>
    message ? (
      <p className="mt-1.5 flex items-start gap-1.5 text-xs text-red-500" role="alert">
        <AlertCircle size={14} className="mt-0.5 shrink-0" />
        <span>{message}</span>
      </p>
    ) : null;

  /* ----------------------------- Handlers ---------------------------- */
  const clearFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReset = () => {
    setPlatform("");
    setUrl("");
    setIconUrl(null);
    setDisplayOrder(1);
    setFileError("");
    setErrors({});
    clearFileInput();
  };

  const acceptFile = (file: File) => {
    const message = validateIconFile(file);
    if (message) {
      setFileError(message);
      setIconUrl(null);
      clearFileInput();
      return;
    }
    setFileError("");
    setIconUrl(file);
  };

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) acceptFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    if (isSaving) return;
    const file = event.dataTransfer.files?.[0];
    if (file) acceptFile(file);
  };

  const handleRemoveIcon = () => {
    setIconUrl(null);
    setFileError("");
    clearFileInput();
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving) return;

    const next: FieldErrors = {};
    if (!platform.trim()) next.platform = "Nhập tên nền tảng.";
    if (!url.trim()) next.url = "Nhập đường dẫn liên kết.";
    else if (!isHttpUrl(url.trim()))
      next.url = "Đường dẫn phải bắt đầu bằng http:// hoặc https://.";
    if (!Number.isInteger(displayOrder) || displayOrder < 1)
      next.displayOrder = "Thứ tự là số nguyên từ 1 trở lên.";

    setErrors(next);
    if (Object.keys(next).length > 0 || fileError) return;

    onSubmit(event);
  };

  const host = url.trim() && isHttpUrl(url.trim()) ? getHostname(url.trim()) : "";

  return (
    <Modal onClose={onClose} open={open} title="Tạo liên kết xã hội">
      <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
        {/* Xem trước */}
        <div>
          <p className="mb-2 text-xs text-zinc-500">
            Xem trước trong danh sách
          </p>
          <div
            className={`flex items-center gap-3.5 rounded-xl p-3.5 ring-1 ring-inset ${
              isDark ? "bg-black/20 ring-white/[0.07]" : "bg-zinc-50 ring-zinc-200/80"
            }`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl p-2 ring-1 ring-inset ${
                isDark ? "bg-white/[0.04] ring-white/10" : "bg-white ring-zinc-200"
              }`}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Icon preview"
                  className="h-full w-full object-contain"
                />
              ) : (
                <Globe size={20} className="text-zinc-400" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={`truncate font-medium leading-tight ${
                  platform.trim() ? "" : "text-zinc-400"
                }`}
              >
                {platform.trim() || "Tên nền tảng"}
              </p>
              <p className="mt-0.5 truncate text-xs text-zinc-500">
                {host || "tenmien.com"}
              </p>
            </div>

            <span
              className={`inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-xs font-medium tabular-nums ${
                isDark ? "bg-white/[0.06] text-zinc-300" : "bg-zinc-100 text-zinc-600"
              }`}
              title="Thứ tự hiển thị"
            >
              {Number.isFinite(displayOrder) ? displayOrder : "–"}
            </span>
          </div>
        </div>

        {/* Trường nhập */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-[minmax(0,1fr)_8rem]">
          <div>
            <label htmlFor="platform" className={labelClass}>
              Nền tảng <span className="text-red-500">*</span>
            </label>
            <input
              id="platform"
              type="text"
              autoFocus
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
              placeholder="GitHub, Facebook, LinkedIn..."
              maxLength={100}
              disabled={isSaving}
              aria-invalid={Boolean(errors.platform)}
              className={`${inputClass(Boolean(errors.platform))} px-3.5`}
            />
            {fieldError(errors.platform)}
          </div>

          <div>
            <label htmlFor="displayOrder" className={labelClass}>
              Thứ tự
            </label>
            <input
              id="displayOrder"
              type="number"
              min={1}
              step={1}
              value={displayOrder}
              onChange={(event) => setDisplayOrder(Number(event.target.value))}
              disabled={isSaving}
              aria-invalid={Boolean(errors.displayOrder)}
              className={`${inputClass(Boolean(errors.displayOrder))} px-3.5 tabular-nums`}
            />
            {errors.displayOrder ? (
              fieldError(errors.displayOrder)
            ) : (
              <p className="mt-1.5 text-xs text-zinc-500">Nhỏ hơn hiển thị trước.</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="url" className={labelClass}>
              Đường dẫn <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Link2
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                id="url"
                type="url"
                inputMode="url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://github.com/username"
                disabled={isSaving}
                aria-invalid={Boolean(errors.url)}
                className={`${inputClass(Boolean(errors.url))} pl-10 pr-3.5 font-mono text-xs`}
              />
            </div>
            {fieldError(errors.url)}
          </div>

          {/* Ảnh biểu tượng */}
          <div className="sm:col-span-2">
            <span className={labelClass}>Ảnh biểu tượng</span>

            {iconUrl && previewUrl ? (
              <div
                className={`flex items-center gap-4 rounded-xl p-3 ring-1 ring-inset ${
                  isDark ? "bg-white/[0.03] ring-white/10" : "bg-zinc-50 ring-zinc-200"
                }`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl p-2 ring-1 ring-inset ${
                    isDark ? "bg-white/[0.04] ring-white/10" : "bg-white ring-zinc-200"
                  }`}
                >
                  <img
                    src={previewUrl}
                    alt="Xem trước biểu tượng"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{iconUrl.name}</p>
                  <p className="text-xs text-zinc-500">
                    {(iconUrl.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                <label
                  htmlFor="iconUrl"
                  className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition focus-within:ring-2 focus-within:ring-indigo-500/60 ${
                    isSaving ? "pointer-events-none opacity-50" : "cursor-pointer"
                  } ${
                    isDark
                      ? "text-zinc-300 hover:bg-white/10"
                      : "text-zinc-600 hover:bg-zinc-200/70"
                  }`}
                >
                  <RefreshCw size={14} />
                  <span className="hidden sm:inline">Đổi ảnh</span>
                </label>

                <button
                  type="button"
                  onClick={handleRemoveIcon}
                  disabled={isSaving}
                  aria-label="Xóa ảnh đã chọn"
                  title="Xóa ảnh"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-500/10 disabled:opacity-50 ${focusRing}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="iconUrl"
                onDragOver={(event) => {
                  event.preventDefault();
                  if (!isSaving) setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-7 text-center transition focus-within:ring-2 focus-within:ring-indigo-500/60 ${
                  isSaving ? "pointer-events-none opacity-60" : "cursor-pointer"
                } ${
                  dragging
                    ? "border-indigo-500 bg-indigo-500/10"
                    : isDark
                      ? "border-white/15 hover:border-indigo-500/60 hover:bg-white/[0.03]"
                      : "border-zinc-300 hover:border-indigo-500 hover:bg-indigo-50/50"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                  <ImagePlus size={20} />
                </div>
                <span className="mt-3 text-sm font-medium">
                  Kéo thả ảnh vào đây hoặc{" "}
                  <span className="text-indigo-500">chọn từ máy</span>
                </span>
                <span className="mt-1 text-xs text-zinc-500">
                  PNG, JPG, SVG, WebP hoặc GIF. Tối đa 5 MB.
                </span>
              </label>
            )}

            <input
              ref={fileInputRef}
              id="iconUrl"
              type="file"
              accept={ALLOWED_TYPES.join(",")}
              onChange={handleIconChange}
              disabled={isSaving}
              className="sr-only"
            />

            {fieldError(fileError)}
          </div>
        </div>

        {/* Lỗi từ server */}
        {error ? (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl bg-red-500/10 px-3.5 py-3 text-sm text-red-500"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        {/* Hành động */}
        <div
          className={`flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between ${
            isDark ? "border-white/[0.07]" : "border-zinc-100"
          }`}
        >
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className={`${secondaryBtn} sm:px-3`}
          >
            <RotateCcw size={15} />
            Đặt lại
          </button>

          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className={secondaryBtn}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSaving || Boolean(fileError)}
              className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="motion-safe:animate-spin" />
                  Đang tạo...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Tạo liên kết
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}