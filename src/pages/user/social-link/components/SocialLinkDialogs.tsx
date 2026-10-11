
import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Pencil,
  Trash2,
  ArrowUpRight,
  Copy,
  Check,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import type { SocialLinkProps } from "../../../../services/social-link/SocialLinkTypes";
import {
  SocialLinkIcon,
  getHostname,
  useCopyToClipboard,
  focusRing,
} from "./SocialLinkShared";

/* ------------------------------------------------------------------ */
/* Modal nền                                                           */
/* ------------------------------------------------------------------ */

interface ModalProps {
  title: string;
  description?: string;
  isDark: boolean;
  dismissible?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isDark,
  dismissible = true,
  onClose,
  children,
  footer,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dismissible) {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [dismissible, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          if (dismissible) {
            onClose();
          }
        }}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl shadow-2xl outline-none ring-1 ring-inset sm:max-w-md sm:rounded-2xl ${
          isDark
            ? "bg-zinc-900 text-zinc-100 ring-white/10"
            : "bg-white text-zinc-900 ring-zinc-200"
        }`}
      >
        <div className="flex items-start justify-between gap-4 px-5 pb-3 pt-5">
          <div className="min-w-0">
            <h2 className="text-base font-semibold">{title}</h2>

            {description && (
              <p className="mt-0.5 text-sm text-zinc-500">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={!dismissible}
            aria-label="Đóng"
            className={`-mr-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition disabled:opacity-40 ${focusRing} ${
              isDark
                ? "hover:bg-white/10 hover:text-zinc-100"
                : "hover:bg-zinc-100 hover:text-zinc-700"
            }`}
          >
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 pb-5">
          {children}
        </div>

        {footer && (
          <div
            className={`flex flex-col-reverse gap-2 border-t px-5 py-4 sm:flex-row sm:justify-end ${
              isDark ? "border-white/[0.07]" : "border-zinc-100"
            }`}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

const btnBase =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-xl px-4 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-60";

const secondaryBtn = (isDark: boolean) =>
  `${btnBase} ${focusRing} ${
    isDark
      ? "bg-white/[0.06] text-zinc-200 hover:bg-white/10"
      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
  }`;

const primaryBtn =
  `${btnBase} ${focusRing} bg-indigo-600 text-white hover:bg-indigo-500`;

const dangerBtn =
  `${btnBase} ${focusRing} bg-red-600 text-white hover:bg-red-500`;

/* ------------------------------------------------------------------ */
/* Xem chi tiết                                                        */
/* ------------------------------------------------------------------ */

interface DetailDialogProps {
  item: SocialLinkProps;
  isDark: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const SocialLinkDetailDialog: React.FC<DetailDialogProps> = ({
  item,
  isDark,
  onClose,
  onEdit,
  onDelete,
}) => {
  const { copiedId, copy } = useCopyToClipboard();
  const copied = copiedId === item.id;

  const row = (label: string, content: React.ReactNode) => (
    <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
      <dt className="text-xs text-zinc-500">{label}</dt>
      <dd className="min-w-0 text-sm">{content}</dd>
    </div>
  );

  return (
    <Modal
      title="Chi tiết liên kết"
      isDark={isDark}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onDelete}
            className={`${btnBase} ${focusRing} sm:mr-auto ${
              isDark
                ? "text-red-400 hover:bg-red-500/10"
                : "text-red-600 hover:bg-red-50"
            }`}
          >
            <Trash2 size={14} />
            Xóa
          </button>

          <button
            type="button"
            onClick={onEdit}
            className={secondaryBtn(isDark)}
          >
            <Pencil size={14} />
            Chỉnh sửa
          </button>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryBtn}
          >
            Truy cập
            <ArrowUpRight size={14} />
          </a>
        </>
      }
    >
      <div className="flex items-center gap-3.5 py-2">
        <SocialLinkIcon
          src={item.iconUrl}
          alt={item.platform}
          isDark={isDark}
          className="h-14 w-14"
        />

        <div className="min-w-0">
          <p className="text-lg font-semibold leading-tight">
            {item.platform}
          </p>
          <p className="mt-0.5 text-sm text-zinc-500">
            {getHostname(item.url)}
          </p>
        </div>
      </div>

      <dl
        className={`mt-3 divide-y ${
          isDark ? "divide-white/[0.06]" : "divide-zinc-100"
        }`}
      >
        {row(
          "Đường dẫn",
          <div className="flex items-start gap-2">
            <span className="min-w-0 flex-1 break-all font-mono text-xs leading-relaxed text-zinc-500">
              {item.url}
            </span>

            <button
              type="button"
              onClick={() => void copy(item.id, item.url)}
              aria-label={copied ? "Đã sao chép" : "Sao chép liên kết"}
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-zinc-400 transition hover:text-zinc-700 dark:hover:text-zinc-200 ${focusRing}`}
            >
              {copied ? (
                <Check size={14} className="text-emerald-500" />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
        )}

        {row(
          "Thứ tự hiển thị",
          <span className="tabular-nums">{item.displayOrder}</span>
        )}

        {row(
          "Icon",
          <span className="break-all font-mono text-xs text-zinc-500">
            {item.iconUrl || "—"}
          </span>
        )}

        {row(
          "ID",
          <span className="break-all font-mono text-xs text-zinc-500">
            {item.id}
          </span>
        )}
      </dl>
    </Modal>
  );
};

