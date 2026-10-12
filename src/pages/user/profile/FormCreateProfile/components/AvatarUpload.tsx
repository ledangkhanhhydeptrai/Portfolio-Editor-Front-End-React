import React from "react";
import { Trash2, Upload } from "lucide-react";

interface AvatarUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

const formatSize = (bytes: number): string =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

/** Khung upload gọn, tự giãn theo chiều cao của hàng chứa nó. */
export default function AvatarUpload({ file, onChange }: AvatarUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string>("");
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    if (file === null) {
      setPreviewUrl("");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const dropped = event.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("image/")) {
      onChange(dropped);
    }
  };

  return (
    <div className="flex min-h-[170px] flex-col gap-1.5">
      <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Ảnh đại diện <span className="text-red-500">*</span>
      </span>

      {file === null ? (
        <label
          htmlFor="avatarFile"
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed px-3 text-center transition ${
            isDragging
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
              : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Upload size={18} />
          </span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Kéo thả hoặc chọn ảnh
          </span>
          <span className="text-xs text-slate-500">PNG, JPG, WEBP</span>
        </label>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-700 dark:bg-slate-800/50">
          {previewUrl !== "" && (
            <img
              src={previewUrl}
              alt="Ảnh đại diện xem trước"
              className="h-16 w-16 rounded-xl border border-slate-200 object-cover dark:border-slate-700"
            />
          )}
          <p className="w-full truncate text-xs font-medium text-slate-800 dark:text-slate-100">
            {file.name}
            <span className="font-normal text-slate-500">
              {" "}
              · {formatSize(file.size)}
            </span>
          </p>
          <div className="flex items-center gap-3 text-sm">
            <label
              htmlFor="avatarFile"
              className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              Đổi ảnh
            </label>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="inline-flex items-center gap-1 font-medium text-red-500 hover:text-red-600"
            >
              <Trash2 size={13} />
              Xóa
            </button>
          </div>
        </div>
      )}

      {/* sr-only (không phải hidden) để thuộc tính required vẫn báo lỗi được */}
      <input
        ref={inputRef}
        id="avatarFile"
        type="file"
        accept="image/*"
        required
        className="sr-only"
        onChange={(event) => {
          const files = event.target.files;
          onChange(files !== null && files.length > 0 ? files[0] : null);
        }}
      />
    </div>
  );
}
