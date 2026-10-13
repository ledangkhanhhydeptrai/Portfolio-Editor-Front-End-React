import React, { useEffect, useState } from "react";
import {
  Car,
  Clapperboard,
  Code2,
  ImagePlus,
  ListOrdered,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";

import type { FormCreateSkillProps } from "../../../../services/skill/SkillTypes";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";

type CategoryValue = FormCreateSkillProps["category"];

const CATEGORIES: {
  value: CategoryValue;
  label: string;
  icon: React.ReactElement<{ size: number }>;
}[] = [
  { value: "DEVELOPMENT" as CategoryValue, label: "Development", icon: <Code2 size={18} /> },
  { value: "VIDEO_EDITING" as CategoryValue, label: "Video Editing", icon: <Clapperboard size={18} /> },
  { value: "DRIVING" as CategoryValue, label: "Driving", icon: <Car size={18} /> },
];

const MAX_ICON_SIZE_MB = 2;

const fieldLabel =
  "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200";

export default function FormCreateSkill({
  category,
  displayOrder,
  iconUrl,
  name,
  setCategory,
  setDisplayOrder,
  setIconUrl,
  setName,
  onSubmit,
}: FormCreateSkillProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Tạo và giải phóng object URL đúng cách (tránh rò rỉ bộ nhớ)
  useEffect(() => {
    if (!iconUrl) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(iconUrl);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [iconUrl]);

  const selectedCategory = CATEGORIES.find((c) => c.value === category);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  const acceptFile = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFileError("File không phải hình ảnh.");
      return;
    }
    if (file.size > MAX_ICON_SIZE_MB * 1024 * 1024) {
      setFileError(`Ảnh lớn hơn ${MAX_ICON_SIZE_MB}MB.`);
      return;
    }

    setFileError(null);
    setIconUrl(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    acceptFile(event.currentTarget.files?.[0]);
    event.currentTarget.value = ""; // cho phép chọn lại cùng một file
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    acceptFile(event.dataTransfer.files?.[0]);
  };

  const handleRemoveFile = () => {
    setFileError(null);
    setIconUrl(null);
  };

  const handleReset = () => {
    setName("");
    setCategory("DEVELOPMENT" as CategoryValue);
    setDisplayOrder(0);
    setIconUrl(null);
    setFileError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_280px]"
    >
      {/* ===== Trái: toàn bộ ô nhập trong một khung ===== */}
      <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#141416]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Tên kỹ năng"
            placeholder="Ví dụ: ReactJS, CapCut..."
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            icon={<Code2 size={18} />}
            required
          />

          <Input
            label="Thứ tự hiển thị"
            type="number"
            min={0}
            placeholder="Nhập thứ tự"
            value={displayOrder}
            onChange={(event) =>
              setDisplayOrder(Number(event.currentTarget.value))
            }
            icon={<ListOrdered size={18} />}
            hint="Số nhỏ hơn sẽ được hiển thị trước."
            required
          />
        </div>

        {/* Danh mục */}
        <div>
          <span id="category-label" className={fieldLabel}>
            Danh mục
          </span>
          <div
            role="radiogroup"
            aria-labelledby="category-label"
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {CATEGORIES.map((option) => {
              const active = option.value === category;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setCategory(option.value)}
                  className={[
                    "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                    active
                      ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                      : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/5",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      active
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400",
                    ].join(" ")}
                  >
                    {option.icon}
                  </span>
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Icon */}
        <div>
          <span className={fieldLabel}>Icon kỹ năng</span>

          <div className="relative">
            <label
              htmlFor="skill-icon"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={[
                "flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed py-3 pl-3 pr-14 transition",
                "focus-within:ring-2 focus-within:ring-indigo-500",
                isDragging
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-slate-300 hover:border-indigo-400 hover:bg-indigo-500/5 dark:border-white/15",
              ].join(" ")}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 dark:bg-white/5">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Icon kỹ năng đã chọn"
                    className="h-full w-full object-contain p-1.5"
                  />
                ) : (
                  <ImagePlus size={22} className="text-indigo-500" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                {iconUrl ? (
                  <>
                    <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                      {iconUrl.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(iconUrl.size / 1024).toFixed(0)} KB · Nhấn để đổi ảnh
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                      {isDragging ? "Thả ảnh vào đây" : "Kéo ảnh vào đây hoặc nhấn để chọn"}
                    </p>
                    <p
                      role={fileError ? "alert" : undefined}
                      className={[
                        "text-xs",
                        fileError ? "text-red-500" : "text-slate-500",
                      ].join(" ")}
                    >
                      {fileError ?? `PNG, JPG, SVG hoặc WebP, tối đa ${MAX_ICON_SIZE_MB}MB`}
                    </p>
                  </>
                )}
              </div>

              <input
                id="skill-icon"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>

            {iconUrl && (
              <button
                type="button"
                onClick={handleRemoveFile}
                aria-label="Xóa icon"
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-500/10 hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ===== Phải: xem trước + hành động ===== */}
      <aside className="space-y-3">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#141416]">
          <div className="flex flex-col items-center bg-gradient-to-b from-indigo-500/15 to-transparent px-5 pb-5 pt-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-white shadow-lg shadow-indigo-500/20 dark:border-white/10 dark:bg-[#1c1c20]">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={name || "Icon kỹ năng"}
                  className="h-full w-full object-contain p-3.5"
                />
              ) : (
                <Code2 size={32} className="text-indigo-500" />
              )}
            </div>

            <p
              className={[
                "mt-4 max-w-full break-words text-lg font-semibold",
                name.trim()
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-400 dark:text-slate-500",
              ].join(" ")}
            >
              {name.trim() || "Tên kỹ năng"}
            </p>

            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-300">
                {selectedCategory &&
                  React.cloneElement(selectedCategory.icon, { size: 14 })}
                {selectedCategory?.label ?? category}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
                Vị trí #{displayOrder}
              </span>
            </div>
          </div>
        </section>

        <Button type="submit" disabled={!name.trim()} className="w-full">
          <Plus size={17} />
          Tạo kỹ năng
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={handleReset}
          className="w-full"
        >
          <RotateCcw size={16} />
          Làm mới biểu mẫu
        </Button>
      </aside>
    </form>
  );
}