/* ------------------------------------------------------------------ */
/* Form Create / Edit                                                  */
/* ------------------------------------------------------------------ */

export interface SocialLinkFormValues {
  platform: string;
  url: string;
  iconUrl: string;
  displayOrder: number;
}

interface FormDialogProps {
  item?: SocialLinkProps;
  isDark: boolean;
  onClose: () => void;
  onSubmit: (values: SocialLinkFormValues) => Promise<void>;
}

const isHttpUrl = (value: string): boolean => {
  try {
    const parsedUrl = new URL(value);

    return (
      parsedUrl.protocol === "http:" ||
      parsedUrl.protocol === "https:"
    );
  } catch {
    return false;
  }
};

export const SocialLinkFormDialog: React.FC<FormDialogProps> = ({
  item,
  isDark,
  onClose,
  onSubmit,
}) => {
  const isEdit = Boolean(item);

  const [platform, setPlatform] = useState(
    item ? item.platform : ""
  );

  const [url, setUrl] = useState(
    item ? item.url : ""
  );

  const [iconUrl, setIconUrl] = useState(
    item && item.iconUrl ? item.iconUrl : ""
  );

  const [order, setOrder] = useState(
    item ? String(item.displayOrder) : "0"
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const orderNum = Number(order);

  const dirty = item
    ? platform.trim() !== item.platform ||
      url.trim() !== item.url ||
      iconUrl.trim() !== (item.iconUrl || "") ||
      orderNum !== item.displayOrder
    : true;

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (!platform.trim()) {
      next.platform = "Nhập tên nền tảng.";
    }

    if (!url.trim()) {
      next.url = "Nhập đường dẫn.";
    } else if (!isHttpUrl(url.trim())) {
      next.url =
        "Đường dẫn phải bắt đầu bằng http:// hoặc https://.";
    }

    if (iconUrl.trim() && !isHttpUrl(iconUrl.trim())) {
      next.iconUrl = "URL icon không hợp lệ.";
    }

    if (
      order.trim() === "" ||
      !Number.isInteger(orderNum) ||
      orderNum < 0
    ) {
      next.displayOrder =
        "Thứ tự phải là số nguyên từ 0 trở lên.";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (saving || !validate()) {
      return;
    }

    setSaving(true);
    setSubmitError(null);

    try {
      await onSubmit({
        platform: platform.trim(),
        url: url.trim(),
        iconUrl: iconUrl.trim(),
        displayOrder: orderNum,
      });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Không thể lưu liên kết. Thử lại sau."
      );

      setSaving(false);
    }
  };

  const inputCls = (hasError: boolean): string =>
    `h-10 w-full rounded-xl px-3 text-sm outline-none ring-1 ring-inset transition focus:ring-2 disabled:opacity-60 ${
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

  const field = (
    id: string,
    label: string,
    input: React.ReactNode,
    error?: string,
    hint?: string
  ) => (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium"
      >
        {label}
      </label>

      {input}

      {error ? (
        <p className="mt-1.5 text-xs text-red-500" role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p className="mt-1.5 text-xs text-zinc-500">
            {hint}
          </p>
        )
      )}
    </div>
  );

  return (
    <Modal
      title={isEdit ? "Chỉnh sửa liên kết" : "Tạo liên kết"}
      description={
        item
          ? `Cập nhật thông tin cho ${item.platform}.`
          : "Thêm nền tảng mạng xã hội vào portfolio."
      }
      isDark={isDark}
      dismissible={!saving}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className={secondaryBtn(isDark)}
          >
            Hủy
          </button>

          <button
            type="submit"
            form="social-link-form"
            disabled={saving || !dirty}
            className={primaryBtn}
          >
            {saving && (
              <Loader2
                size={14}
                className="motion-safe:animate-spin"
              />
            )}

            {isEdit ? "Lưu thay đổi" : "Tạo liên kết"}
          </button>
        </>
      }
    >
      <form
        id="social-link-form"
        onSubmit={(e) => void handleSubmit(e)}
        noValidate
        className="mt-2 space-y-4"
      >
        {field(
          "sl-platform",
          "Nền tảng",
          <input
            id="sl-platform"
            autoFocus
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            disabled={saving}
            placeholder="Facebook, GitHub, LinkedIn..."
            className={inputCls(Boolean(errors.platform))}
          />,
          errors.platform
        )}

        {field(
          "sl-url",
          "Đường dẫn",
          <input
            id="sl-url"
            type="url"
            inputMode="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={saving}
            placeholder="https://"
            className={`${inputCls(Boolean(errors.url))} font-mono text-xs`}
          />,
          errors.url
        )}

        {field(
          "sl-icon",
          "URL icon",
          <input
            id="sl-icon"
            type="url"
            inputMode="url"
            value={iconUrl}
            onChange={(e) => setIconUrl(e.target.value)}
            disabled={saving}
            placeholder="https://"
            className={`${inputCls(Boolean(errors.iconUrl))} font-mono text-xs`}
          />,
          errors.iconUrl,
          "Có thể để trống nếu không sử dụng icon riêng."
        )}

        {field(
          "sl-order",
          "Thứ tự hiển thị",
          <input
            id="sl-order"
            type="number"
            min={0}
            step={1}
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            disabled={saving}
            className={`${inputCls(Boolean(errors.displayOrder))} tabular-nums`}
          />,
          errors.displayOrder,
          "Số nhỏ hơn hiển thị trước."
        )}

        {submitError && (
          <p
            role="alert"
            className="rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-500"
          >
            {submitError}
          </p>
        )}
      </form>
    </Modal>
  );
};

/* ------------------------------------------------------------------ */
/* Xác nhận xóa                                                        */
/* ------------------------------------------------------------------ */

interface DeleteDialogProps {
  item: SocialLinkProps;
  isDark: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const SocialLinkDeleteDialog: React.FC<DeleteDialogProps> = ({
  item,
  isDark,
  onClose,
  onConfirm,
}) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (deleting) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      await onConfirm();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không thể xóa liên kết. Thử lại sau."
      );

      setDeleting(false);
    }
  };

  return (
    <Modal
      title="Xóa liên kết"
      isDark={isDark}
      dismissible={!deleting}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className={secondaryBtn(isDark)}
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={deleting}
            className={dangerBtn}
          >
            {deleting && (
              <Loader2
                size={14}
                className="motion-safe:animate-spin"
              />
            )}

            Xóa liên kết
          </button>
        </>
      }
    >
      <div className="flex gap-3.5 pt-1">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
          <AlertTriangle size={20} />
        </div>

        <div className="min-w-0 text-sm leading-relaxed">
          <p>
            Bạn sắp xóa liên kết{" "}
            <span className="font-semibold">{item.platform}</span>.
            {" "}Liên kết sẽ biến mất khỏi portfolio và không thể khôi phục.
          </p>

          <p className="mt-1.5 break-all font-mono text-xs text-zinc-500">
            {item.url}
          </p>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-500"
        >
          {error}
        </p>
      )}
    </Modal>
  );
};
