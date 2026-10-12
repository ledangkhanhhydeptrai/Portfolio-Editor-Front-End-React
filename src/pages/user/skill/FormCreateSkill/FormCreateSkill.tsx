import React from "react";
import {
  Code2,
  ImagePlus,
  Layers,
  ListOrdered,
  X,
} from "lucide-react";

import type { FormCreateSkillProps } from "../../../../services/skill/SkillTypes";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import Select from "../../../../components/ui/Select";

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
  const categoryOptions = [
    { value: "DEVELOPMENT", label: "Development" },
    { value: "VIDEO_EDITING", label: "Video Editing" },
    { value: "DRIVING", label: "Driving" },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.currentTarget.files;

    if (files && files.length > 0) {
      setIconUrl(files[0]);
    }
  };

  const handleRemoveFile = () => {
    setIconUrl(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#141416] sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
            <Code2 size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Thông tin kỹ năng
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Nhập thông tin cơ bản cho kỹ năng mới.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Tên kỹ năng"
            placeholder="Ví dụ: ReactJS, CapCut..."
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            icon={<Code2 size={18} />}
            required
          />

          <Select
            label="Danh mục"
            options={categoryOptions}
            value={category}
            onChange={(event) =>
              setCategory(event.currentTarget.value as typeof category)
            }
            placeholder="Chọn danh mục"
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
      </section>

      {/* Icon upload */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#141416] sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
            <ImagePlus size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Icon kỹ năng
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Tải lên hình ảnh đại diện cho kỹ năng.
            </p>
          </div>
        </div>

        <label
          htmlFor="skill-icon"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-5 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-500/5 dark:border-white/15"
        >
          {iconUrl ? (
            <div className="flex flex-col items-center gap-3">
              <img
                src={URL.createObjectURL(iconUrl)}
                alt="Preview icon kỹ năng"
                className="h-20 w-20 rounded-xl border border-slate-200 bg-white object-contain p-2"
              />

              <p className="max-w-full break-all text-sm font-medium text-slate-700 dark:text-slate-200">
                {iconUrl.name}
              </p>

              <span className="text-xs text-indigo-500">
                Nhấn để chọn ảnh khác
              </span>
            </div>
          ) : (
            <>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                <ImagePlus size={28} />
              </div>

              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Nhấn để tải icon lên
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Chọn file hình ảnh từ máy tính của bạn.
              </p>
            </>
          )}

          <input
            id="skill-icon"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {iconUrl && (
          <div className="mt-3 flex justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={handleRemoveFile}
              className="!px-3 !py-2"
            >
              <X size={16} />
              Xóa icon
            </Button>
          </div>
        )}
      </section>

      {/* Preview */}
      <section className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 dark:border-indigo-500/20 dark:bg-indigo-500/5">
        <div className="mb-4 flex items-center gap-2">
          <Layers size={18} className="text-indigo-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Xem trước kỹ năng
          </h3>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#141416]">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-white/5">
            {iconUrl ? (
              <img
                src={URL.createObjectURL(iconUrl)}
                alt={name || "Skill icon"}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <Code2 size={26} className="text-indigo-500" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="break-words font-semibold text-slate-900 dark:text-white">
              {name.trim() || "Tên kỹ năng"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {categoryOptions.find(
                (option) => option.value === category,
              )?.label || category}
            </p>
          </div>

          <span className="shrink-0 rounded-lg bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-500">
            #{displayOrder}
          </span>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setName("");
            setCategory("DEVELOPMENT");
            setDisplayOrder(0);
            setIconUrl(null);
          }}
        >
          Làm mới biểu mẫu
        </Button>

        <Button type="submit" disabled={!name.trim()}>
          <Code2 size={17} />
          Tạo kỹ năng
        </Button>
      </div>
    </form>
  );
}