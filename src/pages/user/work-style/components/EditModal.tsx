import React from "react";
import { LoaderCircle } from "lucide-react";
import type { WorkStyleTheme } from "./theme";
import type { WorkStyleProps } from "../../../../services/work-style/WorkStyleTypes";
import Modal from "./Modal";
import { primaryBtn, secondaryBtn } from "./ButtonStyles";
import { WorkStyleFormValues } from "./types";

const FORM_ID = "work-style-edit-form";

interface EditModalProps {
  t: WorkStyleTheme;
  item: WorkStyleProps | null;
  isSaving: boolean;
  /** Lỗi từ server (nếu có). */
  error?: string | null;
  onClose: () => void;
  onSubmit: (values: WorkStyleFormValues) => void | Promise<void>;
}

interface FieldErrors {
  title?: string;
  description?: string;
  displayOrder?: string;
}

interface FormProps {
  t: WorkStyleTheme;
  item: WorkStyleProps;
  error?: string | null;
  onSubmit: EditModalProps["onSubmit"];
}

const EditForm: React.FC<FormProps> = ({ t, item, error, onSubmit }) => {
  const [title, setTitle] = React.useState(item.title);
  const [description, setDescription] = React.useState(item.description);
  const [displayOrder, setDisplayOrder] = React.useState(String(item.displayOrder));
  const [errors, setErrors] = React.useState<FieldErrors>({});

  const inputClass = (hasError?: string) =>
    `w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
      hasError
        ? "border-red-500 focus:ring-red-500/20"
        : "focus:border-[#7F96F5] focus:ring-[#7F96F5]/20"
    } ${t.input}`;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const next: FieldErrors = {};
    const order = Number(displayOrder);

    if (!title.trim()) next.title = "Nhập tên phong cách.";
    if (!description.trim()) next.description = "Nhập mô tả.";
    if (displayOrder.trim() === "" || !Number.isInteger(order) || order < 0) {
      next.displayOrder = "Thứ tự phải là số nguyên không âm.";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    void onSubmit({
      title: title.trim(),
      description: description.trim(),
      displayOrder: order,
    });
  };

  return (
    <form id={FORM_ID} onSubmit={handleSubmit} noValidate className="space-y-4">
      {error && (
        <p role="alert" className="rounded-xl bg-red-500/10 px-3 py-2.5 text-sm text-red-500">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="ws-title" className="mb-1.5 block text-sm font-medium">
          Tên phong cách
        </label>
        <input
          id="ws-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={Boolean(errors.title)}
          className={inputClass(errors.title)}
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="ws-description" className="mb-1.5 block text-sm font-medium">
          Mô tả
        </label>
        <textarea
          id="ws-description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-invalid={Boolean(errors.description)}
          className={`${inputClass(errors.description)} resize-y leading-6`}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="max-w-40">
        <label htmlFor="ws-order" className="mb-1.5 block text-sm font-medium">
          Thứ tự hiển thị
        </label>
        <input
          id="ws-order"
          type="number"
          min={0}
          step={1}
          value={displayOrder}
          onChange={(e) => setDisplayOrder(e.target.value)}
          aria-invalid={Boolean(errors.displayOrder)}
          className={inputClass(errors.displayOrder)}
        />
        {errors.displayOrder && (
          <p className="mt-1 text-xs text-red-500">{errors.displayOrder}</p>
        )}
      </div>
    </form>
  );
};

const EditModal: React.FC<EditModalProps> = ({
  t,
  item,
  isSaving,
  error,
  onClose,
  onSubmit,
}) => (
  <Modal
    open={item !== null}
    onClose={onClose}
    t={t}
    title="Cập nhật phong cách làm việc"
    busy={isSaving}
    footer={
      <>
        <button
          type="button"
          onClick={onClose}
          disabled={isSaving}
          className={secondaryBtn(t)}
        >
          Hủy
        </button>
        <button type="submit" form={FORM_ID} disabled={isSaving} className={primaryBtn}>
          {isSaving && (
            <LoaderCircle size={15} className="animate-spin motion-reduce:animate-none" />
          )}
          Lưu thay đổi
        </button>
      </>
    }
  >
    {/* key giúp form được khởi tạo lại mỗi khi mở bản ghi khác */}
    {item && <EditForm key={item.id} t={t} item={item} error={error} onSubmit={onSubmit} />}
  </Modal>
);

export default EditModal;