import React from "react";
import { FileText, Link, Hash, Star, Save, LoaderCircle } from "lucide-react";

import Modal from "../../../../components/ui/Modal";
import type { FormUpdateCurriculumProps } from "../../../../services/curriculum/CurriculumTypes";

export default function FormUpdateCurriculum({
  curriculum,
  displayOrder,
  fileUrl,
  isPending,
  isPrimary,
  onClose,
  onSubmit,
  setDisplayOrder,
  setFileUrl,
  setIsPrimary,
  setTitle,
  title
}: FormUpdateCurriculumProps): React.JSX.Element {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (title.trim() === "" || isPending) {
      return;
    }

    onSubmit(event);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = event.target.files;

    if (files === null || files.length === 0) {
      setFileUrl(null);
      return;
    }

    const selectedFile = files[0];

    if (selectedFile.type !== "application/pdf") {
      setFileUrl(null);
      event.target.value = "";
      return;
    }

    setFileUrl(selectedFile);
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title="Cập nhật CV"
      size="lg"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hủy
          </button>

          <button
            type="submit"
            form="update-curriculum-form"
            disabled={isPending || title.trim() === ""}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <>
                <LoaderCircle size={16} className="mr-2 animate-spin" />
                Đang cập nhật...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Lưu thay đổi
              </>
            )}
          </button>
        </>
      }
    >
      <form
        id="update-curriculum-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Thông tin CV */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-indigo-400/20 bg-indigo-400/10 p-3 text-indigo-300">
            <FileText size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-100">
              Chỉnh sửa thông tin CV
            </p>
            <p className="mt-1 break-all text-xs text-gray-500">
              ID: {curriculum.id}
            </p>
          </div>
        </div>

        {/* Tên CV */}
        <div className="space-y-2">
          <label
            htmlFor="update-curriculum-title"
            className="block text-sm font-medium text-gray-300"
          >
            Tên CV <span className="text-red-400">*</span>
          </label>

          <input
            id="update-curriculum-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ví dụ: Frontend Developer CV"
            required
            maxLength={150}
            disabled={isPending}
            className="w-full rounded-xl border border-white/10 bg-[#0B0B0D] px-4 py-3 text-sm text-gray-100 outline-none transition placeholder:text-gray-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10 disabled:opacity-50"
          />
        </div>

        {/* File CV */}
        <div className="space-y-2">
          <label
            htmlFor="update-curriculum-file"
            className="flex items-center gap-2 text-sm font-medium text-gray-300"
          >
            <Link size={15} className="text-indigo-300" />
            Thay thế file CV
          </label>

          <input
            id="update-curriculum-file"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            disabled={isPending}
            className="w-full rounded-xl border border-white/10 bg-[#0B0B0D] px-4 py-3 text-sm text-gray-100 outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-500/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-300 hover:file:bg-indigo-500/20 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10 disabled:opacity-50"
          />

          {fileUrl !== null ? (
            <p className="break-all text-xs text-emerald-400">
              File mới: {fileUrl.name} (
              {(fileUrl.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
          ) : (
            <p className="break-all text-xs text-gray-400">
              File hiện tại: {curriculum.fileUrl}
            </p>
          )}

          <p className="text-xs leading-5 text-gray-500">
            Không chọn file mới nếu bạn muốn giữ nguyên file CV hiện tại.
          </p>
        </div>

        {/* Thứ tự hiển thị */}
        <div className="space-y-2">
          <label
            htmlFor="update-curriculum-display-order"
            className="flex items-center gap-2 text-sm font-medium text-gray-300"
          >
            <Hash size={15} className="text-indigo-300" />
            Thứ tự hiển thị
          </label>

          <input
            id="update-curriculum-display-order"
            type="number"
            min={0}
            step={1}
            value={displayOrder}
            onChange={(event) => {
              setDisplayOrder(Number(event.target.value));
            }}
            required
            disabled={isPending}
            className="w-full rounded-xl border border-white/10 bg-[#0B0B0D] px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10 disabled:opacity-50"
          />

          <p className="text-xs text-gray-500">
            Số nhỏ hơn sẽ được ưu tiên hiển thị trước.
          </p>
        </div>

        {/* CV chính */}
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition hover:border-amber-400/20 hover:bg-amber-400/[0.03]">
          <input
            type="checkbox"
            checked={isPrimary}
            onChange={(event) => setIsPrimary(event.target.checked)}
            disabled={isPending}
            className="mt-1 size-4 accent-amber-400"
          />

          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
              <Star size={16} className="text-amber-300" />
              Đặt làm CV chính
            </div>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Đánh dấu CV này là tài liệu hồ sơ chính của bạn.
            </p>

            {isPrimary && (
              <span className="mt-3 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-300">
                CV chính
              </span>
            )}
          </div>
        </label>
      </form>
    </Modal>
  );
}
